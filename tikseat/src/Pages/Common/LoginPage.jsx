import React, { useEffect, useState } from "react";
import { Grid, Paper, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import {
  LOGIN,
  NAME_LOGO,
  TITLE_LOGIN,
} from "../../Assets/Constant/Common/constCommon";
import FormLogin from "../../Components/Common/FormCustom/FormLogin";
import SwiperLogin from "../../Components/Common/SwiperLogin";
import "../../Assets/CSS/Common/LayoutSign.css";
import ApiEvent from "../../API/Event/ApiEvent";

function LoginPage() {
  const [showPassword, setShowPassword] = React.useState(false);
  const [dataImage, setDataImage] = useState();
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  async function getThreeImaged() {
    try {
      const reponse = await ApiEvent.getLatestHotEventImages();
      console.log(reponse);
      if (reponse) {
        setDataImage(reponse);
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getThreeImaged();
  }, []);

  return (
    <>
      <Grid className="login">
        <Paper
          className="loginGrid"
          style={{
            boxShadow: "rgb(223 193 34 / 51%) 0px 1px 15px 15px",
          }}>
          <Grid className="left">
            <Link to={"/#"} style={{ textDecoration: "none" }}>
              <Typography variant="h3" className="logo" component="h4">
                {NAME_LOGO}
              </Typography>
            </Link>
            <Grid fullWidth style={{ marginTop: "20px" }}>
              <p style={{ textAlign: "start" }}>{TITLE_LOGIN}</p>
            </Grid>
            <Grid style={{ marginTop: "20px" }}>
              <h2 style={{ textAlign: "start", fontFamily: "Bree Serif" }}>
                {LOGIN}
              </h2>
            </Grid>
            <FormLogin
              showPassword={showPassword}
              handleClickShowPassword={handleClickShowPassword}
              handleMouseDownPassword={handleMouseDownPassword}
            />
          </Grid>
          <Grid className="right">
            <SwiperLogin dataImage={dataImage} />
          </Grid>
        </Paper>
      </Grid>
    </>
  );
}

export default LoginPage;
