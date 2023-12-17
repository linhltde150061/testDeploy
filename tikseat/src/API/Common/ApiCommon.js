import {
  URL_ADDPAYMENT,
  URL_PROFILEOTGANIZER,
  URL_PROFILECLIENT,
  URL_FORGOTPASSWORD,
  URL_SENOTP,
  URL_REGISTERUSER,
  URL_SIGNUP,
  URL_VERIFYCODE,
  URL_VERIFYEMAIL,
  URL_VERIFYOTP,
  URL_LOGIN,
  URL_RESENDOTP,
  URL_UPDATE_PROFILE,
  URL_CHANGEPASSWORD,
  URL_GETALLEVENTS,
  URL_GETEVENTBYID,
  URL_GETDETAILEVENT,
  URL_UPDATE_PROFILEORGANIZER,
  URL_RESETPASSWORD,
} from "../ConstAPI";
import axiosDefault from "../Defaults/AxiosDefault";

const ApiCommon = {
  signUp(data) {
    return axiosDefault.post(URL_SIGNUP, { name: data.name });
  },

  changePassword(data) {
    return axiosDefault.post(URL_CHANGEPASSWORD, data);
  },

  updateProfileClient(data) {
    return axiosDefault.post(URL_UPDATE_PROFILE, data);
  },
  profileClient(data) {
    return axiosDefault.post(URL_PROFILECLIENT, data);
  },

  sendOtp(data) {
    return axiosDefault.post(URL_SENOTP, data);
  },

  verifyOtp(data) {
    return axiosDefault.post(URL_VERIFYOTP, data);
  },

  profileOrganizer(data) {
    return axiosDefault.post(URL_PROFILEOTGANIZER, data);
  },

  updateProfileOrganizer(data) {
    return axiosDefault.post(URL_UPDATE_PROFILEORGANIZER, data);
  },

  addPayment(data) {
    return axiosDefault.post(URL_ADDPAYMENT, data);
  },

  forgotPassword(data) {
    return axiosDefault.post(URL_FORGOTPASSWORD, data);
  },

  registerUser(data) {
    return axiosDefault.post(URL_REGISTERUSER, data);
  },

  verifyCode(data) {
    return axiosDefault.post(URL_VERIFYCODE, data);
  },

  verifyEmail(data) {
    return axiosDefault.post(URL_VERIFYEMAIL, data);
  },

  login(data) {
    return axiosDefault.post(URL_LOGIN, data);
  },
  resendOTP(data) {
    return axiosDefault.post(URL_RESENDOTP, data);
  },
  resetPassword(data) {
    return axiosDefault.post(URL_RESETPASSWORD, data);
  }
};

export default ApiCommon;
