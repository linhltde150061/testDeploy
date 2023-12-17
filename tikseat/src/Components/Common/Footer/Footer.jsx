import React from "react";
import { Button, Stack, Typography } from "@mui/material";
import logo from "../../../Assets/Images/logo.png";
import {
  colorAntiFlashWhite,
  colorPurpleNavy,
  colorWhite,
} from "../../../Assets/CSS/Style/theme";
import {
  BT_SUBSCRIBE_NOW,
  COPYRIGHT,
  EVENTICK,
  INTRODUCE_EVENTICK,
  NAME_LOGO,
  PLAN_EVENT,
  PLD_SEND_EMAIL,
  SEND_EMAIL_CONCERT,
  STAY_LOOP,
} from "../../../Assets/Constant/Common/constCommon";
import {
  CpSendEmailStyle,
  FooterStyle,
} from "../../../Assets/CSS/Style/style.const";
import {
  listEventick,
  listLogoSocialNetwork,
  listPlanEvents,
} from "../../../Assets/Constant/Common/dataCommon";

const Footer = () => {
  return (
    <FooterStyle className="footer">
      <Stack
        direction={"row"}
        justifyContent={"space-between"}
        width={"1240px"}
        color={colorAntiFlashWhite}
        margin={"auto"}
        flexWrap={"wrap"}
      >
        <Stack direction={"column"} spacing={2}>
          <Typography variant="h3" className="logo" component="h4">
            {NAME_LOGO}
          </Typography>
          <Stack direction={"column"} spacing={2}>
            <Typography component={"p"} width={"333px"} fontSize={"14px"}>
              {INTRODUCE_EVENTICK}
            </Typography>
            <Stack direction={"row"} alignItems={"center"} gap={"10px"}>
              {listLogoSocialNetwork.map((item, index) => {
                return <div key={index}>{item.logo}</div>;
              })}
            </Stack>
          </Stack>
        </Stack>
        <Stack direction={"row"} spacing={8}>
          <Stack direction={"column"} spacing={2}>
            <Typography style={{ fontWeight: "700", fontSize: "18px" }}>
              {PLAN_EVENT}
            </Typography>
            <Stack>
              {listPlanEvents.map((item, index) => {
                return (
                  <Typography
                    key={index}
                    padding={"5px 0"}
                    fontSize={"14px"}
                    fontWeight={500}
                  >
                    {item.title}
                  </Typography>
                );
              })}
            </Stack>
          </Stack>
          <Stack direction={"column"} spacing={2}>
            <Typography style={{ fontWeight: "700", fontSize: "18px" }}>
              {EVENTICK}
            </Typography>
            <Stack>
              {listEventick.map((item, index) => {
                return (
                  <Typography
                    key={index}
                    padding={"5px 0"}
                    fontSize={"14px"}
                    fontWeight={500}
                  >
                    {item.title}
                  </Typography>
                );
              })}
            </Stack>
          </Stack>
        </Stack>
        <Stack direction={"column"} spacing={2}>
          <Typography style={{ fontWeight: "700", fontSize: "18px" }}>
            {STAY_LOOP}
          </Typography>

          <Stack direction={"column"} spacing={2}>
            <Typography component={"p"} width={"333px"} fontSize={"14px"}>
              {SEND_EMAIL_CONCERT}
            </Typography>
            <CpSendEmailStyle>
              <input type="text" placeholder={PLD_SEND_EMAIL} />
              <Button className="button_send_email">{BT_SUBSCRIBE_NOW}</Button>
            </CpSendEmailStyle>
          </Stack>
        </Stack>
      </Stack>
      <Stack
        direction={"column"}
        margin={"auto"}
        width={"1240px"}
        alignItems={"center"}
        marginTop="50px"
      >
        <div
          style={{
            width: "100%",
            height: "1px",
            background: `${colorPurpleNavy}`,
          }}
        ></div>
        <Typography marginTop={"20px"} color={colorWhite} fontSize={"14px"}>
          {COPYRIGHT}
        </Typography>
      </Stack>
    </FooterStyle>
  );
};

export default Footer;
