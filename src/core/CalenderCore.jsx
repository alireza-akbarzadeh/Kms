import * as React from "react";
import "@amir04lm26/react-modern-calendar-date-picker/lib/DatePicker.css";
import DatePicker from "@amir04lm26/react-modern-calendar-date-picker";
import EventNoteIcon from "@mui/icons-material/EventNote";
import { useTranslation } from "react-i18next";

const CalenderCore = ({ selectedDayRange, setSelectedDayRange }) => {
  const [selectedDay, setSelectedDay] = React.useState(null);
  const { t } = useTranslation();
  const Locale = t("lng") === "fa" ? "fa" : "en";
  const renderCustomInput = ({ ref }) => (
    <EventNoteIcon />
  );
  return (
    <DatePicker
      value={selectedDayRange}
      onChange={setSelectedDayRange}
      colorPrimary="rgba(128, 5, 216, 0.9)"
      colorPrimaryLight="rgba(128, 5, 216, 0.5)"
      calendarClassName="custom-calendar"
      calendarTodayClassName="custom-today-day"
      locale={Locale}
      shouldHighlightWeekends
    />
  );
};


export default CalenderCore;
