import React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

export default function DialogNotification({ isDialogOpen, setIsDialogOpen }) {
  const closeDialog = () => {
    setIsDialogOpen(false);
  };
  return (
    <Dialog open={isDialogOpen} onClose={closeDialog}>
      <DialogTitle>Ticket Sales Ended</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Ticket sales for this event have ended. Thank you for your interest!
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={closeDialog}>Close</Button>
      </DialogActions>
    </Dialog>
  );
}
