import React from "react";
import { Button, Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ErrorImg from "../../Assets/Images/error.jpg";


function ErrorPage() {
    const navigate = useNavigate();

  const handleBack = () => {
    navigate("/");
  };
  return (
    <>
      <Grid
        sx={{
          backgroundImage: `url(${ErrorImg})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          height: "100vh",
          width: "100wh",
          display: "flex",
          flexDirection:"column",
          justifyContent: "space-around",
          alignItems: "center",
        }}
      >
        <Grid sx={{fontSize:"20px"}}>
            <h1>THE PAGE YOU ARE LOOKING FOR DO NOT EXIST</h1>
        </Grid>
        <Button
          sx={{
            fontWeight:"900",
            fontSize:"20px",
            top:"80px",
            bgcolor:"#ff4769",
            height: "70px",
            width: "20%",
            color: "white",
          }}
          onClick={handleBack}
        >
          Back to HOME
        </Button>
      </Grid>
    </>
  );
}

export default ErrorPage;
