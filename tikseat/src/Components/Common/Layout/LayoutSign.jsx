import { Grid, Typography, Paper } from "@mui/material";
import { Outlet, Link } from "react-router-dom";
import styled from "styled-components";
import { NAME_LOGO } from "../../../Assets/Constant/Common/constCommon";
import SwiperLogin from "../../../Components/Common/SwiperLogin";
import "../../../Assets/CSS/Common/LayoutSign.css";

const GridStyleLayout = styled(Grid)`
  height: 100vh;
  // overflow: hidden;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LayoutSign = ({ direction = "row", itemLeft, itemRight }) => {
  return (
    <>
      <GridStyleLayout container className="login">
        <Paper
          className="loginGrid"
          style={{
            boxShadow: "rgb(223 193 34 / 51%) 0px 1px 15px 15px",
          }}>
          <Grid item md={itemLeft} className="left">
            <Link to={"/#"} style={{ textDecoration: "none" }}>
              <Typography variant="h3" className="logo" component="h4">
                {NAME_LOGO}
              </Typography>
            </Link>
            <Outlet />
          </Grid>

          <Grid item md={itemRight} className="right">
            <SwiperLogin />
          </Grid>
        </Paper>
      </GridStyleLayout>
    </>
  );
};

export default LayoutSign;
