import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Grid } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Stack from "@mui/material/Stack";
import StorefrontIcon from "@mui/icons-material/Storefront";
import "../../Assets/CSS/Admin/PageAdmin.css";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import {
  TOTAL_ADMIN_EARNINGS,
  TOTAL_ADMIN_EAR_REFUND,
  TOTAL_AMOUNT_SOLD,
  TOTAL_MONEY_REFUND,
} from "../../Assets/Constant/Admin/constAdmin";
import ApiAdmin from "../../API/Admin/ApiAdmin";
import ChartBars from "../../Components/Admin/Chart/ChartBars";
import transitions from "@material-ui/core/styles/transitions";
import BoxLoading from "../../Components/Admin/BoxLoading";
import BasicPie from "../../Components/Admin/Chart/BasicPie";

function HomePageAdmin() {
  const [totalAmountSold, setTotalAmountSold] = useState(0);
  const [totalAdminEarnings, setTotalAdminEarnings] = useState(0);
  const [totalMoneyRefund, setTotalMoneyRefund] = useState(0);
  const [totalAdminEarRefund, setTotalAdminEarRefund] = useState(0);
  const [totalMoneyAdminHas, setTotalMoneyAdminHas] = useState(0);
  const [totalTransactions, setTotalTransactions] = useState();
  const [event_name, setEvent_name] = useState();

  const [loading, setLoading] = useState(true); // Add a loading state

  useEffect(() => {
    // Simulate a 10-second loading delay
    const delay = setTimeout(() => {
      setLoading(false);
    }, 3500);

    return () => clearTimeout(delay);
  }, []);

  const CardAmount = ({ icon, amount, nameAmount, className }) => {
    return (
      <Card sx={{ minWidth: 49 + "%", height: 150 }} className={className}>
        <CardContent>
          <div style={{ color: "aliceblue" }}>{icon}</div>
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            sx={{ color: "#ffffff" }}>
            {amount} VND
          </Typography>
          <Typography
            gutterBottom
            variant="body2"
            component="div"
            sx={{ color: "#ccd1d1" }}>
            {nameAmount}
          </Typography>
        </CardContent>
      </Card>
    );
  };

  const CardRefund = ({ icon, amount, nameAmount, className }) => {
    return (
      <Card sx={{ minWidth: 345 }} className={className}>
        <Stack spacing={2} direction="row">
          <div className="iconstyle">{icon}</div>
          <div className="paddingall">
            <span className="pricetitle">{amount} VND</span>
            <br />
            <span className="privesubtitle">{nameAmount}</span>
          </div>
        </Stack>
      </Card>
    );
  };

  const getAmoutAndEarings = async () => {
    try {
      const reponse = await ApiAdmin.getHomeAdmin();
      if (reponse) {
        setTotalAmountSold(reponse.data.totalAmountSold);
        setTotalMoneyRefund(reponse.data.formatMoneyRefund);
        setTotalAdminEarnings(reponse.data.totalAdminEarnings);
        setTotalAdminEarRefund(reponse.data.adminEarRefund);
        setTotalMoneyAdminHas(reponse.data.totalMoneyAdminHas);
        const dataChart = reponse.data.dataChart;
        const dataTotalTransactions = dataChart.map(
          (item) => item.totalTransactions
        );
        const dataEvent_name = dataChart.map((item) => item.event_name);
        setTotalTransactions(dataTotalTransactions);
        setEvent_name(dataEvent_name);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAmoutAndEarings();
  }, []);

  return (
    <>
      {loading ? (
        <BoxLoading />
      ) : (
        <div className="bgcolor">
          <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={8}>
                <Stack spacing={2} direction="row">
                  <CardAmount
                    icon={<CreditCardIcon />}
                    amount={totalAmountSold}
                    nameAmount={TOTAL_AMOUNT_SOLD}
                    className="gradient"
                  />
                  <CardAmount
                    icon={<CreditCardIcon />}
                    amount={totalMoneyRefund}
                    nameAmount={TOTAL_MONEY_REFUND}
                    className="gradientlight"
                  />
                </Stack>
              </Grid>
              <Grid item xs={4}>
                <Stack spacing={2}>
                  <CardRefund
                    icon={<StorefrontIcon />}
                    amount={totalAdminEarnings}
                    nameAmount={TOTAL_ADMIN_EARNINGS}
                    className="gradientlight"
                  />
                  <CardRefund
                    icon={<StorefrontIcon />}
                    amount={totalAdminEarRefund}
                    nameAmount={TOTAL_ADMIN_EAR_REFUND}
                  />
                </Stack>
              </Grid>
            </Grid>
            <Box height={50}></Box>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Card
                  sx={{
                    height: "56vh",
                  }}>
                  <Typography
                    variant="h6"
                    gutterBottom
                    sx={{ textAlign: "center", paddingTop: "10px" }}>
                    Top 5 highest rated events
                  </Typography>
                  <div
                    style={{
                      height: "46vh",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                    }}>
                    <CardContent>
                      <ChartBars
                        xLabels={event_name}
                        pData={totalTransactions}
                      />
                    </CardContent>
                  </div>
                </Card>
              </Grid>
              <Grid item xs={6}>
                <Card sx={{ height: "56vh" }}>
                  <Typography
                    variant="h6"
                    gutterBottom
                    sx={{ textAlign: "center", paddingTop: "10px" }}>
                    Statistics of trading transactions by daysss
                  </Typography>
                  <div
                    style={{
                      height: "46vh",
                      marginRight:"20%",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                    }}>
                    <CardContent>
                      <BasicPie
                        adminRevenue={totalMoneyAdminHas}
                        amountReceived={parseInt(
                          totalAmountSold.replace(/,/g, ""),
                          10
                        )}
                        amountRefund={parseInt(
                          totalMoneyRefund.replace(/,/g, ""),
                          10
                        )}
                      />
                    </CardContent>
                  </div>
                </Card>
              </Grid>
            </Grid>
          </Box>
        </div>
      )}
    </>
  );
}

export default HomePageAdmin;
