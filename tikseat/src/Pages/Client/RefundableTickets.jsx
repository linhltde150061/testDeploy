/* eslint-disable jsx-a11y/img-redundant-alt */
import {
  Box,
  Button,
  Chip,
  Collapse,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import ApiClient from "../../API/Client/ApiClient";
import { getLocalStorageUserInfo } from "../../Store/userStore";

const RefundableTickets = () => {
  const dataInfo = getLocalStorageUserInfo();
  const [dataMyTicket, setDataMyTicket] = useState([]);
  useEffect(() => {
    async function getDataOrderByClient() {
      const response = await ApiClient.getOrdersRefundTicket({
        _idClient: dataInfo?._id,
      });
      setDataMyTicket(response?.data);
    }

    getDataOrderByClient();
  }, [dataInfo._id]);

  const mappingDataMyTicket =
    dataMyTicket?.length > 0 &&
    dataMyTicket.map((item) => {
      return {
        eventId: item.event_id,
        eventName: item?.event_name,
        eventDate: item?.event_date,
        city: item.event_location,
        _idOrderDetail: item._idOrderDetail,
        zp_trans_id: item.zp_trans_id,
        event_location: item.event_location,
      };
    });
  function Row(props) {
    const { row } = props;
    const [open, setOpen] = React.useState(false);
    const [dataMyTicket, setDataMyTicket] = useState([]);
    useEffect(() => {
      if (open) {
        async function getMyTicket() {
          const res = await ApiClient.getMyTicket({
            _idOrderDetail: row._idOrderDetail,
          });
          console.log("res", res.data);
          setDataMyTicket(res?.data[0]?.Orders[0]?.tickets);
        }
        getMyTicket();
      }
    }, [row._idOrderDetail, open]);
    console.log("dataMyTicket", dataMyTicket);
    return (
      <React.Fragment>
        <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
          <TableCell component="th" scope="row">
            {row?.eventName}
          </TableCell>
          <TableCell align="left">{row.eventDate}</TableCell>
          <TableCell align="left">{row.city}</TableCell>
          <TableCell>
            <Stack direction={"row"} gap={"10px"}>
              <Button
                variant="outlined"
                size="large"
                onClick={() => {
                  setOpen(!open);
                }}>
                {open ? "collapse" : "Show more"}
              </Button>{" "}
            </Stack>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell style={{ paddingBottom: 0, padding: 0 }} colSpan={6}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Box sx={{ margin: 0 }}>
                <Table size="small" aria-label="purchases">
                  <TableHead>
                    <TableRow>
                      <TableCell width={"5%"} />
                      <TableCell width={"25%"} />
                      <TableCell width={"20%"} />
                      <TableCell width={"20%"} />
                      <TableCell width={"20%"}></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {dataMyTicket?.length > 0 &&
                      dataMyTicket?.map((ViewDetailRow, index) => {
                        if (!ViewDetailRow?.isRefund) {
                          return null;
                        }
                        return (
                          <TableRow checkboxSelection key={ViewDetailRow._id}>
                            <TableCell component="th" scope="row">
                              {index + 1}
                            </TableCell>
                            <TableCell>
                              Class ticket: {ViewDetailRow.classTicket}
                            </TableCell>
                            <TableCell align="left">
                              Chair: {ViewDetailRow.chairName}
                            </TableCell>
                            <TableCell align="left">
                              Price: {ViewDetailRow.ticket_price}
                            </TableCell>
                            <TableCell
                              align="left"
                              style={{ cursor: "pointer" }}>
                              <Chip
                                label={
                                  ViewDetailRow.refunded
                                    ? "Refunded"
                                    : "No refund yet"
                                }
                              />
                            </TableCell>
                          </TableRow>
                        );
                      })}
                  </TableBody>
                </Table>
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
      </React.Fragment>
    );
  }
  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell>Event Name</TableCell>
            <TableCell align="left">Event Date</TableCell>
            <TableCell align="left">City</TableCell>
            <TableCell />
          </TableRow>
        </TableHead>
        <TableBody>
          {mappingDataMyTicket?.length > 0 &&
            mappingDataMyTicket.map((row, index) => (
              <Row key={index} row={row} />
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default RefundableTickets;
