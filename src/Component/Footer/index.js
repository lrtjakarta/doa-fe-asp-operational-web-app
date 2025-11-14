// import { Grid, Typography,Hidden } from "@mui/material";
import React from "react";
import useStyles from "./Styles";
// import { dataPartner, dataSocmed } from "./Data";
// import useSitemap from "Hooks/Sitemap/useSitemap";
import Images from "Themes/Images";

const Footer = (props) => {
  const classes = useStyles();
  // const { dataFooterSitemap } = useSitemap()

  return (
    <div className={classes.container} style={{ backgroundImage: `url(${Images.footerBgImg})` }}>    
    </div>
  )
}

export default Footer
