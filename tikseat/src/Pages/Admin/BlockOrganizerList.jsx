import React, { useEffect, useState } from "react";
import { Avatar, Box, Chip } from "@mui/material";
import "../../Assets/CSS/Admin/PageAdmin.css";
import ApiAdmin from "../../API/Admin/ApiAdmin";
import TableList from "../../Components/Admin/Table/TableList";
import { NAME_COLUMNS_ORGANIZAER } from "../../Assets/Constant/Admin/dataAdmin";
import {
  CONTENT_BLOCK_ORGANIZATIONS,
  NAME_BLOCK_ORGANIZER,
  ORGANIZER,
  TITLE_BLOCK_ORGANIZATIONS,
} from "../../Assets/Constant/Admin/constAdmin";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import Typography from "@mui/material/Typography";

function BlockOrganizerList() {
  const [dataTableOrganizerBlock, setDataTableOrganizerBlock] = useState();
  const [selectedOrganizer, setSelectedOrganizer] = useState(null);
  const [organizerDetailOpen, setOrganizerDetailOpen] = useState(false);
  const [selected_id, setSelected_id] = useState();
  const [isDetail, setIsDetail] = useState();
  const [organizersCount, setOrganizersCount] = useState();
  const [page, setPage] = useState(0);

  console.log(selected_id);

  const getAllOrganizerBlock = async () => {
    try {
      const respones = await ApiAdmin.getListOrganizerBlock();
      if (respones.status === true) {
        setDataTableOrganizerBlock(respones.data.formattedOrganizers);
        setOrganizersCount(respones.data.organizersCount);
      } else {
        console.log("error");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllOrganizerBlock();
  }, []);

  const handleDetailClick = async (_idUser) => {
    try {
      const id = { _idUser: _idUser };
      const respones = await ApiAdmin.getDetailOrganizer(id);
      console.log("respones", respones);
      if (respones) {
        setSelectedOrganizer(respones.data);
        setOrganizerDetailOpen(true);
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
        getAllOrganizerBlock();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleChangePage = async (event, newPage) => {
    try {
      const pageRequest = { page: newPage + 1 };
      console.log("object1: ", pageRequest);
      const respones = await ApiAdmin.getListOrganizerBlock(pageRequest);
      if (respones) {
        setPage(newPage);
        setDataTableOrganizerBlock(respones.data.formattedOrganizers);
        setOrganizersCount(respones.data.organizersCount);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const cellComponentsOrganizer = {
    isActive: () => <Chip color="error" label="Not yet active" />,
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
      icon: <LockOpenIcon />,
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
              {NAME_BLOCK_ORGANIZER}
            </Typography>
          </div>
          <TableList
            dataTable={dataTableOrganizerBlock}
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
            page={page}
            count={organizersCount}
            handleChangePage={handleChangePage}
          />
        </Box>
      </Box>
    </>
  );
}

export default BlockOrganizerList;
