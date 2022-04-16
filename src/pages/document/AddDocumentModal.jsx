import * as React from 'react';
import {SpeedDialAction, SpeedDialIcon, SpeedDial, Box, useMediaQuery} from '@mui/material';
import {useTranslation} from "react-i18next";
import WikiSvg from "assets/wiki.png"
import ArticleSvg from "assets/article.png"
import {useState} from "react";
import {useHistory} from "react-router-dom";
import {CheckRole} from "../../helper";
import {useSelector} from "react-redux";

const AddDocumentModal = ({category}) => {
    const [open, setOpen] = React.useState(false);
    const {data: user} = useSelector((state) => state.user)
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const {t} = useTranslation();

    const history = useHistory();

    const styleRtl = {position: 'fixed', bottom: 16, left: 16};
    const styleLtr = {position: 'fixed', bottom: 16, right: 16};

    const dir = t("direction") === "rtl";
    const styleImg = {
        width: "25px",
        height: "25px",
    }
    let actions = null;
    if (CheckRole({roles: user?.data?.type, page: 'document', part: 'storeArticle'})){
        actions = [
            {icon: <img style={styleImg} src={ArticleSvg} alt={"s"}/>, name: t('Article'), type: 'article'},
            {icon: <img style={styleImg} src={WikiSvg} alt={"s"}/>, name: t('Wiki'), type: 'wiki'},
        ];
    }else{
        actions = [
            {icon: <img style={styleImg} src={WikiSvg} alt={"s"}/>, name: t('Wiki'), type: 'wiki'},
        ];
    }


    const goToForm = (type) => {
        if (type === 'article') {
            history.push({
                pathname: '/document/store-article',
                state: {
                    category: category
                }
            })
        } else if (type === 'wiki') {
            history.push({
                pathname: '/document/store-wiki',
                state: {
                    category: category
                }
            })
        }
    }

    return (
        <Box sx={{position: "fixed", bottom: 0, left: 0}}>
            <Box sx={{height: 320, transform: 'translateZ(0px)', flexGrow: 1}}>
                <SpeedDial
                    ariaLabel="SpeedDial controlled open example"
                    sx={dir ? styleRtl : styleLtr}
                    icon={<SpeedDialIcon/>}
                    onClose={handleClose}
                    onOpen={handleOpen}
                    open={open}
                >
                    {actions.map((action) => (
                        <SpeedDialAction
                            key={action.name}
                            icon={action.icon}
                            tooltipTitle={action.name}
                            onClick={() => goToForm(action.type)}
                        />))}
                </SpeedDial>
            </Box>
        </Box>
    );
}
export default AddDocumentModal