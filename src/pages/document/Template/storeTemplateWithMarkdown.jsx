import React, { useEffect, useState } from "react";
import { MarkDownEditor } from "components";
import { Box, Button, Input, useMediaQuery } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { CoreBTN } from "core";
import { useTranslation } from "react-i18next";
import { storeTemplate } from "redux/features/document/template/storeTemplateSlice";
import { templateList } from "redux/features/document/template/templateSlice";
import { updateTemplate } from "redux/features/document/template/updateTemplateSlice";
import { showTemplate } from "redux/features/document/template/showTemplateSlice";

const StoreTemplateWithMarkdown = ({ setOpenTab, saveID }) => {
  const [value, setValue] = React.useState("");
  const [title, setTitle] = useState("");
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.storeTemplateSlice);
  const { data } = useSelector((state) => state.showTemplateSlice);

  useEffect(() => {
    if (saveID !== null) {
      const id = saveID;
      dispatch(showTemplate(id));
    }
  }, [saveID]);

  useEffect(() => {
    if (saveID !== null) {
      setValue(data?.body);
      setTitle(data?.title);
    }
  }, [data]);

  const handleBack = () => {
    setOpenTab(0);
    dispatch(templateList());
  };

  const { t } = useTranslation();
  const matches = useMediaQuery("(max-width:800px)");

  const handleStoreArtcleWithMarkDown = () => {
    const data = {
      type: "markdown",
      body: value,
      title: title,
    };
    if (saveID !== null) {
      const id = saveID;
      dispatch(updateTemplate({ id, data }));
    } else {
      dispatch(storeTemplate(data));
    }
  };
  return (
    <div className="container">
      <Box mt={2} mb={4}>
        <label style={{ display: "block", marginBottom: 9 }}>
          {t("Title")} :
        </label>
        <Input
          type={"text"}
          sx={{
            border: "1px solid #c0c0c0",
            width: matches ? "100%" : "50%",
            padding: "6px 10px",
            borderRadius: 1,
          }}
          value={title}
          onChange={({ target }) => setTitle(target.value)}
        />
      </Box>
      <MarkDownEditor value={value} setValue={setValue} />
      <Box mt={6}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            width: matches ? "100%" : "50%",
            gap: 3,
          }}
        >
          <CoreBTN
            disabled={title === "" || value === ""}
            fullWidth
            variant={"contained"}
            loading={loading}
            type={"submit"}
            title={saveID === null ? t("Create") : t("Edit")}
            onClick={handleStoreArtcleWithMarkDown}
          />
          <Button onClick={handleBack} fullWidth variant={"outlined"}>
            {t("Back")}
          </Button>
        </Box>
      </Box>
    </div>
  );
};

export default StoreTemplateWithMarkdown;
