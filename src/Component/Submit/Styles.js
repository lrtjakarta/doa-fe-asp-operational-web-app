import { makeStyles } from "@mui/styles";

export default makeStyles((theme) => ({
  root: {
    flex: 1,
    marginTop: 60,
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },

  mainTxt: {
    ml: 1,
    color: "#000",
    fontSize: 15,
    color: "#000",
    [theme.breakpoints.down("sm")]: {
      fontSize: 13,
    },
  },
  tabTxt: {
    fontSize: 12,
    color: "#fff",
    [theme.breakpoints.down("sm")]: {
      fontSize: 10,
    },
  },
}));
