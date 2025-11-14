import { makeStyles } from "@mui/material/styles";

export default makeStyles((theme) => ({
  name: {
    [theme.breakpoints.between("md", "lg")]: {
      fontSize: "9pt",
      margin: "0 0 0 10px",
    },
    [theme.breakpoints.up("lg")]: {
      fontSize: "10pt",
      margin: 0,
    },
  },
  place: {
    [theme.breakpoints.between("md", "lg")]: {
      fontSize: "10pt",
      margin: "0 0 0 10px",
    },
    [theme.breakpoints.up("lg")]: {
      fontSize: "8pt",
      margin: 0,
    },
  },
  scroll: {
    "&::-webkit-scrollbar": {
      height: 5,
    },
    "&::-webkit-scrollbar-thumb": {
      background: "#A7A8AA",
      borderRadius: 10,
    },
    "&::-webkit-scrollbar-thumb:hover": {
      background: "#f58634",
    },
  },
  bracketdiv: {
    width: "100%",
  },
  statcont: {
    [theme.breakpoints.down("sm")]: {
      height: "50%",
      width: "80%",
    },
    [theme.breakpoints.between("sm", "md")]: {
      height: "60%",
      width: "80%",
    },
    [theme.breakpoints.up("lg")]: {
      height: "50%",
      width: "80%",
    },
    borderRadius: "5px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  sidebox: {
    [theme.breakpoints.down("sm")]: {
      padding: 10,
    },
    [theme.breakpoints.up("md")]: {
      padding: 15,
    },
  },
  sideboxp: {
    [theme.breakpoints.down("sm")]: {
      margin: "0 0 0 15px",
    },
    [theme.breakpoints.between("sm", "md")]: {
      margin: 0,
    },
    [theme.breakpoints.between("md", "lg")]: {
      margin: "0 0 0 10px",
    },
    [theme.breakpoints.up("lg")]: {
      margin: 0,
    },
  },
  carouselcont: {
    [theme.breakpoints.down("sm")]: {
      width: "98%",
      margin: "0 1%",
    },
    [theme.breakpoints.up("md")]: {
      width: "90%",
      margin: "0 5%",
    },
  },
  detailcabor: {
    [theme.breakpoints.down("sm")]: {
      padding: "21px 5px",
    },
    [theme.breakpoints.up("md")]: {
      padding: "21px 10px 21px 20px",
    },
  },
  detailcaborp: {
    [theme.breakpoints.down("sm")]: {
      fontSize: "10pt",
    },
    [theme.breakpoints.up("md")]: {
      fontSize: "12pt",
    },
  },
  bottomp: {
    [theme.breakpoints.down("sm")]: {
      fontSize: "10pt",
    },
    [theme.breakpoints.up("md")]: {
      fontSize: "14pt",
    },
  },
  table: {
    backgroundColor: "white",
    padding: 5,
    boxSizing: "border-box",
    borderCollapse: "collapse",
    borderRadius: "10px",
    overflow: "hidden",
    width: "100%",
  },
  titleFooterTxt: {
    [theme.breakpoints.down("md")]: {
      fontSize: 15,
    },
    [theme.breakpoints.up("lg")]: {
      fontSize: 16,
    },
    color: "#ffffff",
    fontWeight: 200,
    marginBottom: 18,
  },

  listTxt: {
    [theme.breakpoints.down("md")]: {
      fontSize: 13,
    },
    [theme.breakpoints.up("lg")]: {
      fontSize: 14,
    },
    color: "#ffffff",
    fontWeight: 100,
    marginBottom: 20,
  },

  spacing: {
    [theme.breakpoints.down("md")]: {
      marginRight: 20,
    },
    [theme.breakpoints.up("lg")]: {
      marginRight: 30,
    },
  },
  linkActive: {
    // borderBottom: '2px solid #205b6f',
    paddingBottom: 0,
    paddingTop: 0,
    paddingLeft: 10,
    paddingRight: 10,
    marginTop: 5,
    marginLeft: 20,
  },
  linkNotActive: {
    paddingBottom: 0,
    paddingTop: 0,
    paddingLeft: 10,
    paddingRight: 10,
    marginTop: 5,
    marginLeft: 20,
  },

  spacing1: {
    [theme.breakpoints.down("md")]: {
      marginRight: 0,
    },
    [theme.breakpoints.up("lg")]: {
      marginRight: 40,
    },
  },

  spacing2: {
    [theme.breakpoints.down("md")]: {
      marginLeft: 40,
    },
    [theme.breakpoints.up("lg")]: {
      marginLeft: 0,
    },
  },

  btnMenuMobile: {
    [theme.breakpoints.down("xs")]: {
      height: 35,
    },
    [theme.breakpoints.up("sm")]: {
      height: 35,
    },
    width: "100%",
    zIndex: 10,
    borderBottom: "2px solid #ffffff",
    borderRadius: 0,
    height: 47,
  },
  txtMenuMobile: {
    [theme.breakpoints.down("xs")]: {
      fontSize: 13,
    },
    [theme.breakpoints.up("sm")]: {
      fontSize: 15,
    },
    position: "absolute",
    left: 0,
    textTransform: "none",
    fontWeight: 300,
    color: "#ffffff",
  },

  txtMenuMobileExpandSummary: {
    [theme.breakpoints.down("xs")]: {
      fontSize: 13,
    },
    [theme.breakpoints.up("sm")]: {
      fontSize: 15,
    },
    position: "absolute",
    textTransform: "none",
    fontSize: 15,
    fontWeight: 300,
    color: "#ffffff",
    bottom: 10,
  },

  txtMenuMobileExpandDetail: {
    [theme.breakpoints.down("xs")]: {
      fontSize: 12,
    },
    [theme.breakpoints.up("sm")]: {
      fontSize: 14,
    },
    position: "absolute",
    left: 0,
    textTransform: "none",
    fontWeight: 200,
    color: "#ffffff",
  },

  logoFooterIconStyle: {
    [theme.breakpoints.down("xs")]: {
      marginTop: 130,
      width: 155,
      height: 270,
    },
    [theme.breakpoints.up("sm")]: {
      marginTop: 65,
      width: 220,
      height: 360,
    },
    [theme.breakpoints.up("md")]: {
      marginTop: 0,
      width: 350,
      height: 465,
    },
    right: 0,
    zIndex: 1,
    position: "absolute",
  },
  iconFollowUs: {
    [theme.breakpoints.down("xs")]: {
      fontSize: 20,
    },
    [theme.breakpoints.up("sm")]: {
      fontSize: 25,
    },
    color: "white",
    marginRight: 20,
    zIndex: 10,
  },
  containerFooter: {
    [theme.breakpoints.down("xs")]: {
      paddingTop: 25,
      paddingBottom: 25,
    },
    [theme.breakpoints.up("sm")]: {
      paddingTop: 40,
      paddingBottom: 40,
    },
    [theme.breakpoints.up("md")]: {
      paddingTop: 80,
      paddingBottom: 50,
    },
    backgroundImage: "linear-gradient(to right, #bf272b , #601416 )",
    paddingLeft: 24,
    paddingRight: 24,
  },
  btnStyle: {
    paddingLeft: 4,
    paddingRight: 4,
    paddingTop: 2,
    paddingBottom: 2,
  },

  containerMenu: {
    [theme.breakpoints.down("md")]: {
      paddingLeft: 175,
    },
    [theme.breakpoints.up("lg")]: {
      paddingLeft: 230,
    },
    flexDirection: "row",
    height: 36,
    paddingTop: 3,
    paddingRight: 50,
  },

  spacing: {
    [theme.breakpoints.down("md")]: {
      marginRight: 9,
    },
    [theme.breakpoints.up("lg")]: {
      marginRight: 30,
    },
  },

  txtNavbar: {
    [theme.breakpoints.down("md")]: {
      fontSize: 15,
    },
    [theme.breakpoints.up("lg")]: {
      fontSize: 16,
    },
    fontFamily: "Barlow",
    fontWeight: 400,
    textAlign: "left",
    textTransform: "none",
    color: "#1f313d",
  },

  txtNavbarDropDown: {
    [theme.breakpoints.down("md")]: {
      fontSize: 12,
    },
    [theme.breakpoints.up("lg")]: {
      fontSize: 13,
    },
    fontFamily: "Roboto",
    fontWeight: "bold",
    textAlign: "left",
    textTransform: "none",
    color: "#1f313d",
  },

  txtTiket: {
    [theme.breakpoints.down("md")]: {
      fontSize: 13,
    },
    [theme.breakpoints.up("lg")]: {
      fontSize: 14,
    },
    color: "#bf272b",
    textTransform: "none",
  },

  txtPendaftaran: {
    [theme.breakpoints.down("md")]: {
      fontSize: 13,
    },
    [theme.breakpoints.up("lg")]: {
      fontSize: 14,
    },
    color: "#ffffff",
    textTransform: "none",
    fontWeight: 200,
  },

  btnlogoStyle: {
    [theme.breakpoints.down("md")]: {
      width: 140,
      height: 70,
      left: 15,
    },
    [theme.breakpoints.up("lg")]: {
      width: 155,
      height: 80,
      left: 40,
    },
    backgroundColor: "transparent",
    position: "absolute",
  },

  titleHeaderTxt: {
    [theme.breakpoints.down("md")]: {
      paddingLeft: 165,
      fontSize: "3.5vh",
    },
    [theme.breakpoints.up("lg")]: {
      paddingLeft: 235,
      fontSize: "5vh",
      marginTop: -10,
    },
    [theme.breakpoints.up("xl")]: {
      paddingLeft: 235,
      fontSize: "3vh",
      marginTop: -8,
    },
    backgroundColor: "transparent",
    position: "absolute",
    color: "white",
    fontWeight: 700,
    fontFamily: "Barlow",
  },

  imglogoStyle: {
    [theme.breakpoints.down("sm")]: {
      height: 70,
    },
    [theme.breakpoints.up("md")]: {
      height: 80,
    },
    width: "100%",
    height: 80,
    position: "absolute",
  },
  fullList: {
    width: "auto",
  },
  headerBox: {
    padding: 0,
    height: 80,
    boxShadow: "2px 2px 5px #888888",
    backgroundColor: "#ffffff",
    color: "#000000",
  },
  btnMenuMobileHeader: {
    width: "100%",
    height: 51,
  },
  txtMenuMobileHeader: {
    position: "absolute",
    left: 30,
    textTransform: "none",
    fontSize: 14,
    fontWeight: 300,
  },
  toolbar: {
    padding: 0,
    minHeight: 0,
    backgroundColor: "#ffffff",
    color: "black",
  },
  tablabel: {
    [theme.breakpoints.down("sm")]: {
      fontSize: "8pt",
    },
    [theme.breakpoints.up("md")]: {
      fontSize: "12pt",
    },
  },
  tabparagraf: {
    [theme.breakpoints.down("sm")]: {
      fontSize: "10pt",
    },
    [theme.breakpoints.up("sm")]: {
      fontSize: "12pt",
    },
  },

  tabStayles: {
    [theme.breakpoints.down("sm")]: {
      // marginLeft: 20,
    },
    [theme.breakpoints.up("md")]: {
      // marginLeft: "2%",
    },
  },
}));
