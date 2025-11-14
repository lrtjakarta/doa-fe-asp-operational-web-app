import { makeStyles } from '@mui/styles';
import Colors from "Themes/Colors"

export default makeStyles((theme) => ({
  container: {
    display:"flex",
    justifyContent:"center",
    flexDirection:"row",
    flex:1,
    backgroundRepeat: "no-repeat",
    backgroundSize: "100% 460px",
    height: 460,
    padding:0,
    paddingBottom:80,
    width:"auto",
    backgroundPosition:"cover",
    [theme.breakpoints.down("sm")]: {
      height:"auto",
      backgroundSize: "auto",
      paddingBottom:60,
      flexDirection:"column",
      backgroundPosition:"cover",
    }
  },
  socmedSec:{
    flex:0.4,
    display:"flex",
    paddingRight:170,
    paddingLeft:90,
    flexDirection:"column",
    marginTop:80,
    [theme.breakpoints.down("md")]: {
      paddingRight:160,
      paddingLeft:65,
      marginTop:75,
    },
    [theme.breakpoints.down("sm")]: {
      paddingRight:100,
      paddingLeft:35,
      marginTop:20,
      flex:1,
    },
    [theme.breakpoints.down("xs")]: {
      paddingRight:30,
      paddingLeft:10,
      marginTop:20,
      height:100,
      flex:1,
    }
  },
  line:{
    width:2,height:40,
    backgroundColor:"#fff",
    marginTop:50,
    marginLeft:theme.spacing(3),
    marginRight:theme.spacing(3)
  },
  torangBisaSizeIcon:{
    position:"relative",
    height: 45,
    width: 100,
    marginTop:50,
    [theme.breakpoints.down("xs")]: {
      height: 40,
      width: 70,
    },
  },
  socmedList:{
    marginBottom:40,
    [theme.breakpoints.down("xs")]: {
      marginBottom:20,
    },
  },
  sitemapSec:{
    flex:0.6,
    display:"flex",
    paddingLeft:170,
    justifyContent:"center",
    flexDirection:"row",
    marginTop:80,
    [theme.breakpoints.down("md")]: {
      paddingLeft:160,
      marginTop:80,
    },
    [theme.breakpoints.down("sm")]: {
      paddingLeft:20,
      paddingRight:100,
      marginTop:20,
      flex:1,
      justifyContent:"center"
    },
    [theme.breakpoints.down("xs")]: {
      flex:1,
      paddingLeft:15,
      paddingRight:15,
      display:"flex",
      justifyContent:"center",
      alignItems:"center",
      marginTop:30,
    }
  },
  socmedImg:{
    // width:43,
    height:43,
    marginLeft:3,
    marginRight:3,
    [theme.breakpoints.down("sm")]: {
      height: 34
    }
  },
  partnerImg:{
    // width:43,
    height:43,
    marginLeft:4,
    marginRight:4,
    [theme.breakpoints.down("sm")]: {
      height: 34
    }
  },
  copyrightTxt:{
    fontFamily: "Montserrat",
    fontStyle: "normal",
    fontWeight: "normal",
    fontSize: 12,
    marginTop:10,
    marginBottom:10,
    marginLeft:7,
    textTransform: "uppercase",
    color:"#ffffff",
    [theme.breakpoints.down("sm")]: {
      fontSize: 9,
    }
  },
  sloganTxt:{
    fontFamily: "Montserrat",
    fontStyle: "normal",
    fontWeight: "normal",
    fontSize: 15,
    marginTop:50,
    marginBottom:10,
    marginLeft:7,
    fontWeight:600,
    textTransform: "uppercase",
    color:"#ffffff",
    [theme.breakpoints.down("sm")]: {
      fontSize: 14,
    }
  },
  titleSitemapTxt:{
    fontFamily: "Montserrat",
    fontStyle: "normal",
    fontWeight: 600,
    fontSize: 16,
    textTransform: "capitalize",
    textDecoration:"none",
    color: "#FFFFFF",
    [theme.breakpoints.down("sm")]: {
      fontSize: 14,
    }
  },
  branchSitemapTxt:{
    fontFamily: "Montserrat",
    fontStyle: "normal",
    fontWeight: 400,
    fontSize: 12,
    lineHeight:2,
    textTransform: "capitalize",
    textDecoration:"none",
    color: "#FFFFFF",
    textDecoration:"none",
    [theme.breakpoints.down("sm")]: {
      fontSize: 11,
    }
  },
  sitemapItem:{
    marginBottom:0,
    [theme.breakpoints.down("sm")]: {
      marginBottom:20,
    }
  }
}))