import React, { useEffect, useState } from "react";
import { Box, Chip, Typography } from "@mui/material";
import "../../Assets/CSS/Admin/PageAdmin.css";
import ApiAdmin from "../../API/Admin/ApiAdmin";
import TableList from "../../Components/Admin/Table/TableList";
import { NAME_COLUMNS_APPROVED_EVENT } from "../../Assets/Constant/Admin/dataAdmin";
import { NAME_LIST_APPROVED_EVENT } from "../../Assets/Constant/Admin/constAdmin";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

function ApprovedEvent() {
  const [dataTableEvent, setDataTableEvent] = useState();
  const [selected_event, setSelected_event] = useState(null);
  const [openComfirn, setOpenComfirn] = useState(false);
  const [eventsCount, setEventsCount] = useState();
  const [page, setPage] = useState(0);

  const getAllEvent = async () => {
    try {
      const respones = await ApiAdmin.getAllEventIsActiveFalse();
      setDataTableEvent(respones.data.formattedEvent);
      setEventsCount(respones.data.eventsCount);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllEvent();
  }, []);

  const handleDetailClick = async (_idEvent) => {
    try {
      const id = { _idEvent: _idEvent };
      const respones = await ApiAdmin.getDetailEvent(id);
      console.log("respones", respones);
      if (respones) {
        console.log(respones);
        setOpenComfirn(true);
        setSelected_event(respones.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleClickComfirn = async (isHot) => {
    try {
      const repuest = { _idEvent: selected_event._id, isHot: isHot };
      const respones = await ApiAdmin.setAcceptEvent(repuest);
      if (respones) {
        setOpenComfirn(false);
        getAllEvent();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleChangePage = async (event, newPage) => {
    try {
      const pageRequest = { page: newPage + 1 };
      console.log("object1: ", pageRequest);
      const respones = await ApiAdmin.getAllEventIsActiveFalse(pageRequest);
      if (respones) {
        setPage(newPage);
        setDataTableEvent(respones.data.formattedEvent);
        setEventsCount(respones.data.eventsCount);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const cellComponentsEvent = {
    type_of_event: (tags) => (
      <div>
        <Chip variant="outlined" color="primary" key={tags} label={tags} />
      </div>
    ),
  };

  const actionEvent = [
    {
      name: "IsActive",
      icon: <CheckCircleIcon />,
      color: "primary",
      onClick: (row) => handleDetailClick(row?._id),
    },
  ];

  return (
    <>
      <Box sx={{ display: "flex" }}>
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              margin: "10px",
            }}>
            <Typography variant="h4" component="div">
              {NAME_LIST_APPROVED_EVENT}
            </Typography>
          </div>
          <TableList
            dataTable={dataTableEvent}
            nameColumns={NAME_COLUMNS_APPROVED_EVENT}
            nameList={NAME_LIST_APPROVED_EVENT}
            isClient={false}
            isDetail={false}
            setDetailOpen={setOpenComfirn}
            detailOpen={openComfirn}
            selectedUser={selected_event}
            isConfirmEvent={true}
            onConfirm={handleClickComfirn}
            isMaxWith={true}
            actions={actionEvent}
            cellComponents={cellComponentsEvent}
            count={eventsCount}
            page={page}
            handleChangePage={handleChangePage}
          />
        </Box>
      </Box>
    </>
  );
}

export default ApprovedEvent;
