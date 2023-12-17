import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Button, Grid, IconButton, TextField } from "@mui/material";
import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { toastOptions } from "../../Assets/Constant/Common/dataCommon";
import "react-toastify/dist/ReactToastify.css";
import FormSubmit from "../../Components/Common/FormCustom/FormSubmit";
import {
    getLocalStorageUserData,
    setLocalStorageUserInfo,
    getLocalStorageUserInfo,
  } from "../../Store/userStore";
import { useNavigate } from "react-router-dom";
import ApiCommon from "../../API/Common/ApiCommon";

function ChangePassword() {
  const [showOldPass, setShowOldPass] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [showRePass, setShowRePass] = useState(false);
  const [currentPassword, setCurrentPassword] = useState(null);
  const [newPassword, setNewPassword] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState(null);

  const dataUser = getLocalStorageUserData();
  // const dataInfo = getLocalStorageUserInfo();
  const navigate = useNavigate();
  const email = dataUser.email;

  const handleChangePassword = async (e) => {
    e.preventDefault();

    try {
        const response = await ApiCommon.changePassword({
            email: email,
            oldPassword: currentPassword,
            newPassword: newPassword,
        })
        if (response.status === true) {
          toast.success("Update password success!", toastOptions);
          window.localStorage.clear();
            navigate("/login");

        } else {
            console.log("error");
        }
    } catch (error) {
        toast.error("Curent password incorrect! ", toastOptions);
        console.log(error);
    }
  }

  return (
    <>
      <Grid
        style={{
          backgroundColor: "#ffffff",
          borderRadius: "10px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Grid
          style={{
            display: "flex",
            justifyContent: "center",
            paddingTop: "30px",
          }}
        >
          <h1>Change My Password</h1>
        </Grid>
        <Grid sx={{ width: "40%" }}>
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
            <Grid>
              <TextField
                fullWidth
                type={showOldPass ? "text" : "password"}
                onChange={(e) => setCurrentPassword(e.target.value)}
                value={currentPassword === undefined ? "" : currentPassword}
                label="Curent Password"
              />
              <IconButton
                sx={{
                  float: "right",
                  marginTop: "-48px",
                  marginRight: "2px",
                }}
                aria-label="toggle password visibility"
                onClick={() => setShowOldPass(!showOldPass)}
                edge="end"
              >
                {showOldPass ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </Grid>
            {/* <span style={{color:"red", marginBottom: "30px", fontSize:"12px"}}>Password includes 8-12 characters including letters, numbers and special characters (@,#,$,^, ....)</span> */}
            <Grid sx={{ marginTop: "30px" }}>
              <TextField
                fullWidth
                type={showPass ? "text" : "password"}
                onChange={(e) => setNewPassword(e.target.value)}
                value={newPassword === undefined ? "" : newPassword}
                label="NewPassword"
              />
              <IconButton
                sx={{
                  float: "right",
                  marginTop: "-48px",
                  marginRight: "2px",
                }}
                aria-label="toggle password visibility"
                onClick={() => setShowPass(!showPass)}
                edge="end"
              >
                {showPass ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </Grid>
            {/* <span style={{color:"red", marginBottom: "30px", fontSize:"12px"}}>Password includes 8-12 characters including letters, numbers and special characters (@,#,$,^, ....)</span> */}
            <Grid sx={{ marginTop:"30px" }}>
              <TextField
                fullWidth
                type={showRePass ? "text" : "password"}
                onChange={(e) => setConfirmPassword(e.target.value)}
                value={confirmPassword === undefined ? "" : confirmPassword}
                label="Re-enter password"
              />
              <IconButton
                sx={{
                  float: "right",
                  marginTop: "-48px",
                  marginRight: "2px",
                }}
                aria-label="toggle password visibility"
                onClick={() => setShowRePass(!showRePass)}
                edge="end"
              >
                {showRePass ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </Grid>
            {/* <span style={{color:"red", marginBottom: "30px", fontSize:"12px"}}>Password not match</span> */}
            <Grid>
              <Button
                style={{
                  marginTop:"30px",
                  padding: "10px",
                  color: "black",
                  fontWeight: "bold",
                  fontSize: "18px",
                  backgroundColor: "rgb(245, 189, 25)",
                  marginBottom: "30px",
                }}
                type="submit"
                fullWidth
              >
                {/* {callAPI} */}
                Change My Password
              </Button>
            </Grid>
            <ToastContainer />
          </FormSubmit>
        </Grid>
      </Grid>
    </>
  );
}

export default ChangePassword;
