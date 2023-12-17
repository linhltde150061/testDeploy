import React, { useEffect } from "react";
import {
  Grid,
  FormControl,
  InputLabel,
  OutlinedInput,
  Checkbox,
  IconButton,
  InputAdornment,
  Button,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  FORGOT_PASSWORD,
  LOGIN,
  ROLE,
} from "../../../Assets/Constant/Common/constCommon";
import { useNavigate, Link } from "react-router-dom";
import ApiCommon from "../../../API/Common/ApiCommon";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import FormSubmit from "./FormSubmit";
import jwtDecode from "jwt-decode";
import {
  getLocalStorageToken,
  setLocalStorageToken,
} from "../../../Store/authStore";
import {
  setLocalStorageUserData,
  setLocalStorageUserInfo,
} from "../../../Store/userStore";
import { toastOptions } from "../../../Assets/Constant/Common/dataCommon";
import InputCustom from "../Input/InputCustom";
import { useOpenStore } from "../../../Store/openStore";
import { checkToken } from "../../../Pages/Admin/Adminpage";

function FormLogin({
  handleClickShowPassword,
  handleMouseDownPassword,
  showPassword,
}) {
  const [email, setEmail] = React.useState();
  const [password, setPassword] = React.useState();
  let navigate = useNavigate();
  const { eventId } = useOpenStore();

  //Điều hướng login
  const navigateAfterLogin = () => {
    if (jwtDecode(getLocalStorageToken()).role == ROLE[0]) {
      if (eventId) {
        navigate(`/${eventId}`);
      } else {
        navigate("/");
      }
    } else if (jwtDecode(getLocalStorageToken()).role == ROLE[1]) {
      navigate("/dashboard");
    } else {
      navigate("/homepageAdmin");
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await ApiCommon.login({
        email: email,
        password: password,
      });
      const token = response.token;
      const dataUser = response.data.dataUser;
      const dataInfo = response.data.dataInfo;

      setLocalStorageToken(token);
      setLocalStorageUserData(dataUser);
      setLocalStorageUserInfo(dataInfo);
      navigateAfterLogin();
    } catch (error) {
      const err = error.response.data.message;
      toast.error(err, toastOptions);
    }
  };

  function checkUser() {
    const token = getLocalStorageToken();
    if (!token) {
      navigate("/login");
    } else {
      const roleNavigate = jwtDecode(token).role;
      console.log("roleNavigate", roleNavigate);
      if (roleNavigate == ROLE[0]) {
        navigate("/");
      } else if (roleNavigate == ROLE[1]) {
        navigate("/dashboard");
      } else {
        navigate("/homepageAdmin");
      }
    }
  }

  useEffect(() => {
    checkUser();
  }, []);

  return (
    <>
      <FormSubmit onSubmit={handleLogin}>
        <Grid style={{ marginBottom: "30px" }}>
          <InputCustom
            className="email"
            label="Email"
            placeholder="Email"
            fullWidth
            required
            type="email"
            value={email}
            setValue={setEmail}
          />
        </Grid>
        <FormControl
          variant="outlined"
          fullWidth
          style={{ marginBottom: "20px" }}>
          <InputLabel htmlFor="outlined-adornment-password" required>
            Password
          </InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            endAdornment={
              <InputAdornment position="end" variant="standard">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end">
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
          />
        </FormControl>
        <div
          style={{
            display: "flex",
            flexDirection: "row-reverse",
            marginBottom: "20px",
          }}>
          <Link
            to={"/forgot-password"}
            style={{
              padding: "10px",
              color: "#F5BD19",
              textDecoration: "none",
            }}>
            {FORGOT_PASSWORD}
          </Link>
        </div>

        <Grid className="btnLogin">
          <Button
            style={{
              padding: "10px",
              color: "black",
              fontWeight: "bold",
              fontSize: "18px",
            }}
            type="submit"
            fullWidth>
            {LOGIN}
          </Button>
        </Grid>

        <ToastContainer />

        <Grid className="btnLogin">
          <Link
            style={{
              backgroundColor: "#F5BD19",
              color: "black",
              textDecoration: "none",
            }}
            to="/choose-access"
            fullWidth>
            <Button
              style={{
                padding: "10px",

                color: "black",
                fontWeight: "bold",
                fontSize: "18px",
              }}
              fullWidth>
              Sign Up
            </Button>
          </Link>
        </Grid>
      </FormSubmit>
    </>
  );
}

export default FormLogin;
