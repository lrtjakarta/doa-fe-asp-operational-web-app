import Fonts from "./Fonts";
import Metrics from "./Metrics";
import Colors from "./Colors";

const ApplicationStyles = {
  imgdicipline: {
    width: 80,
    height: 80,
  },
  imgcontingent: {
    width: 30,
    height: 30,
  },
  containerStatus: {
    width: "100%",
    height: "100%",
    borderRadius: "5px",
    padding: "2px 0",
    textAlign: "center",
    color: Colors.white,
  },
};

const txt = {
  txthead: {
    margin: "15px 0",
    fontWeight: "bold",
    fontFamily: "Barlow",
  },
  txtdicipline: {
    color: Colors.black,
    margin: 0,
    fontSize: "14pt",
    textTransform: "uppercase",
    fontFamily: "Barlow",
    fontWeight: 400,
  },
  txtdate: {
    color: Colors.black,
    margin: 0,
    fontSize: 15,
    fontFamily: "Barlow",
  },
  txtvenue: {
    color: Colors.black,
    margin: 0,
    fontSize: 13,
    fontWeight:400,
    fontFamily: "Barlow",
  },
  txtstatus: {
    margin: 0,
    fontSize: "10pt",
  },
  txtdetail: {
    margin: 0,
    fontWeight: 600,
    fontFamily: "Barlow",
    textAlign: "right",
    color: Colors.orange,
  },
  txtround: {
    fontSize: "18pt",
    margin: 0,
    fontWeight: 700,
    fontFamily: "Barlow",
  },
  txtroundsmall: {
    margin: "5px 0",
    fontSize: "14px",
    fontWeight: "bold",
    fontFamily: "Barlow",
    color: Colors.black,
  },
  txtContingent: {
    margin: 0,
    fontSize: "14pt",
    fontWeight: "bold",
    fontFamily: "Barlow",
    // textAlign: 'center'
  },
  txtParticipant: {
    margin: 0,
    fontSize: "11pt",
    fontWeight: "400",
    fontFamily: "Barlow",
  },
  txtTime: {
    margin: 0,
    fontWeight: "400",
    fontFamily: "Barlow",
  },
  txtTabs: {
    margin: 0,
    fontFamily: "Barlow",
    textTransform: "capitalize",
  },
};

export { ApplicationStyles, txt };
