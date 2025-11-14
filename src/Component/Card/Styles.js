import { styled } from "@mui/material/styles";
import { makeStyles } from "@mui/styles";

export default makeStyles((theme) => ({
  root: {
    flex: 1,
    marginTop: 40,
  },
  mainTxt: {
    fontWeight: 600,
    color: "#000",
    mt: 14,
    fontSize: 24,
    [theme.breakpoints.down("sm")]: {
      fontSize: 18,
    },
  },
  photoCard: {
    width: 80,
    height: 80,
    [theme.breakpoints.down("sm")]: {
      width: 65,
      height: 65,
    },
  },
  secondTxt: {
    fontWeight: 500,
    fontSize: 16,
    color: "#000",
    [theme.breakpoints.down("sm")]: {
      fontSize: 6,
    },
  },
  littleTxt: {
    fontWeight: 450,
    fontSize: 13,
    color: "#b3b3b3",
    [theme.breakpoints.down("sm")]: {
      fontSize: 8,
    },
  },
  littleTxt1: {
    fontWeight: 450,
    fontSize: 13,
    marginRight: 10,
    color: "#b3b3b3",
    [theme.breakpoints.down("sm")]: {
      fontSize: 8,
    },
  },
  bigTxt: {
    width: 175,
    fontSize: 15,
    color: "#000",
    [theme.breakpoints.down("sm")]: {
      fontSize: 11,
    },
  },
  bigTxt1: {
    paddingLeft: 10,
    width: 175,
    fontSize: 15,
    color: "#000",
    [theme.breakpoints.down("sm")]: {
      fontSize: 11,
    },
  },
  qr: {
    mt: 10,
    fontSize: 14,
    color: "#000",
    [theme.breakpoints.down("sm")]: {
      fontSize: 12,
    },
  },
  buttonImg: {
    width: 128,
    height: 128,
    color: "#000",
    [theme.breakpoints.down("md")]: {
      width: 100,
      height: 100,
    },
  },
  qrImg: {
    align: "right",
    [theme.breakpoints.down("xs")]: {
      alignItems: "right",
    },
  },
}));

export const Img = styled("img")({
  margin: "auto",
  display: "block",
  maxWidth: "100%",
  maxHeight: "100%",
});

export const paperContent = {
  flex: 1,
  backgroundColor: (theme) =>
    theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  borderRadius: 3,
  px: 2,
  overflow: "hidden",
};

export const boxTittle = {
  flexGrow: 1,
};

export const kode = {
  mt: 4,
};
