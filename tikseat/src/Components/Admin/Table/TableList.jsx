import React, { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { Divider, IconButton } from "@mui/material";
import DialogComponent, {
  StyledAvatar,
  StyledChip,
} from "../Dialog/DialogDetail";
import BoxLoading from "../BoxLoading";

export const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

export const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export default function TableList({
  dataTable,
  selectedUser,
  detailOpen,
  setDetailOpen,
  nameColumns,
  isClient,
  nameTitle,
  isDetail,
  onConfirm,
  isMaxWith,
  isConfirmEvent,
  dialogTitle,
  dialogContent,
  actions,
  cellComponents,
  selectedDataEvent,
  isOrder,
  count,
  page,
  handleChangePage,
}) {
  const [loading, setLoading] = useState(true); // Add a loading state

  useEffect(() => {
    // Simulate a 10-second loading delay
    const delay = setTimeout(() => {
      setLoading(false);
    }, 3500);

    return () => clearTimeout(delay);
  }, []);

  const handlClientDetailClose = () => {
    setDetailOpen(false);
  };

  return (
    <>
      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <Divider />
        {loading ? (
          <BoxLoading />
        ) : (
          <>
            <TableContainer sx={{ maxHeight: 600 }}>
              <Table stickyHeader aria-label="sticky table">
                <TableHead>
                  <TableRow>
                    {nameColumns.map((column) => (
                      <StyledTableCell
                        key={column.id}
                        align={column.align}
                        style={
                          isMaxWith
                            ? { minWidth: column?.minWidth }
                            : { maxWidth: column?.minWidth }
                        }>
                        {column.label}
                      </StyledTableCell>
                    ))}
                    {actions && (
                      <StyledTableCell
                        align="left"
                        style={{ maxWidth: "100px" }}>
                        Actions
                      </StyledTableCell>
                    )}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {dataTable?.map((row, index) => {
                    return (
                      <StyledTableRow key={row.id}>
                        {nameColumns.map((column) => (
                          <StyledTableCell key={column.id}>
                            {cellComponents && cellComponents[column.id]
                              ? cellComponents[column.id](row[column.id])
                              : row[column.id]}
                          </StyledTableCell>
                        ))}
                        {actions && (
                          <StyledTableCell>
                            {row.isPay || row?.refunded ? (
                              <></>
                            ) : (
                              actions.map((action) => (
                                <IconButton
                                  key={action.name}
                                  color={action.color}
                                  onClick={() => action.onClick(row)}>
                                  {action.icon}
                                </IconButton>
                              ))
                            )}
                            {/* {actions.map((action) => (
                              <IconButton
                                key={action.name}
                                color={action.color}
                                onClick={() => action.onClick(row)}>
                                {action.icon}
                              </IconButton>
                            ))} */}
                          </StyledTableCell>
                        )}
                      </StyledTableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[5]}
              colSpan={3}
              component="div"
              count={count}
              rowsPerPage={5}
              page={page}
              onPageChange={handleChangePage}
            />
            <DialogComponent
              open={detailOpen}
              selectedUser={selectedUser}
              onClose={handlClientDetailClose}
              isClient={isClient}
              nameTitle={nameTitle}
              isDetail={isDetail}
              onConfirm={onConfirm}
              isConfirmEvent={isConfirmEvent}
              dialogTitle={dialogTitle}
              dialogContent={dialogContent}
              selectedDataEvent={selectedDataEvent}
              isOrder={isOrder}
            />
          </>
        )}
      </Paper>
    </>
  );
}
