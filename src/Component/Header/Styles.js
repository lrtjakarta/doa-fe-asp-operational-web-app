import { styled, useTheme } from "@mui/material/styles";
import MuiAppBar from "@mui/material/AppBar";

const drawerWidth = 320;

export const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

export const boxHeader = {
  display: "flex",
};

export const appBar = {
  bgcolor: "#ED1C24",
  ml: -5,
  zIndex: (theme) => theme.zIndex.drawer + 1,
};

export const toolBar = {
  ml: -7,
  mt: -1,
};

export const imgApp = {
  width: 20,
  height: 10,
};

export const Admin = {
  justifyContent: "right",
  display: "flex",
  flexGrow: 1,
};

export const adminTittle = {
  ml: 1,
  mt: 0.8,
  color: "#fff",
  fontWeight: 200,
};

export const Icon = {
  ml: 1,
  mt: 1.2,
  color: "#fff",
};

export const home = {
  color: "white",
  display: "block",
};

export const report = {
  color: "white",
  display: "block",
};

export const boxProfile = {
  flexGrow: 0,
};

export const tittleProfile = {
  fontSize: 14,
  color: "#fff",
};

export const account = {
  color: "white",
};

export const menuList = {
  mt: "45px",
};
