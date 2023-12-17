import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import ApiEvent from "../../API/Event/ApiEvent";
import { getLocalStorageUserInfo } from "../../Store/userStore";
import { Button, Grid } from "@mui/material";

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

function ListEventToday({ onClickCheckin }) {
  const dataInfo = getLocalStorageUserInfo();
  const [eventToday, setEventToday] = useState([]);

  useEffect(() => {
    const dataEventToday = async () => {
      try {
        const response = await ApiEvent.getListEventToday({
          _idOrganizer: dataInfo._id,
        });
        console.log("data: ", response);
        if (response.status === true) {
          setEventToday((prevEventToday) => {
            return response.eventsToday.map((event) => ({
              _id: event._id,
              eventName: event.event_name,
            }));
          });
        } else {
          console.log("error!");
        }
      } catch (error) {
        console.log(error);
      }
    };

    dataEventToday();
  }, []);

  console.log(eventToday);

  const handleEventToday = (eventId) => {
    console.log(eventId);
    onClickCheckin(eventId);
  };

  return (
    <>
      <Grid sx={{height:"88.5vh"}}>
        <TableContainer component={Paper}>
          <Table aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>Name event</StyledTableCell>
                <StyledTableCell align="right"> Action&nbsp;</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {eventToday.map((ev, index) => (
                <StyledTableRow key={index}>
                  <StyledTableCell component="th" scope="row">
                    {ev.eventName}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    <Button onClick={() => handleEventToday(ev._id)}>
                      Checkin now
                    </Button>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </>
  );
}

export default ListEventToday;
