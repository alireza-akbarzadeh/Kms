import {Box, Button, Chip, Divider, IconButton, Stack, Typography} from "@mui/material";
import {Avatar} from "components";
import {
    Close,
    StarHalfOutlined,
    ThumbDownAltOutlined,
    ThumbUpAltOutlined,
    VisibilityOutlined
} from "@mui/icons-material";
import {AlignItems, SpaceItems} from "./Article/Article-Styled";
import React, {useEffect, useState} from "react";
import Select from "react-select";
import documentRequirement from "../../Hook/useDocumentRequirement";
import {useDispatch, useSelector} from "react-redux";
import {UpdateDocument} from "../../redux/features/document/UpdateDocumentSlice";
import {CheckRole} from "../../helper";

const DocumentSideTop = ({t, data, setShowSide}) => {
    const [selectedVisibility, setSelectedVisibility] = useState(null)
    const [users, setUsers] = useState(null)
    const [teams, setTeams] = useState(null)
    const dispatch = useDispatch()
    const {data: user} = useSelector((state) => state.user)
    useEffect(() => {
        setSelectedVisibility({
            label: data?.visibility,
            value: data?.visibility_type
        })
        if (data?.visibility_type === 'members') {
            const newUsers = data?.users?.map((item) => {
                return {
                    label: item.first_name + ' ' + item.last_name, value: item.id
                }
            })
            setUsers(newUsers)
        }
        if (data?.visibility_type === 'teams') {
            const newTeams = data?.teams?.map((item) => {
                return {
                    label: item.title, value: item.id
                }
            })
            setTeams(newTeams)
        }
    }, [data])
    const requiredData = documentRequirement({
        categoriesStatus: false,
        tagsSStatus: false,
        usersStatus: true,
        teamsSStatus: true,
        projectsSStatus: false,
        tasksSStatus: false,
        drivesSStatus: false,
    });


    const updateDocVisibility = () => {
        let body = {
            visibility: selectedVisibility?.value,
            users: [],
            teams: [],
        }
        if (selectedVisibility?.value === 'members') {
            users?.map((item) => {
                body.users.push(item.value)
            })
        }
        if (selectedVisibility?.value === 'teams') {
            teams?.map((item) => {
                body.teams.push(item.value)
            })
        }
        dispatch(UpdateDocument({
            id: data?.id,
            data: body
        }))
    }

    return (
        <Stack direction={"column"} gap={2.5}>
            <Box
                sx={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                <Box sx={{display: "inline-flex", alignItems: "center", gap: 1}}>
                    <Avatar size={"md"} address={data?.user?.avatar}/>
                    <Typography>
                        {data?.user?.first_name + " " + data?.user?.last_name}
                    </Typography>
                    <Box className={"MobileSize"} sx={{position: "absolute", left: 0}}
                         onClick={() => setShowSide(false)}>
                        <IconButton>
                            <Close/>
                        </IconButton>
                    </Box>
                </Box>
                <Chip
                    variant={'outlined'}
                    color={'primary'}
                    label={t(data?.type)}/>
            </Box>
            <Box>
                <Typography mb={2}>
                    {t("visibility")}
                </Typography>
                <Select
                    className="React_select"
                    value={selectedVisibility}
                    onChange={data?.type === 'article' ? setSelectedVisibility : null}
                    options={requiredData.visibility}
                    placeholder={t("Select")}
                    isDisabled={
                        !CheckRole({roles: user?.data?.type, page: 'document', part: 'visibility'})
                    }
                />
                {selectedVisibility?.value === 'members' && (<Box mt={2}>
                    <Select
                        isMulti
                        className="React_select"
                        value={users}
                        onChange={setUsers}
                        options={requiredData.users}
                        placeholder={t("Users")}
                        isDisabled={
                            !CheckRole({roles: user?.data?.type, page: 'document', part: 'visibility'})
                        }
                    />
                </Box>)}
                {selectedVisibility?.value === 'teams' && (<Box mt={2}>
                    <Select
                        isMulti
                        className="React_select"
                        value={teams}
                        onChange={setTeams}
                        options={requiredData.teams}
                        placeholder={t("Teams")}
                        isDisabled={
                            !CheckRole({roles: user?.data?.type, page: 'document', part: 'visibility'})
                        }
                    />
                </Box>)}
                {data?.visibility_type !== selectedVisibility?.value && (
                    <Button
                        variant={'contained'}
                        fullWidth
                        sx={{marginTop: '10px'}}
                        disabled={
                            (selectedVisibility?.value === 'teams' && teams === null) ||
                            (selectedVisibility?.value === 'members' && users === null)
                        }
                        onClick={updateDocVisibility}>
                        {t('Save')}
                    </Button>
                )}
            </Box>

        </Stack>
    )
}
export default DocumentSideTop