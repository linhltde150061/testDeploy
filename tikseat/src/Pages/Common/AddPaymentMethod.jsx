import React, { useState } from "react";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import {
  Box,
  Checkbox,
  FormControlLabel,
  MenuItem,
  Stack,
  TextField,
  Grid,
  Button,
} from "@mui/material";
import InputCustom from "../../Components/Common/Input/InputCustom";
// import ButtonCustom from "../../Components/Common/Button/ButtonCustom";
import {
  ADD_PAYMENT_METHOD,
  BACK,
  CONTENT_INTRODUCTION,
  SECURELY_SAVE_MY_INFO,
  TITLE_PAGE_SIGN_UP,
} from "../../Assets/Constant/Common/constCommon";
import ApiCommon from "../../API/Common/ApiCommon";
import {
  BackToPageStyle,
  ContentIntroductionStyle,
  PageNameStyle,
  TitlePageStyle,
} from "../../Assets/CSS/Style/style.const";
import FormSubmit from "../../Components/Common/FormCustom/FormSubmit";

const currencies = [];
const AddPaymentMethod = () => {
  const [cardNumber, setCardNumber] = useState("");
  const [CVCard, setCVCard] = useState(null);
  const [nameCard, setNameCard] = useState(null);
  const [date, setDate] = useState(new Date().toLocaleString());
  const formatCardNumber = (input) => {
    const digitsOnly = input.replace(/\D/g, "");

    const formatted = digitsOnly.replace(/(\d{4})(?=\d)/g, "$1 ");
    return formatted;
  };
  const handleCardNumberChange = (event) => {
    const input = event.target.value;
    const format = formatCardNumber(input);
    console.log("format: ", format);
    setCardNumber(format);
  };
  const handleAddPayment = async (e) => {
    e.preventDefault();
    try {
      const newData = {};
      const response = await ApiCommon.addPayment(newData);
      if (response.status === 200) {
      } else {
      }
    } catch (error) {
      console.log("error: ", error);
    }
  };
  return (
    <Grid
      style={{
        margin: "50px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        backgroundColor: "#ffffff",
          borderRadius: "10px",
          padding: "30px",
      }}
    >
      <PageNameStyle variant="h4" component={"h5"}>
        {ADD_PAYMENT_METHOD}
      </PageNameStyle>

      <Box>
        <FormSubmit onSubmit={handleAddPayment}>
          <InputCustom
            inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
            type="text"
            setValue={handleCardNumberChange}
            label="Card Number"
          />

          <Stack style={{margin:"20px 0px 20px 0px"}} direction="row" spacing={6}>
            <InputCustom
              type="date"
              setValue={setDate}
              label="Exp. Date"
              defaultValue={date}
            />
            <InputCustom type="text" setValue={setCVCard} label="CVC" />
          </Stack>
          <InputCustom
            type="text"
            setValue={setNameCard}
            label="Name on Card"
          />
          <TextField
            id="outlined-select-currency"
            select
            label="Country or Region"
            defaultValue="EUR"
            helperText="Please select your currency"
            style={{ width: "100%", marginTop:"20px" }}
          >
            {currencies.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
          <Grid
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "30px",
            }}
          >
            <Button
              style={{
                padding: "10px",
                color: "black",
                fontWeight: "bold",
                fontSize: "18px",
                backgroundColor: "#F5BD19",
                width: "50%",
              }}
              type="submit"
            >
              Verify
            </Button>
          </Grid>
        </FormSubmit>
        <ContentIntroductionStyle>
          <p>{CONTENT_INTRODUCTION}</p>
        </ContentIntroductionStyle>
      </Box>
    </Grid>
  );
};

export default AddPaymentMethod;
