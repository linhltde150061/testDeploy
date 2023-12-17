import { Box, Chip, Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { CardTransactions } from "./PurchaseList";
import TableList from "../../Components/Admin/Table/TableList";
import { NAME_COLUMNS_PAY_BUSINESS } from "../../Assets/Constant/Admin/dataAdmin";
import ApiAdmin from "../../API/Admin/ApiAdmin";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import {
  CONTENT_CONFIRM_PAYBUSINESS,
  TITLE_CONFIRM_PAYBUSINESS,
} from "../../Assets/Constant/Admin/constAdmin";

function PayBusiness() {
  const [dataTable, setDataTable] = useState();
  const [page, setPage] = useState(0);
  const [payBussinessCount, setPayBussinessCount] = useState();
  const [openComfirn, setOpenComfirn] = useState(false);
  const [selected_id, setSelected_id] = useState();
  const [amountPaidOrganization, setAmountPaidOrganization] = useState();
  const [amountRequestOrganizations, setAmountRequestOrganizations] =
    useState();

  const getAllPayBusiness = async () => {
    const reponse = await ApiAdmin.getPayBusinessWithRequest({ page: 1 });
    if (reponse) {
      setDataTable(reponse.data.paginatedPayBusiness);
      setPayBussinessCount(reponse.data.totalItems);
      setAmountPaidOrganization(reponse.data.amountPaidOrganization);
      setAmountRequestOrganizations(reponse.data.amountRequestOrganizations);
    }
  };
  useEffect(() => {
    getAllPayBusiness();
  }, []);

  const handleComfirmIsPay = async (_idPayment) => {
    const id = { paymentId: _idPayment };
    setSelected_id(id);
    setOpenComfirn(true);
  };

  const handleClickComfirn = async () => {
    try {
      console.log("selected_id", selected_id);
      const respones = await ApiAdmin.setIsPayForOrganizers(selected_id);
      if (respones) {
        setOpenComfirn(false);
        getAllPayBusiness();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const cellComponentsPayBusiness = {
    isPay: (isPay) => (
      <Chip
        label={isPay ? "Paid" : "Unpaid"}
        color={isPay ? "success" : "error"}
      />
    ),
  };

  const actionPayBusiness = [
    {
      name: "IsPay",
      icon: <CheckCircleIcon />,
      color: "primary",
      onClick: (row) => handleComfirmIsPay(row?._id),
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
              List of paid events for businesses
            </Typography>
          </div>
          <Grid container spacing={2} sx={{ marginBottom: "15px" }}>
            <Grid item xs={4}>
              <CardTransactions
                nameSubtitle="Total number of end events"
                total={payBussinessCount}
                height="130px"
              />
            </Grid>
            <Grid item xs={4}>
              <CardTransactions
                nameSubtitle="The amount of money the organizations have requested (VND)"
                total={amountRequestOrganizations?.toLocaleString()}
                height="130px"
              />
            </Grid>
            <Grid item xs={4}>
              <CardTransactions
                nameSubtitle="The amount paid to the organizer (VND)"
                total={amountPaidOrganization?.toLocaleString()}
                height="130px"
              />
            </Grid>
          </Grid>
          <Box sx={{ marginTop: "10px" }}>
            <TableList
              nameColumns={NAME_COLUMNS_PAY_BUSINESS}
              dataTable={dataTable}
              page={page}
              count={payBussinessCount}
              cellComponents={cellComponentsPayBusiness}
              actions={actionPayBusiness}
              setDetailOpen={setOpenComfirn}
              detailOpen={openComfirn}
              isClient={false}
              isDetail={false}
              dialogTitle={TITLE_CONFIRM_PAYBUSINESS}
              dialogContent={CONTENT_CONFIRM_PAYBUSINESS}
              onConfirm={handleClickComfirn}
            />
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default PayBusiness;
