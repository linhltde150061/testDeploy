import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import Button from "@mui/material/Button";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import TableTransaction from "../../Components/Organizers/Transaction/TableTransaction";
import {
  getLocalStorageUserData,
  getLocalStorageUserInfo,
} from "../../Store/userStore";
import ApiEvent from "../../API/Event/ApiEvent";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { Box } from "@mui/material";
import Wallet from "../../Components/Organizers/Transaction/Wallet";

export const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.action.selected,
    color: theme.palette.common.black,
    fontSize: 16,
    fontWeight: "bold",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

export const StyledTableRow = styled(TableRow)(({ theme }) => ({
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const LightTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.palette.common.white,
    color: "rgb(180, 180, 180)",
    boxShadow: theme.shadows[1],
    fontSize: 11,
  },
}));

function Transactions() {
  const [dataTable, setDataTable] = useState();
  const [countTable, setCountTable] = useState();
  const [page, setPage] = useState(0);
  const [value, setValue] = useState("1");
  const [nameTitle, setNameTitle] = useState("Wallet");
  const [wallet, setWallet] = useState();

  const getPayBusinessWithOrganizers = async () => {
    const request = {
      organizers_id: getLocalStorageUserInfo()._id,
      page: 1,
    };
    const reponse = await ApiEvent.getPayBusinessWithOrganizers(request);
    if (reponse) {
      setDataTable(reponse.data.paginatedPayList);
      setCountTable(reponse.data.totalItems);
      setWallet(reponse.data.wallet);
    }
  };

  const handleChangePage = async (event, newPage) => {
    // try {
    //   const pageRequest = { page: newPage + 1 };
    //   console.log("object1: ", pageRequest);
    //   const respones = await ApiAdmin.getAllClients(pageRequest);
    //   if (respones) {
    setPage(newPage);
    //     setDataTableClient(respones.data.formattedClients);
    //     setClientsCount(respones.data.clientsCount);
    //   }
    // } catch (error) {
    //   console.log(error);
    // }
  };

  useEffect(() => {
    getPayBusinessWithOrganizers();
  }, []);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    if (newValue == "1") {
      setNameTitle("Wallet");
    } else {
      setNameTitle("Transaction");
    }
  };

  return (
    <Box sx={{ height: "86vh" }}>
      <div>
        <div style={{ border: "1px groove", margin: "0 0 20px 0" }}>
          <div
            style={{
              fontWeight: "bold",
              paddingLeft: "20px",
            }}>
            <h1>{nameTitle}</h1>
          </div>
        </div>
      </div>

      <div>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: "groove" }}>
            <TabList onChange={handleChange} aria-label="lab API tabs example">
              <LightTooltip title="Wallet">
                <Tab label="Wallet" value="1" />
              </LightTooltip>

              <LightTooltip title="Transction History">
                <Tab label="Transction History" value="2" />
              </LightTooltip>
            </TabList>
          </Box>
          <TabPanel value="1">
            <Wallet wallet={wallet} transaction={countTable} />
          </TabPanel>
          <TabPanel value="2">
            <TableTransaction
              count={countTable}
              dataTable={dataTable}
              page={page}
              handleChangePage={handleChangePage}
            />
          </TabPanel>
        </TabContext>
      </div>
    </Box>
  );
}

export default Transactions;
