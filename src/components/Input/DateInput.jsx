import styled from 'styled-components'
import React from 'react'
import { useTranslation } from 'react-i18next'
import DatePicker from '@amir04lm26/react-modern-calendar-date-picker';
const DateInput = ({ selectedDay, setSelectedDay }) => {
    const { t } = useTranslation();
    const border = t("direction") === "rtl" ? "37px 0 37px 37px" : "0 37px 37px 37px";

    const Date = styled.div`
        margin:15px 0;
      .Clender_Input{
        width: 100%;
        height: 40px;
        outline: none;
      cursor: pointer;
    }
        .DatePicker{
        width: 100%;
         }
     .DatePicker__input{
        border:${({ border }) => border} !important;

     }
     
     `

    return (
        <Date border={border}>
            <DatePicker
                value={selectedDay}
                inputClassName="Clender_Input"
                onChange={setSelectedDay}
                colorPrimary="rgba(128, 5, 216, 0.9)"
                colorPrimaryLight="rgba(128, 5, 216, 0.2)"
                calendarTodayClassName="custom-today-day"
                inputPlaceholder={t("endDayProject")}
                locale={"fa"}
            />
        </Date>
    )
}

export default DateInput


