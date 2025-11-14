import { TableCell } from "@mui/material";
import { makeStyles, withStyles } from "@mui/styles";

export const btn = {
  bgcolor: "#BB7E36",
  height: "100%",
  py: 1.4,
  boxShadow: 0,
  borderTopLeftRadius: 0,
  borderBottomLeftRadius: 0,
};

export const cardStyle = {
  // minHeight: "40vh",
  // display: { xs: {
  //   minHeight: "10vh"
  // } }
};

export const linkMenu = {
  alignSelf: "flex-end",
  display: "flex",
  alignItems: "center",
  width: "100%",
  justifyContent: "space-between",
  backgroundColor: "#ababab",
};

export const iconStyleContainer = {
  display: "flex",
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
  height: "34.1vh",
};

export const typographyStyle = {
  color: "#fff",
  fontSize: "1.3em",
  height: "100%",
  margin: "0.4em 0",
  ml: 4,
};

export const tableLeftStyle = {
  color: "#fff",
  fontWeight: "bold",
  fontSize: "18px",
  borderTopLeftRadius: 10,
  borderBottomLeftRadius: 10,
  overflow: "hidden",
};

export const tableTextCellStyle = {
  color: "#000",
  fontWeight: "bold",
  fontSize: "11px",
  // borderRight: '2px solid #F6F7FF',
  // borderLeft: '2px solid #F6F7FF',
};

export const StickyTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: "#F6F7FF",
    color: theme.palette.common.white,
    left: 0,
    position: "sticky",
    zIndex: theme.zIndex.appBar + 2,
  },
  body: {
    backgroundColor: "#F6F7FF",
    left: 0,
    position: "sticky",
    zIndex: theme.zIndex.appBar + 1,
  },
}))(TableCell);

export const tableRightStyle = {
  color: "#000",
  fontWeight: "bold",
  fontSize: "18px",
  borderTopRightRadius: 10,
  borderBottomRightRadius: 10,
  overflow: "hidden",
};

export const tableLeftIsiStyle = {
  fontSize: "18px",
  borderTopLeftRadius: 10,
  borderBottomLeftRadius: 10,
  overflow: "hidden",
  fontWeight: 400,
  border: "none",
  color: "#000",
};

export const tableTextIsiStyle = {
  fontSize: "18px",
  border: "none",
  fontWeight: 400,
  color: "#000",
  // display: "flex",
};

export const tableRightIsiStyle = {
  color: "#000",
  fontSize: "18px",
  borderTopRightRadius: 10,
  borderBottomRightRadius: 10,
  overflow: "hidden",
  border: "none",
};

export const alamatStyle = {
  mb: 10,
  width: "100%",
  bgcolor: "#fff",
  "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
    border: "none",
    borderColor: "#fff",
  },
  "&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
    borderColor: "#fff",
  },
  "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
    borderColor: "#fff",
  },
};

export const border = {
  borderBottomLeftRadius: 5,
  borderBottomRightRadius: 5,
  borderTopRightRadius: 5,
  borderTopLeftRadius: 5,
  overflow: "hidden",
};

export const tableStyle = {
  minWidth: 250,
  borderCollapse: "separate",
  borderSpacing: "0px 10px",
  borderRadius: 3,
  "& .MuiTableCell-sizeSmall": {
    padding: "6px 0px 6px 16px", // <-- arbitrary value
  },
};

// const StyledTableCell = styled(TableCell)({
//   padding: 0,
// });

export const searchBorderStyle = {
  width: "100%",
  borderRadius: "7px",
  boxShadow: " 0px -3px 3px grey",
  // ml: -4,
  "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
    border: 1.5,
    borderColor: "#fff",
    borderRadius: 5,
  },
  "&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
    borderColor: "#fff",
  },
  "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
    borderColor: "#fff",
  },
};

export default makeStyles((theme) => ({
  root: {
    flex: 1,
    marginTop: 60,
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
  tableLeftTxt: {
    color: "#000",
    fontWeight: "bold",
    fontSize: "18px",
    [theme.breakpoints.down("sm")]: {
      fontSize: 14,
    },
  },
  searchTxt: {
    width: "100%",
    "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
      border: 1.5,
      borderColor: "#fff",
      borderRadius: 5,
    },
    "&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
      borderColor: "#fff",
    },
    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: "#fff",
    },
    [theme.breakpoints.down("sm")]: {
      width: "100%",
    },
  },
  answerTxt: {
    color: "#000",
    fontWeight: "bold",
    fontSize: 16,
    [theme.breakpoints.down("sm")]: {
      fontSize: 12,
    },
  },
  questionTxt: {
    fontSize: 16,
    color: "#000",
    [theme.breakpoints.down("sm")]: {
      fontSize: 12,
    },
  },
  additionalTxt: {
    color: "#b3b3b3",
    fontWeight: "bold",
    fontSize: 16,
    [theme.breakpoints.down("sm")]: {
      fontSize: 12,
    },
  },
  noteTxt: {
    color: "#000",
    fontSize: 16,
    fontWeight: 300,
    [theme.breakpoints.down("sm")]: {
      fontSize: 12,
    },
  },
  boxTxt: {
    mt: 3,
    width: "100%",
    height: 60,
    backgroundColor: "green",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  },
  textBoxTxt: {
    color: "#fff",
    margin: "auto",
    alignItems: "center",
    fontSize: 30,
    align: "center",
    [theme.breakpoints.down("sm")]: {
      fontSize: 20,
    },
  },
  textGridTxt: {
    fontSize: 13,
    color: "#000",
  },
  imgGridTxt: {
    width: 150,
    height: 150,
    [theme.breakpoints.down("sm")]: {
      width: 100,
      height: 100,
    },
  },
  customTable: {
    "& .MuiTableCell-sizeSmall": {
      padding: "6px 0px 6px 16px", // <-- arbitrary value
    },
  },
}));
