import React from "react";
import { Button, Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";
import CheckIcon from "@mui/icons-material/Check";
import ErrorImg from "../../Assets/Images/error.jpg";

function SuccessPage() {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate("/dashboard");
  };

  return (
    <>
      <Grid
        sx={{
          height: "100vh",
          width: "100wh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Grid
          sx={{
            borderTop: "solid 10px #03a973",
            boxShadow: "0px 10px 10px 5px #ccc",
            height: "80%",
            width: "80%",
            padding: "100px",
            display: "flex",
            justifyContent: "space-between",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Grid
            sx={{
              border: "solid #03a973 5px",
              borderRadius: "50%",
              width: "250px",
              height: "250px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <CheckIcon sx={{ fontSize: "200px", color: "#03a973" }} />
          </Grid>
          <Grid
            sx={{
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <h1 style={{ color: "#03a973" }}>Success !</h1>
            <h2>Please wait for Admin approval!</h2>
          </Grid>
          <Button
            sx={{
              height: "50px",
              width: "25%",
              color: "#03a973",
              border: "solid 3px #03a973",
            }}
            onClick={handleBack}
          >
            Back Dashboard
          </Button>
        </Grid>
      </Grid>
    </>
  );
}

export default SuccessPage;
