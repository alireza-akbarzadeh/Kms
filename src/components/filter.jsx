import React from "react";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import {
    FormControl,
    IconButton,
    InputLabel,
    MenuItem,
    Popover,
    Select,
    Box,
    Input,
} from "@mui/material";
import CloseIcon from '@mui/icons-material/Cancel';
import {useTranslation} from "react-i18next";
import DatePicker from "@amir04lm26/react-modern-calendar-date-picker";
import _ from 'lodash'


const Filter = ({handleChange, data}) => {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [filtersData, setFilterData] = React.useState(null);
    const [dateFilter, setDateFilter] = React.useState(false);
    const [query, setQuery] = React.useState({})
    const [selectedDayRange, setSelectedDayRange] = React.useState({
        from: null,
        to: null
    })
    const {t} = useTranslation()
    const dir = t("direction") === "rtl"


    React.useEffect(() => {
        const index = data?.findIndex((item) => item?.type === 'fromTo');

        if (index >= 0) {
            setDateFilter(true)
            let newData = _.remove(data, function (item) {
                return item?.type === undefined
            });
            setFilterData(newData)
        } else {
            setFilterData(data)
        }
    }, [data])


    React.useEffect(() => {
        let stateData = {...query};
        data?.map((item, i) => {
            if (item?.isMultiple) {
                if (item?.value?.length) {
                    stateData[item?.key] = item?.value
                }
            } else {
                if (item?.value !== '') {
                    stateData[item?.key] = item?.value
                }
            }
        })
        setQuery(stateData)
    }, []);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    React.useEffect(() => {
        if (dateFilter) {
            if (selectedDayRange?.from?.year !== undefined) {
                let from = selectedDayRange?.from?.year + '/' + selectedDayRange?.from?.month + '/' + selectedDayRange?.from?.day;
                setFilter('from', from, false)
            }
            if (selectedDayRange?.to?.year !== undefined) {
                let to = selectedDayRange?.to?.year + '/' + selectedDayRange?.to?.month + '/' + selectedDayRange?.to?.day;
                setFilter('to', to, false)
            }
        }
    }, [selectedDayRange])

    const setFilter = (key, value, isMultiple) => {
        if (isMultiple) {
            if (query[key] === undefined) {
                query[key] = []
            }
            query[key].push(value)
        } else {
            query[key] = value
        }
        const data = query
        setQuery(data)
        callFilter(data)
    }

    const removeFilter = (key) => {
        if (query[key] !== undefined) {
            delete query[key]
        }
        const newQuery = query
        setQuery(newQuery)
        callFilter(newQuery)
    }
    const removeDateFilter = () => {
        if (query['from'] !== undefined) {
            delete query['from']
        }
        if (query['to'] !== undefined) {
            delete query['to']
        }
        const newQuery = query

        setQuery(newQuery)
        setSelectedDayRange({
            from: null,
            to: null
        })
        callFilter(newQuery)
    }

    const callFilter = (data) => {
        let url = ''
        for (let key in data) {
            if (data[key] !== undefined) {
                if (typeof (data[key]) === 'string' || typeof (data[key]) === 'number') {
                    url += key + '=' + data[key] + '&'
                } else {
                    data[key].map((row) => {
                        url += key + '[]=' + row + '&'
                    })
                }
            }
        }
        handleChange(url.substring(0, url.length - 1))
    }

    const open = Boolean(anchorEl);
    const id = open ? "userInfo" : undefined;

    return (
        <>
            {dateFilter && (
                <>
                    <IconButton onClick={() => removeDateFilter()}>
                        <CloseIcon/>
                    </IconButton>
                    <DatePicker
                        value={selectedDayRange}
                        onChange={setSelectedDayRange}
                        inputClassName='filter-calendar'
                        colorPrimary="rgba(128, 5, 216, 0.9)"
                        colorPrimaryLight="rgba(128, 5, 216, 0.2)"
                        calendarTodayClassName="custom-today-day"
                        inputPlaceholder={t("dateFilter")}
                        locale={"fa"}
                        shouldHighlightWeekends={false}
                    />

                </>
            )}
            {filtersData?.length > 0 && (
                <>
                    <IconButton
                        aria-describedby={id}
                        variant="contained"
                        onClick={handleClick}
                    >
                        <FilterAltIcon sx={{color: "#fff"}}/>
                    </IconButton>

                    <Popover
                        id={id}
                        open={open}
                        anchorEl={anchorEl}
                        onClose={handleClose}
                        anchorOrigin={{
                            vertical: "bottom",
                            horizontal: "left",
                        }}
                    >
                        {filtersData?.map((item, i) => (
                            <Box key={i} sx={{padding: 2}}>
                                <FormControl sx={{
                                    maxWidth: "242px", minWidth: "242px",

                                    "&  > label": {
                                        transformOrigin: dir ? " top right" : "top left",
                                        position: "absolute",
                                        right: dir ? "26px" : 0,
                                        top: dir ? "5px" : 0,
                                        left: dir ? "unset" : 0,
                                    }
                                }} fullWidth>
                                    <InputLabel id="demo-simple-select-label">
                                        {item.label}
                                    </InputLabel>
                                    <Box sx={{posation: "relative"}}>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            className={`w-full`}
                                            dir={dir ? "rlt" : "ltr"}
                                            clearOnEscape
                                            multiple={item.isMultiple}
                                            variant={"filled"}
                                            placeholder={item.label}
                                            value={item.value}
                                            label={"test"}
                                            sx={{
                                                width: 240,
                                                padding: "4px",
                                                direction: dir ? "rtl" : "ltr",
                                                alignItems: "center",
                                                "& > svg": {
                                                    left: dir ? "7px" : " unset",
                                                    right: dir ? "unset" : "0",
                                                },
                                            }}
                                            loading={true}
                                            renderInput={(params) => (
                                                <Input {...params} variant="outlined"/>
                                            )}
                                            id="demo-simple-select"
                                        >
                                            {item?.options?.map((value, i) => (
                                                <MenuItem sx={dir ? {direction: "rtl"} : {direction: "ltr"}}
                                                          key={value.i}
                                                          value={value.value}
                                                          onClick={() => setFilter(item.key, value.value, item.isMultiple)}>
                                                    {value.label}
                                                </MenuItem>
                                            ))}

                                        </Select>
                                        {((item.isMultiple && item?.value?.length) || (!item.isMultiple && item?.value !== '')) && (
                                            <Box sx={dir ? {
                                                position: "absolute",
                                                left: "40px",
                                                top: "20%",
                                                transform: "translate(-50%, 0)"
                                            } : {
                                                position: "absolute",
                                                right: "0",
                                                top: "20%",
                                                transform: "translate(-50%, 0)"
                                            }}>
                                                <IconButton onClick={() => removeFilter(item.key)}>
                                                    <CloseIcon/>
                                                </IconButton>
                                            </Box>
                                        )}
                                    </Box>
                                </FormControl>
                            </Box>
                        ))}
                    </Popover>
                </>
            )}
        </>
    );
};

export default Filter;

