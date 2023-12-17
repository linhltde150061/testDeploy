import React from "react";
import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import {
  Grid,
  Box,
  FormControlLabel,
  Stack,
  Radio,
  RadioGroup,
  FormControl,
  FormLabel,
  Avatar,
  InputLabel,
  Select,
  Chip,
  OutlinedInput,
  MenuItem,
} from "@mui/material";
import InputCustom from "../../Components/Common/Input/InputCustom";
import ButtonCustom from "../../Components/Common/Button/ButtonCustom";
import MonochromePhotosIcon from "@mui/icons-material/MonochromePhotos";
import FormSubmit from "../../Components/Common/FormCustom/FormSubmit";
import ApiCommon from "../../API/Common/ApiCommon";
import { ToastContainer, toast } from "react-toastify";
import { toastOptions } from "../../Assets/Constant/Common/dataCommon";
import "react-toastify/dist/ReactToastify.css";
import {
  getLocalStorageUserData,
  getLocalStorageUserInfo,
  setLocalStorageUserInfo,
} from "../../Store/userStore";
import { DATA_EVENT_TYPE } from "../../Assets/Constant/Client/dataClient";
import { MENUPROPS } from "../../Assets/Constant/Client/constClient";

function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

export const validateFile = (fileName) => {
  const fileExtensionRegex =
    /^.*\.(jpg|jpeg|png|gif|tiff|psd|eps|ai|heic|raw|svg)$/i;
  return fileExtensionRegex.test(fileName);
};

function ProfileClient() {
  const theme = useTheme();
  const [eventType, setEventType] = useState([]);
  const today = new Date().toISOString().slice(0, 10);
  const dataUser = getLocalStorageUserData();
  const dataInfo = getLocalStorageUserInfo();
  const [avatar, setAvatar] = useState(dataInfo?.avatarImage || "");
  const [selectedFile, setSelectedFile] = useState(null);
  console.log("selectedFile: ", selectedFile);
  const fileInputRef = useRef(null);
  const [fileError, setFileError] = useState(null);

  const navigate = useNavigate();

  const handleIconClick = () => {
    fileInputRef.current.click();
  };

  const handleFileInputChange = (e, setSelectedFile, setAvatar) => {
    const selectedFile = e.target.files[0];

    if (selectedFile) {
      if (validateFile(selectedFile.name)) {
        setSelectedFile(selectedFile);
        const objectUrl = URL.createObjectURL(selectedFile);
        setAvatar(objectUrl);
      } else {
        setSelectedFile(null);
        setAvatar("");
        setFileError("File input have format:(.jpg,.jpeg,.png,.gif,...)");
      }
    }
  };

  const birtdayData = dataInfo?.birthday?.split("T")[0];

  const [clientInfo, setClientInfo] = useState({
    email: dataUser.email || "",
    full_name: dataInfo?.full_name || "",
    phone: dataInfo?.phone || "",
    birthday: birtdayData || today,
    gender: dataInfo?.gender || "",
    favorit_enres: dataInfo?.favorit_enres || "",
  });
  console.log("clientInfo: ", clientInfo);

  // Hàm xử lý khi người dùng nhập dữ liệu vào input
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    console.log("name: ", name);
    // Cập nhật state tương ứng với input được thay đổi
    setClientInfo((clientInfo) => ({
      ...clientInfo,
      [name]: value,
    }));
  };

  const callApiProfile = async (base64EncodedImage, _idUser, clientInfo) => {
    try {
      const respone = await ApiCommon.profileClient({
        _idUser: _idUser,
        clientInfo: clientInfo,
        avatarImage: base64EncodedImage,
      });
      console.log(respone.data);
       setLocalStorageUserInfo(respone.data);
      navigate("/");
      toast.success("Update profile success!", toastOptions);
    } catch (err) {
      console.error(err);
      const error = err.response.data.message;
      toast.error(error, toastOptions);
    }
  };

  const handleClientInfo = async (e) => {
    e.preventDefault();
    const base64EncodedImage = avatar;
    const formData = new FormData();
    formData.append("avatarImage", selectedFile);
    if (dataInfo) {
      try {
        const _idClient = dataInfo._id;
        const dataUpdate = {
          full_name: clientInfo?.full_name || "",
          phone: clientInfo?.phone || "",
          birthday: clientInfo.birthday || "",
          gender: clientInfo.gender || "",
          favorit_enres: clientInfo.favorit_enres || "",
        };

        if (selectedFile) {
          const reader = new FileReader();
          reader.readAsDataURL(selectedFile);
          reader.onloadend = () => {
            callApiUpdateProfile(_idClient, dataUpdate, reader.result);
          };
        } else {
          callApiUpdateProfile(_idClient, dataUpdate);
        }
      } catch (error) {
        console.log("error", error);
      }
    } else {
      try {
        const _idUser = dataUser._id;
        if (selectedFile) {
          const reader = new FileReader();
          reader.readAsDataURL(selectedFile);
          reader.onloadend = () => {
            callApiProfile(reader.result, _idUser, clientInfo);
          };
        } else {
          callApiProfile(null, _idUser, clientInfo);
        }
      } catch (error) {
        console.log("error", error);
      }
    }
  };

  const callApiUpdateProfile = async (
    _idClient,
    dataUpdate,
    base64EncodedImage = null
  ) => {
    try {
      const response = await ApiCommon.updateProfileClient({
        _idClient: _idClient,
        clientInfo: dataUpdate,
        avatarImage: base64EncodedImage, // Đường dẫn hình ảnh mới
      });
      // Sau khi cập nhật, có thể cần cập nhật dữ liệu người dùng với thông tin mới từ phản hồi
      await setLocalStorageUserInfo(response.data);
      console.log(response.data);
      navigate("/");
      // ...
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <Grid
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "50px",
        }}
      >
        <h1>Profile Client</h1>
      </Grid>
      <FormSubmit
        onSubmit={(e) => handleClientInfo(e)}
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <Grid style={{ display: "flex", justifyContent: "space-around" }}>
          <Grid style={{ width: "40%" }}>
            <Stack>
              <InputCustom
                disabled={true}
                type="text"
                name="email"
                placeholder="email"
                value={clientInfo.email}
                onChange={handleInputChange}
                label="Email"
              />
            </Stack>
            <Stack marginTop={"20px"}>
              <InputCustom
                type="text"
                name="full_name"
                placeholder="Full Name"
                value={clientInfo?.full_name}
                onChange={handleInputChange}
                label="Full Name"
              />
            </Stack>
            <Stack
              direction="row"
              spacing={12}
              style={{ marginBottom: "20px" }}
            >
              <FormControl>
                <FormLabel id="demo-row-radio-buttons-group-label">
                  Gender
                </FormLabel>
                <RadioGroup
                  name="gender"
                  value={clientInfo.gender}
                  onChange={handleInputChange}
                  row
                  aria-labelledby="demo-row-radio-buttons-group-label"
                >
                  <FormControlLabel
                    value="Female"
                    control={<Radio />}
                    label="Female"
                  />
                  <FormControlLabel
                    value="Male"
                    control={<Radio />}
                    label="Male"
                  />
                  <FormControlLabel
                    value="Other"
                    control={<Radio />}
                    label="Other"
                  />
                </RadioGroup>
              </FormControl>
            </Stack>

            <Stack style={{ marginBottom: "20px" }}>
              <InputCustom
                type="text"
                name="phone"
                value={clientInfo.phone}
                onChange={handleInputChange}
                label="Phone number"
              />
            </Stack>
            <Stack>
              <InputCustom
                type="date"
                name="birthday"
                value={clientInfo.birthday}
                onChange={handleInputChange}
                label="Day of birth"
              />
            </Stack>
            <Stack marginTop={"20px"}>
              <FormControl fullWidth style={{ marginBottom: "20px" }}>
                <InputLabel id="demo-multiple-chip-label">
                  Event Type
                </InputLabel>
                <Select
                  labelId="demo-multiple-chip-label"
                  id="demo-multiple-chip"
                  multiple
                  name="favorit_enres"
                  value={
                    Array.isArray(clientInfo?.favorit_enres)
                      ? clientInfo?.favorit_enres
                      : []
                  }
                  onChange={handleInputChange}
                  input={
                    <OutlinedInput
                      id="select-multiple-chip"
                      label="Event Type"
                    />
                  }
                  renderValue={(selected) => (
                    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                      {selected.map((value) => (
                        <Chip key={value} label={value} />
                      ))}
                    </Box>
                  )}
                  MenuProps={MENUPROPS}
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
          </Grid>
          <Grid marginTop={"20px"}>
            <Stack>
              <Avatar
                style={{
                  height: "350px",
                  width: "350px",
                  marginBottom: "40px",
                }}
                alt="Remy Sharp"
                src={avatar}
              />
              <MonochromePhotosIcon
                style={{
                  marginLeft: "210px",
                  fontSize: "60px",
                  marginTop: "-80px",
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
            </Stack>
            {fileError && (
              <p style={{ color: "red", marginTop: "5px" }}>{fileError}</p>
            )}
          </Grid>
        </Grid>

        <Grid
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Stack style={{ width: "50%", marginTop: "20px" }}>
            <ButtonCustom
              color="black"
              content="Update Information"
              backgroundcolor="#F5BD19"
            />
          </Stack>
          <Stack style={{ width: "50%", margin: "30px" }}>
            <ButtonCustom
              type="button"
              onClick={() => navigate("/change-password")}
              color="black"
              content="Change password"
              backgroundcolor="#F5BD19"
            />
          </Stack>
        </Grid>
        <ToastContainer />
      </FormSubmit>
    </>
  );
}

export default ProfileClient;
