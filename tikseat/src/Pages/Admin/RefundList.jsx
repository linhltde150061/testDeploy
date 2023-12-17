import React, { useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import PriceCheckIcon from "@mui/icons-material/PriceCheck";
import {
  CONTENT_CONFIRM_REFUND_USER,
  TITLE_CONFIRM_REFUND_USER,
  TITLE_REFUND,
  TOTAL_REFUND_AMOUNT,
  TOTAL_TRANSACTIONS,
} from "../../Assets/Constant/Admin/constAdmin";
import { CardTransactions, TableTransactions } from "./PurchaseList";
import { NAME_COLUMNS_REFUND } from "../../Assets/Constant/Admin/dataAdmin";
import ApiAdmin from "../../API/Admin/ApiAdmin";
import DialogComponent from "../../Components/Admin/Dialog/DialogDetail";
import TableList from "../../Components/Admin/Table/TableList";

function RefundList() {
  const [totalTransactions, setTotalTransactions] = useState();
  const [totalRefundAmount, setTotalRefundmount] = useState();
  const [dataTable, setDataTable] = useState();
  const [openComfirn, setOpenComfirn] = useState(false);
  const [selected_id, setSelected_id] = useState();

  const getAllIsRefund = async () => {
    try {
      const reponse = await ApiAdmin.getAllIsRefund();
      if (reponse.status === true) {
        setTotalTransactions(reponse.data.count);
        setTotalRefundmount(reponse.data.totalRefundAmount);
        setDataTable(reponse.data.refunds);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllIsRefund();
  }, []);

  const handleClickShowComfirn = async (_idRefund) => {
    const id = { _idRefund: _idRefund };
    console.log("_idRefund", _idRefund);
    setSelected_id(id);
    setOpenComfirn(true);
  };

  const handleConfrim = async () => {
    try {
      const respones = await ApiAdmin.refundMoney(selected_id);
      console.log("respones", respones);
      if (respones) {
        alert("oke");
        setOpenComfirn(false);
        getAllIsRefund();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const actionRefund = [
    {
      name: "IsCheck",
      icon: <PriceCheckIcon />,
      color: "primary",
      onClick: (row) => handleClickShowComfirn(row?._id),
    },
  ];

  return (
    <>
      <Box sx={{ display: "flex" }} />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}></Box>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
        }}>
        <Typography variant="h4" sx={{ fontSize: "2rem", fontWeight: "bold" }}>
          {TITLE_REFUND}
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
            nameSubtitle={TOTAL_REFUND_AMOUNT}
            total={totalRefundAmount}
          />
        </Grid>
      </Grid>
      <Box sx={{ marginTop: "10px" }}>
        <TableList
          dataTable={dataTable}
          nameColumns={NAME_COLUMNS_REFUND}
          actions={actionRefund}
          detailOpen={openComfirn}
          setDetailOpen={setOpenComfirn}
          isDetail={false}
          isClient={false}
          dialogTitle={TITLE_CONFIRM_REFUND_USER}
          dialogContent={CONTENT_CONFIRM_REFUND_USER}
          isConfirmEvent={false}
          onConfirm={handleConfrim}
        />
      </Box>
    </>
  );
}

export default RefundList;
