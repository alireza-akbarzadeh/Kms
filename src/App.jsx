import React from "react";
import GlobalStyle from "./assets/globalStyle";
import Routing from "./Routes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useTranslation } from "react-i18next";

const App = () => {
  const { t } = useTranslation();
  const dir = t("direction") === "rtl" ? "rtl" : "ltr";
  return (
    <div dir={dir}>
      <GlobalStyle />
      <ToastContainer />
      <Routing />
    </div >
  );
};

export default App;
