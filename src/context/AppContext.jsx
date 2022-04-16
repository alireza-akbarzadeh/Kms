import React, {createContext, useState} from "react";
import useMediaQuery from "@mui/material/useMediaQuery";

export const AppContext = createContext(null);

const {Provider} = AppContext;

const AppProvider = (props) => {
    const [openTab, setOpenTab] = useState(true);
    const [openModal, setOpenModal] = useState(false);
    const [openEvaluateModal, setOpenEvaluateModal] = React.useState(false);
    const [projectTaskPage, setProjectTaskPage] = React.useState(false);

    const matches = useMediaQuery("(max-width:1028px)");
    const mobileSize = useMediaQuery("(max-width:600px)");
    const [sidebar, setSidebarBar] = useState(matches);
    const [tabsSide, setTabsSide] = useState(mobileSize);
    React.useEffect(() => {
        if (matches) return setSidebarBar(false);
        if (!matches) return setSidebarBar(true);
    }, [matches]);

    React.useEffect(() => {
        if (mobileSize) return setTabsSide(false);
        if (!mobileSize) return setTabsSide(true);
    }, [mobileSize]);

    return (
        <Provider
            value={{
                openTab,
                setOpenTab,
                sidebar,
                setSidebarBar,
                tabsSide,
                setTabsSide,
                mobileSize,
                openModal,
                setOpenModal,
                openEvaluateModal,
                setOpenEvaluateModal,
                projectTaskPage,
                setProjectTaskPage,
            }}
        >
            {props.children}
        </Provider>
    );
};

export default AppProvider;
