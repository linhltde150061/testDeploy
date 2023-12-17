import React from "react";
import { useTheme } from "@mui/material/styles";
import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import {
  Grid,
  Stack,
  FormControl,
  InputLabel,
  Select,
  OutlinedInput,
  Box,
  Chip,
  MenuItem,
  TextareaAutosize,
  Button,
  Autocomplete,
  TextField,
  Avatar,
} from "@mui/material";
import ApiCity from "../../API/City/ApiCity";
import MonochromePhotosIcon from "@mui/icons-material/MonochromePhotos";
import Modal from "@mui/material/Modal";
import Backdrop from "@mui/material/Backdrop";
import Fade from "@mui/material/Fade";
import Typography from "@mui/material/Typography";
import WarningAmberRoundedIcon from "@mui/icons-material/WarningAmberRounded";
import OfflinePinIcon from "@mui/icons-material/OfflinePin";
import WarningIcon from "@mui/icons-material/Warning";

import { DATA_EVENT_TYPE } from "../../Assets/Constant/Client/dataClient";
import InputCustom from "../../Components/Common/Input/InputCustom";
import {
  getLocalStorageUserInfo,
  getLocalStorageUserData,
  setLocalStorageEventInfo,
  getLocalStorageEventInfo,
} from "../../Store/userStore";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

function getStyles(name, eventType, theme) {
  return {
    fontWeight:
      eventType.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

/*======CALL API SET QUẬN HUYỆN KHI CHỌN THÀNH PHỐ=====*/
export const handleChangeCity = async (
  event,
  newValue,
  setSelectCity,
  setAllDistrictsOfCity,
  setAllWardsOfDistricts,
  setSelectDistrict,
  setSelectWard
) => {
  setSelectCity(newValue);
  if (newValue) {
    const codeCity = newValue.code;
    const response = await ApiCity.getDistrict(codeCity);
    setAllDistrictsOfCity(response.districts);
  } else {
    setAllDistrictsOfCity([]);
    setAllWardsOfDistricts([]);
    setSelectDistrict({
      code: "",
      name: "",
      division_type: "",
      codename: "",
      province_code: "",
      wards: [],
    });
    setSelectWard({
      code: "",
      codename: "",
      district_code: "",
      division_type: "",
      name: "",
    });
  }
};

/*======CALL API SET PHƯỜNG XÃ KHI CHỌN QUẬN HUYỆN=====*/
export const handleChangeDistrict = async (
  event,
  newValue,
  setSelectDistrict,
  setAllWardsOfDistricts,
  setSelectWard
) => {
  setSelectDistrict(newValue);
  if (newValue) {
    const codeDistrict = newValue.code;
    const respones = await ApiCity.getWards(codeDistrict);
    setAllWardsOfDistricts(respones.wards);
  } else {
    setAllWardsOfDistricts([]);
    setSelectWard({
      code: "",
      codename: "",
      district_code: "",
      division_type: "",
      name: "",
    });
  }
};

/*======SET QUẬN HUYỆN=====*/
export const handleChangeWard = (event, newValue, setSelectWard) => {
  setSelectWard(newValue);
};

/*======CALL API SET THÀNH PHỐ=====*/
export const getAPICity = async (setAllCity) => {
  const response = await ApiCity.getCity();
  setAllCity(response);
};

export const handleFileInputChange = (e, setSelectedFile, setEventImage) => {
  // Xử lý việc chọn tệp ở đây và cập nhật giá trị của 'avatar'
  const selectedFile = e.target.files[0];
  setSelectedFile(selectedFile);
  if (selectedFile) {
    const reader = new FileReader();
    reader.readAsDataURL(selectedFile);
    reader.onloadend = () => {
      setEventImage(reader.result);
    };
  }
};

const NewEvent = ({ onContinueClick }) => {
  const eventInfomation = getLocalStorageEventInfo();

  const [open, setOpen] = useState(true);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
  };

  const [eventImage, setEventImage] = useState(
    eventInfomation?.eventImage || ""
  );
  const [eventType, setEventType] = useState([]);
  const [selectedFile, setSelectedFile] = useState("");
  const theme = useTheme();
  const [allCity, setAllCity] = useState([]);
  const [allDistrictsOfCity, setAllDistrictsOfCity] = useState([]);
  const [allWardsOfDistricts, setAllWardsOfDistricts] = useState([]);
  const dataInfo = getLocalStorageUserInfo();
  const dataUser = getLocalStorageUserData();

  const [selectCity, setSelectCity] = useState(
    eventInfomation?.address?.city || ""
  );
  const [selectDistrict, setSelectDistrict] = useState(
    eventInfomation?.address?.district || ""
  );
  const [selectWard, setSelectWard] = useState(
    eventInfomation?.address?.ward || ""
  );
  const [specificAddress, setSpecificAddress] = useState(
    eventInfomation?.address?.specific_address || ""
  );


  const fileInputRef = useRef("");
  const handleIconClick = () => {
    // Kích hoạt sự kiện click trên thẻ input
    fileInputRef.current.click();
  };

  const [newEvent, setNewEvent] = useState({
    event_name: eventInfomation?.event_name || "",
    eventImage: eventInfomation?.eventImage || eventImage || "",
    type_of_event: eventInfomation?.type_of_event || eventType,
    event_description: eventInfomation?.event_description || "",
    address: {
      city: selectCity ? selectCity?.name : "",
      district: selectDistrict ? selectDistrict?.name : "",
      ward: selectWard ? selectWard?.name : "",
      specific_address: specificAddress || "",
    },
  });

  console.log(newEvent);

  useEffect(() => {
    setNewEvent((prevEvent) => ({
      ...prevEvent,
      eventImage: eventImage || "",
    }));
  }, [eventImage]);

  //call api khi mở trang để lấy thành phố
  useEffect(() => {
    getAPICity(setAllCity);
  }, []);

  useEffect(() => {
    setNewEvent((prevNewEvent) => ({
      ...prevNewEvent,
      address: {
        city: selectCity?.name || selectCity,
        district: selectDistrict?.name || selectDistrict,
        ward: selectWard?.name || selectWard,
        specific_address: specificAddress,
      },
    }));
  }, [selectCity, selectDistrict, selectWard, specificAddress]);

  const handleInputChange = (name, value) => {
    setNewEvent({ ...newEvent, [name]: value });
  };

  const handleSpecificAddressChange = (value) => {
    setNewEvent({
      ...newEvent,
      address: {
        ...newEvent.address,
        specific_address: value,
      },
    });
  };

  useEffect(() => {
    setLocalStorageEventInfo(newEvent);
  }, [newEvent]);

  const handleClientClick = () => {
    onContinueClick();
  };

  return (
    <>
      <Grid
        fullwidth
        style={{
          backgroundColor: "#ffffff",
          borderRadius: "10px",
          padding: "30px",
        }}
      >
        <Grid style={{ display: "flex", justifyContent: "start" }}>
          {newEvent.eventImage !== "" ? (
            <OfflinePinIcon sx={{ color: "green", fontSize:"30px" }} />
          ) : (
            <WarningIcon sx={{ color: "red", fontSize:"30px" }} />
          )}
          <h3>Cover image</h3>
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
              width: "100%",
              borderRadius: "0px",
            }}
          >
            <img
              style={{
                objectFit: "contain",
                width: "100%",
                height: "100%",
              }}
              src={eventImage}
              alt=""
            />
          </Avatar>

          <MonochromePhotosIcon
            style={{
              marginLeft: "80%",
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
              handleFileInputChange(e, setSelectedFile, setEventImage)
            }
          />
        </Grid>

        <Grid sx={{ display: "flex", justifyContent: "center" }}>
          <Grid sx={{ display: "flex" }}>
            <WarningAmberRoundedIcon sx={{ fontSize: 35 }} color="warning" />
            &nbsp;
            <Typography
              id="transition-modal-title"
              variant="h6"
              component="h2"
              color={"black"}
            >
              Vui lòng đọc kỹ &nbsp;
              <Link
                component="button"
                style={{
                  color: "#F5BD19",
                  fontWeight: "500",
                  textDecoration: "none",
                }}
                onClick={handleOpen}
              >
                Lưu ý khi cập nhật sự kiện
              </Link>
            </Typography>
          </Grid>
          <Modal
            sx={{ backgroundColor: "#000", opacity: "0.9" }}
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            open={open}
            // onClose={handleClose}
            closeAfterTransition
            slots={{ backdrop: Backdrop }}
            slotProps={{
              backdrop: {
                timeout: 500,
              },
            }}
          >
            <Fade in={open}>
              <Box sx={style}>
                <Typography
                  sx={{
                    marginBottom: "30px",
                    display: "flex",
                    justifyContent: "center",
                  }}
                  id="transition-modal-title"
                  variant="h5"
                  component="h2"
                  color={"#7CA629"}
                  fontWeight={600}
                >
                  NOTE WHEN UPLOADING AN EVENT
                </Typography>
                <Grid>
                  <ul>
                    <li>
                      1.&nbsp;&nbsp; Please{" "}
                      <strong>
                        do not display contact information of the Organizer
                      </strong>{" "}
                      (eg: Phone number/ Email/ Website/ Facebook/ Instagram…){" "}
                      <strong>on the banner and in the content.</strong> Only
                      use Hotline TickSeat - 1900.6408.
                    </li>
                    <li>
                      2.&nbsp;&nbsp; In case the Organizer{" "}
                      <strong>
                        creates or updates the event not in accordance with the
                        above provisions, TickSeat has the right to refuse to
                        approve the event.
                      </strong>
                    </li>
                    <li>
                      3.&nbsp;&nbsp; TickSeat will continuously check the
                      information of events being displayed on the platform,{" "}
                      <strong>
                        if it detects that there is an error related to the
                        image / post content, TickSeat has the right to remove
                        or refuse to provide the service,
                      </strong>{" "}
                      subject to clause 2.9 of the Service Agreement.
                    </li>
                  </ul>
                </Grid>
                <Grid sx={{ display: "flex", justifyContent: "center" }}>
                  <Button
                    style={{
                      width: "20%",
                      marginTop: "20px",
                      padding: "10px",
                      color: "#fff",
                      fontSize: "20px",
                      fontWeight: "bolder",
                      backgroundColor: "#7CA629",
                    }}
                    onClick={handleClose}
                  >
                    Oke
                  </Button>
                </Grid>
              </Box>
            </Fade>
          </Modal>
        </Grid>
        <Grid fullwidth>
          <Grid style={{ display: "flex", justifyContent: "space-around" }}>
            <Grid style={{ width: "100%" }}>
              <Grid style={{ display: "flex", justifyContent: "start" }}>
                <h3 style={{ marginTop: "20px" }}>
                  {newEvent.event_name !== "" && newEvent.type_of_event.length !== 0 ? (
                    <OfflinePinIcon sx={{ color: "green", fontSize:"30px", marginBottom:"-8px" }} />
                  ) : (
                    <WarningIcon sx={{ color: "red", fontSize:"30px", marginBottom:"-8px" }} />
                  )}
                  Name and Type of Event
                </h3>
              </Grid>
              <Grid
                style={{
                  padding: "30px",
                  border: "1px solid black",
                }}
              >
                <Stack
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <Stack style={{ width: "45%", marginBottom: "0px" }}>
                    <InputCustom
                      type="text"
                      name="event_name"
                      value={newEvent.event_name}
                      setValue={(value) =>
                        handleInputChange("event_name", value)
                      }
                      label="Name event"
                    />
                  </Stack>
                  <Stack style={{ width: "45%", marginBottom: "0px" }}>
                    <FormControl fullWidth>
                      <InputLabel id="demo-multiple-chip-label">
                        Event Type
                      </InputLabel>
                      <Select
                        name="type_of_event"
                        labelId="demo-multiple-chip-label"
                        multiple
                        value={newEvent.type_of_event}
                        onChange={(e) =>
                          setNewEvent({
                            ...newEvent,
                            type_of_event: e.target.value,
                          })
                        }
                        input={
                          <OutlinedInput
                            id="select-multiple-chip"
                            label="Event Type"
                          />
                        }
                        renderValue={(selected) => (
                          <Box
                            sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}
                          >
                            {selected.map((value) => (
                              <Chip key={value} label={value} />
                            ))}
                          </Box>
                        )}
                        MenuProps={MenuProps}
                      >
                        {DATA_EVENT_TYPE.map((name) => (
                          <MenuItem
                            key={name}
                            value={name}
                            style={getStyles(name, eventType, theme)}
                          >
                            {name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Stack>
                </Stack>
              </Grid>

              {/* Địa chỉ */}
              <Grid style={{ display: "flex", justifyContent: "start" }}>
                <h3 style={{ marginTop: "20px" }}>
                  {newEvent.address.city !== "" && newEvent.address.district !== "" 
                  && newEvent.address.specific_address !== "" && newEvent.address.ward !== ""  ? (
                    <OfflinePinIcon sx={{ color: "green", fontSize:"30px", marginBottom:"-8px" }} />
                  ) : (
                    <WarningIcon sx={{ color: "red", fontSize:"30px", marginBottom:"-8px" }} />
                  )}
                  Address
                </h3>
              </Grid>
              <Grid
                style={{
                  padding: "30px",
                  border: "1px solid black",
                }}
              >
                <Stack
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    marginBottom: "37px",
                  }}
                >
                  <Stack style={{ width: "45%" }}>
                    <FormControl fullWidth>
                      <Autocomplete
                        freeSolo
                        id="select-city"
                        options={allCity}
                        value={selectCity}
                        onChange={(event, newValue) =>
                          handleChangeCity(
                            event,
                            newValue,
                            setSelectCity,
                            setAllDistrictsOfCity,
                            setAllWardsOfDistricts,
                            setSelectDistrict,
                            setSelectWard
                          )
                        }
                        getOptionLabel={(option) =>
                          option.name || eventInfomation?.address?.city || ""
                        }
                        renderInput={(params) => (
                          <TextField {...params} required label="City" />
                        )}
                      />
                    </FormControl>
                  </Stack>
                  <Stack style={{ width: "45%" }}>
                    <FormControl fullWidth>
                      <Autocomplete
                        freeSolo
                        id="select-districts"
                        options={allDistrictsOfCity}
                        value={selectDistrict}
                        onChange={(event, newValue) =>
                          handleChangeDistrict(
                            event,
                            newValue,
                            setSelectDistrict,
                            setAllWardsOfDistricts,
                            setSelectWard
                          )
                        }
                        getOptionLabel={(option) =>
                          option.name ||
                          eventInfomation?.address?.district ||
                          ""
                        }
                        renderInput={(params) => (
                          <TextField {...params} required label="Districts" />
                        )}
                      />
                    </FormControl>
                  </Stack>
                </Stack>
                <Stack
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <Stack style={{ width: "45%" }}>
                    <FormControl fullWidth>
                      <Autocomplete
                        freeSolo
                        id="select-wards"
                        value={selectWard}
                        onChange={(event, newValue) =>
                          handleChangeWard(event, newValue, setSelectWard)
                        }
                        getOptionLabel={(option) =>
                          option.name || eventInfomation?.address?.ward || ""
                        }
                        options={allWardsOfDistricts}
                        renderInput={(params) => (
                          <TextField {...params} required label="Wards" />
                        )}
                      />
                    </FormControl>
                  </Stack>
                  <Stack style={{ width: "45%" }}>
                    <InputCustom
                      type="text"
                      name="specific_address"
                      value={newEvent.address.specific_address}
                      setValue={(value) => handleSpecificAddressChange(value)}
                      label="Specific address"
                    />
                  </Stack>
                </Stack>
              </Grid>
              <Grid style={{ display: "flex", justifyContent: "start" }}>
                <h3 style={{ marginTop: "20px" }}>{newEvent.event_description !== "" ? (
                  <OfflinePinIcon sx={{ color: "green", fontSize:"30px", marginBottom:"-8px" }} />
                    ) : (
                      <WarningIcon sx={{ color: "red", fontSize:"30px", marginBottom:"-8px" }} />
                    )} 
                    Event Description
                  </h3>
              </Grid>
              <Stack>
                <TextareaAutosize
                  style={{ fontSize: "20px" }}
                  fullWidth
                  minRows={6}
                  name="event_description"
                  value={newEvent.event_description}
                  onChange={(e) =>
                    handleInputChange("event_description", e.target.value)
                  }
                />
              </Stack>
            </Grid>
          </Grid>
          <Grid style={{ display: "flex", justifyContent: "start" }}>
            <h3 style={{ marginTop: "20px" }}>Info Organizer</h3>
          </Grid>
          <Grid
            style={{
              padding: "30px",
              border: "1px solid black",
            }}
          >
            <Stack
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                marginBottom: "37px",
              }}
            >
              <Stack style={{ width: "45%" }}>
                <TextField
                  aria-readonly
                  type="text"
                  value={dataInfo.organizer_name}
                  label="Name Organizer"
                />
              </Stack>
              <Stack style={{ width: "45%" }}>
                <TextField
                  aria-readonly
                  type="text"
                  value={dataInfo.phone}
                  label="Phone number"
                />
              </Stack>
            </Stack>
            <Stack
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Stack style={{ width: "45%" }}>
                <TextField
                  aria-readonly
                  type="text"
                  value={dataUser.email}
                  label="Email"
                />
              </Stack>
              <Stack style={{ width: "45%" }}>
                <TextField
                  aria-readonly
                  type="text"
                  value={dataInfo.website}
                  label="WEBSITE"
                />
              </Stack>
            </Stack>
          </Grid>
          <Grid
            style={{
              backgroundColor: "#F5BD19",
              color: "black",
              marginBottom: "20px",
              margin: "30px 0px 30px 0px",
            }}
          >
            <Button
              fullWidth
              style={{
                padding: "10px",
                color: "black",
                fontSize: "30px",
                fontWeight: "bolder",
              }}
              onClick={handleClientClick}
            >
              continue
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default NewEvent;
