import React, { useState } from "react";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import Button from "@mui/material/Button";
import DialogTitle from "@mui/material/DialogTitle";
import {
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  FormControlLabel,
  Switch,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export default function DialogConfirm({
  onClose,
  onConfirm,
  isConfirmEvent,
  event,
  dialogTitle,
  dialogContent,
}) {
  const [expandedArea, setExpandedArea] = useState(null);
  const [isHot, setIsHot] = useState(event?.isHot);

  const handleAccordionChange = (areaId) => {
    setExpandedArea(areaId === expandedArea ? null : areaId);
  };
  const handleSwitchChange = () => {
    setIsHot(!isHot);
  };

  const formattedDate = (timestamp) => {
    const date = new Date(timestamp);
    const formatted = date.toDateString();
    return formatted;
  };
  const RenderConfirmEvent = () => {
    return (
      <>
        <DialogTitle>Event Details</DialogTitle>
        <DialogContent>
          <>
            <p>Name event: {event?.event_name}</p>
            <p>Name organizer: {event?.organizer_name}</p>
            <p>Max ticket in order: {event?.maxTicketInOrder}</p>
            <p>Description: {event?.event_description}</p>
            <p>Type of Event: {event?.type_of_event}</p>
            <FormControlLabel
              label="Is Hot"
              control={<Switch checked={isHot} onChange={handleSwitchChange} />}
              labelPlacement="start"
            />
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Event</TableCell>
                  </TableRow>
                </TableHead>
                {event?.event_date.map((eventData) => (
                  <TableBody>
                    <TableRow>
                      <TableCell>
                        Event date: {formattedDate(eventData.date)}
                      </TableCell>
                    </TableRow>
                    {eventData?.event_areas.map((area) => (
                      <Accordion
                        key={area._id}
                        expanded={expandedArea === area._id}
                        onChange={() => handleAccordionChange(area._id)}>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                          <TableCell>{area.name_areas}</TableCell>
                          <TableCell>{area.total_row}</TableCell>
                          <TableCell>{area.ticket_price}</TableCell>
                        </AccordionSummary>
                        <AccordionDetails>
                          <TableContainer>
                            <Table>
                              <TableHead>
                                <TableRow>
                                  <TableCell>Row Name</TableCell>
                                  <TableCell>Total Chairs</TableCell>
                                  <TableCell>Ticket Price</TableCell>
                                </TableRow>
                              </TableHead>
                              <TableBody>
                                {area.rows.map((row) => (
                                  <TableRow key={row._id}>
                                    <TableCell>{row.row_name}</TableCell>
                                    <TableCell>{row.total_chair}</TableCell>
                                    <TableCell>{row.ticket_price}</TableCell>
                                  </TableRow>
                                ))}
                              </TableBody>
                            </Table>
                          </TableContainer>
                        </AccordionDetails>
                      </Accordion>
                    ))}
                  </TableBody>
                ))}
              </Table>
            </TableContainer>
            <div>
              <Typography variant="subtitle1">Event Photos:</Typography>
              <img
                src={event?.eventImage}
                alt={`Event Photo ${event?.eventImage}`}
                style={{ width: "100%", marginBottom: "10px" }}
              />
            </div>
            <div>
              <Typography variant="subtitle1">Diagram Photos:</Typography>
              <img
                src={event?.type_layout}
                alt={`Event Photo ${event?.type_layout}`}
                style={{ width: "100%", marginBottom: "10px" }}
              />
            </div>
          </>
        </DialogContent>
      </>
    );
  };

  const RenderConfirmOrganizations = ({ dialogTitle, dialogContent }) => {
    return (
      <>
        <DialogTitle>{dialogTitle}</DialogTitle>
        <DialogContent>
          <DialogContentText>{dialogContent}</DialogContentText>
        </DialogContent>
      </>
    );
  };

  return (
    <>
      {isConfirmEvent ? (
        <RenderConfirmEvent />
      ) : (
        <RenderConfirmOrganizations
          dialogTitle={dialogTitle}
          dialogContent={dialogContent}
        />
      )}
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button
          onClick={isConfirmEvent ? () => onConfirm(isHot) : onConfirm}
          autoFocus>
          Accept
        </Button>
      </DialogActions>
    </>
  );
}
