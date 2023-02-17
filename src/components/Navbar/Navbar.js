import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import MenuItem from "@mui/material/MenuItem";
import CalculateIcon from "@mui/icons-material/Calculate";
import { Link, useNavigate } from "react-router-dom";
import { Avatar, Button, Tooltip } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { selectUserDatails, userActions } from "../Slices/userSlice";
import DownloadForOfflineIcon from "@mui/icons-material/DownloadForOffline";
import { CSVLink } from "react-csv";
import MaterialUISwitch from "./ThemeChange";


function Navbar(props) {
  const userDetail = useSelector(selectUserDatails);
  const dispatch = useDispatch();
  const isPremiumMember = useSelector((state) => state.user.isPrimeMember);
  const expenseItem = useSelector((state) => state.expenses.expenseItem);
  const totalAmount = useSelector((state) => state.expenses.totalAmount);
  const isLoggedIn = localStorage.getItem("isLoggedIn");

  const navigate = useNavigate();
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const linkStyle = {
    textDecoration: "none",
    color: "white",
    marginRight: "15px",
  };

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const logOut = () => {
    dispatch(userActions.logOut());
    navigate("/");
  };

  const headers = [
    { label: "Category", key: "category" },
    { label: "Description", key: "description" },
    { label: "Date", key: "date" },
    { label: "ExpenseCost", key: "expenseCost" },
  ];

  return (
    <div>
      <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <CalculateIcon
              sx={{ display: { xs: "none", md: "flex" }, mr: 1 }}
            />
            <Link to="/" style={linkStyle}>
              <Typography
                variant="h5"
                noWrap
                sx={{
                  mr: 2,
                  display: { xs: "none", md: "flex" },
                  fontFamily: "monospace",
                  fontWeight: 900,
                  letterSpacing: "0.3rem",
                }}
              >
                Expense Tracker
              </Typography>
            </Link>

            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: "block", md: "none" },
                }}
              >
                {isLoggedIn && (
                  <MenuItem>
                    <Link
                      style={{
                        textDecoration: "none",
                        color: "blue",
                        fontWeight: "bolder",
                      }}
                      to="/expenses"
                    >
                      Expenses
                    </Link>
                  </MenuItem>
                )}

                {/* <MenuItem> */}
                {/* <Link style={{ textDecoration: "none" }}>Pricing</Link> */}
                {/* </MenuItem> */}
                {isLoggedIn ? (
                  <MenuItem onClick={logOut}>
                    <Link
                      style={{
                        textDecoration: "none",
                        color: "blue",
                        fontWeight: "bolder",
                      }}
                    >
                      LogOut
                    </Link>
                  </MenuItem>
                ) : (
                  <MenuItem>
                    <Link
                      to="/signIn"
                      style={{
                        textDecoration: "none",
                        color: "blue",
                        fontWeight: "bolder",
                      }}
                    >
                      Sign In
                    </Link>
                  </MenuItem>
                )}
              </Menu>
            </Box>
            <CalculateIcon
              sx={{ display: { xs: "flex", md: "none" }, mr: 1 }}
            />
            <Typography
              variant="h6"
              noWrap
              sx={{
                mr: 2,
                display: { xs: "flex", md: "none" },
                flexGrow: 1,
                color: "white",
              }}
            >
              <Link to="/" style={linkStyle}>
                Expense Tracker
              </Link>
            </Typography>

            <Box
              sx={{
                flexGrow: 1,
                display: { xs: "none", md: "flex" },
                justifyContent: "right",
              }}
            >
              {isLoggedIn && (
                <Link style={linkStyle} to="/expenses">
                  Expenses
                </Link>
              )}

              {!isLoggedIn && (
                <Link style={linkStyle} to="/signIn">
                  Sign In
                </Link>
              )}
            </Box>
            {isLoggedIn && (
              <Box sx={{ flexGrow: 0 }}>
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    {userDetail && (
                      <Avatar alt="rahul rajak" src={userDetail.photoUrl} />
                    )}
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: "45px", color: "ActiveBorder" }}
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
                  onClose={handleCloseUserMenu}
                >
                  <MenuItem>
                    <Typography>
                      <Link
                        to="/updateProfile"
                        style={{
                          textDecoration: "none",
                          color: "blue",
                          fontWeight: "bolder",
                        }}
                      >
                        Profile Update
                      </Link>
                    </Typography>
                  </MenuItem>
                  <MenuItem>
                    <Link
                      to="/myAccount"
                      style={{
                        textDecoration: "none",
                        color: "blue",
                        fontWeight: "bolder",
                      }}
                    >
                      account
                    </Link>
                  </MenuItem>
                  <MenuItem onClick={logOut}>
                    <Link
                      style={{
                        textDecoration: "none",
                        color: "blue",
                        fontWeight: "bolder",
                      }}
                    >
                      LogOut
                    </Link>
                  </MenuItem>
                </Menu>

                {isPremiumMember && totalAmount > 10000 && (
                  <>
                    <CSVLink
                      data={expenseItem}
                      headers={headers}
                      filename="Expense_data(Rk).csv"
                    >
                      <IconButton>
                        <DownloadForOfflineIcon />
                      </IconButton>
                    </CSVLink>
                    <Button variant="text" color="inherit">
                      <MaterialUISwitch onClick={props.change} />
                    </Button>
                  </>
                )}
              </Box>
            )}
          </Toolbar>
        </Container>
      </AppBar>
    </div>
  );
}
export default Navbar;
