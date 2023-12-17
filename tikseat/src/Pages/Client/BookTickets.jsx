import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Divider,
  FormControl,
  Grid,
  Input,
  InputLabel,
  Modal,
  Stack,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import IconCircle from "../../Components/Common/Icons/IconCircle";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import {
  getLocalStorageUserData,
  getLocalStorageUserInfo,
  setLocalStorageEventId,
  setLocalStorageListChairId,
} from "../../Store/userStore";
import { useNavigate, useParams } from "react-router-dom";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import ApiClient from "../../API/Client/ApiClient";
import imageScreen from "../../Assets/Images/screen.png";
import { URL_SOCKET } from "../../API/ConstAPI";
import { io } from "socket.io-client";
import Carousel from "react-multi-carousel";
import CountTime from "../../Components/Common/HomePage/CountTime";
import { useOpenStore } from "../../Store/openStore";
import InformationEvent from "../../Components/Client/InformationEvent";
import DialogNotification from "../../Components/Client/DialogNotification";
import StackBookNow from "../../Components/Common/HomePage/StackBookNow";
import StackBuyTicket from "../../Components/Common/HomePage/StackBuyTicket";
import ApiEvent from "../../API/Event/ApiEvent";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  // pt: 2,
  // px: 4,
  // pb: 3,
};

const BookTickets = () => {
  const { setEventId } = useOpenStore();
  const { id: idEvent } = useParams();
  const [age, setAge] = useState("");
  const [openConfrm, setOpenConfirm] = React.useState(false);
  const [dialogWidth, setDialogWidth] = useState("600px");
  const [dialogHeight, setDialogHeight] = useState("400px");

  const [dataEvents, setDataEvents] = useState("");
  const [dataEventDetail, setDataEventDetail] = useState();
  const [selectedItem, setSelectedItem] = useState();
  const [selectRows, setSelectRows] = useState([]);
  const [organizer, setOrganizer] = useState("");
  const navigate = useNavigate();
  const dataUser = getLocalStorageUserData();
  const dataInfo = getLocalStorageUserInfo();
  const [selectChair, setSelectChair] = useState([]);

  const [countDown, setCountDown] = useState(false);
  const [time, setTime] = useState(null);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [statusConfrim, setStatusConfrim] = useState(true);
  const [open, setOpen] = React.useState(false);
  const [statusTime, setStatusTime] = React.useState();
  const [isOpenSale, setIsOpenSale] = React.useState();
  const [isOpenDialogNotify, setIsOpenDialogNotify] = React.useState(false);
  const [dayNumber, setDayNumber] = useState();

  const [id, setId] = useState("");

  const [socket, setSocket] = useState(null);

  const handlebookSeat = (item, seat, isCheckSelected, selectRow) => {
    if (!socket) {
      return;
    }
    if (!dataUser) {
      navigate("/login");
      return;
    }
    const eventRowKey = `${idEvent}_${selectedItem?._id}`;

    if (!isCheckSelected) {
      if (item.isBuy) {
        alert("Ghế này đã được mua!");
        return;
      }
      socket?.emit("SELECT_SEAT", {
        seat,
        eventRowKey,
        price: selectRow?.ticket_price,
        _idChairName: item?._id,
        ...item,
        email: dataUser?.email,
      });
      setSelectChair([
        ...selectChair,
        {
          seat,
          eventRowKey,
          price: selectRow?.ticket_price,
          _idChairName: item?._id,
          ...item,
          email: dataUser?.email,
        },
      ]);
    } else {
      if (isCheckSelected.email !== dataUser?.email) {
        alert("This seat is already booked by others!");
        return;
      }

      setSelectChair(selectChair?.filter((item) => item.seat !== seat));
      socket?.emit("UNSELECT_SEAT", {
        seat,
        eventRowKey,
        _idChairName: item._id,
        ...item,
      });
    }
  };

  useEffect(() => {
    if (!idEvent || !selectedItem || !dataInfo) return;

    if (!dataUser) {
      alert("Vui lòng đăng nhập để book chỗ");
      return;
    }
  }, [dataInfo, dataUser, idEvent, selectedItem]);

  useEffect(() => {
    const eventRowKey = `${idEvent}_${selectedItem?._id}`;

    const socket = io(URL_SOCKET, {
      transports: ["websocket"],
      query: { email: dataUser?.email },
    });
    setSocket(socket);
    socket.on("connect", () => setId(socket.id));
    socket.on("disconnect", () => {
      console.log("eventRowKey", eventRowKey);
      console.log("socket disconnected!");
    });
    socket.emit("join_booking_room", eventRowKey);
    socket.on("update_booking_room", (data) => {
      // console.log("update_booking_room: ", data);
      setSelectChair(data);
      // rerenderSeats();
    });
    socket.on("update_dialog_close", (data) => {
      console.log("update_dialog_close", data);
    });
    return () => {
      setSocket(null);
      socket.off("connect", () => console.log("socket connected!"));
      socket.off("disconnect", () => console.log("socket disconnected!"));
      socket.off("USER", (data) => console.log(data));
      socket.off("update_booking_room", (data) => console.log(data));
      socket.off("OVER_TIME", (data) => console.log(data));
    };
  }, [idEvent, selectedItem]);

  const handleOpen = () => {
    if (!dataInfo) {
      setEventId(`book-tickets/${idEvent}`);
      navigate("/login");
      return;
    }
    const maxWidth = window.innerWidth * 0.9;
    const maxHeight = window.innerHeight * 0.9;
    setDialogWidth(`${maxWidth}px`);
    setDialogHeight(`${maxHeight}px`);
    setOpen(true);
  };

  function checkEventTicketSalesEnd(item) {
    const eventDate = new Date(
      dataEventDetail?.sales_date?.end_sales_date
    ).getTime();
    const timeNow = new Date().getTime();
    if (timeNow > eventDate) {
      setIsOpenDialogNotify(true);
    } else {
      setSelectedItem(item);
      handleOpen();
      setSelectRows(item?.rows);
    }
  }

  const handleOpenBuyTick = (item, index) => {
    console.log("item", item);
    setDayNumber(index + 1);
    checkEventTicketSalesEnd(item);
  };

  const getSelectChairInArea = async () => {
    const requestData = {
      _idEvent: dataEventDetail._id,
      _idArea: selectedItem._id,
      dayNumber: dayNumber,
    };
    const reponse = await ApiEvent.selectChairInArea(requestData);
    if (reponse) {
      selectedItem(reponse.data);
    }
  };

  const handleClose = () => {
    setOpen(false);
    setTime(null);
    setSelectChair([]);
    setSelectedItem(null);
    const eventRowKey = `${idEvent}_${selectedItem?._id}`;
    if (socket) {
      console.log("aaaaaa", dataEventDetail);
      socket?.emit("CLOSE_DIALOG", { eventRowKey, email: dataUser?.email });
    }
    socket?.disconnect();
  };

  useEffect(() => {
    async function getAllEvents() {
      const resEventData = await ApiClient.getAllEvents();
      const filterEvent = await resEventData?.events?.filter((event) => {
        return event._id !== idEvent;
      });
      setDataEvents(filterEvent);
    }
    getAllEvents();
    if (idEvent) {
      async function getEventDetail() {
        const response = await ApiClient.geDetailEvent({ _idEvent: idEvent });
        setDataEventDetail(response.event);
        setOrganizer(response.organizer);
      }
      getEventDetail();
    }
  }, [idEvent]);

  const [value, setValue] = React.useState("1");

  function handleSeatColor(item, isCheckSelected) {
    if (isCheckSelected) {
      if (isCheckSelected.email === dataUser?.email) {
        return "#ff15a0";
      }
      return "#BDBDBD";
    }
    if (item.isBuy) {
      return "#46494c";
    }
    return "#6908bd";
  }

  const handleChangeTab = (event, newValue) => {
    setValue(newValue);
  };

  const totalByTicket = selectChair
    ?.filter((item) => item.email === dataUser?.email)
    .reduce((accumulator, seat) => accumulator + seat.price, 0);
  //call api create payment
  const opener = window;
  const handleBuyTickect = async (event) => {
    event.preventDefault();
    const windowHeight = 1000;
    const windowWidth = 1000;
    const windowLeft = window.screen.width / 2 - windowWidth / 2;
    const windowTop = window.screen.height / 2 - windowHeight / 2;
    try {
      const listChairIds = selectChair
        .filter((item) => item.email === dataUser?.email)
        .map((item) => item._id);
      const eventId = dataEventDetail._id;
      const requestData = {
        _idEvent: eventId,
        chairIds: listChairIds,
        amount: totalByTicket,
      };

      const response = await ApiClient.paymentTicket(requestData);
      if (response) {
        window.open(
          response.data.order_url,
          "_blank",
          `height=${windowHeight}, width=${windowWidth}, top=${windowTop}, left=${windowLeft}`,
          opener
        );
        handleCloseConfirm();
        setLocalStorageListChairId(listChairIds);
        setLocalStorageEventId(eventId);
      }
    } catch (e) {
      alert(e.response.data.message);
    }
  };

  const handleClickChair = async (item, selectRow, isCheckSelected, seat) => {
    handlebookSeat(item, seat, isCheckSelected, selectRow);
  };

  function checkStatusConfirm(selectChair, dataUser) {
    const checkEmail = selectChair.filter(
      (item) => item.email === dataUser?.email
    );

    if (checkEmail.length > 0) {
      setStatusConfrim(false);
      if (!countDown) {
        setTime(600);
        setCountDown(true);
      }
    } else {
      setStatusConfrim(true);
      setCountDown(false);
      setTime(null);
    }
  }

  useEffect(() => {
    checkStatusConfirm(selectChair, dataUser);
  }, [selectChair]);

  const handleOpenConfirm = () => {
    setOpenConfirm(true);
  };
  const handleCloseConfirm = () => {
    setOpenConfirm(false);
  };

  useEffect(() => {
    if (!open) {
      setSelectChair([]);
      setCountDown(false);
      setTime(null);
    } else {
      if (time === 0 && time !== null) {
        setOpen(false);
        setTime("Hết giờ rồi  mời book lại!");
        socket.disconnect();
      }
    }
  }, [open, time]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (time > 0) {
        setTime(time - 1);
        const min = Math.floor(time / 60);
        const sec = time % 60;
        setMinutes(min);
        setSeconds(sec);
      }
    }, 1000);

    return () => clearInterval(intervalId);
  }, [time]);

  // Đặt ngày và giờ diễn ra sự kiện
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const countTimeLeft = (eventSale) => {
    const intervalId = setInterval(() => {
      const now = new Date().getTime();
      const timeDifference = eventSale - now;

      if (timeDifference > 0) {
        const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
        const hours = Math.floor(
          (timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const minutes = Math.floor(
          (timeDifference % (1000 * 60 * 60)) / (1000 * 60)
        );
        const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

        setTimeLeft({ days, hours, minutes, seconds });
      } else {
        console.log("time end");
        clearInterval(intervalId);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    }, 1000);

    return () => clearInterval(intervalId);
  };

  useEffect(() => {
    const eventStartSale = new Date(
      dataEventDetail?.sales_date?.start_sales_date
    );
    const eventEndSale = new Date(dataEventDetail?.sales_date?.end_sales_date);
    const getTimeEvenStartSale = eventStartSale.getTime();
    const getTimeEvenEndSale = eventEndSale.getTime();
    const now = new Date().getTime();
    if (now < getTimeEvenStartSale) {
      setIsOpenSale(true);
      setStatusTime(true);
      countTimeLeft(eventStartSale);
    } else if (getTimeEvenStartSale <= now && now <= getTimeEvenEndSale) {
      setIsOpenSale(false);
      setStatusTime(true);
      countTimeLeft(eventEndSale);
    } else {
      setStatusTime(false);
    }
  }, [dataEventDetail]);

  const [showEvent, setShowEvent] = useState(null);
  return (
    <Box sx={{ flexGrow: 1 }}>
      <div
        style={{
          width: "100%",
          position: "relative",
          background: `url(${dataEventDetail?.eventImage}) no-repeat center `,
          height: "550px",
        }}>
        <div
          style={{
            height: "100%",
            width: "100%",
            background: "rgb(0 0 0 / 84%)",
            position: "absolute",
          }}></div>
        <Stack
          direction={"row"}
          gap={"40px"}
          style={{
            margin: "0 auto",
            position: "relative",
            zIndex: "2",
            width: "80%",
            height: "100%",
          }}>
          <div style={{ width: "500px" }}>
            <img
              alt=""
              loading="lazy"
              style={{ objectFit: "contain" }}
              src={dataEventDetail?.eventImage}
            />
          </div>
          <Stack direction={"row"} gap={"40px"} alignContent={"center"}>
            <InformationEvent
              dataEventDetail={dataEventDetail}
              organizer={organizer}
            />
            <Stack direction={"column"} gap={"20px"} style={{ margin: "auto" }}>
              {statusTime ? (
                <>
                  <Stack direction={"row"} gap={"10px"}>
                    <Typography variant="h6" style={{ color: "white" }}>
                      {isOpenSale
                        ? "Ticket sales will open later:"
                        : "Ticket sales have:"}
                    </Typography>
                  </Stack>
                  <CountTime timeLeft={timeLeft} />
                </>
              ) : (
                <>
                  <Stack direction={"row"} gap={"10px"}>
                    <Typography variant="h6" style={{ color: "red" }}>
                      Ticket sales have been stopped
                    </Typography>
                  </Stack>
                </>
              )}

              <Stack
                style={{
                  padding: "20px",
                  borderRadius: "10px",
                  background: "white",
                  color: "black",
                  height: "max-content",
                  margin: "auto",
                }}>
                <Stack direction={"row "} gap={"10px"} gridColumn={"10px"}>
                  <span
                    style={{
                      width: "50px",
                      height: "50px",
                      borderRadius: "100%",
                      background: "skyblue",
                      color: "green",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}>
                    <CalendarMonthIcon />
                  </span>
                  <Stack direction={"column"}>
                    <Typography>
                      {statusTime
                        ? "Opening time for sale : "
                        : "The time the event takes place"}
                    </Typography>
                    <Stack direction={"row"} gap={"10px"}>
                      <Typography>
                        {statusTime
                          ? new Date(
                              dataEventDetail?.sales_date?.start_sales_date
                            ).toLocaleDateString()
                          : new Date(
                              dataEventDetail?.event_date[0]?.date
                            ).toLocaleDateString()}
                      </Typography>{" "}
                      -
                      <Typography>
                        {statusTime
                          ? new Date(
                              dataEventDetail?.sales_date?.end_sales_date
                            ).toLocaleDateString()
                          : new Date(
                              dataEventDetail?.event_date[
                                dataEventDetail?.event_date.length - 1
                              ]?.date
                            ).toLocaleDateString()}
                      </Typography>
                    </Stack>
                  </Stack>
                </Stack>
              </Stack>
            </Stack>
          </Stack>
        </Stack>
        <Grid
          style={{
            margin: "100px auto",
            position: "relative",
            zIndex: "2",
            width: "80%",
            height: "100%",
          }}
          container
          spacing={2}>
          <Grid item xs={12}>
            <Grid container spacing={2}>
              <Grid item xs={5}>
                <TabContext value={value}>
                  <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                    <TabList
                      onChange={handleChangeTab}
                      aria-label="lab API tabs example">
                      <Tab label="Ticket infomation" value="1" />
                      <Tab label="About" value="2" />
                    </TabList>
                  </Box>
                  <TabPanel value="1">
                    <Stack>
                      <Stack
                        marginTop={"30px"}
                        direction={"column"}
                        gap={"20px"}>
                        {dataEventDetail?.event_date?.length > 0 &&
                          dataEventDetail?.event_date?.map((itemEvent) => {
                            return (
                              <Box key={itemEvent._id}>
                                <StackBookNow
                                  itemEvent={itemEvent}
                                  setShowEvent={setShowEvent}
                                />
                                {itemEvent?._id === showEvent && (
                                  <Box marginTop={"20px"}>
                                    {itemEvent.event_areas.map(
                                      (item, index) => {
                                        return (
                                          <StackBuyTicket
                                            index={index}
                                            item={item}
                                            handleOpenBuyTick={
                                              handleOpenBuyTick
                                            }
                                          />
                                        );
                                      }
                                    )}
                                  </Box>
                                )}
                              </Box>
                            );
                          })}
                      </Stack>
                      <ModalStyled
                        sx={{
                          "& .MuiDialog-paper": {
                            width: dialogWidth,
                            height: dialogHeight,
                          },
                        }}
                        open={open}
                        onClose={handleClose}>
                        <Box sx={{ ...style, width: "70%" }}>
                          <div
                            style={{
                              width: "100%",
                              height: "60px",
                              background: "#a9a90a",
                              display: "flex",
                              fontWeight: "bold",
                              color: "white",
                              justifyContent: "center",
                              alignItems: "center",
                              position: "relative",
                            }}>
                            <div
                              style={{
                                position: "absolute",
                                top: "50%",
                                transform: "translateY(-50%)",
                                left: "10px",
                                color: "white",
                                zIndex: 2,
                                display: "flex",
                                height: "30px",
                                width: "30px",
                              }}
                              onClick={handleClose}>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="w-6 h-6">
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M15.75 19.5L8.25 12l7.5-7.5"
                                />
                              </svg>
                            </div>
                            <span>Buy ticket</span>
                          </div>
                          <Stack
                            direction={"column"}
                            alignItems={"center"}
                            style={{ background: "black", padding: "20px" }}>
                            {" "}
                            <div style={{ margin: "auto", width: "80%" }}>
                              <img src={imageScreen} alt="" />
                            </div>
                            <Box
                              component={"div"}
                              height={"300px"}
                              width={"80%"}
                              style={{ overflow: "auto" }}>
                              <Stack direction={"column"} gap={"30px"}>
                                {selectRows?.length > 0 &&
                                  selectRows?.map((selectRow) => {
                                    return (
                                      <Stack
                                        direction={"row"}
                                        gap={"20px"}
                                        key={selectRow._id}>
                                        <Stack
                                          direction={"column"}
                                          gap={"10px"}>
                                          <Typography
                                            variant="h3"
                                            color={"white"}>
                                            {selectRow?.row_name}
                                          </Typography>
                                        </Stack>
                                        <Stack direction={"row"} gap={"15px"}>
                                          {selectRow?.chairs?.map(
                                            (item, index) => {
                                              const isCheckSelected =
                                                selectChair?.length > 0 &&
                                                selectChair?.find((itemc) => {
                                                  return (
                                                    itemc._idChairName ===
                                                    item._id
                                                  );
                                                });
                                              return (
                                                <div
                                                  onClick={() => {
                                                    handleClickChair(
                                                      item,
                                                      selectRow,
                                                      isCheckSelected,
                                                      item._id
                                                    );
                                                  }}
                                                  key={index}
                                                  style={{
                                                    width: "50px",
                                                    height: "50px",
                                                    borderRadius: "5px",
                                                    display: "flex",
                                                    justifyContent: "center",
                                                    alignItems: "center",
                                                    color: "white",
                                                    cursor: "pointer",
                                                    backgroundColor: `${handleSeatColor(
                                                      item,
                                                      isCheckSelected
                                                    )}`,
                                                  }}>
                                                  {item.chair_name}
                                                </div>
                                              );
                                            }
                                          )}
                                        </Stack>
                                      </Stack>
                                    );
                                  })}
                              </Stack>
                            </Box>
                            <Stack
                              color={"white"}
                              marginTop={"10px"}
                              direction={"row"}
                              gap={"40px"}>
                              <Stack direction={"row"} gap={"10px"}>
                                <Stack
                                  direction={"row"}
                                  alignItems={"center"}
                                  gap={"20px"}>
                                  <div
                                    style={{
                                      background: "#46494c",
                                      height: "25px",
                                      width: "25px",
                                      borderRadius: "4px",
                                    }}></div>
                                  <span>Reserved</span>
                                </Stack>
                                <Stack
                                  direction={"row"}
                                  alignItems={"center"}
                                  gap={"10px"}>
                                  <div
                                    style={{
                                      background: "#BDBDBD",
                                      height: "25px",
                                      width: "25px",
                                      borderRadius: "4px",
                                    }}></div>
                                  <span>On Hold</span>
                                </Stack>
                                <Stack
                                  direction={"row"}
                                  alignItems={"center"}
                                  gap={"10px"}>
                                  <div
                                    style={{
                                      background: "#6908bd",
                                      height: "25px",
                                      width: "25px",
                                      borderRadius: "4px",
                                    }}></div>
                                  <span>Available</span>
                                </Stack>
                                <Stack
                                  direction={"row"}
                                  alignItems={"center"}
                                  gap={"10px"}>
                                  <div
                                    style={{
                                      background: "#ff15a0",
                                      height: "25px",
                                      width: "25px",
                                      borderRadius: "4px",
                                    }}></div>
                                  <span>Your selected</span>
                                </Stack>
                              </Stack>
                            </Stack>
                            <Typography
                              variant="body2"
                              color={"white"}
                              marginTop={"20px"}>
                              See detailed images and chair information
                            </Typography>
                          </Stack>
                          <Stack padding={"20px"}>
                            <Stack
                              direction={"row"}
                              gap={"20px"}
                              alignItems={"center"}>
                              {time > 0 && (
                                <Typography variant="h4">
                                  Thời gian còn lại: {minutes < 10 ? "0" : ""}
                                  {minutes}:{seconds < 10 ? "0" : ""}
                                  {seconds}
                                </Typography>
                              )}
                            </Stack>

                            <Stack
                              direction={"row"}
                              padding={"15px 0"}
                              style={{ color: "gray", width: "100%" }}
                              alignItems={"center"}
                              justifyContent={"space-between"}
                              flexWrap={"wrap"}>
                              <Grid container spacing={3}>
                                <Grid item sx={6} md={6}>
                                  <FormControl
                                    fullWidth
                                    sx={{ m: 1 }}
                                    variant="standard">
                                    <InputLabel htmlFor="standard-adornment-amount">
                                      Fullname
                                    </InputLabel>

                                    <Input
                                      disabled
                                      defaultValue={dataInfo?.full_name}
                                      id="standard-adornment-amount"
                                    />
                                  </FormControl>
                                </Grid>
                                <Grid item sx={6} md={6}>
                                  <FormControl
                                    fullWidth
                                    sx={{ m: 1 }}
                                    variant="standard">
                                    <InputLabel htmlFor="standard-adornment-amount">
                                      Phone number
                                    </InputLabel>
                                    <Input
                                      disabled
                                      defaultValue={dataInfo?.phone}
                                      id="standard-adornment-amount"
                                    />
                                  </FormControl>
                                </Grid>
                              </Grid>
                              <Grid container spacing={3}>
                                <Grid item sx={6} md={6}>
                                  <FormControl
                                    fullWidth
                                    sx={{ m: 1 }}
                                    variant="standard">
                                    <InputLabel htmlFor="standard-adornment-amount">
                                      Enter email
                                    </InputLabel>
                                    <Input
                                      disabled
                                      defaultValue={dataUser?.email}
                                      id="standard-adornment-amount"
                                    />
                                  </FormControl>
                                </Grid>
                                <Grid item sx={6} md={6}>
                                  <Stack
                                    direction={"column"}
                                    alignSelf={"end"}
                                    borderBottom={"1px solid gray"}>
                                    <label
                                      htmlFor=""
                                      style={{ fontSize: "12px" }}>
                                      chair name
                                    </label>
                                    {/* -----------------------------------------------------------------checkvar */}
                                    <Stack>
                                      <Stack
                                        direction={"row"}
                                        alignItems={"center"}
                                        gap={"10px"}
                                        style={{
                                          padding: "5px 10px",
                                          height: "38px",
                                        }}>
                                        {selectChair?.length > 0 && (
                                          <>
                                            <div>
                                              {selectChair?.length > 0 &&
                                                selectChair
                                                  .filter(
                                                    (item) =>
                                                      item.email ===
                                                      dataUser?.email
                                                  )
                                                  .map((item) => {
                                                    return String(
                                                      item.chair_name
                                                    );
                                                  })
                                                  .join(",")}
                                            </div>
                                          </>
                                        )}
                                      </Stack>
                                    </Stack>
                                  </Stack>
                                </Grid>
                              </Grid>
                            </Stack>

                            <Divider />
                            <Stack
                              direction={"row"}
                              justifyContent={"space-between"}
                              marginTop={"15px"}
                              alignItems={"center"}>
                              <Stack>
                                <Typography variant="body2" color={"gray"}>
                                  Total amount
                                </Typography>
                                <Typography variant="h6">
                                  {Number(totalByTicket)?.toLocaleString()} VNĐ
                                </Typography>
                              </Stack>
                              <Button
                                disabled={statusConfrim}
                                type="button"
                                style={{
                                  background: `${
                                    statusConfrim ? "gray" : "#bfad17"
                                  }`,
                                  color: "white",
                                  fontWeight: "bold",
                                  padding: "10px 20px",
                                }}
                                onClick={(event) => handleOpenConfirm()}>
                                Confirm
                              </Button>
                              <Modal
                                open={openConfrm}
                                onClose={handleCloseConfirm}
                                aria-labelledby="child-modal-title"
                                aria-describedby="child-modal-description">
                                <Box
                                  sx={{
                                    ...style,
                                    width: 500,
                                    padding: "20px",
                                    borderRadius: "10px",
                                  }}>
                                  <Stack direction={"column"}>
                                    <Stack
                                      direction={"row"}
                                      padding={" 10px 0"}>
                                      <label
                                        htmlFor=""
                                        style={{
                                          fontWeight: "500",
                                          fontSize: "18px",
                                        }}>
                                        Confirm chair name:{" "}
                                      </label>
                                      <Stack
                                        marginLeft={"10px"}
                                        direction={"row"}
                                        alignItems={"center"}>
                                        {selectChair?.length > 0 && (
                                          <>
                                            <span
                                              style={{
                                                fontSize: "18px",
                                                fontWeight: "700",
                                              }}>
                                              {selectChair?.length > 0 &&
                                                selectChair
                                                  .filter(
                                                    (item) =>
                                                      item.email ===
                                                      dataUser?.email
                                                  )
                                                  .map((item) => {
                                                    return String(
                                                      item.chair_name
                                                    );
                                                  })
                                                  .join(",")}
                                            </span>
                                          </>
                                        )}
                                      </Stack>
                                    </Stack>
                                    <Stack
                                      direction={"row"}
                                      alignItems={"center"}
                                      padding={" 10px 0"}>
                                      <label
                                        htmlFor=""
                                        style={{
                                          fontWeight: "500",
                                          fontSize: "18px",
                                        }}>
                                        Email recieve ticket:{" "}
                                      </label>
                                      <span style={{ marginLeft: "10px" }}>
                                        {dataUser?.email}
                                      </span>
                                    </Stack>
                                  </Stack>
                                  <Stack
                                    direction={"row"}
                                    spacing={2}
                                    marginTop={"30px"}
                                    justifyContent={"center"}
                                    alignItems={"center"}>
                                    <Button
                                      type="button"
                                      variant="outlined"
                                      onClick={handleCloseConfirm}>
                                      Close
                                    </Button>
                                    <Button
                                      type="button"
                                      style={{ backgroundColor: "#bfad17" }}
                                      variant="contained"
                                      onClick={(e) => handleBuyTickect(e)}>
                                      Buy Ticket
                                    </Button>
                                  </Stack>
                                </Box>
                              </Modal>
                            </Stack>
                          </Stack>
                        </Box>
                      </ModalStyled>
                      <DialogNotification
                        isDialogOpen={isOpenDialogNotify}
                        setIsDialogOpen={setIsOpenDialogNotify}
                      />
                    </Stack>
                  </TabPanel>
                  <TabPanel value="2">
                    <Stack
                      direction={"row"}
                      alignItems={"center"}
                      justifyContent={"space-between"}>
                      <Typography variant="h4">About</Typography>
                    </Stack>
                    <Stack>{dataEventDetail?.event_description}</Stack>
                  </TabPanel>
                </TabContext>
              </Grid>
              <Grid item xs={7}>
                <div style={{ height: "500px", marginTop: "50px" }}>
                  <img
                    style={{ objectFit: "fill" }}
                    height={"100%"}
                    src={dataEventDetail?.type_layout}
                    alt=""
                    loading="lazy"
                  />
                </div>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Typography component={"div"} variant="h3">
              Events
            </Typography>
            <Carousel
              arrows
              autoPlaySpeed={3000}
              centerMode={false}
              containerClass="container-with-dots"
              focusOnSelect={false}
              infinite
              keyBoardControl
              pauseOnHover
              renderDotsOutside={false}
              responsive={{
                desktop: {
                  breakpoint: {
                    max: 3000,
                    min: 1024,
                  },
                  items: 4,
                },
              }}
              rewind={false}
              shouldResetAutoplay
              showDots={false}
              slidesToSlide={1}
              autoPlay={true}
              swipeable={true}
              draggable={true}
              partialVisible={false}>
              {dataEvents?.length > 0 &&
                dataEvents.map((event) => {
                  return (
                    <Card
                      onClick={() => {
                        navigate(`/book-tickets/${event?._id}`);
                      }}
                      key={event._id}
                      sx={{
                        display: "flex",
                        gap: "10px",
                        flexDirection: "column",
                        margin: "10px",
                      }}>
                      <CardMedia
                        component="img"
                        sx={{
                          // width: 300,
                          height: "250px",
                          borderRadius: "10px",
                          cursor: "pointer",
                          objectFit: "fill",
                        }}
                        image={
                          event.eventImage ||
                          "https://t4.ftcdn.net/jpg/02/51/95/53/360_F_251955356_FAQH0U1y1TZw3ZcdPGybwUkH90a3VAhb.jpg"
                        }
                        alt="Live from space album cover"
                      />
                      <Stack direction={"column"} style={{ padding: "20px" }}>
                        <CardContent
                          sx={{ flex: "1 0 auto" }}
                          style={{ padding: 0 }}>
                          <Chip
                            label="18+"
                            style={{
                              borderRadius: "4px",
                              background: "red",
                              fontWeight: "bold",
                              color: "white",
                              fontSize: "12px",
                              padding: "5px 0",
                            }}
                          />
                          <Typography component="div" variant="h6">
                            {event.event_name}
                          </Typography>
                          <Typography
                            variant="subtitle1"
                            color="gray"
                            component="div">
                            {event.type_of_event}
                          </Typography>
                        </CardContent>
                      </Stack>
                    </Card>
                  );
                })}
            </Carousel>
            <div style={{ height: "200px" }}></div>
          </Grid>
        </Grid>
      </div>
    </Box>
  );
};

const ModalStyled = styled(Modal)`
  .MuiBox-root {
    border: none;
    overflow: hidden;
    border-radius: 10px;
  }
`;
export default BookTickets;
