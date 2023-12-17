import React, { useEffect, useState } from "react";
import {
  List,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Grid,
} from "@mui/material";
import { getLocalStorageUserInfo } from "../../Store/userStore";
import { URL_SOCKET } from "../../API/ConstAPI";
import { io } from "socket.io-client";

function Notification() {
  const socket = io(URL_SOCKET, { transports: ["websocket"] });

  // const dataUser = getLocalStorageUserData();
  const dataInfo = getLocalStorageUserInfo();
  console.log(dataInfo._id);

  const [notifications, setNotifications] = useState([]);
  const organizerId = dataInfo._id;

  useEffect(() => {
    socket?.emit("organizerId", organizerId);
  }, [socket, organizerId]);

  useEffect(() => {
    // Đăng ký sự kiện "getNotification" khi component được mount
    socket.on("getNotification", handleNotification);
    // Hủy đăng ký sự kiện khi component bị unmount
    return () => {
      socket.off("getNotification", handleNotification);
    };
  }, [socket]);

  const handleNotification = (data) => {
    if (
      !notifications.some(
        (notification) => notification.senderName === data.senderName
      )
    ) {
      setNotifications((prev) => [...prev, data]);
    }
  };

  console.log(notifications);

  const displayNotification = ({ senderName }) => {
    return <p className="notification">{`${senderName} Create new Event.`}</p>;
  };

  return (
    
    <Grid maxWidth="100%" sx={{backgroundColor:"#ffffff", borderRadius:"10px", padding:"30px"}} >
      <h1>Danh sách thông báo</h1>
      <Grid
        style={{
          height: "70px",
          width: "100%",
          backgroundColor: "yellow",
          fontSize: "25px",
          paddingLeft: "20px",
          display: "flex",
          alignItems: "center",
          borderRadius: "5px",
          marginBottom: "15px",
        }}
      >
        {notifications.map((n, index) => (
          <Grid key={index}>{displayNotification(n)}</Grid>
        ))}
      </Grid>
    </Grid>
  );
}

export default Notification;
