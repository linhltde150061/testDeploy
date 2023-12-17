import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import {
  Grid,
  Button,
  TextField,
  Typography,
  Avatar,
  Stack,
} from "@mui/material";
import MonochromePhotosIcon from "@mui/icons-material/MonochromePhotos";
import { ToastContainer, toast } from "react-toastify";
import { toastOptions } from "../../Assets/Constant/Common/dataCommon";
import "react-toastify/dist/ReactToastify.css";
import "../../Assets/CSS/Organizer/CreateTiket.css";
import ApiEvent from "../../API/Event/ApiEvent";
import InputCustom from "../../Components/Common/Input/InputCustom";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import PostAddSharpIcon from "@mui/icons-material/PostAddSharp";
import FormSubmit from "../../Components/Common/FormCustom/FormSubmit";
import OfflinePinIcon from '@mui/icons-material/OfflinePin';
import WarningIcon from '@mui/icons-material/Warning';
import {
  getLocalStorageUserData,
  setLocalStorageUserInfo,
  getLocalStorageUserInfo,
  setLocalStorageTicketInfo,
  getLocalStorageTicketInfo,
  getLocalStorageEventInfo,
} from "../../Store/userStore";
import { URL_SOCKET } from "../../API/ConstAPI";
import { io } from "socket.io-client";

export const handleFileInputChange = (e, setSelectedFile, setTypeLayout) => {
  const selectedFile = e.target.files[0];
  setSelectedFile(selectedFile);
  if (selectedFile) {
    const reader = new FileReader();
    reader.readAsDataURL(selectedFile);
    reader.onloadend = () => {
      setTypeLayout(reader.result);
    };
  }
};

function UpdateTicket({ event }) {
  const dataUser = getLocalStorageUserData();
  const dataInfo = getLocalStorageUserInfo();

  function updateDataEventInfo() {
    const newDataEventInfo = getLocalStorageEventInfo();
    dataEventInfo = newDataEventInfo;
  }
  // Sự kiện storage sẽ được kích hoạt mỗi khi có thay đổi trong localStorage
  window.addEventListener("storage", (event) => {
    if (event.key === "ticketInfo") {
      updateDataEventInfo();
    }
  });
  // Khởi tạo dataEventInfo ban đầu
  let dataEventInfo = getLocalStorageEventInfo();

  function updateDataEventInfo() {
    const newDataTicketInfo = getLocalStorageTicketInfo();
    dataTicket = newDataTicketInfo;
  }
  // Sự kiện storage sẽ được kích hoạt mỗi khi có thay đổi trong localStorage
  window.addEventListener("storage", (event) => {
    if (event.key === "eventInfo") {
      updateDataEventInfo();
    }
  });
  let dataTicket = getLocalStorageTicketInfo();

  const navigate = useNavigate();

  const alphabet = "ABCDEFGHIJKLMNOPQRST".split("");
  const [selectedFile, setSelectedFile] = useState(null);
  const fileInputRef = useRef(null);
  const today = new Date().toISOString().slice(0, 10);
  const [typeLayout, setTypeLayout] = useState(dataTicket?.type_layout || null);

  //socket
  const socket = io(URL_SOCKET, { transports: ["websocket"] });
  const organizerId = dataInfo._id;
  const organizerName = dataInfo.organizer_name;

  useEffect(() => {
    socket?.emit("organizerId", organizerId);
  }, [socket, organizerId]);

  const handleNewEvent = () => {
    console.log("ran 1st");
    socket.emit("new_event", {
      senderName: organizerName,
      receiverName: "6544b5f73dd2f66548b5d85a",
    });
  };

  const handleIconClick = () => {
    fileInputRef.current.click();
  };

  const [maxTicket, setMaxTicket] = useState(
    dataTicket?.maxTicketInOrder || "5"
  );

  function formatNumber(n) {
    // Check if n is a string
    if (typeof n !== 'string') {
      n = String(n);
    }
    return n.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  function formatString(n) {
    // Kiểm tra xem n có phải là chuỗi không
    if (typeof n === 'string' || n instanceof String) {
      return n.replace(/,/g, '');
    } else {
      n = String(n);
      return n.replace(/,/g, '');
    }
  }

  const defaultEventDate = dataTicket?.event_date?.map((eventDate) => {
    const trimmedDateEvent = moment(eventDate?.dateEvent).format(
      "YYYY-MM-DDTkk:mm"
    );
    return {
      date_number: eventDate?.date_number,
      dateEvent: trimmedDateEvent,
      tickets: eventDate?.event_areas?.map((ticket) => {
        return {
          id_ticket: ticket?.id_areas,
          name_ticket: ticket?.name_areas,
          total_row: ticket?.total_row,
          ticket_price: ticket?.ticket_price,
          rows: ticket?.rows?.map((row) => {
            return {
              row_name: row?.row_name,
              total_seat: row?.total_chair,
            };
          }),
        };
      }),
    };
  });
  const [eventDate, setEventDate] = useState(defaultEventDate);

  const startSaleDate = new Date(dataTicket?.sales_date?.start_sales_date);
  const endSaleDate = new Date(dataTicket?.sales_date?.end_sales_date);

  const startSale = startSaleDate?.toISOString().split("T")[0];
  const endSale = endSaleDate?.toISOString().split("T")[0];
  const [saleDate, setSaleDate] = useState({
    startSaleDate: startSale || today,
    endSaleDate: endSale || today,
  });

  const [eventInfo, setEventInfo] = useState({
    event_name: dataEventInfo.event_name,
    type_of_event: dataEventInfo.type_of_event,
    eventImage: dataEventInfo.eventImage,
    type_layout: typeLayout,
    event_description: dataEventInfo.event_description,
    maxTicketInOrder: maxTicket,
    sales_date: {
      start_sales_date: saleDate.startSaleDate,
      end_sales_date: saleDate.endSaleDate,
    },
    event_location: {
      city: dataEventInfo.address.city,
      district: dataEventInfo.address.district,
      ward: dataEventInfo.address.ward,
      specific_address: dataEventInfo.address.specific_address,
    },
    event_date: eventDate
      ? eventDate.map((event) => ({
          date_number: event.date_number,
          dateEvent: event.dateEvent,
          event_areas: event.tickets.map((area) => ({
            id_areas: area.id_ticket,
            name_areas: area.name_ticket,
            total_row: area.total_row,
            ticket_price: area.ticket_price,
            rows: area.rows.map((row) => ({
              row_name: row.row_name,
              total_chair: row.total_seat,
            })),
          })),
        }))
      : [],
    isActive: false,
  });

  const [eventInfoData, setEventInfoData] = useState({
    event_name: eventInfo.event_name,
    type_of_event: eventInfo.type_of_event,
    eventImage: eventInfo.eventImage,
    type_layout: eventInfo.type_layout,
    event_description: eventInfo.event_description,
    maxTicketInOrder: eventInfo.maxTicketInOrder,
    sales_date: {
      start_sales_date: eventInfo.sales_date.start_sales_date,
      end_sales_date: eventInfo.sales_date.end_sales_date,
    },
    event_location: {
      city: eventInfo.event_location.city,
      district: eventInfo.event_location.district,
      ward: eventInfo.event_location.ward,
      specific_address: eventInfo.event_location.specific_address,
    },
    event_date: eventInfo.event_date
      ? eventInfo.event_date.map((event) => ({
          date_number: event.date_number,
          dateEvent: event.dateEvent,
          event_areas: event.event_areas.map((area) => ({
            name_areas: area.name_areas,
            total_row: area.total_row,
            ticket_price: formatString(area.ticket_price),
            rows: area.rows.map((row) => ({
              row_name: row.row_name,
              total_chair: row.total_chair,
            })),
          })),
        }))
      : [],
    isActive: false,
  });

  useEffect(() => {
    setEventInfoData((prevData) => ({
      ...prevData,
      event_name: eventInfo.event_name,
      type_of_event: eventInfo.type_of_event,
      eventImage: eventInfo.eventImage,
      type_layout: eventInfo.type_layout,
      event_description: eventInfo.event_description,
      maxTicketInOrder: eventInfo.maxTicketInOrder,
      sales_date: {
        start_sales_date: eventInfo.sales_date.start_sales_date,
        end_sales_date: eventInfo.sales_date.end_sales_date,
      },
      event_location: {
        city: eventInfo.event_location.city,
        district: eventInfo.event_location.district,
        ward: eventInfo.event_location.ward,
        specific_address: eventInfo.event_location.specific_address,
      },
      event_date: eventInfo.event_date
        ? eventInfo.event_date.map((event) => ({
            date_number: event.date_number,
            dateEvent: event.dateEvent,
            event_areas: event.event_areas.map((area) => ({
              name_areas: area.name_areas,
              total_row: area.total_row,
              ticket_price: formatString(area.ticket_price),
              rows: area.rows.map((row) => ({
                row_name: row.row_name,
                total_chair: row.total_chair,
              })),
            })),
          }))
        : [],
    }));
  }, [eventInfo]);

  console.log(eventInfoData);

  useEffect(() => {
    setEventInfo((prevEvent) => ({
      ...prevEvent,
      type_layout: typeLayout || null,
    }));
  }, [typeLayout]);

  const addForm = () => {
    const newForm = {
      date_number: eventDate.length + 1,
      dateEvent: "",
      tickets: [],
    };

    setEventDate((prevEventDate) => {
      const updatedEventDate = [...prevEventDate, newForm];

      setEventInfo((prevEventInfo) => {
        const updatedEventInfo = { ...prevEventInfo };
        updatedEventInfo.event_date = updatedEventDate.map((form) => ({
          date_number: form.date_number,
          dateEvent: form.dateEvent,
          event_areas: form.tickets.map((ticket) => ({
            id_areas: ticket.id_ticket,
            name_areas: ticket.name_ticket,
            total_row: ticket.total_row,
            ticket_price: ticket.ticket_price,
            rows: ticket.rows.map((row) => ({
              row_name: row.row_name,
              total_chair: row.total_seat,
            })),
          })),
        }));
        return updatedEventInfo;
      });

      // Return the updatedEventDate to be set as the new state
      return updatedEventDate;
    });
  };

  const addTicket = (formId) => {
    setEventDate((prevEventDate) => {
      const updatedEventDates = prevEventDate.map((form) => {
        if (form.date_number === formId) {
          const newTicket = {
            id_ticket: Date.now(),
            name_ticket: "",
            total_row: "",
            ticket_price: "",
            rows: [],
          };
          return {
            ...form,
            tickets: [...form.tickets, newTicket],
          };
        } else {
          return form;
        }
      });

      setEventInfo((prevEventInfo) => {
        const updatedEventInfo = { ...prevEventInfo };
        updatedEventInfo.event_date = updatedEventDates.map((form) => ({
          date_number: form.date_number,
          dateEvent: form.dateEvent,
          event_areas: Array.isArray(form.tickets)
            ? form.tickets.map((ticket) => ({
                id_areas: ticket.id_ticket,
                name_areas: ticket.name_ticket,
                total_row: ticket.total_row,
                ticket_price: ticket.ticket_price,
                rows: ticket.rows.map((row) => ({
                  row_name: row.row_name,
                  total_chair: row.total_seat,
                })),
              }))
            : [],
        }));

        return updatedEventInfo;
      });

      return updatedEventDates;
    });
  };

  const removeForm = (formId) => {
    setEventDate((prevEventDate) => {
      const updatedEventDate = prevEventDate.filter(
        (form) => form.date_number !== formId
      );

      // Update eventInfo based on the updatedEventDate
      setEventInfo((prevEventInfo) => {
        const updatedEventInfo = { ...prevEventInfo };
        updatedEventInfo.event_date = updatedEventDate.map((form) => ({
          date_number: form.date_number,
          dateEvent: form.dateEvent,
          event_areas: form.tickets.map((ticket) => ({
            id_areas: ticket.id_ticket,
            name_areas: ticket.name_ticket,
            total_row: ticket.total_row,
            ticket_price: ticket.ticket_price,
            rows: ticket.rows.map((row) => ({
              row_name: row.row_name,
              total_chair: row.total_seat,
            })),
          })),
        }));
        return updatedEventInfo;
      });

      return updatedEventDate;
    });
  };

  const removeTicket = (ticketIdToRemove, formId) => {
    setEventDate((prevEventDate) => {
      const updatedEventDates = prevEventDate.map((form) => {
        if (form.date_number === formId) {
          const updatedTickets = form.tickets.filter(
            (formTicket) => formTicket.id_ticket !== ticketIdToRemove
          );
          return { ...form, tickets: updatedTickets };
        } else {
          return form;
        }
      });

      updateDetailTicket(updatedEventDates);

      return updatedEventDates;
    });
  };

  const handleSaleDateChange = (name, value) => {
    setSaleDate({ ...saleDate, [name]: value });
  };

  useEffect(() => {
    const updatedEventInfo = {
      ...eventInfo,
      sales_date: {
        start_sales_date: saleDate.startSaleDate,
        end_sales_date: saleDate.endSaleDate,
      },
    };
    setEventInfo(updatedEventInfo);
  }, [saleDate]);

  const handleMaxTicketChange = (value) => {
    setMaxTicket(value);
  };

  useEffect(() => {
    const updatedEventInfo = {
      ...eventInfo,
      maxTicketInOrder: maxTicket,
    };
    setEventInfo(updatedEventInfo);
  }, [maxTicket]);

  const handleDateChange = (event, formId) => {
    setEventDate((prevEventDate) => {
      const updatedEventDates = prevEventDate.map((form) => {
        if (form.date_number === formId) {
          const newDate = event instanceof Date ? event : event.target.value;
          console.log(newDate);
          return { ...form, dateEvent: newDate };
        } else {
          return form;
        }
      });

      updateDetailTicket(updatedEventDates);

      return updatedEventDates;
    });
  };

  const updateDetailTicket = (update) => {
    setEventInfo((prevEventInfo) => {
      const updatedEventInfo = { ...prevEventInfo };
      updatedEventInfo.event_date = update.map((form) => ({
        date_number: form.date_number,
        dateEvent: form.dateEvent,
        event_areas: form.tickets.map((ticket) => ({
          id_areas: ticket.id_ticket,
          name_areas: ticket.name_ticket,
          total_row: ticket.total_row,
          ticket_price: ticket.ticket_price,
          rows: ticket.rows.map((row) => ({
            row_name: row.row_name,
            total_chair: row.total_seat,
          })),
        })),
      }));
      return updatedEventInfo;
    });
  };

  const handleNameTicketChange = (e, formId, ticketId) => {
    setEventDate((prevEventDate) => {
      const updatedEventDates = prevEventDate.map((form) => {
        if (form.date_number === formId) {
          const updatedTickets = form.tickets.map((ticket) => {
            console.log(ticket);
            if (ticket.id_ticket === ticketId) {
              return { ...ticket, name_ticket: e.target.value };
            } else {
              return ticket;
            }
          });

          return { ...form, tickets: updatedTickets };
        } else {
          return form;
        }
      });

      updateDetailTicket(updatedEventDates);
      return updatedEventDates;
    });
  };

  const handlePriceTicketChange = (event, formId, ticketId) => {
    setEventDate((prevEventDate) => {
      const updatedEventTicket = prevEventDate.map((form) => {
        if (form.date_number === formId) {
          const updatedTickets = form.tickets.map((ticket) => {
            if (ticket.id_ticket === ticketId) {
              return { ...ticket, ticket_price: event.target.value };
            } else {
              return ticket;
            }
          });

          return { ...form, tickets: updatedTickets };
        } else {
          return form;
        }
      });

      updateDetailTicket(updatedEventTicket);
      return updatedEventTicket;
    });
  };

  const handleTotalRowChange = (e, formId, ticketId) => {
    setEventDate((prevEventDate) => {
      const updatedEventRows = prevEventDate.map((form) => {
        if (form.date_number === formId) {
          const updatedTickets = form.tickets.map((ticket) => {
            if (ticket.id_ticket === ticketId) {
              const rowChange = e.target.value;
              const totalRow = parseInt(rowChange, 10); // Chuyển TotalRow thành số nguyên
              const updatedRows = [];
              for (let i = 0; i < totalRow; i++) {
                updatedRows.push({
                  row_name: alphabet[i],
                  total_seat: "",
                });
              }
              return { ...ticket, total_row: rowChange, rows: updatedRows };
            } else {
              return ticket;
            }
          });

          return { ...form, tickets: updatedTickets };
        } else {
          return form;
        }
      });
      updateDetailTicket(updatedEventRows);

      return updatedEventRows;
    });
  };

  const handleSeatChange = (e, formId, ticketId, rowIndex) => {
    setEventDate((prevEventDate) => {
      const updatedEventDates = prevEventDate.map((form) => {
        if (form.date_number === formId) {
          const updatedTickets = form.tickets.map((ticket) => {
            if (ticket.id_ticket === ticketId) {
              const updatedRows = ticket.rows.map((row, index) => {
                if (index === rowIndex) {
                  return { ...row, total_seat: e.target.value };
                }
                return row;
              });
              return { ...ticket, rows: updatedRows };
            }
            return ticket;
          });
          return { ...form, tickets: updatedTickets };
        }
        return form;
      });

      updateDetailTicket(updatedEventDates);

      return updatedEventDates;
    });
  };

  useEffect(() => {
    setLocalStorageTicketInfo(eventInfo);
  }, [eventInfo]);

  const callApiUpdateEvent = async (_idEvent, _idOrganizer, eventInfo) => {
    try {
      const response = await ApiEvent.updateEvent({
        _idEvent: _idEvent,
        _idOrganizer: _idOrganizer,
        eventInfo: eventInfo,
      });

      if (response.status === true) {
        toast.success("Update Event success!", toastOptions);
        handleNewEvent();
        navigate("/success");
        setLocalStorageTicketInfo([])
        console.log(response);
      } else {
      }
    } catch (error) {
      console.log(error);
      toast.error(error, toastOptions);
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    callApiUpdateEvent(event, organizerId, eventInfoData);
  };

  return (
    <>
      <Grid
        fullwidth
        style={{
          backgroundColor: "#ffffff",
          borderRadius: "10px",
          padding: "0px 30px 30px 30px",
        }}
      >
        <FormSubmit onSubmit={handleFormSubmit}>
          <Grid style={{ display: "flex", justifyContent: "start" }}>
            <h3>
            {eventInfo.type_layout !== "" ? (
                <OfflinePinIcon sx={{ color: "green", fontSize:"30px", marginBottom:"-8px"  }} />
              ) : (
                <WarningIcon sx={{ color: "red", fontSize:"30px", marginBottom:"-8px"  }} />
              )}
              Add Photo Layout</h3>
          </Grid>
          <Grid
            style={{
              width: "100%",
              marginBottom: "10px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar
              style={{
                height: "500px",
                width: "80%",
                borderRadius: "0px",
              }}
            >
              <img
                style={{
                  objectFit: "contain",
                  width: "100%",
                  height: "100%",
                }}
                src={typeLayout}
                alt=""
              />
            </Avatar>

            <MonochromePhotosIcon
              style={{
                marginLeft: "50%",
                fontSize: "60px",
                marginTop: "-25px",
                position: "relative",
              }}
              onClick={handleIconClick}
            />
            <input
              ref={fileInputRef}
              type="file"
              style={{ display: "none" }}
              onChange={(e) =>
                handleFileInputChange(e, setSelectedFile, setTypeLayout)
              }
            />
          </Grid>
          <Grid style={{ display: "flex", justifyContent: "start" }}>
            <h3>
              {eventInfo.maxTicketInOrder !== "" ? (
                  <OfflinePinIcon sx={{ color: "green", fontSize:"30px", marginBottom:"-8px" }} />
                ) : (
                  <WarningIcon sx={{ color: "red", fontSize:"30px", marginBottom:"-8px" }} />
              )}
              Add Information Ticket</h3>
          </Grid>
          <Grid
            style={{
              padding: "30px",
              border: "1px solid black",
              // borderRadius: "5px",
              marginBottom: "20px",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Grid>
              <Grid style={{ display: "flex", justifyContent: "start" }}>
                <h3>Max Ticket In Order</h3>
              </Grid>
              <Grid
                style={{
                  padding: "30px",
                  border: "1px solid black",
                  // borderRadius: "5px",
                  width: "100%",
                }}
              >
                <Stack>
                  <InputCustom
                    type="text"
                    id="maxTicket"
                    name="maxTicket"
                    value={maxTicket}
                    setValue={handleMaxTicketChange}
                    label="Max Ticket In Order"
                  />
                </Stack>
              </Grid>
            </Grid>

            <Grid style={{ width: "70%" }}>
              <Grid style={{ display: "flex", justifyContent: "start" }}>
                <h3>Sale Event date</h3>
              </Grid>
              <Grid
                style={{
                  width: "100%",
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  padding: "30px",
                  border: "1px solid black",
                }}
              >
                <Stack style={{ width: "45%" }}>
                  <InputCustom
                    type="date"
                    id="startSaleDate"
                    name="startSaleDate"
                    value={saleDate.startSaleDate}
                    setValue={(value) =>
                      handleSaleDateChange("startSaleDate", value)
                    }
                    label="Start Date"
                  />
                </Stack>
                <Stack style={{ width: "45%" }}>
                  <InputCustom
                    type="date"
                    id="endSaleDate"
                    name="endSaleDate"
                    value={saleDate.endSaleDate}
                    setValue={(value) =>
                      handleSaleDateChange("endSaleDate", value)
                    }
                    label="End Date"
                  />
                </Stack>
              </Grid>
            </Grid>
          </Grid>
          <Grid style={{ display: "flex", justifyContent: "start" }}>
            <h3>Event Time</h3>
          </Grid>

          <Grid fullWidth>
            {eventInfo.event_date?.map((form) => (
              <Grid className="formEventDate" key={form.date_number}>
                <Grid className="headerFormEventDate" fullWidth>
                  <p style={{ margin: "0px" }}>Event Date {form.date_number}</p>
                  <Button
                    style={{
                      backgroundColor: "#F5BD19",
                      color: "black",
                    }}
                    variant="contained"
                    onClick={() => removeForm(form.date_number)}
                  >
                    Delete Form
                  </Button>
                </Grid>

                <Grid className="bodyFormEventDate" fullWidth>
                  <Grid
                    style={{
                      display: "flex",
                      width: "100%",
                      justifyContent: "center",
                    }}
                  >
                    <p style={{ display: "flex", alignItems: "center" }}>
                      {form.dateEvent !== "" ? (
                        <OfflinePinIcon sx={{ color: "green", fontSize:"30px" }} />
                          ) : (
                        <WarningIcon sx={{ color: "red", fontSize:"30px" }} />
                        )}
                      Date and time start &nbsp;&nbsp;
                    </p>
                    <TextField
                      style={{ width: "50%" }}
                      type="datetime-local"
                      label=""
                      variant="outlined"
                      name="dateEvent"
                      value={form.dateEvent}
                      onChange={(e) => handleDateChange(e, form.date_number)}
                    />
                  </Grid>
                </Grid>

                {/* CREATE TICKET */}
                
                {form.event_areas?.map((formTicket) => (
                  <Grid className="formTicket" key={formTicket.id_areas}>
                    <Grid className="formTicketTitle">
                    <h3 style={{ margin: "0px" }}>
                      {formTicket.name_ticket !== "" && formTicket.ticket_price !== "" 
                        && formTicket.total_row !== "" 
                        && formTicket.rows.every(row => row.total_seat !== "") ? (
                          <OfflinePinIcon sx={{ color: "green", fontSize:"30px", marginBottom:"-8px" }} />
                              ) : (
                                <WarningIcon sx={{ color: "red", fontSize:"30px", marginBottom:"-8px" }} />
                      )}
                      Ticket Information
                    </h3>
                  </Grid>
                    <Grid className="headerFormTicket" fullWidth>
                      <TextField
                        style={{
                          width: "80%",
                          backgroundColor: "white",
                          border: "none",
                        }}
                        type="text"
                        label="Name Ticket"
                        variant="filled"
                        name="name_ticket"
                        value={formTicket.name_areas}
                        onChange={(e) =>
                          handleNameTicketChange(
                            e,
                            form.date_number,
                            formTicket.id_areas
                          )
                        }
                      />
                      <Button
                        style={{
                          backgroundColor: "#F5BD19",
                          color: "black",
                        }}
                        variant="contained"
                        onClick={() =>
                          removeTicket(formTicket.id_areas, form.date_number)
                        }
                      >
                        Delete Ticket
                      </Button>
                    </Grid>

                    <Grid sx={{ display: "flex" }} fullWidth>
                      <Grid className="bodyFormTicket">
                        <Grid
                          className="boxTicket"
                          style={{
                            flexDirection: "column",
                          }}
                        >
                          <p>Price &nbsp;(VND)</p>
                          <Grid
                              className="boxTicket"
                              style={{
                                flexDirection: "column",
                                border: "none",
                              }}
                            >
                            <TextField
                              style={{
                                backgroundColor: "white",
                              }}
                              type="text"
                              label=""
                              variant="outlined"
                              name="ticket_price"
                              value={formatNumber(formTicket.ticket_price)}
                              onChange={(e) =>
                                handlePriceTicketChange(
                                  e,
                                  form.date_number,
                                  formTicket.id_areas
                                )
                              }
                            />
                          </Grid>
                        </Grid>

                        <Grid
                          className="boxTicket"
                          style={{
                            flexDirection: "column",
                          }}
                        >
                          <Grid>
                            <p>Total row less than or equal to 20 </p>
                            <Grid
                              className="boxTicket"
                              style={{
                                flexDirection: "column",
                                border: "none",
                              }}
                            >
                              <TextField
                                style={{
                                  backgroundColor: "white",
                                  marginBottom: "10px",
                                  width: "80%",
                                }}
                                type="text"
                                label=""
                                variant="outlined"
                                name="total_row"
                                value={formTicket.total_row}
                                onChange={(e) =>
                                  handleTotalRowChange(
                                    e,
                                    form.date_number,
                                    formTicket.id_areas
                                  )
                                }
                              />
                            </Grid>
                          </Grid>
                        </Grid>
                      </Grid>

                      <Grid
                        sx={{ flexDirection: "column" }}
                        className="enterSeat"
                      >
                        <Grid
                          sx={{
                            display: "flex",
                            justifyContent: "center",
                            marginBottom: "15px",
                          }}
                        >
                          <p>Enter total seat</p>
                        </Grid>
                        <Grid fullWidth>
                          {formTicket.rows.map((row, index) => (
                            <Grid
                              style={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                              }}
                              key={row.id}
                            >
                              <Typography style={{ width: "20%" }}>
                                Row &nbsp;{row.row_name} &nbsp;
                              </Typography>
                              <TextField
                                style={{
                                  backgroundColor: "white",
                                  marginBottom: "10px",
                                  width: "70%",
                                }}
                                type="text"
                                label=""
                                variant="outlined"
                                name="total_seat"
                                value={row.total_chair}
                                onChange={(e) =>
                                  handleSeatChange(
                                    e,
                                    form.date_number,
                                    formTicket.id_areas,
                                    index
                                  )
                                }
                              />
                            </Grid>
                          ))}
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                ))}

                <Grid style={{ margin: "20px" }}>
                  <Button
                    style={{
                      color: "#f1df39",
                      fontSize: "30px",
                      fontWeight: "bolder",
                    }}
                    className="buttonCreateEvent"
                    fullWidth
                    onClick={() => addTicket(form.date_number)}
                  >
                    <AddCircleIcon
                      style={{ fontSize: "35px", marginRight: "5px" }}
                    />
                    Add Ticket
                  </Button>
                </Grid>
              </Grid>
            ))}
            <Grid style={{ border: "2px dashed black" }}>
              <Button
                style={{
                  color: "black",
                  fontSize: "30px",
                  fontWeight: "bolder",
                  textTransform: "none",
                  margin: "15px",
                }}
                className="buttonCreateEvent"
                fullWidth
                onClick={addForm}
              >
                <PostAddSharpIcon
                  style={{ fontSize: "35px", marginRight: "5px" }}
                />
                Add Another Event Time
              </Button>
            </Grid>
          </Grid>
          <Grid style={{ margin: "30px 0px 30px 0px" }}>
            <Button
              style={{
                backgroundColor: "#F5BD19",
                color: "black",
                fontSize: "30px",
                fontWeight: "bolder",
                padding: "35px",
              }}
              className="buttonCreateEvent"
              fullWidth
              type="submit"
            >
              Update Event
            </Button>
          </Grid>
        </FormSubmit>
      </Grid>
    </>
  );
}

export default UpdateTicket;
