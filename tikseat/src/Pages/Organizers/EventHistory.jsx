import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import LeaderboardIcon from "@mui/icons-material/Leaderboard";
import RequestPageIcon from "@mui/icons-material/RequestPage";
import TablePagination from "@mui/material/TablePagination";
import EditIcon from "@mui/icons-material/Edit";
import ApiEvent from "../../API/Event/ApiEvent";
import {
  // getLocalStorageUserData,
  // setLocalStorageUserInfo,
  getLocalStorageUserInfo,
} from "../../Store/userStore";
import {
  Button,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Stack,
  DialogContentText,
} from "@mui/material";
import Rating from "@mui/material/Rating";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 18,
    height: "70px",
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
    height: "40px",
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export const ButtonAction = ({
  nameButton,
  icon,
  handleClick,
  row,
  nameHandle,
  isRequestPayment,
}) => {
  return (
    <Button
      disabled={isRequestPayment ? true : false}
      style={{
        border: "solid 1px",
        width: "90%",
        height: "100%",
      }}
      onClick={
        nameButton == "Request payment"
          ? () => handleClick(row)
          : () => handleClick(row, nameHandle)
      }>
      <span
        style={{
          fontSize: "16px",
          marginRight: "5px",
          paddingTop: "8px",
        }}>
        {nameButton}
      </span>
      {icon}
    </Button>
  );
};

export const DialogRequest = ({
  open,
  handleCloseDialog,
  handleConfirm,
  dataDialog,
}) => {
  return (
    <Dialog
      open={open}
      onClose={handleCloseDialog}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description">
      <DialogTitle id="alert-dialog-title">
        Request payment to the organization?
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Event {dataDialog?.nameEvent} has ended. The total ticket sales amount
          of the event is {dataDialog?.totalActual?.toLocaleString()} VND and the
          total ticket refund amount is xxx VND.
        </DialogContentText>
        <DialogContentText id="alert-dialog-description">
          Admin will receive 1% of {dataDialog?.totalActual?.toLocaleString()}{" "}
          VNĐ equals {dataDialog?.totalEventAmount?.toLocaleString()} VNĐ and 15%
          of {dataDialog?.totalRefundAmount?.toLocaleString()} VNĐ equals{" "}
          {dataDialog?.adminEarRefund?.toLocaleString()} VNĐ.
        </DialogContentText>
        <DialogContentText id="alert-dialog-description">
          You will receive a total amount of{" "}
          {dataDialog?.totalTicketAmountReceived?.toLocaleString()} VND
        </DialogContentText>
        <DialogContentText id="alert-dialog-description">
          We will transfer the money to you within 1 to 3 days
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCloseDialog} color="primary">
          Cancel
        </Button>
        <Button onClick={handleConfirm} color="primary" autoFocus>
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
};

function EventHistory({ onEventDetail }) {
  const dataInfo = getLocalStorageUserInfo();
  const [eventHistory, setEventHistory] = useState([]);
  const [page, setPage] = useState(0);
  const [totalPage, setTotalPage] = useState(null);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [open, setOpen] = useState(false);
  const [requestCreate, setRequestCreate] = useState();
  const [dataDialog, setDataDialog] = useState();

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(event.target.value);
    setPage(0);
  };

  useEffect(() => {
    const dataEventHistory = async () => {
      try {
        const response = await ApiEvent.eventHistory({
          _idOrganizer: dataInfo._id,
          page: page,
        });
        if (response.status === true) {
          setEventHistory(response.data);
          setTotalPage(response.totalPages);
        } else {
          console.log("error!");
        }
      } catch (error) {
        console.log(error);
      }
    };

    dataEventHistory();
  }, [page]);

  const handleChange = (event, value) => {
    setPage(value);
  };

  const handleEventDetail = (row, actionType) => {
    setSelectedEvent(row);
    onEventDetail(row, actionType);
  };

  const handleRequestPayment = (row) => {
    console.log("row", row);
    const organizers_id = dataInfo._id;
    const totalEventAmount = row.totalActual * 0.01;
    const totalTicketAmountReceived =
      row.totalActual -
      totalEventAmount +
      (row.totalRefundAmount - row.adminEarRefund);
    const payBusiness = {
      event_id: row._idEvent,
      event_name: row.eventName,
      isRequest: true,
    };

    const request = {
      organizers_id: organizers_id,
      payBusiness: payBusiness,
      totalEventAmount: totalTicketAmountReceived,
    };
    const dataOfDialog = {
      eventName: row.eventName,
      totalActual: row.totalActual,
      totalRefundAmount: row.totalRefundAmount,
      adminEarRefund: row.adminEarRefund,
      totalEventAmount: totalEventAmount,
      totalTicketAmountReceived: totalTicketAmountReceived,
    };
    console.log("request", request);
    console.log("dataDialog", dataOfDialog);
    setDataDialog(dataOfDialog);
    setRequestCreate(request);
    setOpen(true);
  };

  const handleCloseDialog = () => {
    setOpen(false);
  };

  const handleConfirm = () => {
    console.log("requestCreate", requestCreate);
    const reponse = ApiEvent.createPayBusinessOfEvent(requestCreate);
    if (reponse) {
      console.log("reponse", reponse);
      setOpen(false);
    }
  };

  return (
    <>
      <TableContainer
        sx={{
          height: "88.5vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
        component={Paper}>
        <Table
          sx={{ borderBottom: "1px solid #ccc" }}
          aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Name event</StyledTableCell>
              <StyledTableCell>TotalRating</StyledTableCell>
              <StyledTableCell align="center">Start Day&nbsp;</StyledTableCell>
              <StyledTableCell align="center">
                Total Estimated (VNĐ)&nbsp;
              </StyledTableCell>
              <StyledTableCell align="center">
                Total Actual (VNĐ)&nbsp;
              </StyledTableCell>
              <StyledTableCell align="center">
                Total ticket refund (VNĐ)&nbsp;
              </StyledTableCell>
              <StyledTableCell align="center">
                Event Status&nbsp;
              </StyledTableCell>
              <StyledTableCell align="center">isActive&nbsp;</StyledTableCell>
              <StyledTableCell align="center">
                Detail Statistics
              </StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {eventHistory
              ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              ?.map((row, index) => (
                <StyledTableRow key={index}>
                  <StyledTableCell component="th" scope="row">
                    {row.eventName}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    <Rating
                      name="customized-empty"
                      value={row.totalRating}
                      precision={0.5}
                      readOnly
                    />
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {new Date(row.startDay)?.toLocaleString()}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {row.totalEstimated?.toLocaleString()}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {row.totalActual?.toLocaleString()}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {row.totalRefundAmount?.toLocaleString()}
                  </StyledTableCell>

                  <StyledTableCell align="center">
                    <Grid
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        width: "100%",
                        height: "100%",
                        fontSize: "15px",
                      }}>
                      <Grid
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          height: "100%",
                          width: "100%",
                          margin: "0px 10% 0px 10%",
                          fontWeight: "500",
                          backgroundColor:
                            row.eventStatus === "UPCOMING"
                              ? "#A0E9FF"
                              : row.eventStatus === "FINISHED"
                              ? "#E49393"
                              : "#FFFD8C",
                        }}>
                        {row.eventStatus}
                      </Grid>
                    </Grid>
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    <Grid
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        height: "100%",
                        fontWeight: "500",
                        width: "100%",
                        backgroundColor: row.isActive ? "#A0E9FF" : "#E49393",
                      }}>
                      {row.isActive ? "approved" : "waiting"}
                    </Grid>
                  </StyledTableCell>
                  <StyledTableCell
                    align="center"
                    sx={{
                      width:"350px",
                      display: "flex",
                      justifyContent: "space-around",
                      padding: "12px 0px",
                    }}>
                    <Grid sx={{ width: "48%" }}>
                      <ButtonAction
                        nameButton="Statistics"
                        icon={<LeaderboardIcon />}
                        row={row}
                        handleClick={handleEventDetail}
                        nameHandle="statistics"
                      />
                    </Grid>
                    <Grid sx={{ width: "48%" }}>
                      {row.eventStatus == "FINISHED" ? (
                        <ButtonAction
                          nameButton="Request payment"
                          icon={<RequestPageIcon />}
                          handleClick={handleRequestPayment}
                          row={row}
                          isRequestPayment={row.isRequestPayment}
                        />
                      ) : (
                        <ButtonAction
                          nameButton="Update"
                          icon={<EditIcon />}
                          row={row}
                          handleClick={handleEventDetail}
                          nameHandle="update"
                        />
                      )}
                    </Grid>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
          </TableBody>
        </Table>
        <Grid
          style={{
            display: "flex",
            justifyContent: "center",
            padding: "11px",
            backgroundColor: "#ffffff",
            borderTop: "1px solid #ccc",
            position: "flxed",
            bottom: "11px",
            width: "100%",
          }}>
          <Stack spacing={2}>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              colSpan={3}
              component="div"
              count={totalPage}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Stack>
        </Grid>
        <DialogRequest
          open={open}
          handleCloseDialog={handleCloseDialog}
          handleConfirm={handleConfirm}
          dataDialog={dataDialog}
        />
      </TableContainer>
    </>
  );
}

export default EventHistory;
