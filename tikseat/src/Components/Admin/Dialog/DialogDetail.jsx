import React, { useState, useEffect } from "react";
import Dialog from "@mui/material/Dialog";
import { styled } from "@mui/material/styles";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import Chip from "@mui/material/Chip";
import { Avatar, Typography } from "@mui/material";
import DialogListContent from "./DialogListContent";
import DialogConfirm from "./DialogConfirm";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
  "& .MuiDialog-paper": {
    maxWidth: "90%",
    maxHeight: "90%",
  },
}));

const StyledCard = styled(Card)(({ theme }) => ({
  width: "100%", // Adjust the desired width
  height: "100%",
  padding: theme.spacing(2),
  // display: "flex",
  // flexDirection: "column",
  // alignItems: "center",
  boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.2)",
  borderRadius: theme.spacing(1),
}));

export const StyledAvatar = styled(Avatar)(({ theme }) => ({
  width: "200px",
  height: "200px",
}));

export const StyledName = styled(Typography)(({ theme }) => ({
  fontSize: "24px",
}));

export const StyledOtherText = styled(Typography)(({ theme }) => ({
  fontSize: "16px",
  marginBottom: theme.spacing(1),
}));

export const StyledChip = styled(Chip)(({ theme }) => ({
  fontSize: "16px",
  marginBottom: theme.spacing(2),
}));

const DialogComponent = ({
  open,
  selectedUser,
  onClose,
  isClient,
  nameTitle,
  isDetail,
  onConfirm,
  isConfirmEvent,
  dialogTitle,
  dialogContent,
  selectedDataEvent,
  isOrder,
}) => {
  const [dialogWidth, setDialogWidth] = useState("600px");
  const [dialogHeight, setDialogHeight] = useState("400px");

  useEffect(() => {
    const handleResize = () => {
      const maxWidth = window.innerWidth * 0.9;
      const maxHeight = window.innerHeight * 0.9;
      setDialogWidth(`${maxWidth}px`);
      setDialogHeight(`${maxHeight}px`);
    };

    // Set initial dimensions on component mount
    handleResize();

    // Update dimensions on window resize
    window.addEventListener("resize", handleResize);

    return () => {
      // Clean up event listener on component unmount
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      {isDetail ? (
        <>
          <BootstrapDialog
            open={open}
            onClose={onClose}
            aria-labelledby="customized-dialog-title"
            sx={{
              "& .MuiDialog-paper": {
                width: dialogWidth,
                height: dialogHeight,
              },
            }}>
            <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
              Detail Profile {nameTitle}
            </DialogTitle>
            <IconButton
              aria-label="close"
              onClick={onClose}
              sx={{
                position: "absolute",
                right: 8,
                top: 8,
                color: (theme) => theme.palette.grey[500],
              }}>
              <CloseIcon />
            </IconButton>
            <DialogContent>
              <StyledCard>
                <DialogListContent
                  selectedDetail={selectedUser}
                  isClient={isClient}
                  selectedDataEvent={selectedDataEvent}
                  isOrder={isOrder}
                />
              </StyledCard>
            </DialogContent>
            <DialogActions>
              <Button onClick={onClose} color="primary">
                Close
              </Button>
            </DialogActions>
          </BootstrapDialog>
        </>
      ) : (
        <>
          <BootstrapDialog
            open={open}
            onClose={onClose}
            aria-labelledby="customized-dialog-title">
            <DialogConfirm
              onClose={onClose}
              onConfirm={onConfirm}
              isConfirmEvent={isConfirmEvent}
              event={selectedUser}
              dialogTitle={dialogTitle}
              dialogContent={dialogContent}
            />
          </BootstrapDialog>
        </>
      )}
    </>
  );
};

export default DialogComponent;
