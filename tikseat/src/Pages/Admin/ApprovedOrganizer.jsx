import React, { useEffect, useState } from "react";
import { Avatar, Box, Chip, Typography } from "@mui/material";
import "../../Assets/CSS/Admin/PageAdmin.css";
import ApiAdmin from "../../API/Admin/ApiAdmin";
import TableList from "../../Components/Admin/Table/TableList";
import { NAME_COLUMNS_APPROVED_OGANIZAER } from "../../Assets/Constant/Admin/dataAdmin";
import {
  CONTENT_CONFIRM_APPROVAL_ORGANIZATIONS,
  NAME_LIST_APPROVED_ORGANIZER,
  TITLE_CONFIRM_APPROVAL_ORGANIZATIONS,
} from "../../Assets/Constant/Admin/constAdmin";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

function ApprovedOrganizer() {
  const [dataTableOrganizer, setDataTableOrganizer] = useState();
  const [selected_id, setSelected_id] = useState(null);
  const [openComfirn, setOpenComfirn] = useState(false);
  const [organizersCount, setOrganizersCount] = useState();
  const [page, setPage] = useState(0);

  const getAllOrganizerIsFalse = async () => {
    try {
      const respones = await ApiAdmin.getAllOrganizersIsActiveFalse();
      setDataTableOrganizer(respones.data.formattedOrganizers);
      setOrganizersCount(respones.data.organizersCount);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllOrganizerIsFalse();
  }, []);

  const handleClickShowComfirn = async (_idUser) => {
    const id = { _idUser: _idUser };
    console.log("id", id);
    setSelected_id(id);
    setOpenComfirn(true);
  };

  const handleClickComfirn = async () => {
    try {
      console.log("selected_id", selected_id);
      const respones = await ApiAdmin.setAcceptOrganizer(selected_id);
      if (respones) {
        setOpenComfirn(false);
        getAllOrganizerIsFalse();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleChangePage = async (event, newPage) => {
    try {
      const pageRequest = { page: newPage + 1 };
      console.log("object1: ", pageRequest);
      const respones = await ApiAdmin.getAllOrganizersIsActiveFalse(
        pageRequest
      );
      if (respones) {
        setPage(newPage);
        setDataTableOrganizer(respones.data.formattedOrganizers);
        setOrganizersCount(respones.data.organizersCount);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const cellComponentsOrganizerIsFalse = {
    organizer_type: (tags) => (
      <div>
        {tags?.map((tag) => (
          <Chip variant="outlined" color="primary" key={tag} label={tag} />
        ))}
      </div>
    ),
    avatarImage: (avatarUrl) => <Avatar src={avatarUrl} />,
  };

  const actionOrganizerIsFalse = [
    {
      name: "IsActive",
      icon: <CheckCircleIcon />,
      color: "primary",
      onClick: (row) => handleClickShowComfirn(row?._id),
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
              {NAME_LIST_APPROVED_ORGANIZER}
            </Typography>
          </div>
          <TableList
            dataTable={dataTableOrganizer}
            nameColumns={NAME_COLUMNS_APPROVED_OGANIZAER}
            isClient={false}
            isDetail={false}
            setDetailOpen={setOpenComfirn}
            detailOpen={openComfirn}
            selectedUser={selected_id}
            onConfirm={handleClickComfirn}
            isMaxWith={false}
            dialogTitle={TITLE_CONFIRM_APPROVAL_ORGANIZATIONS}
            dialogContent={CONTENT_CONFIRM_APPROVAL_ORGANIZATIONS}
            cellComponents={cellComponentsOrganizerIsFalse}
            actions={actionOrganizerIsFalse}
            count={organizersCount}
            page={page}
            handleChangePage={handleChangePage}
          />
        </Box>
      </Box>
    </>
  );
}

export default ApprovedOrganizer;
