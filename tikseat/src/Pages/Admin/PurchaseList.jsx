import {
  Box,
  Divider,
  TableCell,
  TableContainer,
  Typography,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@material-ui/core";
import Grid from "@mui/material/Grid";
import ApiAdmin from "../../API/Admin/ApiAdmin";
import {
  EVENT,
  TITLE_TRANSACTIONS,
  TOTAL_TRANSACTIONS,
  TOTAL_TRANSACTION_AMOUNT,
} from "../../Assets/Constant/Admin/constAdmin";
import { NAME_COLUMNS_ORDER } from "../../Assets/Constant/Admin/dataAdmin";
import TableList from "../../Components/Admin/Table/TableList";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";

export const CardTransactions = ({ nameSubtitle, total, height }) => {
  return (
    <Card style={{ height: height }}>
      <CardContent>
        <Typography variant="subtitle1">{nameSubtitle}</Typography>
        <Typography variant="h5">{total}</Typography>
      </CardContent>
    </Card>
  );
};

export default function PurchaseList() {
  const [totalTransactions, setTotalTransactions] = useState();
  const [totalTransactionAmount, setTotalTransactionAmount] = useState();
  const [dataTable, setDataTable] = useState();
  const [eventInformation, setEventInformation] = useState();
  const [purchaseDetailOpen, setPurchaseDetailOpen] = useState(false);
  const [eventsWithOrdersCount, setEventsWithOrdersCount] = useState();
  const [page, setPage] = useState(0);

  const getAllOder = async () => {
    try {
      const reponse = await ApiAdmin.getAllOrders();
      if (reponse.status === true) {
        setTotalTransactions(reponse.data.count);
        setTotalTransactionAmount(reponse.data.totalTransactionAmount);
        setDataTable(reponse.data.orders);
        setEventsWithOrdersCount(reponse.data.eventsWithOrdersCount);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllOder();
  }, []);

  const handleDetailClick = async (_idOrder) => {
    try {
      const id = { _idOrder: _idOrder };
      const respones = await ApiAdmin.getAllOrderOfEvent(id);
      console.log("respones", respones);
      if (respones) {
        setEventInformation(respones.data);
        setPurchaseDetailOpen(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleChangePage = async (event, newPage) => {
    try {
      const pageRequest = { page: newPage + 1 };
      console.log("object1: ", pageRequest);
      const respones = await ApiAdmin.getAllOrders(pageRequest);
      if (respones) {
        setPage(newPage);
        setTotalTransactions(respones.data.count);
        setTotalTransactionAmount(respones.data.totalTransactionAmount);
        setDataTable(respones.data.orders);
        setEventsWithOrdersCount(respones.data.eventsWithOrdersCount);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const actionPurchase = [
    {
      name: "IsActive",
      icon: <RemoveRedEyeIcon />,
      color: "primary",
      onClick: (row) => handleDetailClick(row?._id),
    },
  ];

  return (
    <>
      <Box sx={{ display: "flex" }}>
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
            }}>
            <Typography
              variant="h4"
              sx={{ fontSize: "2rem", fontWeight: "bold" }}>
              {TITLE_TRANSACTIONS}
            </Typography>
          </div>
          <Grid container spacing={2} sx={{ marginBottom: "15px" }}>
            <Grid item xs={6}>
              <CardTransactions
                nameSubtitle={TOTAL_TRANSACTIONS}
                total={totalTransactions}
              />
            </Grid>
            <Grid item xs={6}>
              <CardTransactions
                nameSubtitle={TOTAL_TRANSACTION_AMOUNT}
                total={totalTransactionAmount}
              />
            </Grid>
          </Grid>
          <TableList
            dataTable={dataTable}
            nameColumns={NAME_COLUMNS_ORDER}
            actions={actionPurchase}
            isDetail={true}
            isClient={false}
            detailOpen={purchaseDetailOpen}
            setDetailOpen={setPurchaseDetailOpen}
            nameTitle={EVENT}
            isOrder={true}
            selectedUser={eventInformation}
            count={eventsWithOrdersCount}
            page={page}
            handleChangePage={handleChangePage}
          />
        </Box>
      </Box>
    </>
  );
}
