import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Filter1Icon from "@mui/icons-material/Filter1";
import Filter2Icon from "@mui/icons-material/Filter2";
import { Grid } from "@mui/material";
import UpdateEvent from "./UpdateEvent";
import UpdateTicket from "./UpdateTicket";
import ApiEvent from "../../API/Event/ApiEvent";
import {
  getLocalStorageEventInfo,
  setLocalStorageEventInfo,
  setLocalStorageTicketInfo,
} from "../../Store/userStore";

const styleIcon = { paddingLeft: "10px", fontSize: "40px" };

function UpdateEventDefault({ eventDetail }) {
  const idEvent = eventDetail._idEvent;
  const [page, setPage] = useState("newEvent");

  const eventInfo = getLocalStorageEventInfo();
  const [triggerFetch, setTriggerFetch] = useState(true);
  const [dataEvent, setDataEvent] = useState({
    event_name: null,
    eventImage: null,
    type_of_event: null,
    event_description: null,
    address: {
      city: null,
      district: null,
      ward: "",
      specific_address: "",
    },
  });

  const [dataTicket, setDataTicket] = useState({
    type_layout: null,
    maxTicketInOrder: null,
    sales_date: {
      start_sales_date: null,
      end_sales_date: null,
    },
    event_date: [
      {
        date_number: "",
        dateEvent: "",
        event_areas: [
          {
            id_areas: "",
            name_areas: "",
            total_row: "",
            ticket_price: "",
            rows: [
              {
                row_name: "",
                total_chair: "",
              },
            ],
          },
        ],
      },
    ],
  });

  console.log(dataTicket);

  console.log(dataEvent);

  useEffect(() => {
    setLocalStorageEventInfo(dataEvent);
    setLocalStorageTicketInfo(dataTicket);
  }, [dataEvent, dataTicket]);

  useEffect(() => {
    const getEvent = async () => {
      try {
        const response = await ApiEvent.getEventbyEventId({
          _idEvent: idEvent,
        });
        if (response.status === true) {
          console.log(response.event);
          setDataEvent({
            event_name: response.event?.event_name || null,
            eventImage: response.event?.eventImage,
            type_of_event: response.event?.type_of_event || null,
            event_description: response.event?.event_description || null,
            address: {
              city: response.event?.event_location?.city || null,
              district: response.event?.event_location?.district || null,
              ward: response.event?.event_location?.ward || "",
              specific_address:
                response.event?.event_location?.specific_address || "",
            },
          });

          setDataTicket({
            type_layout: response.event?.type_layout || null,
            maxTicketInOrder: response.event?.maxTicketInOrder || null,
            sales_date: {
              start_sales_date:
                response.event?.sales_date?.start_sales_date || null,
              end_sales_date:
                response.event?.sales_date?.end_sales_date || null,
            },
            event_date:
              response.event?.event_date?.map((date) => ({
                date_number: date.day_number || "",
                dateEvent: date.date || "",
                event_areas: date.event_areas.map((area) => ({
                  id_areas: area._id || "",
                  name_areas: area.name_areas || "",
                  total_row: area.total_row || "",
                  ticket_price: area.ticket_price || "",
                  rows: area.rows.map((row) => ({
                    row_name: row.row_name || "",
                    total_chair: row.total_chair.toString() || "",
                  })),
                })),
              })) || [],
          });
        } else {
          console.log("error");
        }
      } catch (error) {
        console.log(error);
      }
    };

    if (triggerFetch) {
      getEvent();
      setTriggerFetch(false);
    }
  }, [triggerFetch, idEvent]);

  return (
    <Grid sx={{ backgroundColor: "#ffffff" }}>
      <Box sx={{ display: "flex", flexDirection: "column", maxHeight: "85vh" }}>
        <Grid sx={{ width: "100%", backgroundColor: "#ccc", padding: "10px" }}>
          <Typography variant="h4" noWrap component="div">
            New Event
          </Typography>
        </Grid>
        <Grid sx={{ display: "flex" }}>
          <Box
            component="main"
            sx={{
              flexGrow: 1,
              p: 3,
              borderRight: "1px solid #ccc",
              maxHeight: "78vh",
              overflowY: "auto",
            }}
          >
            {page === "newEvent" && eventInfo?.event_name !== null ? (
              <UpdateEvent
                onContinueClick={() => {
                  setPage("create-ticket");
                }}
              />
            ) : null}

            {page === "create-ticket" && <UpdateTicket event={idEvent}/>}
          </Box>

          <Box sx={{ width: "20%", height: "83vh" }}>
            <List>
              <ListItem
                disablePadding
                sx={{
                  display: "block",
                }}
                onClick={() => setPage("newEvent")}
              >
                <ListItemButton
                  sx={{
                    minHeight: 50,
                    backgroundColor:
                      page === "newEvent" ? "rgb(245, 189, 25)" : "transparent",
                    borderRadius: "10px",
                    margin: "5px 10px 5px 10px",
                    px: 2.5,
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: 3,
                      justifyContent: "center",
                    }}
                  >
                    <Filter1Icon sx={styleIcon} />
                  </ListItemIcon>
                  <ListItemText primary=" Event Information" />
                </ListItemButton>
              </ListItem>
              <Divider />
              <ListItem
                disablePadding
                sx={{
                  display: "block",
                }}
                onClick={() => setPage("create-ticket")}
              >
                <ListItemButton
                  sx={{
                    minHeight: 50,
                    backgroundColor:
                      page === "create-ticket" ? "rgb(245, 189, 25)" : "transparent",
                    borderRadius: "10px",
                    margin: "5px 10px 5px 10px",
                    px: 2.5,
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: 3,
                      justifyContent: "center",
                    }}
                  >
                    <Filter2Icon sx={styleIcon} />
                  </ListItemIcon>
                  <ListItemText primary="Show time & Tickets" />
                </ListItemButton>
              </ListItem>
            </List>
            <Divider
              sx={{
                display: "block",
              }}
            />
          </Box>
        </Grid>
      </Box>
    </Grid>
  );
}

export default UpdateEventDefault;
