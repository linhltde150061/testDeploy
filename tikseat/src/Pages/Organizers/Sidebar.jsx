import React, { useState } from "react";
import { styled, useTheme } from "@mui/material/styles";
import { Avatar, Badge, Button, Grid } from "@mui/material";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import QrCodeScannerIcon from "@mui/icons-material/QrCodeScanner";

import DashboardIcon from "@mui/icons-material/Dashboard";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import WorkHistoryIcon from "@mui/icons-material/WorkHistory";
import LogoutIcon from "@mui/icons-material/Logout";
import SyncAltIcon from "@mui/icons-material/SyncAlt";
import CurrencyExchangeIcon from "@mui/icons-material/CurrencyExchange";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import VpnKeyIcon from "@mui/icons-material/VpnKey";

import ListEventToday from "./ListEventToday";

import DefaultDashboard from "./DefaultDashboard";
import EventHistory from "./EventHistory";
import ProfileOrganizers from "./ProfileOrganizers";
import AddPaymentMethod from "../Common/AddPaymentMethod";
import CheckinTicket from "./CheckinTicket";
import { useNavigate } from "react-router-dom";
import ChangePassword from "../Common/ChangePassword";
import CreateEventDefault from "./CreateEventDefault";
import NotificationsIcon from "@mui/icons-material/Notifications";
import "../../Assets/CSS/Organizer/Sidebar.css";

import {
  getLocalStorageUserData,
  getLocalStorageUserInfo,
} from "../../Store/userStore";
import EventDetail from "./EventDetail";
import ListRefund from "./ListRefund";
import UpdateEventDefault from "./UpdateEventDefault";
import Transactions from "./Transactions";

const drawerWidth = 300;
const styleIcon = { paddingLeft: "10px", fontSize: "40px" };

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 20px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 20px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

export const handleLogOut = (navigate) => {
  window.localStorage.clear();
  navigate("/");
};

export default function MiniDrawer() {
  const dataInfo = getLocalStorageUserInfo();
  const theme = useTheme();
  const [open, setOpen] = useState(true);
  const [menuData, setMenuData] = useState("dashboard");
  const [eventDetail, setEventDetail] = useState(null);
  const [eventCheckin, setEventCheckin] = useState(null);
  const [notifications, setNotifications] = useState([1, 2]);
  const [notificationRefund, setNotificationRefund] = useState([1, 2]);
  const [openNotification, setOpenNotification] = useState(false);

  const navigate = useNavigate();

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleRead = () => {
    setNotifications([]);
    setOpenNotification(false);
  };

  const handleClickRefund = () => {
    setMenuData("listRefund");
    setNotificationRefund([]);
  };

  return (
    <Box sx={{ display: "flex" }}>
      {/* <CssBaseline /> */}
      <AppBar
        className="appbar"
        position="fixed"
        elevation={4}
        sx={{ backgroundColor: "#fff", color: "black" }}>
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Grid sx={{ display: "flex", alignItems: "center" }}>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={() => {
                setOpen(!open);
              }}
              edge="start">
              <MenuIcon />
            </IconButton>
            <Typography
              className="typrography"
              variant="h6"
              noWrap
              component="div">
              DASHBOARD
            </Typography>
          </Grid>
          <Grid
            className="welcome"
            sx={{ marginRight: "80px", display: "flex", alignItems: "center" }}>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ marginRight: "50px" }}>
              <span style={{ fontSize: "15px", color: "#ccc" }}>
                Welcome Back
              </span>
              <br />
              <span style={{ color: "rgb(245, 189, 25)" }}>
                {dataInfo.organizer_name}
              </span>
            </Typography>
            <Grid>
              <Box sx={{ display: { xs: "none", md: "flex" } }}>
                <IconButton
                  size="large"
                  aria-label="show 17 new notifications"
                  color="inherit"
                  onClick={() => setOpenNotification(!openNotification)}>
                  {notifications.length > 0 && (
                    <Badge
                      sx={{
                        position: "absolute",
                        marginBottom: "20px",
                        marginLeft: "20px",
                      }}
                      badgeContent={notifications.length}
                      color="error"
                    />
                  )}
                  <NotificationsIcon sx={{ width: "35px", height: "35px" }} />
                </IconButton>
              </Box>
            </Grid>
            <Grid
              sx={{
                height: "60px",
                width: "60px",
                borderRadius: "50%",
                marginLeft: "20px",
              }}>
              <Avatar
                sx={{ width: "100%", height: "100%" }}
                alt="Remy Sharp"
                src={dataInfo?.avatarImage}
              />
            </Grid>
          </Grid>
          {openNotification && (
            <Grid
              style={{
                position: "absolute",
                width: "400px",
                top: "64px",
                right: "0",
                backgroundColor: "white",
                color: "black",
                fontWeight: "300",
                display: "flex",
                flexDirection: "column",
                padding: "10px",
              }}>
              {/* {notifications.map((n) => displayNotification(n))} */}
              aaaaaaa
              <Button onClick={handleRead}> Read</Button>
            </Grid>
          )}
        </Toolbar>
      </AppBar>

      <Drawer
        className="drawer"
        variant="permanent"
        open={open}
        sx={{ backgroundColor: "#87C4FF" }}>
        <DrawerHeader>
          {/* <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton> */}
        </DrawerHeader>
        <Divider />

        <List style={{ border: "none" }}>
          <ListItem
            disablePadding
            sx={{ display: "block", border: "none" }}
            onClick={() => setMenuData("dashboard")}>
            <ListItemButton
              sx={{
                minHeight: 50,
                justifyContent: open ? "initial" : "center",
                backgroundColor:
                  menuData === "dashboard" ? "#ffc50099" : "transparent",
                borderRadius: "5px",
                margin: "5px 10px 5px 10px",
                px: 2.5,
              }}>
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : 1.5,
                  justifyContent: "center",
                }}>
                <DashboardIcon sx={styleIcon} />
              </ListItemIcon>
              <ListItemText
                sx={{ display: open ? "block" : "none" }}
                primary="Dashboard"
              />
            </ListItemButton>
          </ListItem>
          <ListItem
            disablePadding
            sx={{
              display: "block",
            }}
            onClick={() => setMenuData("newEvent")}>
            <ListItemButton
              sx={{
                minHeight: 50,
                justifyContent: open ? "initial" : "center",
                backgroundColor:
                  menuData === "newEvent" ? "#ffc50099" : "transparent",
                borderRadius: "5px",
                margin: "5px 10px 5px 10px",
                px: 2.5,
              }}>
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : 1.5,
                  justifyContent: "center",
                }}>
                <AddCircleIcon sx={styleIcon} />
              </ListItemIcon>
              <ListItemText
                sx={{ display: open ? "block" : "none" }}
                primary="New Event"
              />
            </ListItemButton>
          </ListItem>
          <ListItem
            disablePadding
            sx={{
              display: "block",
            }}
            onClick={() => setMenuData("eventHistory")}>
            <ListItemButton
              sx={{
                minHeight: 50,
                justifyContent: open ? "initial" : "center",
                backgroundColor:
                  menuData === "eventHistory" ? "#ffc50099" : "transparent",
                borderRadius: "5px",
                margin: "5px 10px 5px 10px",
                px: 2.5,
              }}>
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : 1.5,
                  justifyContent: "center",
                }}>
                <WorkHistoryIcon sx={styleIcon} />
              </ListItemIcon>
              <ListItemText
                sx={{ display: open ? "block" : "none" }}
                primary="Event History"
              />
            </ListItemButton>
          </ListItem>
          <ListItem
            disablePadding
            sx={{
              display: "block",
            }}
            onClick={() => setMenuData("checkin")}>
            <ListItemButton
              sx={{
                minHeight: 50,
                justifyContent: open ? "initial" : "center",
                backgroundColor:
                  menuData === "checkin" ? "#ffc50099" : "transparent",
                borderRadius: "5px",
                margin: "5px 10px 5px 10px",
                px: 2.5,
              }}>
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : 1.5,
                  justifyContent: "center",
                }}>
                <QrCodeScannerIcon sx={styleIcon} />
              </ListItemIcon>
              <ListItemText
                sx={{ display: open ? "block" : "none" }}
                primary="Check in"
              />
            </ListItemButton>
          </ListItem>
          <Divider />
          <ListItem
            disablePadding
            sx={{
              display: "block",
            }}
            onClick={() => setMenuData("profile")}>
            <ListItemButton
              sx={{
                minHeight: 50,
                justifyContent: open ? "initial" : "center",
                backgroundColor:
                  menuData === "profile" ? "#ffc50099" : "transparent",
                borderRadius: "5px",
                margin: "5px 10px 5px 10px",
                px: 2.5,
              }}>
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : 1.5,
                  justifyContent: "center",
                }}>
                <AssignmentIndIcon sx={styleIcon} />
              </ListItemIcon>
              <ListItemText
                sx={{ display: open ? "block" : "none" }}
                primary="Profile"
              />
            </ListItemButton>
          </ListItem>
          <ListItem
            disablePadding
            sx={{
              display: "block",
            }}
            onClick={() => setMenuData("transaction")}>
            <ListItemButton
              sx={{
                minHeight: 50,
                justifyContent: open ? "initial" : "center",
                backgroundColor:
                  menuData === "transaction"
                    ? "rgb(245, 189, 25)"
                    : "transparent",
                borderRadius: "5px",
                margin: "5px 10px 5px 10px",
                px: 2.5,
              }}>
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : 1.5,
                  justifyContent: "center",
                }}>
                <SyncAltIcon sx={styleIcon} />
              </ListItemIcon>
              <ListItemText
                sx={{ display: open ? "block" : "none" }}
                primary="Transaction"
              />
            </ListItemButton>
          </ListItem>
          <ListItem
            disablePadding
            sx={{
              display: "block",
            }}
            onClick={() => handleClickRefund()}>
            <ListItemButton
              sx={{
                minHeight: 50,
                justifyContent: open ? "initial" : "center",
                backgroundColor:
                  menuData === "listRefund" ? "#ffc50099" : "transparent",
                borderRadius: "5px",
                margin: "5px 10px 5px 10px",
                px: 2.5,
              }}>
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : 1.5,
                  justifyContent: "center",
                }}>
                {notificationRefund.length > 0 && (
                  <Badge
                    sx={{
                      position: "absolute",
                      marginTop: open ? "6%" : "10%",
                      marginLeft: open ? "152%" : "70%",
                    }}
                    badgeContent={notificationRefund.length}
                    color="error"
                  />
                )}
                <CurrencyExchangeIcon sx={styleIcon} />
              </ListItemIcon>
              <ListItemText
                sx={{ display: open ? "block" : "none" }}
                primary="List Refund"
              />
            </ListItemButton>
          </ListItem>
          <ListItem
            disablePadding
            sx={{
              display: "block",
            }}
            onClick={() => setMenuData("changePass")}>
            <ListItemButton
              sx={{
                minHeight: 50,
                justifyContent: open ? "initial" : "center",
                backgroundColor:
                  menuData === "changePass" ? "#ffc50099" : "transparent",
                borderRadius: "5px",
                margin: "5px 10px 5px 10px",
                px: 2.5,
              }}>
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : 1.5,
                  justifyContent: "center",
                }}>
                <VpnKeyIcon sx={styleIcon} />
              </ListItemIcon>
              <ListItemText
                sx={{ display: open ? "block" : "none" }}
                primary="Change password"
              />
            </ListItemButton>
          </ListItem>
          <ListItem
            disablePadding
            sx={{
              display: "block",
            }}
            onClick={() => handleLogOut(navigate)}>
            <ListItemButton
              sx={{
                minHeight: 50,
                justifyContent: open ? "initial" : "center",
                backgroundColor:
                  menuData === "logOut" ? "#ffc50099" : "transparent",
                borderRadius: "5px",
                margin: "5px 10px 5px 10px",
                px: 2.5,
              }}>
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : 1.5,
                  justifyContent: "center",
                }}>
                <LogoutIcon sx={styleIcon} />
              </ListItemIcon>

              <ListItemText
                sx={{ display: open ? "block" : "none" }}
                primary="Log Out"
              />
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>

      <Grid
        className="box"
        sx={{
          width: "100%",
          backgroundColor: "#e7e8ec",
          zIndex: 1,
          height: "auto",
        }}>
        <Box
          style={{
            height: "100%",
            padding: "80px 20px 20px 20px",
          }}
          component="main"
          sx={{ flexGrow: 1, p: 3 }}>
          {menuData === "dashboard" && <DefaultDashboard />}
          {menuData === "newEvent" && <CreateEventDefault />}
          {menuData === "eventHistory" && (
            <EventHistory
              onEventDetail={(data, actionType) => {
                setEventDetail(data);
                if (actionType === "statistics") {
                  setMenuData("eventDetail");
                } else {
                  setMenuData("updateEvent");
                }
              }}
            />
          )}
          {menuData === "eventDetail" && (
            <EventDetail eventDetail={eventDetail} />
          )}
          {menuData === "updateEvent" && (
            <UpdateEventDefault eventDetail={eventDetail} />
          )}
          {menuData === "checkinTicket" && (
            <CheckinTicket CheckingTicket={eventCheckin} />
          )}

          {menuData === "checkin" && (
            <ListEventToday
              onClickCheckin={(data) => {
                setEventCheckin(data);
                setMenuData("checkinTicket");
              }}
            />
          )}
          {menuData === "profile" && <ProfileOrganizers />}
          {menuData === "changePass" && <ChangePassword />}
          {menuData === "bankAccount" && <AddPaymentMethod />}
          {menuData === "listRefund" && <ListRefund />}
          {menuData === "transaction" && <Transactions />}
          {menuData === "logOut" && <DefaultDashboard />}
        </Box>
      </Grid>
    </Box>
  );
}
