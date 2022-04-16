import * as React from 'react';
import {
    Fab,
    Divider,
    Typography,
    IconButton,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Alert, Snackbar, TextField, Button, Stack
} from "@mui/material";
import {AddBox, ContentCopyRounded, IndeterminateCheckBox, OpenInNew} from '@mui/icons-material';
import Box from "@mui/material/Box";
import {SidebarItem, CustomInput} from 'components'
import {useTranslation} from "react-i18next";
import {useForm} from "react-hook-form";
import {CoreBTN} from "core";
import {useDispatch, useSelector} from "react-redux";
import {GenerateLinks} from "redux/features/Auth/GenerateLinks";

const UsersSide = ({data}) => {
    const [open, setOpen] = React.useState(false);
    const [linkError, setLinkError] = React.useState(false);
    const [links, setLinks] = React.useState(null)
    const [alert, setAlert] = React.useState(false);
    const {data: linkData, loading, isSuccess} = useSelector((state) => state.GenerateLinksSlice)
    const {t} = useTranslation()
    const dispatch = useDispatch()
    const items = [
        {name: 'مدیر دانش', link: links?.advanced},
        {name: 'مهندس دانش', link: links?.admin},
        {name: 'متخصص', link: links?.expert},
        {name: 'کاربر عادی', link: links?.user},
        {name: 'منابع انسانی', link: links?.hr},
        {name: 'مهمان', link: links?.guest},
    ]

    const copyLink = (link) => {
        navigator.clipboard.writeText(link)
            .then(r => {
                setAlert(true);
                setTimeout(() => setAlert(false), 5000)

            })
    }
    const handleAccordion = (e) => setOpen(!open)

    const onSubmit = (req) => {
        dispatch(GenerateLinks({email: req?.email}))
            .then(res => {
                if (isSuccess) {
                    setLinks(linkData?.data)
                    setOpen(true)
                }else{
                    setLinkError(true)
                    setTimeout(() => setLinkError(false), 5000)
                }
            })

    }
    const {
        register,
        setValue,
        handleSubmit,
        formState: {errors},
    } = useForm();


    return (
        <>
            {alert &&
                <Alert severity="success">لینک دعوت با موفقیت کپی شد</Alert>
            }

            {data?.data?.type?.includes('manager') && (
                <>
                    <Divider sx={{margin: '10px 0'}}/>
                    <Stack spacing={2} maxWidth={'200px'}>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            {linkError &&
                                <Alert severity="error">ایمیل تکراری میباشد</Alert>
                            }
                            <CustomInput
                                errors={errors}
                                register={register}
                                title={t('Email')}
                                field={'email'}
                                required={true}
                            />

                            <CoreBTN
                                fullWidth
                                loading={loading}
                                sx={{borderRadius: 15, padding: "5px 12px"}}
                                variant={"contained"}
                                color={"primary"}
                                type={"submit"}
                                title={t("CreateInviteLink")}
                            />
                        </form>
                    </Stack>
                    {links !== null && (
                        <Accordion sx={{boxShadow: 'none'}} expanded={open} onClick={handleAccordion}>
                            <AccordionSummary>
                                <SidebarItem text={'لینک دعوت اعضا'}
                                             icon={open ? (<IndeterminateCheckBox sx={{mr: 1}}/>) : (
                                                 <AddBox sx={{mr: 1}}/>)}/>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Box sx={{mt: 2, textAlign: 'center', display: 'flex', flexDirection: 'column'}}>
                                    {items.map((row) => (
                                        <Box sx={{display: 'flex', alignItems: 'center', gap: 1}}>
                                            <a href={row.link} target='_blank'>
                                                <IconButton
                                                    color='primary'
                                                    edge="end"
                                                    aria-label="open"
                                                    title="open"
                                                >
                                                    <OpenInNew/>
                                                </IconButton>
                                            </a>
                                            <IconButton
                                                color='primary'
                                                edge="end"
                                                aria-label="copy"
                                                title="Copy"
                                                onClick={() => copyLink(row.link)}
                                            >
                                                <ContentCopyRounded/>
                                            </IconButton>
                                            <Typography fontSize='small'>
                                                {row.name}
                                            </Typography>
                                        </Box>
                                    ))}
                                </Box>
                            </AccordionDetails>
                        </Accordion>
                    )}
                </>
            )}
        </>
    )
}


export default UsersSide