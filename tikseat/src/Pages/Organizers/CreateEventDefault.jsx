import React, { useState } from "react";
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
import NewEvent from "./NewEvent";
import CreateTicket from "./CreateTicket";

const styleIcon = { paddingLeft: "10px", fontSize: "40px" };

function CreateEventDefault() {
  const [page, setPage] = useState("newEvent");

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
            {page === "newEvent" && (
              <NewEvent
                onContinueClick={() => {
                  setPage("create-ticket");
                }}
              />
            )}

            {page === "create-ticket" && (
              <CreateTicket />
            )}
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

export default CreateEventDefault;
