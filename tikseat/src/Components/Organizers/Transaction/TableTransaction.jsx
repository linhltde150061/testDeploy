import React from "react";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import {
  StyledTableCell,
  StyledTableRow,
} from "../../../Pages/Organizers/Transactions";
import Paper from "@mui/material/Paper";
import { Button, Chip, TablePagination, TableRow } from "@mui/material";

function TableTransaction({ dataTable, page, count, handleChangePage }) {
  return (
    <TableContainer component={Paper} sx={{ borderRadius: "20px" }}>
      <Table sx={{ mixWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell align="left">Event Name</StyledTableCell>
            <StyledTableCell align="left">Request date</StyledTableCell>
            <StyledTableCell align="left">Payment amount</StyledTableCell>
            <StyledTableCell align="left">Status pay</StyledTableCell>
            <StyledTableCell align="left">Status request</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {dataTable?.map((row) => (
            <StyledTableRow key={row?._id}>
              <StyledTableCell component="th" scope="row">
                <StyledTableCell align="left">
                  {row?.event_name}
                </StyledTableCell>
              </StyledTableCell>
              <StyledTableCell align="left">
                {new Date(row.paymentDate)?.toLocaleString()}
              </StyledTableCell>
              <StyledTableCell align="left">
                {row?.totalEventAmount.toLocaleString()} VND
              </StyledTableCell>
              <StyledTableCell align="left">
                <Chip label={row?.isPay ? "Paid" : "Unpaid"} />
              </StyledTableCell>
              <StyledTableCell align="left">
                <Chip
                  label={row?.isRequest ? "Requested" : "Not requested yet"}
                />
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
      <TablePagination
        rowsPerPageOptions={[5]}
        colSpan={3}
        component="div"
        count={count}
        rowsPerPage={5}
        page={page}
        onPageChange={handleChangePage}
      />
    </TableContainer>
  );
}

export default TableTransaction;
