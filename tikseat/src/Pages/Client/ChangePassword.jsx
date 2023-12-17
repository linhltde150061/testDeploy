import {
  Alert,
  Box,
  Grid,
  Paper,
  Snackbar,
  Stack,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { NAME_LOGO } from "../../Assets/Constant/Common/constCommon";
import FormSubmit from "../../Components/Common/FormCustom/FormSubmit";
import InputCustom from "../../Components/Common/Input/InputCustom";
import ButtonCustom from "../../Components/Common/Button/ButtonCustom";
import { getLocalStorageUserData } from "../../Store/userStore";
import ApiCommon from "../../API/Common/ApiCommon";
const ChangePassword = () => {
  const [oldPassword, setOldPassword] = useState();
  const [newPassword, setNewPassword] = useState();
  const [configPassword, setConfigPassword] = useState();
  const dataUser = getLocalStorageUserData();
  const [labelError, setLabelError] = useState();
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };
  const handleChangePassword = async (e) => {
    e.preventDefault();
    if (newPassword === configPassword) {
      setLabelError("");
      const data = await {
        email: dataUser.email,
        oldPassword: oldPassword,
        newPassword: newPassword,
      };
      const res = await ApiCommon.changePassword(data);
      console.log("res: ", res);

      if (res.status === true) {
        handleClick();
      }
    } else {
      setLabelError("password incorrect");
    }
  };
  return (
    <Grid
      className="login"
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Paper
        className="loginGrid"
        style={{
          boxShadow: "rgb(223 193 34 / 51%) 0px 1px 15px 15px",
          padding: "20px",
          width: "70%",
        }}
      >
        <Box component={"div"} width={"100%"}>
          <Typography variant="h3" className="logo" component="h4">
            {NAME_LOGO}
          </Typography>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <h1>Change Password</h1>
          </div>{" "}
          <FormSubmit
            onSubmit={handleChangePassword}
            style={{
              width: "100%",
              height: "90%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <Box marginTop={"30px"}>
              <InputCustom
                type="password"
                id="oldPassword"
                name="oldPassword"
                label="Old Password"
                setValue={setOldPassword}
              />
            </Box>

            <Box marginTop={"30px"}>
              <InputCustom
                type="password"
                id="newPassword"
                name="newPassword"
                label="New password"
                setValue={setNewPassword}
              />
            </Box>
            <Box marginTop={"30px"}>
              <InputCustom
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                label="Enter again"
                labelError={labelError}
                setValue={setConfigPassword}
              />
            </Box>
            <Stack
              direction={"row"}
              gap={"20px"}
              style={{ width: "50%", margin: "50px auto" }}
            >
              <ButtonCustom
                type="submit"
                color="black"
                content="Save"
                backgroundcolor="#F5BD19"
              />
              <ButtonCustom
                type="button"
                onClick={() => {
                  window.history.back();
                }}
                color="black"
                content="Black"
                backgroundcolor="skyblue"
              />
            </Stack>
          </FormSubmit>
        </Box>
      </Paper>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          Thay đổi mật khẩu thành công
        </Alert>
      </Snackbar>
    </Grid>
  );
};

export default ChangePassword;
