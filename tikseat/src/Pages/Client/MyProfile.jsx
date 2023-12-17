import { Avatar, Box, Grid, Paper, Stack, Typography } from "@mui/material";
import "../../Assets/CSS/Common/LayoutSign.css";
import MonochromePhotosIcon from "@mui/icons-material/MonochromePhotos";
import { NAME_LOGO } from "../../Assets/Constant/Common/constCommon";
import FormSubmit from "../../Components/Common/FormCustom/FormSubmit";
import InputCustom from "../../Components/Common/Input/InputCustom";
import ButtonCustom from "../../Components/Common/Button/ButtonCustom";
import {
  getLocalStorageUserData,
  getLocalStorageUserInfo,
} from "../../Store/userStore";
import { useNavigate } from "react-router-dom";
const MyProfile = () => {
  // const fileInputRef = useRef(null);
  const navigate = useNavigate();
  const dataUser = getLocalStorageUserData();
  console.log("dataUser: ", dataUser);
  const dataInfo = getLocalStorageUserInfo();
  console.log("dataInfo: ", dataInfo);

  // const handleUpdateProfile = (e) => {
  //   e.preventDefault();
  // };

  return (
    <Grid className="login">
      <Paper
        className="loginGrid"
        style={{
          boxShadow: "rgb(223 193 34 / 51%) 0px 1px 15px 15px",
          padding: "20px",
        }}
      >
        <Box component={"div"} width={"100%"}>
          <Typography variant="h3" className="logo" component="h4">
            {NAME_LOGO}
          </Typography>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <h1>My Profile</h1>
          </div>
          <Grid container spacing={10} marginTop={"40px"}>
            <Grid item xs={6}>
              <FormSubmit
                // onSubmit={handleUpdateProfile}
                style={{
                  width: "100%",
                  height: "90%",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                }}
              >
                <Box marginTop={"30px"}>
                  <InputCustom
                    disabled={true}
                    type="password"
                    id="My password"
                    name="My password"
                    value={dataUser?.password}
                    label="My password"
                  />
                </Box>
                <Box
                  style={{ display: "flex", alignItems: "center", gap: "10px" }}
                  component={"div"}
                >
                  <Typography variant="h6">Gender:</Typography>
                  <Typography variant="h6">{dataInfo.gender}</Typography>
                </Box>
                <Box marginTop={"30px"}>
                  <InputCustom
                    type="text"
                    disabled={true}
                    id="phone"
                    name="phone"
                    value={dataInfo?.phone}
                    label="Phone Number"
                  />
                </Box>
                <Box marginTop={"30px"}>
                  <InputCustom
                    type="text"
                    id="dob"
                    disabled={true}
                    name="dob"
                    value={dataInfo.birthday}
                    label="DOB"
                  />
                </Box>
              </FormSubmit>
            </Grid>
            <Grid item xs={6}>
              <Box
                style={{
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <Box
                  style={{
                    width: "100%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Avatar
                    style={{ height: "300px", width: "300px" }}
                    alt="Remy Sharp"
                    src={dataInfo?.avatar}
                  />
                  <MonochromePhotosIcon
                    style={{
                      marginLeft: "185px",
                      fontSize: "60px",
                      marginTop: "-50px",
                      position: "relative",
                    }}
                    // onClick={handleIconClick}
                  />
                </Box>
              </Box>
            </Grid>
          </Grid>
          <Stack style={{ width: "50%", margin: "50px auto" }}>
            <ButtonCustom
              type="button"
              onClick={() => navigate("/change-password")}
              color="black"
              content="Update password"
              backgroundcolor="#F5BD19"
            />
          </Stack>
        </Box>
      </Paper>
    </Grid>
  );
};

export default MyProfile;
