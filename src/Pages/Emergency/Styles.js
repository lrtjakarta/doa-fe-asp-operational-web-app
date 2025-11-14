import { styled, makeStyles } from "@mui/styles";

export const tableCellStyleLeft = {
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
    lineHeight: 0.5,
    // width: "100px"
  };

  export const tableCellStyle = {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
    lineHeight: 0.5,
  };

  export const tableCellStyleRight = {
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
    lineHeight: 0.5,
  };

  export default makeStyles((theme) => ({
  tableLeftTxt: {
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    overflow: "hidden",
    border: "none",
    [theme.breakpoints.down("sm")]: {
      fontSize: 12,
      borderTopLeftRadius: "none",
      borderBottomLeftRadius: "none",
    },
  }

}))