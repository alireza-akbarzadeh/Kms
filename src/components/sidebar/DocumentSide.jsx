import {
    Style,
    Pages,
    IndeterminateCheckBox,
    AddBox
    , Grade, Drafts, DocumentScanner, Unarchive
} from '@mui/icons-material'
import styled from 'styled-components'
import {Item} from 'core'
import React from 'react'
import {useTranslation} from 'react-i18next'
import {Link, useHistory, useLocation} from 'react-router-dom'
import {SidebarItem} from "../index";
import {Accordion, AccordionDetails, AccordionSummary, Divider} from "@mui/material";
import Box from "@mui/material/Box";
import {useSelector} from "react-redux";
import {CheckRole} from "../../helper";


const DocumentSide = () => {
    const {t} = useTranslation();
    const history = useHistory();
    const [setting, setSetting] = React.useState(false);
    const [myDocs, setMyDocs] = React.useState(false);
    const {data: user} = useSelector((state) => state.user)

    return (
        <>
            <Divider sx={{margin: '5px 0 7px 0'}}/>
            <Item style={{padding: "0", width: "85%", margin: "10px auto"}}>
                <SidebarItem text={t("Documents")} icon={<DocumentScanner/>} onClick={() => history.push('/document')}/>
            </Item>
            {CheckRole({roles: user?.data?.type, page: 'document', part: 'side'}) && (
                <Item style={{padding: "0", width: "85%", margin: "10px auto"}}>
                    <SidebarItem text={t("Archives")} icon={<Unarchive/>} onClick={() => history.push('/archives')}/>
                </Item>
            )}
            <Divider sx={{margin: '5px 0 7px 0'}}/>
            <Item style={{padding: "0", width: "85%", margin: "10px auto"}}>
                <SidebarItem text={t("Article")} icon={<Pages/>} onClick={() => history.push('/document/articles')}/>
            </Item>
            <Item style={{padding: "0", width: "85%", margin: "10px auto"}}>
                <SidebarItem text={t("Wiki")} icon={<Style/>} onClick={() => history.push('/document/wikis')}/>
            </Item>
            <Accordion sx={{boxShadow: 'none', borderTop: "none"}} expanded={myDocs} onClick={() => setMyDocs(!myDocs)}>
                <AccordionSummary>
                    <SidebarItem text={t('myDocs')}
                                 icon={myDocs ? (<IndeterminateCheckBox sx={{mr: 1}}/>) : (<AddBox sx={{mr: 1}}/>)}/>
                </AccordionSummary>
                <AccordionDetails>
                    <Box sx={{mt: 2, textAlign: 'center', display: 'flex', flexDirection: 'column'}}>
                        <Item>
                            <SidebarItem text={t("savedDocuments")} icon={<Grade/>}
                                         onClick={() => history.push('/document/bookmarks')}/>
                        </Item>
                        <Item>
                            <SidebarItem text={t("Drafts")} icon={<Drafts/>}
                                         onClick={() => history.push('/document/drafts')}/>
                        </Item>
                        <Item>
                            <SidebarItem text={t("myArticles")} icon={<Drafts/>}
                                         onClick={() => history.push('/document/mine')}/>
                        </Item>
                        <Item>
                            <SidebarItem text={t("knowledgeTree")} icon={<Drafts/>}
                                         onClick={() => history.push('/document/myKnowledge')}/>
                        </Item>
                    </Box>
                </AccordionDetails>
            </Accordion>
            { CheckRole({roles: user?.data?.type, page: 'document', part: 'side'}) && (
                <Accordion sx={{boxShadow: 'none', borderTop: "none"}} expanded={setting}
                           onClick={() => setSetting(!setting)}>
                    <AccordionSummary>
                        <SidebarItem text={t('setting')}
                                     icon={setting ? (<IndeterminateCheckBox sx={{mr: 1}}/>) : (
                                         <AddBox sx={{mr: 1}}/>)}/>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Box sx={{mt: 2, textAlign: 'center', display: 'flex', flexDirection: 'column'}}>
                            <Item>
                                <SidebarItem text={t("Template")} icon={<Pages/>}
                                             onClick={() => history.push('/document/templates')}/>
                            </Item>
                            <Item>
                                <SidebarItem text={t("Tags")} icon={<Style/>}
                                             onClick={() => history.push('/document/tags')}/>
                            </Item>
                        </Box>
                    </AccordionDetails>
                </Accordion>
            )}
        </>
    )
}

export default DocumentSide

const Ancer = styled(Link)`
  display: inline-flex;
  align-items: center;
`;
