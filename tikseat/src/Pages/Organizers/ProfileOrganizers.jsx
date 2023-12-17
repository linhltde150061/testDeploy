import React, { useEffect } from "react";
import { useTheme } from "@mui/material/styles";
import { useState, useRef } from "react";
import {
  Box,
  Grid,
  Stack,
  FormControl,
  InputLabel,
  Select,
  Chip,
  OutlinedInput,
  MenuItem,
  Avatar,
  Autocomplete,
  TextField,
} from "@mui/material";
import InputCustom from "../../Components/Common/Input/InputCustom";
import ButtonCustom from "../../Components/Common/Button/ButtonCustom";
import { TextareaAutosize } from "@mui/base/TextareaAutosize";
import ClientAvt from "../../Assets/Images/Client.png";
import MonochromePhotosIcon from "@mui/icons-material/MonochromePhotos";
import FormSubmit from "../../Components/Common/FormCustom/FormSubmit";
import ApiCommon from "../../API/Common/ApiCommon";
import { MENUPROPS } from "../../Assets/Constant/Client/constClient";
import { DATA_EVENT_TYPE } from "../../Assets/Constant/Client/dataClient";
import { ToastContainer, toast } from "react-toastify";
import { toastOptions } from "../../Assets/Constant/Common/dataCommon";
import "react-toastify/dist/ReactToastify.css";
import ApiCity from "../../API/City/ApiCity";
import {
  getLocalStorageUserData,
  setLocalStorageUserInfo,
  getLocalStorageUserInfo,
} from "../../Store/userStore";
// import { Api } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { LIST_BANK } from "../../Assets/Constant/ConstBank";

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

export const handleFileInputChange = (e, setSelectedFile, setAvatar) => {
  // Xử lý việc chọn tệp ở đây và cập nhật giá trị của 'avatar'
  const selectedFile = e.target.files[0];
  setSelectedFile(selectedFile);
  if (selectedFile) {
    const objectUrl = URL.createObjectURL(selectedFile);
    setAvatar(objectUrl);
  }
};

function ProfileOrganizers() {
  const dataUser = getLocalStorageUserData();
  const dataInfo = getLocalStorageUserInfo();
  const [avatar, setAvatar] = useState(dataInfo?.avatarImage || "");
  const [selectedFile, setSelectedFile] = useState(null);
  const [eventType, setEventType] = useState([]);
  const [allCity, setAllCity] = useState([]);
  const [allDistrictsOfCity, setAllDistrictsOfCity] = useState([]);
  const [allWardsOfDistricts, setAllWardsOfDistricts] = useState([]);
  const today = new Date().toISOString().slice(0, 10);

  const [selectCity, setSelectCity] = useState(dataInfo?.address?.city || "");
  const [selectDistrict, setSelectDistrict] = useState(
    dataInfo?.address?.district || ""
  );
  const [selectWard, setSelectWard] = useState(dataInfo?.address?.ward || "");
  const [specificAddress, setSpecificAddress] = useState(
    dataInfo?.address?.specific_address || ""
  );

  const [organizerInfo, setOrganizerInfo] = useState({
    organizer_name: dataInfo?.organizer_name || "",
    organizer_type: dataInfo?.organizer_type || eventType,
    isActive: dataInfo?.isActive || false,
    phone: dataInfo?.phone || "",
    website: dataInfo?.website || "",
    description: dataInfo?.description || "",
    founded_date: today || "",
    address: {
      city: selectCity ? selectCity?.name : "",
      district: selectDistrict ? selectDistrict?.name : "",
      ward: selectWard ? selectWard?.name : "",
      specific_address: specificAddress || "",
    },
    bankCard: dataInfo?.bankCard || "",
    bankCardNumber: dataInfo?.bankCardNumber || "",
    bankCardName: dataInfo?.bankCardName || "",
  });

  const theme = useTheme();
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  const handleIconClick = () => {
    // Kích hoạt sự kiện click trên thẻ input
    fileInputRef.current.click();
  };

  //call api khi mở trang để lấy thành phố
  useEffect(() => {
    getAPICity(setAllCity);
  }, []);

  //thêm thành phố, quận huyện, phường xã khi có thay đổi của nó
  useEffect(() => {
    setOrganizerInfo((prevOrganizerInfo) => ({
      ...prevOrganizerInfo,
      address: {
        city: selectCity?.name || selectCity,
        district: selectDistrict?.name || selectDistrict,
        ward: selectWard?.name || selectWard,
        specific_address: specificAddress,
      },
    }));
  }, [selectCity, selectDistrict, selectWard, specificAddress]);

  const handleInputChange = (name, value) => {
    setOrganizerInfo({
      ...organizerInfo,
      [name]: value,
    });
  };

  const handleSpecificAddressChange = (value) => {
    setOrganizerInfo({
      ...organizerInfo,
      address: {
        ...organizerInfo.address,
        specific_address: value,
      },
    });
  };

  console.log("organizerInfo", organizerInfo);
  const handleOrganizerInfo = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("avatarImage", selectedFile);
    if (dataInfo) {
      try {
        const _idOrganizer = dataInfo._id;
        const dataUpdate = {
          organizer_name: organizerInfo.organizer_name,
          organizer_type: organizerInfo?.organizer_type || eventType,
          isActive: organizerInfo?.isActive || false,
          phone: organizerInfo?.phone || "",
          website: organizerInfo?.website || "",
          description: organizerInfo?.description || "",
          founded_date: organizerInfo?.founded_date || today,
          address: {
            city:
              organizerInfo?.address?.city ||
              (selectCity ? selectCity?.name : ""),
            district:
              organizerInfo?.address?.district ||
              (selectDistrict ? selectDistrict?.name : ""),
            ward:
              organizerInfo?.address?.ward ||
              (selectWard ? selectWard?.name : ""),
            specific_address: organizerInfo?.address?.specific_address || "",
          },
          bankCard: organizerInfo?.bankCard || "",
          bankCardNumber: organizerInfo?.bankCardNumber || "",
          bankCardName: organizerInfo?.bankCardName || "",
        };

        if (selectedFile) {
          const reader = new FileReader();
          reader.readAsDataURL(selectedFile);
          reader.onloadend = () => {
            callApiUpdateProfileOrganizer(
              _idOrganizer,
              dataUpdate,
              reader.result
            );
          };
        } else {
          callApiUpdateProfileOrganizer(_idOrganizer, dataUpdate);
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        const _idUser = dataUser._id;
        if (selectedFile) {
          const reader = new FileReader();
          reader.readAsDataURL(selectedFile);
          reader.onloadend = () => {
            callApiProfileOrganizers(reader.result, _idUser, organizerInfo);
          };
        } else {
          callApiProfileOrganizers(null, _idUser, organizerInfo);
        }
      } catch (error) {
        console.log("error", error);
      }
    }
  };

  const callApiProfileOrganizers = async (
    base64EncodedImage,
    _idUser,
    organizerInfo
  ) => {
    try {
      const respone = await ApiCommon.profileOrganizer({
        _idUser: _idUser,
        organizerInfo: organizerInfo,
        avatarImage: base64EncodedImage,
      });
      setLocalStorageUserInfo(respone.data);
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
    }
  };

  const callApiUpdateProfileOrganizer = async (
    _idOrganizer,
    dataUpdate,
    base64EncodedImage = null
  ) => {
    try {
      const response = await ApiCommon.updateProfileOrganizer({
        _idOrganizer: _idOrganizer,
        organizerInfo: dataUpdate,
        avatarImage: base64EncodedImage,
      });
      setLocalStorageUserInfo(response.data);
      navigate("/dashboard");
      toast.success("Update profile success!", toastOptions);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Grid style={{ backgroundColor: "#ffffff", borderRadius: "10px" }}>
        <Grid
          style={{
            display: "flex",
            justifyContent: "center",
            paddingTop: "30px",
          }}>
          <h1>Profile Organizer</h1>
        </Grid>
        <FormSubmit
          onSubmit={handleOrganizerInfo}
          style={{
            width: "100%",
            height: "90%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}>
          <Grid style={{ display: "flex", justifyContent: "space-around" }}>
            <Grid style={{ width: "45%" }}>
              <Stack style={{ marginBottom: "30px" }}>
                <InputCustom
                  type="text"
                  id="organizer_name"
                  name="organizer_name"
                  value={organizerInfo.organizer_name}
                  setValue={(value) =>
                    handleInputChange("organizer_name", value)
                  }
                  label="Organizer Name"
                />
              </Stack>
              <Stack
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginBottom: "30px",
                }}>
                <Stack style={{ width: "47%" }}>
                  <InputCustom
                    type="text"
                    id="phone"
                    name="phone"
                    value={organizerInfo.phone}
                    setValue={(value) => handleInputChange("phone", value)}
                    label="Phone number"
                  />
                </Stack>
                <Stack style={{ width: "47%" }}>
                  <InputCustom
                    type="date"
                    id="founded_date"
                    name="founded_date"
                    value={organizerInfo.founded_date}
                    setValue={(value) =>
                      handleInputChange("founded_date", value)
                    }
                    label="Founded Date"
                  />
                </Stack>
              </Stack>
              <Stack style={{ marginBottom: "30px" }}>
                <InputCustom
                  type="text"
                  id="website"
                  name="website"
                  value={organizerInfo.website}
                  setValue={(value) => handleInputChange("website", value)}
                  label="Website"
                />
              </Stack>
              <Stack
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginBottom: "20px",
                }}>
                <Stack style={{ width: "47%" }}>
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
                        option.name || dataInfo?.address?.city || ""
                      }
                      renderInput={(params) => (
                        <TextField {...params} required label="City" />
                      )}
                    />
                  </FormControl>
                </Stack>
                <Stack style={{ width: "47%" }}>
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
                        option.name || dataInfo?.address?.district || ""
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
                  marginBottom: "30px",
                }}>
                <Stack style={{ width: "47%" }}>
                  <FormControl fullWidth>
                    <Autocomplete
                      freeSolo
                      id="select-wards"
                      value={selectWard}
                      onChange={(event, newValue) =>
                        handleChangeWard(event, newValue, setSelectWard)
                      }
                      getOptionLabel={(option) =>
                        option.name || dataInfo?.address?.ward || ""
                      }
                      options={allWardsOfDistricts}
                      renderInput={(params) => (
                        <TextField {...params} required label="Wards" />
                      )}
                    />
                  </FormControl>
                </Stack>
                <Stack style={{ width: "47%" }}>
                  <InputCustom
                    type="text"
                    name="specific_address"
                    value={organizerInfo.address.specific_address}
                    setValue={(value) => handleSpecificAddressChange(value)}
                    label="Specific address"
                  />
                </Stack>
              </Stack>
              <Stack
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginBottom: "30px",
                }}>
                <Stack style={{ width: "47%" }}>
                  <Autocomplete
                    freeSolo
                    id="select-bank"
                    name="select-bank"
                    value={organizerInfo.bankCard}
                    options={LIST_BANK}
                    onChange={(event, newValue) => {
                      setOrganizerInfo({
                        ...organizerInfo,
                        bankCard: newValue?.label,
                      });
                    }}
                    renderInput={(params) => (
                      <TextField {...params} required label="Choose a bank" />
                    )}
                  />
                </Stack>
                <Stack style={{ width: "47%" }}>
                  <InputCustom
                    type="text"
                    id="bankCardName"
                    name="bankCardName"
                    value={organizerInfo.bankCardName}
                    setValue={(value) =>
                      handleInputChange("bankCardName", value)
                    }
                    label="Account owner"
                  />
                </Stack>
              </Stack>
              <Stack style={{ marginBottom: "30px" }}>
                <InputCustom
                  type="text"
                  id="bankCardNumber"
                  name="bankCardNumber"
                  value={organizerInfo?.bankCardNumber}
                  setValue={(value) =>
                    handleInputChange("bankCardNumber", value)
                  }
                  label="Account number"
                />
              </Stack>
              <Stack>
                <FormControl fullWidth style={{ marginBottom: "20px" }}>
                  <InputLabel id="demo-multiple-chip-label">
                    Event Type
                  </InputLabel>
                  <Select
                    labelId="demo-multiple-chip-label"
                    multiple
                    id="organizer_type"
                    name="organizer_type"
                    value={organizerInfo.organizer_type}
                    onChange={(e) =>
                      setOrganizerInfo({
                        ...organizerInfo,
                        organizer_type: e.target.value,
                      })
                    }
                    input={
                      <OutlinedInput
                        id="select-multiple-chip"
                        label="Event Type"
                      />
                    }
                    renderValue={(selected) => (
                      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                        {selected?.map((value) => (
                          <Chip key={value} label={value} />
                        ))}
                      </Box>
                    )}
                    MenuProps={MENUPROPS}>
                    {DATA_EVENT_TYPE.map((name) => (
                      <MenuItem
                        key={name}
                        value={name}
                        style={getStyles(name, eventType, theme)}>
                        {name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Stack>
            </Grid>

            <Grid
              style={{
                width: "45%",
                display: "flex",
                flexDirection: "column",
              }}>
              <Grid
                style={{
                  width: "100%",
                  marginBottom: "40px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}>
                <Avatar
                  style={{ height: "300px", width: "300px" }}
                  alt="Remy Sharp"
                  src={avatar}
                />
                <MonochromePhotosIcon
                  style={{
                    marginLeft: "185px",
                    fontSize: "60px",
                    marginTop: "-50px",
                    position: "relative",
                  }}
                  onClick={handleIconClick}
                />
                <input
                  ref={fileInputRef}
                  type="file"
                  style={{ display: "none" }}
                  onChange={(e) =>
                    handleFileInputChange(e, setSelectedFile, setAvatar)
                  }
                />
              </Grid>
              <Stack>
                <TextareaAutosize
                  style={{ width: "100%" }}
                  minRows={6}
                  placeholder="Description"
                  id="description"
                  name="description"
                  value={organizerInfo.description}
                  onChange={(e) =>
                    handleInputChange("description", e.target.value)
                  }
                />
              </Stack>
            </Grid>
          </Grid>

          <Grid
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              bottom: "10px",
            }}>
            <Stack style={{ width: "50%", marginBottom: "20px" }}>
              <ButtonCustom
                color="black"
                content="Update account"
                backgroundcolor="#F5BD19"
              />
            </Stack>
          </Grid>
        </FormSubmit>
      </Grid>
    </>
  );
}

export default ProfileOrganizers;
