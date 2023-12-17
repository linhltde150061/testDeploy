import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Chip,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";
import { colorPalatinateBlue } from "../../../Assets/CSS/Style/theme";
import { useNavigate } from "react-router-dom";
import {
  COMING_SOON,
  FINISHED,
  HAPPENNING,
  OPEN_SALE_EVENT,
  UP_COMMING,
} from "../../../Assets/Constant/Common/constCommon";

const CardItem = ({ dataEventItem }) => {
  const now = new Date();
  let statusEvent = null;
  const navigate = useNavigate();
  const currentTimestamp = Math.floor(now.getTime());

  const timestampStartSalse = new Date(
    dataEventItem?.sales_date.start_sales_date
  ).getTime();

  const timestampEndSalse = new Date(
    dataEventItem?.sales_date.end_sales_date
  ).getTime();

  const timestampStartEvent = new Date(
    dataEventItem?.event_date[0].date
  ).getTime();
  const timestampEndEvent = new Date(
    dataEventItem?.event_date[dataEventItem?.event_date.length - 1].date
  ).getTime();

  const options = { year: "numeric", month: "2-digit", day: "2-digit" };

  const formattedDate2 = new Date(
    dataEventItem?.event_date[0].date
  ).toLocaleDateString(undefined, options);

  const HourEvent = new Date(dataEventItem?.event_date[0].date);

  const hour = HourEvent.getHours();
  const minute = HourEvent.getMinutes();

  const formattedTime = `${hour.toString().padStart(2, "0")}:${minute
    .toString()
    .padStart(2, "0")}`;

  if (currentTimestamp < timestampStartSalse) {
    statusEvent = { label: UP_COMMING, color: "#fdcb6e" };
  } else if (
    timestampStartSalse <= currentTimestamp &&
    currentTimestamp <= timestampEndSalse
  ) {
    statusEvent = { label: OPEN_SALE_EVENT, color: "#00b894" };
  } else if (
    currentTimestamp > timestampEndSalse &&
    currentTimestamp < timestampStartEvent
  ) {
    statusEvent = { label: COMING_SOON, color: "#0984e3" };
  } else if (
    timestampStartEvent <= currentTimestamp &&
    currentTimestamp <= timestampEndEvent
  ) {
    statusEvent = { label: HAPPENNING, color: "#6c5ce7" };
  } else if (timestampEndEvent < currentTimestamp) {
    statusEvent = { label: FINISHED, color: "#d63031" };
  }

  function handleClick() {
    navigate(`/book-tickets/${dataEventItem?._id}`);
  }

  return (
    <Card
      style={{ borderRadius: "20px", overflow: "hidden" }}
      onClick={handleClick}>
      <CardActionArea>
        <CardMedia
          component="img"
          style={{ height: "300px", objectFit: "fill" }}
          image={
            dataEventItem?.eventImage ||
            "https://www.its.ac.id/tmesin/wp-content/uploads/sites/22/2022/07/no-image.png"
          }
          alt="green iguana"
        />
        <CardContent>
          <Box display={{ display: "flex", gap: "10px", alignItems: "center" }}>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}>
                <span
                  style={{
                    fontSize: "12px",
                    fontWeight: "700",
                    color: `${colorPalatinateBlue}`,
                  }}>
                  {formattedTime}
                </span>
                <span
                  style={{
                    fontSize: "14px",
                    fontWeight: "700",
                    whiteSpace: "nowrap",
                  }}>
                  {formattedDate2}
                </span>
              </div>
            </div>
            <Box width={"100%"}>
              <div>
                <Typography
                  gutterBottom
                  variant="h5"
                  style={{
                    fontSize: "12px",
                    fontWeight: "500",
                    color: "gray",
                  }}
                  component="h5">
                  {dataEventItem?.event_location?.city}
                </Typography>
                <Typography
                  gutterBottom
                  variant="h5"
                  style={{
                    fontSize: "16px",
                    fontWeight: "700",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                  component="p">
                  {dataEventItem?.event_name}
                </Typography>
              </div>
              <Typography
                gutterBottom
                component="p"
                style={{
                  fontSize: "14px",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  width: "200px",
                }}>
                {dataEventItem?.event_description}
              </Typography>
              <Stack
                direction={"row"}
                justifyContent={"space-between"}
                alignItems={"center"}
                width={"100%"}>
                <Typography
                  style={{
                    background: statusEvent.color,
                    color: "white",
                    fontWeight: "500",
                    padding: "5px 10px",
                    borderRadius: "10px",
                    width: "max-content",
                    fontSize: "13px",
                  }}>
                  {statusEvent.label}
                </Typography>
                <Box>
                  {dataEventItem?.type_of_event?.map((item, index) => (
                    <Chip label={item} key={index} />
                  ))}
                </Box>
              </Stack>
            </Box>
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default CardItem;
