import React, { useEffect, useState } from "react";
import { styled, alpha } from "@mui/material/styles";
import MuiAppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Badge from "@mui/material/Badge";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { useOpenStore } from "../../Store/openStore";
import { NAME_LOGO } from "../../Assets/Constant/Common/constCommon";
import { Button, Grid } from "@mui/material";
import {
  getLocalStorageUserData,
  setLocalStorageUserInfo,
  getLocalStorageUserInfo,
} from "../../Store/userStore";

const AppBar = styled(
  MuiAppBar,
  {}
)(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 1,
}));

// const Search = styled("div")(({ theme }) => ({
//   position: "relative",
//   borderRadius: theme.shape.borderRadius,
//   backgroundColor: alpha(theme.palette.common.white, 0.15),
//   "&:hover": {
//     backgroundColor: alpha(theme.palette.common.white, 0.25),
//   },
//   marginRight: theme.spacing(2),
//   marginLeft: 0,
//   width: "100%",
//   [theme.breakpoints.up("sm")]: {
//     marginLeft: theme.spacing(3),
//     width: "auto",
//   },
// }));

// const SearchIconWrapper = styled("div")(({ theme }) => ({
//   padding: theme.spacing(0, 2),
//   height: "100%",
//   position: "absolute",
//   pointerEvents: "none",
//   display: "flex",
//   alignItems: "center",
//   justifyContent: "center",
// }));

// const StyledInputBase = styled(InputBase)(({ theme }) => ({
//   color: "inherit",
//   "& .MuiInputBase-input": {
//     padding: theme.spacing(1, 1, 1, 0),
//     // vertical padding + font size from searchIcon
//     paddingLeft: `calc(1em + ${theme.spacing(4)})`,
//     transition: theme.transitions.create("width"),
//     width: "100%",
//     [theme.breakpoints.up("md")]: {
//       width: "20ch",
//     },
//   },
// }));

const Navbar = ({ socket }) => {
  const dataUser = getLocalStorageUserData();
  const adminId = dataUser._id;

  const [anchorEl, setAnchorEl] = React.useState(null);
  const updateOpen = useOpenStore((state) => state.updateOpen);
  const dopen = useOpenStore((state) => state.dopen);

  const [notifications, setNotifications] = useState([]);
  const [open, setOpen] = useState(false);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  useEffect(() => {
    // Emitting the "organizerId" event when the component mounts
    socket?.emit("organizerId", adminId);

    // Cleanup function for "organizerId" event
    return () => {
      socket.off("organizerId");
    };
  }, [socket, adminId]);

  useEffect(() => {
    const handleNotification = (data) => {
      if (
        !notifications.some(
          (notification) => notification.senderName === data.senderName
        )
      ) {
        setNotifications((prev) => [...prev, data]);
      }
    };

    // Subscribing to the "getNotification" event when the component mounts
    socket.on("getNotification", handleNotification);

    // Cleanup function for "getNotification" event
    return () => {
      socket.off("getNotification", handleNotification);
    };
  }, [socket, notifications]);

  const displayNotification = ({ senderName }) => {
    return (
      <span
        style={{
          backgroundColor: "#E0F4FF",
          padding: "10px",
          margin: "5px",
          borderRadius: "10px",
        }}>{`${senderName} created a new event.`}</span>
    );
  };

  const handleRead = () => {
    setNotifications([]);
    setOpen(false);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="fixed"
        elevation={0}
        sx={{ backgroundColor: "#ffffff", color: "#2f2f2f" }}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
            onClick={() => updateOpen(!dopen)}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h3" className="logo" component="h4">
            {NAME_LOGO}
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            <IconButton
              size="large"
              aria-label="show 17 new notifications"
              color="inherit"
              onClick={() => setOpen(!open)}>
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
              <NotificationsIcon />
            </IconButton>
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit">
              <AccountCircle />
            </IconButton>
          </Box>

          {/* <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit">
              <MoreIcon />
            </IconButton>
          </Box> */}
        </Toolbar>
        {open && (
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
            {notifications.map((n) => displayNotification(n))}
            <Button onClick={handleRead}>Mark as read</Button>
          </Grid>
        )}
      </AppBar>
    </Box>
  );
};

export default Navbar;
