import {
  Typography,
  AppBar,
  Box,
  FormControl,
  Pagination,
  TextField,
  Autocomplete,
} from "@mui/material";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Carousel } from "react-responsive-carousel";
import {
  colorAliceBlue,
  colorCetaceanBlue,
  colorElectricPink,
  colorIndigo,
  colorWhite,
} from "./theme";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";

export const BackToPageStyle = styled(Link)`
  margin-top: 20px;
  font-style: italic;
  display: flex;
  align-items: center;
`;

export const ContentIntroductionStyle = styled.div`
  padding: 20px 150px;
  text-align: center;
  & p {
    font-size: 12px;
    width: 500px;
    margin: 0 auto;
    color: #112211;
  }
`;

export const PageNameStyle = styled(Typography)`
  margin-top: 30px !important;
  font-style: italic;
`;

export const TitlePageStyle = styled.p`
  color: #112211;
  margin-top: 20px;
`;

export const ChooseItemStyle = styled.div`
  box-shadow: 2px 4px 12px 8px #8fbffc;
  padding: 20px;
  border-radius: 50px;
  text-align: center;
`;

export const OrtherSignUpMethodStyle = styled.div`
  padding: 15px 20px;
  border-radius: 10px;
  border: 1px solid #f5bd19;
  text-align: center;
  flex: 1;
`;

export const SignUpLineOrtherStyle = styled.div`
  position: relative;
  width: 100%;
  height: 1px;
  background: gray;

  & span {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 2;
    background: white;
    padding: 0 10px;
    color: #112211;
    font-size: 14px;
  }
`;

export const AnotherChoiceStyle = styled.div`
  padding: 15px 20px;
  border-radius: 10px;
  border: 1px solid #8dd3bb;
  text-align: center;
  flex: 1;
`;

//   header
export const HeaderStyle = styled(Box)`
  position: relative;
  & .header {
    &-overlay {
      position: absolute;
      background: linear-gradient(
        118.98deg,
        #ed4691d0 -2.11%,
        #5522ccbe 63.58%
      );
      height: 100%;
      width: 100%;
      top: 0;
      margin: auto;
    }
  }
`;
export const CarouselStyle = styled(Carousel)`
  overflow: hidden;
  border-radius: 30px;
  & .carousel-status {
    display: none;
  }
`;
export const TextFieldStyle = styled(TextField)`
  width: 100% !important;

  .MuiInputBase-root {
    background-color: transparent !important;
    &::before {
      border-width: 1.5px;
      border-color: #7778b0 !important;
    }
  }
  label {
    font-size: 16px !important;
    color: ${colorWhite};
    top: -20px;
    line-height: 21px;
    left: -10px;
  }
  input,
  #filled-helperText {
    color: ${colorWhite};
    font-size: 22px;
    width: 100%;
    padding-left: 0;
  }
`;
//

export const FormControlStyle = styled(FormControl)`
  background: ${colorAliceBlue};
  border-radius: 30px;
  width: 168px;

  & #demo-simple-select {
    border-radius: 30px;
    overflow: hidden;
    padding-left: 20px;
    font-size: 14px;
    background: ${colorAliceBlue};
    border: none;
    width: 150px;
  }
  & .MuiSelect-select {
    color: #1d275f !important;
    font-weight: 500 !important;
  }
  .MuiOutlinedInput-notchedOutline {
    display: none !important;
  }
`;

// footer style
export const FooterStyle = styled.footer`
  background: ${colorCetaceanBlue};
  padding: 50px;
`;

export const CpSendEmailStyle = styled.div`
  position: relative;
  padding: 10px;
  border-radius: 45px;
  background: ${colorWhite};
  display: flex;
  align-items: center;
  gap: 30px;
  width: 364px;
  & input {
    border: none;
    font-size: 12px;
    width: 144px;
    margin-left: 15px;
  }
  & .button_send_email {
    background: ${colorElectricPink} !important;
    font-size: 12px;
    font-weight: 400;
    border-radius: 50px;
    color: ${colorWhite};
    display: flex;
    width: 302px;
    height: 45px;
  }
`;

export const FormHeaderStyle = styled.div`
  width: 80%;
  position: absolute;
  bottom: -82px;
  background: ${colorIndigo};
  z-index: 2;
  left: 50%;
  transform: translateX(-50%);
  border-radius: 20px;
  /* overflow: hidden; */
  padding: 50px 60px;
`;

export const AppBarStyle = styled(AppBar)`
  background: transparent !important;
  position: absolute;
  box-shadow: none;
  padding: 0 150px;
  top: 24px;
`;

export const ButtonLoginStyle = styled(Link)`
  padding: 10px 30px;
  border-radius: 50px;
  border: 1px solid ${(props) => props.color};
  color: ${(props) => props.color};
  line-height: 21px;
`;

export const BoxPaginationStyle = styled(Box)`
  margin: 50px auto;
  width: 100%;
  display: flex;
  justify-content: center;
`;

export const DatePickerStyle = styled(DatePicker)`
  & .MuiInputBase-root {
    & fieldset.MuiOutlinedInput-notchedOutline {
      border: 0 !important;
      & input {
        color: white !important;
      }
    }
    & .MuiButtonBase-root {
      color: white !important;
    }
    color: white !important;
  }
`;

export const AutocompleteStyle = styled(Autocomplete)`
  & input,
  label,
  .MuiAutocomplete-tag {
    color: white !important;
  }
  & .MuiOutlinedInput-notchedOutline {
    border: none !important;
  }

  & .MuiAutocomplete-tag {
  }
`;
