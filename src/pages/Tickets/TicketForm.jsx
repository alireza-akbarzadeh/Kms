import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@mui/material";
import { UploadBtn, AddBtn, FormBox } from "./Tickets.styled";
import { useSelector, useDispatch } from "react-redux";
import { getDepartments } from "redux/features/ticket/departments";
import { useForm } from "react-hook-form";
import { CustomInput, CustomText, CustomSelect } from "components";
import { FileUploader } from "helper";
import { createTicket } from "../../redux/features/ticket/createTicket";
import {getTicket} from "../../redux/features/ticket/tickets";


const TicketForm = ({ showForm }) => {
    const { t } = useTranslation();
    const [departments, setDepartments] = React.useState([])
    const [file, setFile] = React.useState(null);

    const { data } = useSelector((state) => state.getDepartments);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getDepartments())
    }, [dispatch])

    useEffect(() => {
        setDepartments(data)
    }, [data])

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = (data) => {
        const formData = new FormData();
        if (file !== null) {
            formData.append('file', file[0]);
        }
        formData.append('subject', data?.subject);
        formData.append('message', data?.message);
        formData.append('priority', data?.priority);
        formData.append('department_id', data?.department_id);
        dispatch(createTicket(formData))
            .then(res => {
                dispatch(getTicket())
                showForm(false)
            });
    };

    return (<FormBox>

        <form onSubmit={handleSubmit(onSubmit)}>
            <CustomSelect
                data={departments?.data}
                errors={errors}
                register={register}
                title={t('Department')}
                field='department_id'
                required={true}
            />
            <CustomSelect
                data={[
                    { id: 'low', name: t('Low') },
                    { id: 'normal', name: t('Middle') },
                    { id: 'high', name: t('High') },
                ]}
                errors={errors}
                register={register}
                title={t('Ticket_Priority')}
                field='priority'
                required={true}
            />
            <CustomInput
                errors={errors}
                register={register}
                title={t('Title')}
                field='subject'
                placeholder={t("Please_Enter_Your_Ticket_Title")}
                required={true}
            />
            <CustomText
                errors={errors}
                register={register}
                title={t('Description')}
                field='message'
                type='text'
                required={true}
            />

            <FileUploader
                src={file}
                onFileUpload={setFile}
                uploadMultiple={false}
                showPreview={true}
            >
                <UploadBtn variant="contained" component="label">
                    {t("Upload_File")}
                    <input type="file" hidden />
                </UploadBtn>
            </FileUploader>

            <AddBtn>
                <Button type="submit" variant="text">
                    <span>{t("Send_Ticket")}</span>
                </Button>
            </AddBtn>
        </form>
    </FormBox>);
};

export default TicketForm;
