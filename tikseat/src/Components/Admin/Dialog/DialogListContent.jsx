import React, { useState } from "react";
import CardContent from "@mui/material/CardContent";
import {
  LABEL_ALL_EVENT,
  LABEL_EVENT_INFORMATION,
  LABEL_ORGANIZATIONS_INFORMATION,
  LABEL_TRANSACTION_INFORMATION,
  LIST_NAME_CONTENT_DAILOG_CLIENT,
} from "../../../Assets/Constant/Admin/constAdmin";
import { Tab, Box } from "@mui/material";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { styled } from "@mui/material/styles";
import { Avatar, Typography } from "@mui/material";
import DialogContentClinet from "./DialogContentClinet";
import DialogContentOrganization from "./DialogContentOrganization";
import TableListEventOfOrganization from "../Table/TableListEventOfOrganization";
import {
  LIST_NAME_CONTENT_DAILOG_ORGANIZER,
  LIST_NAME_CONTENT_DIALOG_ORDER,
  NAME_COLUMNS_TRANSACTION,
} from "../../../Assets/Constant/Admin/dataAdmin";
import ApiAdmin from "../../../API/Admin/ApiAdmin";
import TableList from "../Table/TableList";

const StyledAvatar = styled(Avatar)(({ theme }) => ({
  flex: "none",
  width: theme.spacing(8),
  height: theme.spacing(8),
  marginRight: theme.spacing(2),
}));

const StyledName = styled(Typography)(({ theme }) => ({
  fontWeight: "bold",
}));

function DialogListContent({
  selectedDetail,
  isClient,
  selectedDataEvent,
  isOrder,
}) {
  const RenderCardOrganizer = ({ selectedDetail }) => {
    const [activeTab, setActiveTab] = useState("1");
    const [transactionInformation, setTransactionInformation] = useState();
    const [totalTransactions, setTotalTransactions] = useState();
    const [page, setPage] = useState(0);

    const handleTabChange = (event, newValue) => {
      setActiveTab(newValue);
      if (newValue == 2 && isOrder) {
        getTansaction();
      }
    };

    const getTansaction = async () => {
      try {
        const request = { _idOrder: selectedDetail?._id, page: 1 };
        const response = await ApiAdmin.getTransactionInformation(request);
        if (response) {
          setTransactionInformation(response.data.transactionInformation);
          setTotalTransactions(response.data.totalTransactions);
        }
      } catch (error) {
        console.log(error);
      }
    };

    const handleChangePage = async (event, newPage) => {
      try {
        const pageRequest = {
          _idOrder: selectedDetail?._id,
          page: newPage + 1,
        };
        const response = await ApiAdmin.getTransactionInformation(pageRequest);
        if (response) {
          setPage(newPage);
          setTransactionInformation(response.data.transactionInformation);
          setTotalTransactions(response.data.totalTransactions);
        }
      } catch (error) {
        console.log(error);
      }
    };

    return (
      <>
        <Box sx={{ display: "flex", flexDirection: "column", flex: 1 }}>
          <StyledAvatar
            src={
              isOrder ? selectedDetail?.eventImage : selectedDetail?.avatarImage
            }
          />
          <StyledName variant="h6" gutterBottom>
            {isOrder
              ? selectedDetail?.event_name
              : selectedDetail?.organizer_name}
          </StyledName>
          <Box sx={{ flex: 1, overflowY: "auto", paddingRight: "16px" }}>
            <TabContext value={activeTab}>
              <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <TabList
                  onChange={handleTabChange}
                  aria-label="lab API tabs example">
                  <Tab
                    label={
                      isOrder
                        ? LABEL_EVENT_INFORMATION
                        : LABEL_ORGANIZATIONS_INFORMATION
                    }
                    value="1"
                  />
                  <Tab
                    label={
                      isOrder ? LABEL_TRANSACTION_INFORMATION : LABEL_ALL_EVENT
                    }
                    value="2"
                  />
                </TabList>
              </Box>
              <TabPanel value="1">
                {isOrder ? (
                  <DialogContentOrganization
                    listContent={LIST_NAME_CONTENT_DIALOG_ORDER}
                    selectedDetail={selectedDetail}
                  />
                ) : (
                  <DialogContentOrganization
                    listContent={LIST_NAME_CONTENT_DAILOG_ORGANIZER}
                    selectedDetail={selectedDetail}
                  />
                )}
              </TabPanel>
              <TabPanel value="2">
                {isOrder ? (
                  <TableList
                    nameColumns={NAME_COLUMNS_TRANSACTION}
                    dataTable={transactionInformation}
                    page={page}
                    count={totalTransactions}
                    handleChangePage={handleChangePage}
                  />
                ) : (
                  <TableListEventOfOrganization
                    selectedDataEvent={selectedDataEvent}
                  />
                )}
              </TabPanel>
            </TabContext>
          </Box>
        </Box>
      </>
    );
  };

  return (
    <CardContent>
      {isClient ? (
        <DialogContentClinet
          selectedDetail={selectedDetail}
          LIST_NAME_CONTENT_DAILOG_CLIENT={LIST_NAME_CONTENT_DAILOG_CLIENT}
        />
      ) : (
        <RenderCardOrganizer selectedDetail={selectedDetail} />
      )}
    </CardContent>
  );
}

export default DialogListContent;
