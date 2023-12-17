import React from "react";
import {
  AppBar,
  Box,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
  Avatar,
  IconButton,
} from "@mui/material";
import { LOGIN, NAME_LOGO } from "../../../Assets/Constant/Common/constCommon";
import { navItems } from "../../../Assets/Constant/Common/dataCommon";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { colorBlack, colorWhite } from "../../../Assets/CSS/Style/theme";
import {
  getLocalStorageUserData,
  getLocalStorageUserInfo,
  removeLocalStorageDataInfo,
  removeLocalStorageUserData,
} from "../../../Store/userStore";
import { ButtonLoginStyle } from "../../../Assets/CSS/Style/style.const";
import { removeLocalStorageToken } from "../../../Store/authStore";

const NavBar = () => {
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const { pathname } = useLocation();
  const dataUser = getLocalStorageUserData();
  const dataInfo = getLocalStorageUserInfo();
  const navigate = useNavigate();
  const ManagementUser = [
    { content: `Welcome ${dataUser?.email}` },
    { url: "/createProfileClient", content: "My profile" },
    { url: "/", content: "Log out" },
  ];
  return (
    <AppBar
      style={
        pathname === "/"
          ? {
              background: "transparent",
              position: "absolute",
              boxShadow: "none",
              padding: "0 150px",
              top: "24px",
            }
          : {
              background: "white",
              position: "relative",
              padding: "0 150px",
              color: "black",
            }
      }
      component="nav">
      <Toolbar
        style={{ backdrop: "transparent", boxShadow: "none !important" }}>
        <Link to={"/#"} style={{ textDecoration: "none" }}>
          <Typography variant="h3" className="logo" component="h4">
            {NAME_LOGO}
          </Typography>
        </Link>
        <Box sx={{ flexGrow: 1 }} />
        <Box
          sx={{
            display: {
              xs: "none",
              md: "flex",
              gap: "40px",
              alignItems: "center",
            },
          }}>
          {dataUser?.email && (
            <Box sx={{ display: { xs: "none", md: "flex", gap: "30px" } }}>
              {navItems?.map((item, index) => (
                <Link
                  to={item.url}
                  key={index}
                  style={{
                    color: `${pathname === "/" ? colorWhite : colorBlack}`,
                    fontWeight: "500",
                  }}>
                  {item.title}
                </Link>
              ))}
            </Box>
          )}

          {dataUser?.email ? (
            <Box sx={{ flexGrow: 0 }}>
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src={dataInfo?.avatarImage} />
              </IconButton>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}>
                {ManagementUser?.map((item, index) => {
                  if (!item?.url) {
                    return (
                      <MenuItem
                        style={{
                          cursor: "text",
                          backgroundColor: "transparent",
                        }}
                        key={index}
                        onClick={handleCloseUserMenu}>
                        <Typography
                          textAlign="center"
                          onClick={() => navigate(item?.url)}>
                          {item.content}
                        </Typography>
                      </MenuItem>
                    );
                  }
                  return (
                    <MenuItem key={index} onClick={handleCloseUserMenu}>
                      <Typography
                        textAlign="center"
                        onClick={() => {
                          if (item?.url === "/") {
                            navigate(item?.url);
                            removeLocalStorageDataInfo();
                            removeLocalStorageUserData();
                            removeLocalStorageToken();
                          } else {
                            navigate(item?.url);
                          }
                        }}>
                        {item.content}
                      </Typography>
                    </MenuItem>
                  );
                })}
              </Menu>
            </Box>
          ) : (
            <ButtonLoginStyle
              color={`${pathname === "/" ? colorWhite : colorBlack}`}
              to={"/login"}>
              {LOGIN}
            </ButtonLoginStyle>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
