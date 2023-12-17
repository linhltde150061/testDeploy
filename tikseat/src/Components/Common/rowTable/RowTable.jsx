import React, { useEffect, useState } from "react";
import ApiClient from "../../../API/Client/ApiClient";
import {
  Box,
  Button,
  Collapse,
  Modal,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import { toast } from "react-toastify";
import { getLocalStorageUserInfo } from "../../../Store/userStore";
import Rating from "@mui/material/Rating";
import { createPortal } from "react-dom";
import { useOpenStore } from "../../../Store/openStore";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 800,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};
const label = { inputProps: { "aria-label": "Checkbox demo" } };
function Row(props) {
  const { row, onRefetch } = props;
  const { checkRefund, setCheckRefund } = useOpenStore();
  const dataInfo = getLocalStorageUserInfo();
  const eventDate = new Date(row.eventDate);
  const currentDate = new Date();
  const isEnded = currentDate > eventDate;
  const [open, setOpen] = useState(false);
  const [dataRow, setDataRow] = useState([]);
  const [dataMyTicket, setDataMyTicket] = useState([]);
  useEffect(() => {
    if (open) {
      async function getMyTicket() {
        const res = await ApiClient.getMyTicket({
          _idOrderDetail: row._idOrderDetail,
        });
        setDataMyTicket(res.data[0].Orders[0].tickets);
      }
      getMyTicket();
    }
  }, [row._idOrderDetail, open]);
  const [selectAll, setSelectAll] = useState(false);
  useEffect(() => {
    const checkRefund =
      dataMyTicket?.filter((item) => {
        return !item.isRefund;
      }) || [];
    setDataRow(checkRefund);
  }, [dataMyTicket]);
  const [rating, setRating] = useState(0);

  const [openRating, setOpenRating] = useState(false);
  const [ratingSent, setRatingSent] = useState(false);
  const [apiRating, setApiRating] = useState(null);
  const [chairRefund, setchairRefund] = useState([]);
  const [refundTickets, setRefundTickets] = React.useState(false);
  const [openViewDetail, setOpenViewDetail] = React.useState(false);
  const [confirmRefund, setConfirmRefund] = React.useState(false);
  const [viewDetail, setViewDetail] = React.useState("");
  const handleOpen = () => setOpenViewDetail(true);
  const handleClose = () => setOpenViewDetail(false);
  const handleDownload = async () => {
    const response = await fetch(viewDetail);
    const blob = await response.blob();

    const imageUrlObject = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = imageUrlObject;
    link.download = "downloaded_image.jpg";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleSendRating = async () => {
    const request = {
      event_id: row.eventId,
      client_id: dataInfo._id,
      star: rating,
    };
    try {
      const response = await ApiClient.rating(request);
      if (response) {
        toast.success("Đánh giá thành công!");
        setRatingSent(true);
        setApiRating(rating); // Cập nhật số sao từ API
      }
    } catch (error) {
      console.error("Lỗi khi gửi xếp hạng:", error);
    }
  };

  const handleCheckboxChange = (id) => {
    const updatedCheckboxes = (dataRow || []).map((checkbox) =>
      checkbox._id === id
        ? { ...checkbox, isRefund: !checkbox.isRefund }
        : checkbox
    );

    const filterChair = updatedCheckboxes.filter((item) => item.isRefund);
    setchairRefund(filterChair);
    setDataRow(updatedCheckboxes);

    const selectAllTickets = updatedCheckboxes.every(
      (checkbox) => checkbox.isRefund
    );
    setSelectAll(selectAllTickets);
  };

  const handleSelectAllChange = () => {
    const updatedCheckboxes = (dataRow || []).map((checkbox) => ({
      ...checkbox,
      isRefund: !selectAll,
    }));

    setchairRefund(() => updatedCheckboxes);
    setDataRow(() => updatedCheckboxes);
    setSelectAll(!selectAll);
  };
  const result =
    chairRefund?.length > 0 &&
    chairRefund?.reduce((accumulator, currentElement) => {
      if (currentElement.isRefund) {
        return accumulator + currentElement.ticket_price;
      }
      return accumulator;
    }, 0);

  const chairIds =
    chairRefund?.length > 0 &&
    chairRefund
      .filter((row) => {
        return row.isRefund;
      })
      .map((chair) => {
        return chair.chair_id;
      });

  const moneyRefund = (result / 100) * 70;
  const handleConfirmRefund = async () => {
    const dataRef = {
      _idOrderDetail: row._idOrderDetail,
      money_refund: moneyRefund,
      zp_trans_id: row?.zp_trans_id,
      chairIds: chairIds,
    };
    const responseRefund = await ApiClient.createRefund(dataRef);
    console.log("responseRefund: ", responseRefund);
    if (responseRefund.status) {
      onRefetch();
      await setCheckRefund(() => true);
      await onRefetch();
      toast.success("Ticket refund requested");
    }
  };
  const mappingSeat =
    chairRefund.length > 0 &&
    chairRefund?.map((item) => {
      return item.chairName;
    });
  const now = new Date();
  const eventDateTime = new Date(row.eventDate);

  // Check if the current date is more than 24 hours before the event
  const isRefundAllowed = eventDateTime - now > 24 * 60 * 60 * 1000;

  //CLick vào button vote
  async function handleClickVote() {
    const request = {
      event_id: row.eventId,
      client_id: dataInfo._id,
    };
    const reponse = await ApiClient.getClientRating(request);
    if (reponse) {
      checkVoted(reponse.clientRating);
      setOpenRating(true);
    }
  }
  //Kiểm tra xem đã vote event chưa
  function checkVoted(star) {
    if (star > 0) {
      setRatingSent(true);
      setApiRating(star);
    } else {
      setRatingSent(false);
    }
  }

  return (
    <React.Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell component="th" scope="row">
          {row?.eventName}
        </TableCell>
        <TableCell align="left">
          {new Date(row.eventDate)?.toLocaleString()}
        </TableCell>
        <TableCell align="left">{row.city}</TableCell>
        <TableCell>
          <Stack direction={"row"} gap={"10px"}>
            <Button
              variant="outlined"
              size="large"
              onClick={() => {
                setOpen(!open);
                setRefundTickets(false);
              }}
            >
              {open ? "collapse" : "Show more"}
            </Button>
            <>
              {(isEnded && !ratingSent) || (isEnded && ratingSent) ? (
                <Button variant="outlined" onClick={handleClickVote}>
                  Vote
                </Button>
              ) : null}

              <Modal open={openRating} onClose={() => setOpenRating(false)}>
                <Box
                  sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    width: 400,
                    bgcolor: "background.paper",
                    border: "2px solid #000",
                    boxShadow: 24,
                    p: 4,
                    borderRadius: "10px",
                  }}
                >
                  <Typography variant="h6">
                    Đánh giá sự kiện: {row.eventName}
                  </Typography>

                  {ratingSent ? (
                    <Rating value={apiRating} readOnly />
                  ) : (
                    <>
                      <Rating
                        onChange={(e, newRating) => setRating(newRating)}
                      />
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "flex-end",
                        }}
                      ></Box>
                      <Button
                        style={{ alignSelf: "flex-end" }}
                        onClick={handleSendRating}
                      >
                        Gửi đánh giá
                      </Button>
                    </>
                  )}
                </Box>
              </Modal>
            </>
            {isRefundAllowed && (
              <Button
                variant="outlined"
                color="error"
                size="large"
                onClick={() => {
                  setOpen(!open);
                  setRefundTickets(true);
                }}
              >
                Refund tickets
              </Button>
            )}
          </Stack>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, padding: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 0 }}>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell width={"5%"} />
                    <TableCell width={"25%"} />
                    <TableCell width={"20%"} />
                    <TableCell width={"20%"} />
                    <TableCell width={"20%"}>
                      {refundTickets && dataRow?.length > 0 && (
                        <Button
                          onClick={() => handleSelectAllChange()}
                          variant="outlined"
                          color="secondary"
                          size="small"
                        >
                          Refund all
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {dataMyTicket?.length > 0 &&
                    dataMyTicket?.map((ViewDetailRow, index) => {
                      console.log("ViewDetailRow: ", ViewDetailRow);
                      if (ViewDetailRow?.isRefund) {
                        return null;
                      }
                      return (
                        <TableRow checkboxSelection key={ViewDetailRow._id}>
                          <TableCell component="th" scope="row">
                            {index + 1}
                          </TableCell>
                          <TableCell>
                            Class ticket: {ViewDetailRow.classTicket}
                          </TableCell>
                          <TableCell align="left">
                            Chair: {ViewDetailRow.chairName}
                          </TableCell>
                          <TableCell align="left">
                            Price: {ViewDetailRow.ticket_price}
                          </TableCell>
                          <TableCell align="left" style={{ cursor: "pointer" }}>
                            {!refundTickets ? (
                              <Stack direction={"row"} gap={"10px"}>
                                {!ViewDetailRow?.isRefund ? (
                                  <Button
                                    onClick={() => {
                                      handleOpen();
                                      setViewDetail(ViewDetailRow.ticket);
                                    }}
                                    size="large"
                                    variant="contained"
                                    color="success"
                                  >
                                    View detail
                                  </Button>
                                ) : (
                                  <Button
                                    onClick={() => {}}
                                    size="large"
                                    variant="contained"
                                    color="error"
                                  >
                                    Tickets refund
                                  </Button>
                                )}
                              </Stack>
                            ) : (
                              <>
                                {!ViewDetailRow?.isRefund && (
                                  <Checkbox
                                    checked={Boolean(dataRow[index]?.isRefund)}
                                    // defaultChecked={Boolean(
                                    //   dataRow[index]?.isRefund
                                    // )}
                                    onChange={() =>
                                      handleCheckboxChange(ViewDetailRow._id)
                                    }
                                    {...label}
                                    sx={{
                                      "& .MuiSvgIcon-root": { fontSize: 28 },
                                    }}
                                  />
                                )}
                              </>
                            )}
                            <Modal
                              open={openViewDetail}
                              onClose={handleClose}
                              aria-labelledby="modal-modal-title"
                              aria-describedby="modal-modal-description"
                            >
                              <Box sx={style}>
                                <img
                                  id="downloadImage"
                                  src={viewDetail}
                                  alt="image ticket"
                                />
                                <Button
                                  onClick={handleDownload}
                                  variant="contained"
                                  size="large"
                                  color="primary"
                                >
                                  Download
                                </Button>
                              </Box>
                            </Modal>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  {refundTickets && (
                    <TableRow>
                      <TableCell colSpan={3} component="th" scope="row" />
                      <TableCell
                        style={{ whiteSpace: "nowrap" }}
                        colSpan={1}
                        component="th"
                        scope="row"
                      >
                        Amount you will receive:{" "}
                        {moneyRefund.toLocaleString("vi-VN") + " VND"}
                      </TableCell>
                      <TableCell component="th" scope="row">
                        <Button
                          variant="outlined"
                          disabled={chairIds?.length <= 0}
                          onClick={() => {
                            if (chairIds.length > 0) {
                              setConfirmRefund(true);
                            }
                          }}
                          size="large"
                        >
                          Confirm
                        </Button>
                        <>
                          {confirmRefund &&
                            createPortal(
                              <>
                                <div
                                  onClick={() => setConfirmRefund(false)}
                                  style={{
                                    position: "fixed",
                                    inset: 0,
                                    zIndex: 2222,
                                    background: "#adadad9e",
                                  }}
                                ></div>
                                <div
                                  style={{
                                    position: "fixed",
                                    width: "50%",
                                    top: "200px",
                                    background: "white",
                                    padding: "20px",
                                    borderRadius: "10px",
                                    boxShadow: "0 0 10px 2px black",

                                    zIndex: 2332,
                                    left: "50%",
                                    transform: "translateX(-50%)",
                                  }}
                                >
                                  <Typography variant="h4" textAlign={"center"}>
                                    Ticket refund confirmation
                                  </Typography>

                                  <Box>
                                    <Stack direction={"row"} gap={"10px"}>
                                      <Typography variant="body2">
                                        Event name:
                                      </Typography>
                                      <Typography variant="body2">
                                        {row?.eventName}
                                      </Typography>
                                    </Stack>
                                    <Stack direction={"row"} gap={"10px"}>
                                      <Typography variant="body2">
                                        Date:
                                      </Typography>
                                      <Typography variant="body2">
                                        {new Date(row?.eventDate).toUTCString()}
                                      </Typography>
                                    </Stack>
                                    <Stack direction={"row"} gap={"10px"}>
                                      <Typography variant="body2">
                                        location:
                                      </Typography>
                                      <Typography variant="body2">
                                        {row?.event_location}
                                      </Typography>
                                    </Stack>
                                    <Stack direction={"row"} gap={"10px"}>
                                      <Typography variant="body2">
                                        Class ticket:
                                      </Typography>
                                      <Typography variant="body2">
                                        {chairRefund[0]?.classTicket}
                                      </Typography>
                                    </Stack>
                                    <Stack direction={"row"} gap={"10px"}>
                                      <Typography variant="body2">
                                        Seat:
                                      </Typography>
                                      <Typography variant="body2">
                                        {String(mappingSeat)}
                                      </Typography>
                                    </Stack>
                                    <Stack direction={"row"} gap={"10px"}>
                                      <Typography variant="body2">
                                        Amount you will receive:
                                      </Typography>
                                      <Typography variant="body2">
                                        {moneyRefund.toLocaleString("vi-VN") +
                                          " VND"}
                                      </Typography>
                                    </Stack>
                                    <Typography
                                      textAlign={"center"}
                                      fontSize={"20px"}
                                      color={"red"}
                                      marginTop={"10px"}
                                    >
                                      If you confirm a refund, the ticket cannot
                                      be canneled you will receive monney into
                                      your zalopay account after 5 - 7 days
                                    </Typography>
                                    <Stack
                                      direction={"row"}
                                      justifyContent={"space-evenly"}
                                    >
                                      <Button
                                        variant="outlined"
                                        onClick={() => setConfirmRefund(false)}
                                        color="error"
                                      >
                                        Close
                                      </Button>
                                      <Button
                                        onClick={() => {
                                          handleConfirmRefund();
                                          setConfirmRefund(false);
                                        }}
                                        variant="outlined"
                                      >
                                        Confirm
                                      </Button>
                                    </Stack>
                                  </Box>
                                </div>
                              </>,
                              document.body
                            )}
                        </>
                        {/* <ModalMyTicket
                            handleConfirm={handleConfirmRefund}
                            moneyRefund={moneyRefund}
                            ViewDetailChair={dataRow}
                            confirmRefund={confirmRefund}
                            setConfirmRefund={setConfirmRefund}
                            data={row}
                          ></ModalMyTicket> */}
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

export default React.memo(Row);
