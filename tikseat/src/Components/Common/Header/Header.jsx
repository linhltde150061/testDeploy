import {
  Button,
  Divider,
  Grid,
  IconButton,
  InputBase,
  MenuItem,
  Paper,
  Stack,
  TextField,
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import IconNext from "../../Common/Icons/IconNext";
import IconPrev from "../../Common/Icons/IconPrev";
import imgBgHeader from "../../../Assets/Images/bgheaderhomepage.png";
import imgCarousel from "../../../Assets/Images/pngguru.png";
import {
  CarouselStyle,
  DatePickerStyle,
  FormHeaderStyle,
  HeaderStyle,
  TextFieldStyle,
} from "../../../Assets/CSS/Style/style.const";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import LoopIcon from "@mui/icons-material/Loop";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import SearchIcon from "@mui/icons-material/Search";
import {
  getLocalStorageUserData,
  getLocalStorageUserInfo,
} from "../../../Store/userStore";
import { useOpenStore } from "../../../Store/openStore";
import { DATA_EVENT_TYPE } from "../../../Assets/Constant/Client/dataClient";

import ApiCity from "../../../API/City/ApiCity";
import NavBar from "../Layout/NavBar";

const Header = () => {
  const { setSearchEvent } = useOpenStore();
  const [isOpen, setIsOpen] = useState(false);
  const [typeEvent, setTypeEvent] = useState(null);
  const [eventName, setEventName] = useState(null);
  const [selectsDistrict, setSelectsDistrict] = useState([]);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  // useEffect(() => {
  //   document.addEventListener("mousedown", closeDropdown);

  //   return () => {
  //     document.removeEventListener("mousedown", closeDropdown);
  //   };
  // }, []);
  const filterIds = selectsDistrict?.map((item) => item.id);
  console.log("selectsDistrict: ", selectsDistrict);
  const [selectedDate, setSelectedDate] = useState(null);

  const isDateInPast = (date) => {
    const currentDateTimestamp = new Date().getTime() / 1000;
    return date < currentDateTimestamp;
  };

  const handleSearchEvent = () => {
    const mappingDistrict = selectsDistrict?.map((item) => item.value);
    console.log("mappingDistrict: ", mappingDistrict);
    setSearchEvent({
      event_name: eventName || "",
      type_of_event: typeEvent || "",
      event_location: mappingDistrict || "",
      event_date: selectedDate || "",
    });
  };

  const [allCity, setAllCity] = useState([]);
  console.log("allCity: ", allCity);
  useEffect(() => {
    async function getAllCity() {
      const response = await ApiCity.getCity();
      setAllCity(response);
    }
    getAllCity();
  }, []);
  const dataDistrict =
    allCity?.length > 0 &&
    allCity.map((item) => {
      return { value: item.name, id: item.code };
    });
  const dataType =
    DATA_EVENT_TYPE?.length > 0 &&
    DATA_EVENT_TYPE?.map((item) => {
      return {
        value: item,
        label: item,
      };
    });

  return (
    <>
      <HeaderStyle className="header">
        <img src={imgBgHeader} alt="" />
        <div className="header-overlay"></div>
        <div
          style={{
            position: "absolute",
            zIndex: "22",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            maxWidth: "80%",
            width: "100%",
          }}
        >
          <CarouselStyle
            autoPlay={false}
            infiniteLoop="true"
            swipeable
            showThumbs={false}
            showArrows={true}
            showIndicators={false}
            renderArrowNext={(clickHandler, hasPrev) => {
              return (
                <div
                  style={{
                    cursor: "pointer",
                    position: "absolute",
                    right: "0",
                    zIndex: "22",
                    color: "white",
                    top: "50%",
                    transform: "translateY(-50%)",
                  }}
                  onClick={clickHandler}
                >
                  <IconNext />
                </div>
              );
            }}
            renderArrowPrev={(clickHandler, hasPrev) => {
              return (
                <div
                  style={{
                    cursor: "pointer",
                    position: "absolute",
                    left: "0",
                    top: "50%",
                    transform: "translateY(-50%)",
                    zIndex: "22",
                    color: "white",
                  }}
                  onClick={clickHandler}
                >
                  <IconPrev />
                </div>
              );
            }}
          >
            {Array(3)
              .fill(0)
              .map((item, index) => {
                return (
                  <div
                    key={index}
                    style={{
                      display: "flex",
                      width: "100%",
                      alignItems: "center",
                      gap: "50px",
                      padding: "0 50px",
                    }}
                  >
                    <div
                      key={index}
                      style={{
                        overflow: "hidden",
                        borderRadius: "30px",
                        maxWidth: "600px",
                        width: "100%",
                      }}
                    >
                      <img alt="" src={imgCarousel} />
                    </div>
                    <div
                      style={{
                        flex: 1,
                        display: "flex",
                        flexDirection: "column",
                        gap: "30px",
                      }}
                    >
                      <div style={{}}>
                        <h3
                          style={{
                            fontSize: "40px",
                            fontWeight: 700,
                            color: "white",
                            textAlign: "start",
                          }}
                        >
                          SBS MTV The Kpop Show Ticket Package
                        </h3>
                        <p
                          style={{
                            fontSize: "18px",
                            color: "white",
                            textAlign: "start",
                          }}
                        >
                          Look no further! Our SBS The Show tickets are the
                          simplest way for you to experience a live Kpop
                          recording.
                        </p>
                      </div>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "30px",
                        }}
                      >
                        <Button
                          style={{
                            background: "#F5167E",
                            fontWeight: "700",
                            fontSize: "18px",
                            borderRadius: "50px",
                            color: "white",
                            display: "flex",
                            width: "182px",
                            height: "60px",
                          }}
                        >
                          Get Tiket
                        </Button>
                        <Button
                          style={{
                            fontWeight: "700",
                            fontSize: "18px",
                            borderRadius: "50px",
                            color: "white",
                            display: "flex",
                            width: "182px",
                            height: "60px",
                            border: "1.5px solid white",
                          }}
                        >
                          Learn More
                        </Button>
                      </div>
                    </div>
                  </div>
                );
              })}
          </CarouselStyle>
        </div>
        <FormHeaderStyle>
          <Grid
            container
            spacing={2}
            alignItems={"self-end"}
            position={"relative"}
            style={{ height: "100%" }}
          >
            <Grid item xs={2}>
              <TextFieldStyle
                id="filled-helperText"
                label="Event name"
                onChange={(e) => setEventName(e.target.value)}
                defaultValue={eventName}
                variant="filled"
                size="medium"
              />
            </Grid>
            <Grid item xs={3}>
              <div
                className="dropdown"
                style={{
                  height: "100%",
                  borderBottom: "1px solid white",
                  position: "relative",
                  zIndex: 20,
                }}
                ref={dropdownRef}
              >
                <label htmlFor="" style={{ color: "white" }}>
                  Place
                </label>
                <div
                  style={{
                    display: "flex",
                    width: "100%",
                    alignItems: "center",
                  }}
                >
                  <div
                    style={{
                      height: "40px",
                      color: "white",
                      fontSize: "22px",
                      background: "transparent",
                      outline: "none",
                      border: "none",
                      cursor: "pointer",
                      display: "flex",
                      flex: 1,
                    }}
                  >
                    {selectsDistrict?.length > 0 && (
                      <Stack
                        direction={"row"}
                        alignItems={"center"}
                        gap={"20px"}
                        style={{
                          fontSize: "16px",
                          padding: "4px ",
                          borderRadius: "30px",
                          background: "gray",
                          height: "30px",
                        }}
                      >
                        <span style={{ padding: "0 10px" }}>
                          {selectsDistrict[0].value}
                        </span>
                        <span
                          style={{ display: "flex" }}
                          onClick={() => {
                            const filterChange = selectsDistrict.filter(
                              (itemF) => itemF.id !== selectsDistrict[0]?.id
                            );
                            setSelectsDistrict(filterChange);
                          }}
                        >
                          <HighlightOffIcon />
                        </span>
                      </Stack>
                    )}
                    {selectsDistrict?.length > 1 && (
                      <div style={{ marginLeft: "20px" }}>. . .</div>
                    )}
                  </div>
                  <div
                    onClick={toggleDropdown}
                    style={{ cursor: "pointer", color: "white" }}
                  >
                    {isOpen ? (
                      <KeyboardArrowUpIcon />
                    ) : (
                      <KeyboardArrowDownIcon />
                    )}
                  </div>
                </div>
                {isOpen && (
                  <div
                    style={{
                      position: "absolute",
                      top: "100%",
                      background: "white",
                      zIndex: 20,
                      width: "100%",
                      padding: "20px",
                      borderRadius: "10px",
                      overflow: "auto",
                      maxHeight: "500px",
                      height: "max-content",
                      boxShadow: "1px 1px 2px 2px #bbb1b12e",
                    }}
                  >
                    <Paper
                      component="form"
                      sx={{
                        p: "2px 4px",
                        display: "flex",
                        alignItems: "center",
                        width: "100%",
                      }}
                    >
                      <InputBase
                        sx={{ ml: 1, flex: 1 }}
                        placeholder="Tìm quận/huyện"
                        inputProps={{ "aria-label": "Tìm quận/huyện" }}
                      />
                      <IconButton
                        type="button"
                        sx={{ p: "10px" }}
                        aria-label="search"
                      >
                        <SearchIcon />
                      </IconButton>
                    </Paper>

                    <ul
                      style={{
                        marginTop: "20px",
                        maxHeight: "200px",
                        height: "max-content",
                        overflow: "auto",
                      }}
                    >
                      {dataDistrict.length > 0 &&
                        dataDistrict.map((item, index) => {
                          return (
                            <li
                              key={index}
                              style={{
                                cursor: "pointer",
                                display: "flex",
                                justifyContent: "space-between",
                                width: "100%",
                              }}
                              onClick={() => {
                                const check = filterIds.includes(item.id);
                                if (!check) {
                                  setSelectsDistrict([
                                    ...selectsDistrict,
                                    item,
                                  ]);
                                }
                              }}
                            >
                              <span>{item.value}</span>
                              <input
                                id={`${item.value}`}
                                type="checkbox"
                                onChange={(e) => {
                                  console.log("e: ", e.target.checked);
                                  if (!e.target.checked) {
                                    const filterChange = selectsDistrict.filter(
                                      (itemF) => itemF.id !== item.id
                                    );
                                    setSelectsDistrict(filterChange);
                                    console.log("filterChange: ", filterChange);
                                  } else {
                                    const check = filterIds.includes(item.id);
                                    if (!check) {
                                      setSelectsDistrict([
                                        ...selectsDistrict,
                                        item,
                                      ]);
                                    }
                                  }
                                }}
                                checked={filterIds.includes(item.id)}
                              />
                            </li>
                          );
                        })}
                    </ul>
                    <Divider
                      sx={{ height: 0.5, width: "100%", margin: "10px 0" }}
                      orientation="horizontal"
                    />
                    <Stack direction={"row"} justifyContent={"space-between"}>
                      <Stack
                        onClick={() => setSelectsDistrict([])}
                        direction={"row"}
                        alignItems={"center"}
                        gap={"10px"}
                        style={{ cursor: "pointer" }}
                      >
                        <LoopIcon></LoopIcon>
                        <span>dat lai</span>
                      </Stack>
                      <Button
                        type="button"
                        variant="contained"
                        onClick={() => setIsOpen(false)}
                      >
                        Apply
                      </Button>
                    </Stack>
                  </div>
                )}
              </div>
            </Grid>
            <Grid item xs={3}>
              <Stack
                style={{
                  height: "100%",
                  borderBottom: "1px solid white",
                  position: "relative",
                  zIndex: 20,
                }}
                ref={dropdownRef}
              >
                <label htmlFor="" style={{ color: "white" }}>
                  Time
                </label>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePickerStyle
                    value={selectedDate}
                    onChange={(newDate) => setSelectedDate(newDate)}
                    shouldDisableDate={(date) =>
                      isDateInPast(new Date(date).getTime() / 1000)
                    }
                    renderInput={(params) => <TextField {...params} />}
                  />
                </LocalizationProvider>
              </Stack>
            </Grid>
            <Grid item xs={3}>
              <TextFieldStyle
                id="filled-helperText"
                select
                label="Type Event"
                defaultValue={typeEvent}
                variant="filled"
                onChange={(e) => {
                  setTypeEvent(e.target.value);
                }}
              >
                {dataType?.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextFieldStyle>
            </Grid>
            <Grid item xs={1}>
              <Button
                type="button"
                variant="outlined"
                onClick={() => handleSearchEvent()}
                style={{ background: "white" }}
              >
                Search
              </Button>
            </Grid>
            <div
              style={{
                position: "absolute",
                top: "-25px",
                left: "-25px",
                color: "white",
                fontWeight: "bold",
                fontSize: "20px",
              }}
            >
              Search Event
            </div>
          </Grid>
        </FormHeaderStyle>
      </HeaderStyle>
      <NavBar></NavBar>
    </>
  );
};

export default Header;
