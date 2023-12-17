import React, { useEffect, useState } from "react";
import { Avatar, Box } from "@mui/material";
import "../../Assets/CSS/Admin/PageAdmin.css";
import ApiAdmin from "../../API/Admin/ApiAdmin";
import TableList from "../../Components/Admin/Table/TableList";
import { NAME_COLUMNS_CLIENT } from "../../Assets/Constant/Admin/dataAdmin";
import { CLIENT, NAME_CLIENT } from "../../Assets/Constant/Admin/constAdmin";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import Typography from "@mui/material/Typography";

function ClientPageAdmin() {
  const [dataTableClient, setDataTableClient] = useState();
  const [selectedClient, setSelectedClient] = useState(null);
  const [clientDetailOpen, setClientDetailOpen] = useState(false);
  const [clientsCount, setClientsCount] = useState();
  const [page, setPage] = useState(0);

  const getAllClient = async () => {
    try {
      // const repuest = { page: 1 };
      const respones = await ApiAdmin.getAllClients();
      setDataTableClient(respones.data.formattedClients);
      setClientsCount(respones.data.clientsCount);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllClient();
  }, []);

  const handleDetailClick = async (_idUser) => {
    const id = { _idUser: _idUser };
    const respones = await ApiAdmin.getDetailClient(id);
    console.log("respones", respones);
    if (respones) {
      setSelectedClient(respones.data);
      setClientDetailOpen(true);
    }
  };

  const handleChangePage = async (event, newPage) => {
    try {
      const pageRequest = { page: newPage + 1 };
      console.log("object1: ", pageRequest);
      const respones = await ApiAdmin.getAllClients(pageRequest);
      if (respones) {
        setPage(newPage);
        setDataTableClient(respones.data.formattedClients);
        setClientsCount(respones.data.clientsCount);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const cellComponentsClient = {
    avatarImage: (avatarUrl) => <Avatar src={avatarUrl} />,
  };

  const actionClient = [
    {
      name: "Seen",
      icon: <RemoveRedEyeIcon />,
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
              {NAME_CLIENT}
            </Typography>
          </div>
          <TableList
            dataTable={dataTableClient}
            selectedUser={selectedClient}
            detailOpen={clientDetailOpen}
            setDetailOpen={setClientDetailOpen}
            nameColumns={NAME_COLUMNS_CLIENT}
            isClient={true}
            nameTitle={CLIENT}
            isIconSeen={true}
            isDetail={true}
            actions={actionClient}
            cellComponents={cellComponentsClient}
            count={clientsCount}
            page={page}
            handleChangePage={handleChangePage}
          />
        </Box>
      </Box>
    </>
  );
}

export default ClientPageAdmin;
