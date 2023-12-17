import * as React from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { Chip, Divider, Rating } from "@mui/material";

function Row({ rows }) {
  const [open, setOpen] = React.useState(false);

  return (
    <React.Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {rows?.event_name}
        </TableCell>
        <TableCell align="right">
          {rows?.type_of_event.map((type) => (
            <Chip label={type} />
          ))}
        </TableCell>
        <TableCell align="right">{rows?.event_location}</TableCell>
        <TableCell align="right">{rows?.start_sales_date}</TableCell>
        <TableCell align="right">{rows?.end_sales_date}</TableCell>
        <TableCell align="center">
          {rows?.isActive ? (
            <Chip label="Active" color="success" />
          ) : (
            <Chip label="Not Active" color="error" />
          )}
        </TableCell>
        <TableCell align="center">
          {rows?.isHot ? (
            <Chip label="Hot" color="success" />
          ) : (
            <Chip label="Not Hot" color="error" />
          )}
        </TableCell>
        <TableCell align="center">
          <Rating name="disabled" value={rows?.totalRating} disabled />
        </TableCell>
        <TableCell align="right">{rows?.expectedAmount}</TableCell>
        <TableCell align="right">{rows?.totalRevenue}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                History
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Date</TableCell>
                    <TableCell>Total seats sold</TableCell>
                    <TableCell align="right">Amount</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows?.event_dates?.map((historyRow) => (
                    <TableRow key={historyRow.date}>
                      <TableCell component="th" scope="row">
                        {historyRow?.date}
                      </TableCell>
                      <TableCell>{historyRow?.total_seats_sold}</TableCell>
                      <TableCell align="right">
                        {historyRow?.areas_information?.map((value, index) => (
                          <>
                            <Box key={index}>
                              <Box>{value?.name_areas}</Box>
                              <Box>Total Rows: {value?.total_row}</Box>
                              <Box>Ticket Price: {value?.ticket_price} VND</Box>
                              <Box>Total Seats: {value?.total_seats_area}</Box>
                            </Box>
                            <Divider />
                          </>
                        ))}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

export default function TableListEventOfOrganization({ selectedDataEvent }) {
  return (
    <TableContainer component={Paper} sx={{ maxHeight: "400px" }}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Event name</TableCell>
            <TableCell align="right">Type of event</TableCell>
            <TableCell align="right">Address</TableCell>
            <TableCell align="right">Sales start date</TableCell>
            <TableCell align="right">Sales end date</TableCell>
            <TableCell align="center">Active</TableCell>
            <TableCell align="center">Hot</TableCell>
            <TableCell align="center">Rating</TableCell>
            <TableCell align="right">Expected Amount</TableCell>
            <TableCell align="right">Total Revenue</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {selectedDataEvent.map((event) => (
            <Row key={event.name} rows={event} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
