import React from "react";
import { Box, IconButton, useTheme } from "@mui/material";
import { ListItems } from "./Drives-styled";
import { CloudDownload } from "@mui/icons-material";
import {Download} from "../../helper";

const DrivesLists = ({ list }) => {
  const theme = useTheme();
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "center",
        flexWrap: "wrap",
        width: "100%",
        padding: "50px 30px",
        color: "#fff",
      }}
    >
      {list &&
        list.map((item) => (
          <ListItems key={item.id}>
            <Box sx={{ width: "40px", height: "40px", marginBottom: "18px", margin: '20px' }}>
              <img
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "contain",
                }}
                src={'/assets/images/' + item.type + '.png'}
                alt="file"
              />
            </Box>
            <Box
              sx={
                theme.palette.mode === "dark"
                  ? { color: "#f9f9f9" }
                  : { color: "#121212" }
              }
            >
              {item.title}
            </Box>
            <Box>
              <IconButton>
                <a onClick={() => Download(item.title, item.gmail)}>
                  <CloudDownload
                    sx={{ color: "#8005D8", cursor: "pointer" }}
                  />
                </a>
              </IconButton>
            </Box>
          </ListItems>
        ))}
    </Box>
  );
}

export default DrivesLists;
