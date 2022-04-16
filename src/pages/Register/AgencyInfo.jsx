import React from "react";
import { ERROR, FormControl, Input } from "./Styled_Register";
import {
  Box,
  Grid,
  InputLabel,
  TextareaAutosize,
  Typography,
  MenuItem,
  Select,
  Button,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import { FileInput } from "pages/Login/Styled_Login";
import { ArrowDropDown } from "@mui/icons-material";
import { useSelector } from "react-redux";
import { FileUploader } from "helper";
import {Person} from "@mui/icons-material";

const AgencyInfo = ({
  setTabs,
  errors,
  register,
  data,
  logoPic,
  setLogoPic,
}) => {
  const { loading } = useSelector((state) => state.SignUp);

  const { t } = useTranslation();

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
  };
  return (
    <>
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <FormControl>
            <InputLabel htmlFor="title">{t("Title")}</InputLabel>
            <Input
              className={`${errors.title && "Border_Error"} left_Radius`}
              type={"text"}
              id="outlined-basic"
              variant="outlined"
              {...register("title", { required: true })}
            />
            {errors.title && <ERROR>{t("Requierd")}</ERROR>}
          </FormControl>
        </Grid>
        <Grid item xs={12} md={6}>
          <FormControl>
            <InputLabel htmlFor="my-input">{t("Type_organization")}</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              className={`${errors.agency && "Border_Error"} w-full`}
              {...register("agency", { required: true })}
              clearOnEscape
              IconComponent={() => <ArrowDropDown />}
              placeholder={"انتخاب کنید"}
              sx={{
                float: "none",
                borderRadius: "25px 25px 25px 0",
                padding: "4px",
                height: "40px",
                border: "solid 2px #a0a3a5",
              }}
              loading={true}
              renderInput={(params) => <Input {...params} variant="outlined" />}
              id="demo-simple-select" // value={age}
              onChange={handleChange}
            >
              {data?.map((item) => (
                <MenuItem key={item.id} value={item.id}>
                  {item.title}
                </MenuItem>
              ))}
            </Select>
            {errors.agency && <ERROR>{t("Requierd")}</ERROR>}
          </FormControl>
        </Grid>
      </Grid>

      <FormControl>
        <InputLabel htmlFor="description">{t("Description")}</InputLabel>
        <TextareaAutosize
          maxRows={10}
          className={`${errors.desc && "Border_Error"}`}
          aria-label="maximum height"
          placeholder="Maximum 4 rows"
          defaultValue="Hellow Wrold"
          {...register("description", { required: true })}
          style={{
            width: "100%",
            height: "300px",
            outline: "none",
            border: " solid 1px #a0a3a5",
            borderTopLeftRadius: 15,
            borderBottomLeftRadius: 15,
            borderBottomRightRadius: 15,
          }}
        />
        {errors.description && <ERROR>{t("Requierd")}</ERROR>}
      </FormControl>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
        }}
      >
        <FileUploader
          src={logoPic}
          onFileUpload={setLogoPic}
          uploadMultiple={false}
          showPreview={true}
          title={t("PHOTO_SELECTION_KEY")}
          description={t("NEED_CHANGE_IMAGE_KEY")}
        >
          <FileInput>
            <div className="wrap-custom-file">
              <label htmlFor="avatar">
                <Box
                  sx={{
                    backgroundColor: "#fff",
                    borderRadius: 2,
                    padding: 0.5,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Person />
                </Box>
              </label>
            </div>
          </FileInput>
        </FileUploader>
      </Box>
      <FormControl>
        <Button
          sx={{ padding: "10px 0", borderRadius: "25px" }}
          type={"submit"}
          fullWidth
          variant={"contained"}
          loading={loading}
        >
          {t("SignUp")}
        </Button>
      </FormControl>
      <Box textAlign={"center"}>
        <Typography
          onClick={() => setTabs(0)}
          sx={{ textDecoration: "underline" }}
          color={"primary"}
          component={"a"}
          href={"#"}
          variant={"h5"}
        >
          {t("Back")}
        </Typography>
      </Box>
    </>
  );
};

export default AgencyInfo;
