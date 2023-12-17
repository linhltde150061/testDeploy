import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ApiClient from "../../API/Client/ApiClient";
import {
  getLocalStorageEventId,
  getLocalStorageListChairId,
  setLocalStorageEventId,
  setLocalStorageListChairId,
  getLocalStorageUserData,
  getLocalStorageUserInfo,
} from "../../Store/userStore";

const PaymentComplated = () => {
  const navigate = useNavigate();
  const listChairId = getLocalStorageListChairId();
  const eventId = getLocalStorageEventId();
  const dataInfo = getLocalStorageUserInfo();
  const dataUser = getLocalStorageUserData();

  const [statusPayment, setStatusPayment] = useState(null);
  const [borderColor, setBorderColor] = useState(null);
  const [borderboxShadow, setBorderBoxShadow] = useState(null);
  const [textColor, setTextColor] = useState(null);
  const [sendEmail, setSendEmail] = useState("block");
  const [changePage, setChangePage] = useState("/my_ticket");
  const [buttonChangePage, setButtonChangePage] = useState("Go To List");
  

  var currentURL = window.location.href;
  var urlObject = new URL(currentURL);
  var apptransid = urlObject.searchParams.get("apptransid");
  var totalAmount = urlObject.searchParams.get("amount");
  var statusPay = urlObject.searchParams.get("status");


  useEffect(() => {
    if (statusPay === "1") {
      setStatusPayment("Payment Completed !");
      setBorderColor("2px solid green");
      setBorderBoxShadow("2px 3px 2px 2px green");
      setTextColor("green");

      const handleCreateTicket = async () => {
        try {
          const response = await ApiClient.getCreateTicket({
            _idClient: dataInfo._id,
            _idEvent: eventId,
            chairIds: listChairId,
            totalAmount: totalAmount,
            email: dataUser.email,
            app_trans_id: apptransid,
          });
          if (response.status === true) {
            console.log("aaaaa");
          } else {
            console.log("error");
          }
        } catch (error) {
          console.log(error);
        }
      };
  
      handleCreateTicket();
    } else {
      setStatusPayment("Payment Failed !");
      setBorderColor("2px solid red");
      setBorderBoxShadow("2px 3px 2px 2px red");
      setTextColor("red");
      setChangePage("/");
      setButtonChangePage("Go To Home");
      setSendEmail("none");
      setLocalStorageEventId([]);
      setLocalStorageListChairId([]);
    }
  }, []);

  // const handleClose = () => {
  //   window.close();
  // }
  
  return (
    <div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginTop: "40px",
        }}
      >
        <div
          style={{
            fontSize: "25px",
            fontWeight: "bold",
            color: textColor,
            borderRadius: "10px",
            border: borderColor,
            padding: "14px 50px",
            boxShadow: borderboxShadow,
          }}
        >
          {statusPayment}
        </div>
        <div style={{ width: "500px", marginTop: "20px" }}>
          <img
            src="https://i.pinimg.com/736x/5e/8e/a5/5e8ea5d2cfa1c73f2bfae63001962d82.jpg"
            alt="background completed"
          />
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <h2 style={{display: sendEmail}}>Ticket have been sent to</h2>
          <span style={{ color: "#23abe3", display: sendEmail }}>{dataUser.email}</span>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginTop: "40px",
          }}
        >
          <h4 style={{display: sendEmail}}>Go to the list you purchased</h4>
          <Link
            style={{
              padding: "10px 40px",
              border: "1px solid #23abe3",
              borderRadius: "10px",
              fontWeight: "bold",
              color: "#23abe3",
              marginTop: "10px",
            }}
            to={changePage}
            onClick={() => {
              window.opener.location.reload();
              window.close();
            }}
          >
            {buttonChangePage}
          </Link>
         
        </div>
      </div>
    </div>
  );
};

export default PaymentComplated;
