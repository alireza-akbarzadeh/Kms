import React, {useState, useEffect} from "react";
import {useSelector, useDispatch} from "react-redux";
import {
    Container, useTheme,
} from "@mui/material";
import {DrivesBox} from "./Drives-styled";
import DriveCategory from "./Drive-category";
import DrivesHeader from "./Drives-header";
import DrivesRecentFiles from './Drives-recent-files';
import {getDriveList} from "redux/features/drive/getDriveList";
import LoadingCore from "core/LoadingCore";
import {Http} from "helper";
import {NoData} from "components";

const Drives = () => {
    const [type, setType] = useState(null)
    const [drives, setDrives] = useState([])
    const [drivesClone, setDrivesClone] = useState([])
    const {data, loading} = useSelector((state) => state.getDriveList);
    const {data: user} = useSelector((state) => state.user);
    const [searchTerm, setSearchTerm] = React.useState("");
    const firstRequest = React.useRef(false);
    const dispatch = useDispatch();
    const theme = useTheme();

    const FilterCategory = (type) => {
        setType(type)
        dispatch(getDriveList({type: type}))
    }

    useEffect(() => {
        dispatch(getDriveList({}))
    }, [dispatch])

    useEffect(() => {
        setDrives(data)
        setDrivesClone(data)
    }, [data])
    useEffect(() => {
        const delayDebounceFn = setTimeout(async () => {
            if (searchTerm !== "") {
                const res = await Http(`document/drive?search=${searchTerm}`, {
                    method: "get",
                });
                if (res.status === 200) {
                    setDrives(res?.data?.data);
                }
            } else {
                if (firstRequest.current) {
                    setDrives(drivesClone)
                } else {
                    firstRequest.current = true;
                }
            }

        }, 2000);
        return () => clearTimeout(delayDebounceFn);
    }, [searchTerm]);

    return (<>
            {loading && (<LoadingCore loading={loading}/>)}
            <Container maxWidth={"xl"}>
                <DrivesBox
                    style={theme.palette.mode === "dark" ? {background: "#121212"} : {background: "#f9f9f9"}}
                >
                    <DrivesHeader setSearchTerm={setSearchTerm}/>
                    <DriveCategory type={type} FilterCategory={FilterCategory}/>
                    {drives?.data?.data?.length > 0 ? (<DrivesRecentFiles user={user} type={type} mainData={drives}/>) : (<NoData/>)}

                </DrivesBox>
            </Container>
        </>
    );
}

export default Drives;
