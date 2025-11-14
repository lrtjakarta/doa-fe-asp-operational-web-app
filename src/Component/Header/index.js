import React, { useState } from "react";
import { Link } from "react-router-dom";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import HomeIcon from "@mui/icons-material/Home";
import {
  Box,
  Toolbar,
  List,
  CssBaseline,
  Typography,
  Divider,
  IconButton,
  Menu,
  Container,
  Button,
  Tooltip,
  MenuItem,
} from "@mui/material";
import {
  AppBar,
  boxHeader,
  appBar,
  toolBar,
  imgApp,
  Admin,
  adminTittle,
  Icon,
  home,
  report,
  boxProfile,
  tittleProfile,
  account,
  menuList,
} from "./Styles";

//img
import headerLogo from "../../Assets/Images/header-logo.png";
import lrt from "../../Assets/Images/lrt.png";
// import icon
import AccountCircle from "@mui/icons-material/AccountCircle";
import PersonIcon from "@mui/icons-material/Person";
import MenuIcon from "@mui/icons-material/Menu";

const pages = ["Beranda", "Laporan"];
const settings = ["Profile", "Account", "Dashboard", "Logout"];

function handleClick(event) {
  event.preventDefault();
  console.info("Kamu menekannya.");
}

export default function MiniDrawer() {
  const [open, setOpen] = useState(false);

  const handleDrawerOpen = () => setOpen(!open);
  // footer
  const [closeonly, setCloseonly] = React.useState(false);

  const OpenCloseOnly = () => {
    setOpen(true);
  };

  const CloseOnly = () => {
    setOpen(false);
  };

  // appbar
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

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

  return (
    <>
      <Box sx={boxHeader}>
        <CssBaseline />
        <AppBar position="fixed" sx={appBar}>
          <Container maxWidth="xl">
            <Toolbar sx={toolBar}>
              <Typography
                variant="h6"
                noWrap
                component="div"
                sx={{ mr: 2, display: { xs: "none", md: "flex" } }}
              >
                <img sx={imgApp} src={headerLogo} alt={headerLogo} />
              </Typography>
              <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
                <div role="presentation" onClick={handleClick}></div>
              </Box>

              <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleOpenNavMenu}
                  color="inherit"
                >
                  <MenuIcon sx={{ color: "white" }} />
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
                  <MenuItem onClick={handleCloseNavMenu}>
                    <Typography textAlign="center">Beranda</Typography>
                    <Typography textAlign="center">Laporan</Typography>
                  </MenuItem>
                </Menu>
              </Box>
              <Typography
                variant="h6"
                noWrap
                component="div"
                sx={{
                  flexGrow: 1,
                  display: { xs: "flex", md: "none" },
                }}
              >
                <img src={lrt} alt={lrt} />
              </Typography>
              <Box
                sx={{
                  flexGrow: 1,
                  mt: 0.7,
                  ml: -80,
                  display: { xs: "none", md: "flex" },
                }}
              >
                <Link to="/" style={{ textDecoration: "none" }}>
                  <Button onClick={handleCloseNavMenu} sx={home}>
                    Beranda
                  </Button>
                </Link>
                <Link to="/form" style={{ textDecoration: "none" }}>
                  <Button onClick={handleCloseNavMenu} sx={report}>
                    Laporan
                  </Button>
                </Link>
              </Box>

              <Box sx={boxProfile}>
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Typography sx={{ mr: 1 }} style={tittleProfile}>
                      Dr.Astrimianti
                    </Typography>
                    <AccountCircle sx={account} />
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={menuList}
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
                  {settings.map((setting) => (
                    <MenuItem key={setting} onClick={handleCloseUserMenu}>
                      <Typography textAlign="center">{setting}</Typography>
                    </MenuItem>
                  ))}
                </Menu>
              </Box>
            </Toolbar>
          </Container>
        </AppBar>
      </Box>
    </>
  );
}
