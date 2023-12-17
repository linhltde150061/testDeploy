import React, { useEffect, useState } from "react";
import { Avatar, Box, Chip } from "@mui/material";
import "../../Assets/CSS/Admin/PageAdmin.css";
import ApiAdmin from "../../API/Admin/ApiAdmin";
import TableList from "../../Components/Admin/Table/TableList";
import { NAME_COLUMNS_ORGANIZAER } from "../../Assets/Constant/Admin/dataAdmin";
import {
  CONTENT_BLOCK_ORGANIZATIONS,
  NAME_ORGANIZER,
  ORGANIZER,
  TITLE_BLOCK_ORGANIZATIONS,
} from "../../Assets/Constant/Admin/constAdmin";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import LockIcon from "@mui/icons-material/Lock";
import Typography from "@mui/material/Typography";

function OrganizerPageAdmin() {
  const [dataTableOrganizer, setDataTableOrganizer] = useState();
  const [selectedOrganizer, setSelectedOrganizer] = useState(null);
  const [selectedDataEvent, setSelectedDataEvent] = useState(null);
  const [organizerDetailOpen, setOrganizerDetailOpen] = useState(false);
  const [selected_id, setSelected_id] = useState();
  const [isDetail, setIsDetail] = useState();
  const [organizersCount, setOrganizersCount] = useState();
  const [page, setPage] = useState(0);

  const getAllOrganizer = async () => {
    try {
      const respones = await ApiAdmin.getAllOrganizers();
      setDataTableOrganizer(respones.data.formattedOrganizers);
      setOrganizersCount(respones.data.organizersCount);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllOrganizer();
  }, []);

  const handleDetailClick = async (_idUser) => {
    try {
      const id = { _idUser: _idUser };
      const respones = await ApiAdmin.getDetailOrganizer(id);
      console.log("respones", respones);
      if (respones) {
        setSelectedOrganizer(respones.data.organizationalInformation);
        setSelectedDataEvent(respones.data.organizationalEvents);
        setOrganizerDetailOpen(true);
        setIsDetail(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleClickShowConfirm = async (_idUser, isBlocked) => {
    const id = { _idUser: _idUser, isBlocked: isBlocked };
    setSelected_id(id);
    setIsDetail(false);
    setOrganizerDetailOpen(true);
  };

  const handleComfirmBlock = async () => {
    try {
      const respones = await ApiAdmin.blockedUser(selected_id);
      console.log("respones", respones);
      if (respones) {
        alert("oke");
        setOrganizerDetailOpen(false);
        getAllOrganizer();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleChangePage = async (event, newPage) => {
    try {
      const pageRequest = { page: newPage + 1 };
      console.log("object1: ", pageRequest);
      const respones = await ApiAdmin.getAllOrganizers(pageRequest);
      if (respones) {
        setPage(newPage);
        setDataTableOrganizer(respones.data.formattedOrganizers);
        setOrganizersCount(respones.data.organizersCount);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const cellComponentsOrganizer = {
    isActive: () => <Chip color="success" label="Active" />,
    avatarImage: (avatarUrl) => <Avatar src={avatarUrl} />,
  };

  const actionOrganizer = [
    {
      name: "Seen",
      icon: <RemoveRedEyeIcon />,
      color: "primary",
      onClick: (row) => handleDetailClick(row?._id),
    },
    {
      name: "IsBlock",
      icon: <LockIcon />,
      color: "primary",
      onClick: (row) => handleClickShowConfirm(row?._id, row?.isBlocked),
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
              {NAME_ORGANIZER}
            </Typography>
          </div>
          <TableList
            dataTable={dataTableOrganizer}
            selectedUser={selectedOrganizer}
            detailOpen={organizerDetailOpen}
            setDetailOpen={setOrganizerDetailOpen}
            nameColumns={NAME_COLUMNS_ORGANIZAER}
            isClient={false}
            nameTitle={ORGANIZER}
            isDetail={isDetail}
            isMaxWith={false}
            isConfirmEvent={false}
            actions={actionOrganizer}
            cellComponents={cellComponentsOrganizer}
            dialogTitle={TITLE_BLOCK_ORGANIZATIONS}
            dialogContent={CONTENT_BLOCK_ORGANIZATIONS}
            onConfirm={handleComfirmBlock}
            selectedDataEvent={selectedDataEvent}
            isOrder={false}
            page={page}
            count={organizersCount}
            handleChangePage={handleChangePage}
          />
        </Box>
      </Box>
    </>
  );
}

export default OrganizerPageAdmin;
