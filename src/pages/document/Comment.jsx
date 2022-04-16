import Box from "@mui/material/Box";
import {Avatar} from "components";
import {Button, Divider, Stack, TextField, Typography} from "@mui/material";
import {CardBody, CardContainer} from "./Article/Modals/Modal-Styled";
import React from "react";
import {useTranslation} from "react-i18next";

const Comment = ({comment, setReplyTo, executeScroll}) => {
    const {t} = useTranslation()

    return (<>
        <Stack direction={'row'} spacing={2}>
            <Box>
                <Avatar address={comment?.user?.avatar} size={'sm'}/>
                <Typography sx={{fontWeight: 700}} component={"label"} fontSize={13}
                            color={"#7fb2e1"}>
                    {comment?.user?.first_name + ' ' + comment?.user?.last_name}
                </Typography>
            </Box>
            <Box>
                <Typography component={"p"} fontSize={13} color={"#777"} lineHeight={1.9}>
                    {comment?.text}
                </Typography>
                <Button variant={"text"} sx={{color: "#999a9b"}} onClick={() => {
                    setReplyTo({
                        to: comment?.user?.first_name + ' ' + comment?.user?.last_name,
                        text: comment?.text,
                        id: comment?.id
                    })
                    executeScroll()
                }
                }>{t('reply')}</Button>
            </Box>
        </Stack>
        <Box sx={{marginRight: '10% !important', marginTop: '15px !important'}}>
            {comment?.reply.length > 0 && (
                <>
                    {comment?.reply?.map((item) => (
                        <Box sx={{borderRight: '1px dotted', padding: '10px'}}>
                            <Comment executeScroll={executeScroll} setReplyTo={setReplyTo} comment={item}/>
                        </Box>
                    ))}
                </>
            )}
        </Box>
    </>)
}
export default Comment