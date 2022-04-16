import {Paper, styled, Box, Stack, Container, Typography} from "@mui/material";
import * as React from "react";
import {
    AccessTimeFilled, Edit, Numbers, PriorityHigh, SupportAgent, Title,
} from "@mui/icons-material";

const ShowTicketHeader = ({data}) => {
    return (
        <HeadBox
            sx={{
                display: "flex",
                padding: "20px",
            }}
        >
            <FLexItem>
                <Stack direction={"column"} spacing={2}>
                    <Item>
                        <Typography className={"Head_typo"}>
                            <Title/>
                            عنوان تیکت
                            :
                        </Typography>
                        <Typography className={"head-left"}>
                            {data?.subject}
                        </Typography>
                    </Item>
                    <Item>
                        <Typography className={"Head_typo"}>
                            <Numbers/>
                            شماره تیکت
                        </Typography>
                        :
                        <Typography className={"head-left"}>
                            {data?.unique_number}
                        </Typography>

                    </Item>
                    <Item>
                        <Typography className={"Head_typo"}>
                            <PriorityHigh/>
                            اولویت
                        </Typography>
                        :
                        <Priority pri={data?.priority} className={"head-left"}>
                            {data?.priority}
                        </Priority>
                    </Item>
                    <Item>
                        <Typography className={"Head_typo"}>
                            <SupportAgent/>
                            وضعیت تیکت
                        </Typography>
                        :
                        <Typography className={"head-left"}>
                            {data?.status}
                        </Typography>
                    </Item>
                    <Item>
                        <Typography className={"Head_typo"}>
                            <AccessTimeFilled/>
                            تاریخ ایجاد
                        </Typography>
                        :
                        <Typography className={"head-left"}>
                            {data?.date}
                        </Typography>
                    </Item>
                    <Item>
                        <Typography className={"Head_typo"}>
                            <Edit/>
                            آخرین بروزرسانی
                        </Typography>
                        :
                        <Typography className={"head-left"}>
                            {data?.priority}
                        </Typography>
                    </Item>
                </Stack>

            </FLexItem>
        </HeadBox>
    );
};
export default ShowTicketHeader;

const HeadBox = styled(Paper)`
  height: 25rem;
  @media (max-width: 765px) {
    height: auto;
  }
  @media (max-width: 765px) {
    height: auto;

  }
`;

const Item = styled("div")`
  display: flex;
  align-items: center;

  & > .Head_typo {
    display: inline-flex;
    align-items: center;
    gap: 5px;
    white-space: nowrap;
  }

  & > .head-left {
    margin: 0 5px;
    white-space: nowrap;
  }

  @media (max-width: 425px) {
    & > .head-left {
      font-size: 13px;
    }

    & > .Head_typo {
      font-size: 13px;
    }
  }

`;

const FLexItem = styled("div")`
  display: flex;
  justify-Content: space-between;
  align-Items: center;
  flex-wrap: wrap;
  flex-direction: row;
  width: 100%;
  @media (max-width: 425px) {
    flex -direction: column;
    justify-content: flex-start;
  }

`
// unique_number
const Priority = styled("div")`
  color: ${({pri}) =>
          pri === "بالا"
                  ? "red"
                  : pri === "متوسط"
                          ? "yellow"
                          : pri === "کم"
                                  ? "gray"
                                  : "rgba(255,255,255,0.6)"};

`;
