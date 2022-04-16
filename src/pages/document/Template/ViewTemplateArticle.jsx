import React from "react";
import { Button, Typography, Box } from "@mui/material";
import { useDispatch } from "react-redux";
import { templateList } from "redux/features/document/template/templateSlice";
import { useTranslation } from "react-i18next";

const ViewTemplateArticle = ({ saveID, setOpenTab, data }) => {

  const filterData = data?.filter((item) => item.id === saveID);

  const dispatch = useDispatch();
  const { t } = useTranslation();
  const handleBack = () => {
    setOpenTab(0);
    dispatch(templateList());
  };

  return (
    <>
      {filterData?.map((item) => (
        <>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Box
              sx={{
                display: "inline-flex",
                gap: 1,
                alignItems: "center",
              }}
            >
              <Typography component={"span"}>{t("Title")} :</Typography>
              <Typography component={"h3"}>{item.title}</Typography>
            </Box>
            <Button onClick={handleBack} variant={"outlined"}>
              {t("Back")}
            </Button>
          </Box>
          <Box
            sx={{ mt: 5 }}
            dangerouslySetInnerHTML={{ __html: `${item?.body}` }}
          />
        </>
      ))}
    </>
  );
};

export default ViewTemplateArticle;
