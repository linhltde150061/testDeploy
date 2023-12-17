import React, { useEffect } from "react";
import { Box } from "@mui/material";
import Footer from "../../Components/Common/Footer/Footer";
import Header from "../../Components/Common/Header/Header";
import UpcomingEvents from "../../Components/Common/HomePage/UpcomingEvents";
import { checkToken } from "../Admin/Adminpage";
import { useNavigate } from "react-router-dom";
import { useOpenStore } from "../../Store/openStore";

function HomePage() {
  const navigate = useNavigate();
  const { setEventId } = useOpenStore();
  useEffect(() => {
    setEventId(null);
    checkToken(navigate);
  }, []);
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Header></Header>
      <UpcomingEvents></UpcomingEvents>
      <Footer></Footer>
    </Box>
  );
}

export default HomePage;
