import {
  Box,
  Button,
  Modal,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  tableCellClasses,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { getLocalStorageUserInfo } from "../../Store/userStore";
import styled from "styled-components";
import ApiClient from "../../API/Client/ApiClient";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "black",
    color: "white",
    fontWeight: "bold",
    fontSize: "16px",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: "18px",
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: "#ededed",
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 700,
  bgcolor: "#ededed",
  boxShadow: 24,
  borderRadius: "10px",
  p: 4,
};
const HistoryPayment = () => {
  const dataInfo = getLocalStorageUserInfo();
  const [dataOrderByClient, setDataOrderByClient] = useState([]);
  const [idOrder, setIdOrder] = useState(null);
  const [dataOrderDetail, setDataOrderDetail] = useState([]);
  console.log("dataOrderByClient: ", dataOrderByClient);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    async function getDataOrderByClient() {
      const response = await ApiClient.orderByClient({
        _idClient: dataInfo?._id,
      });
      setDataOrderByClient(response?.data);
    }

    getDataOrderByClient();
  }, [dataInfo._id]);

  return (
    <div>
      <Box width={"100%"} display={"flex"} marginTop={"20px"}>
        <Stack direction={"column"} margin={"0 auto"}>
          <Typography variant="h2" textAlign={"center"}>
            Transaction history
          </Typography>
          <TableContainer component={Paper} style={{ marginTop: "50px" }}>
            <Table
              sx={{ minWidth: 1050 }}
              size="medium"
              aria-label="a dense table">
              <TableHead>
                <TableRow>
                  <StyledTableCell size="medium" align="center" colSpan={4}>
                    Transaction list
                  </StyledTableCell>
                </TableRow>
                <TableRow>
                  <StyledTableCell align="left">Event Name</StyledTableCell>

                  <StyledTableCell align="left">
                    Transaction date
                  </StyledTableCell>

                  <StyledTableCell align="left">Price</StyledTableCell>

                  <StyledTableCell align="left">Action</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {dataOrderByClient?.length > 0 &&
                  dataOrderByClient.map((row) => (
                    <StyledTableRow key={row._id}>
                      <TableCell component="th" scope="row">
                        {row.event_name}
                      </TableCell>
                      <TableCell align="left">{row.transaction}</TableCell>
                      <TableCell align="left">{row.totalAmount}</TableCell>
                      <TableCell align="left">
                        <Button
                          onClick={() => {
                            handleOpen();
                            setIdOrder(row);
                          }}
                          size="large"
                          variant="contained">
                          Detail
                        </Button>
                        <Modal open={open} onClose={handleClose}>
                          <Box sx={style}>
                            <TableContainer component={Paper}>
                              <Table size="medium" aria-label="a dense table">
                                <TableHead>
                                  <TableRow>
                                    <TableCell
                                      style={{
                                        fontSize: "16px",
                                        fontWeight: "bold",
                                      }}
                                      size="medium"
                                      align="center"
                                      colSpan={2}>
                                      View detail history payment
                                    </TableCell>
                                  </TableRow>
                                </TableHead>
                                <TableBody>
                                  <TableRow>
                                    <TableCell>Event name</TableCell>
                                    <TableCell>{idOrder?.event_name}</TableCell>
                                  </TableRow>
                                  <TableRow>
                                    <TableCell>Event date</TableCell>
                                    <TableCell>
                                      {new Date(
                                        idOrder?.event_date
                                      ).toLocaleString()}
                                    </TableCell>
                                  </TableRow>
                                  <TableRow>
                                    <TableCell>Class ticket</TableCell>
                                    <TableCell>
                                      {idOrder?.classTicket}
                                    </TableCell>
                                  </TableRow>
                                  <TableCell>Chair name</TableCell>
                                  <TableCell>
                                    {String(idOrder?.chair_name)}
                                  </TableCell>
                                  <TableRow>
                                    <TableCell>Total price</TableCell>
                                    <TableCell>
                                      {new Intl.NumberFormat("en-VN", {
                                        style: "currency",
                                        currency: "VND",
                                      }).format(idOrder?.totalAmount)}
                                    </TableCell>
                                  </TableRow>
                                  <TableRow>
                                    <TableCell>Transaction date</TableCell>
                                    <TableCell>
                                      {new Date(
                                        idOrder?.transaction
                                      ).toLocaleString()}
                                    </TableCell>
                                  </TableRow>
                                </TableBody>
                              </Table>
                            </TableContainer>
                          </Box>
                        </Modal>
                      </TableCell>
                    </StyledTableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Stack>
      </Box>
    </div>
  );
};

export default HistoryPayment;
