import React, { useEffect, useState } from "react";
import { Grid, TextField, Button } from "@mui/material";
import QRCode from "qrcode";
import QrReader from "react-qr-reader";
import "../../Assets/CSS/Organizer/Checkin.css";
import ApiEvent from "../../API/Event/ApiEvent";
import Modal from "@mui/material/Modal";
import OfflinePinIcon from "@mui/icons-material/OfflinePin";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";

import "../../Assets/CSS/Organizer/CheckinTicket.css";

function CheckingTicket({ CheckingTicket }) {
  const idEvent = CheckingTicket;

  const [open, setOpen] = useState(false);
  const [checkin, setCheckin] = useState(true);
  // const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [text, setText] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  // const [scanResultWebCam, setScanResultWebCam] = useState("");
  const [parsedResult, setParsedResult] = useState(null);
  const [responseMess, setResponseMess] = useState("");
  const [borderModal, setBorderModal] = useState("2px solid #000");
  const [colorModal, setColorModal] = useState("black");
  const [iconModal, setIconModal] = useState(true);

  const generateQrCode = async () => {
    try {
      const response = await QRCode.toDataURL(text);
      setImageUrl(response);
    } catch (error) {
      console.log(error);
    }
  };

  const handleErrorWebCam = (error) => {
    console.log(error);
  };

  const handleScanWebCam = (result) => {
    if (result) {
      try {
        const parsedResult = JSON.parse(result);
        setParsedResult(parsedResult);
      } catch (error) {
        console.error("Error parsing JSON:", error);
      }
    }
  };

  useEffect(() => {
    if (checkin === true && parsedResult !== null) {
      const checkinTicketToday = async () => {
        try {
          const response = await ApiEvent.checkIn({
            _idEventDB: idEvent,
            QR: parsedResult, // Use parsedResult directly here
          });
          console.log("data: ", response);
          if (response.status === true) {
            setResponseMess(response.message);
            setBorderModal("5px solid green");
            setColorModal("green");
            setOpen(true);
            setIconModal(true);
            setCheckin(false);
          } else {
            console.log("error");
          }
        } catch (response) {
          console.log(response);
          setResponseMess(response.response.data.message);
          setBorderModal("5px solid red");
          setColorModal("red");
          setOpen(true);
          setIconModal(false);
        }
      };
      checkinTicketToday();
    }
  }, [parsedResult]);

  const handleCheckin = () => {
    setOpen(false);
    setCheckin(true);
  };

  return (
    <Grid
      sx={{
        backgroundColor: "#ffffff",
        borderRadius: "10px",
        padding: "10px",
        height: "89vh",
      }}
    >
      <h2>Generate Download & Scan QR Code </h2>
      <Grid className="body-QR">
        <Grid className="generate">
          <TextField
            fullWidth
            label="Enter Text Here"
            onChange={(e) => setText(e.target.value)}
          />
          <Button
            sx={{ marginTop: "20px", width: "50%" }}
            variant="contained"
            color="primary"
            onClick={() => generateQrCode()}
          >
            Generate
          </Button>
          <Grid
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {imageUrl ? (
              <a href={imageUrl} download>
                <img
                  style={{ height: "300px", width: "300px" }}
                  src={imageUrl}
                  alt="img"
                />
              </a>
            ) : null}
          </Grid>
        </Grid>

        <Grid className="scanner">
          <Grid>
            <h3>Qr Code Scan by Web Cam</h3>
            <QrReader
              delay={5}
              onError={handleErrorWebCam}
              onScan={handleScanWebCam}
            />
          </Grid>
        </Grid>
      </Grid>

      <Grid>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Grid
            className="modalCheckin"
            sx={{
              border: borderModal,
              color: colorModal,
            }}
          >
            <span className="textModal">{responseMess}</span>
            <Button
              sx={{ width: "100%", marginTop: "20px" }}
              onClick={() => handleCheckin()}
            >
              {iconModal ? (
                <OfflinePinIcon sx={{ color: colorModal, fontSize: "50px" }} />
              ) : (
                <HighlightOffIcon
                  sx={{ color: colorModal, fontSize: "50px" }}
                />
              )}
            </Button>
          </Grid>
        </Modal>
      </Grid>
    </Grid>
  );
}

export default CheckingTicket;
