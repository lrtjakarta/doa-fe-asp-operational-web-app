import React from "react";
import { Grid, Paper, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";

// styles
import useStyles from "./Styles";
import { Images } from "Themes"

export default function Error() {
  var classes = useStyles();

  return (
    <Grid container className={classes.container}>
      <div className={classes.logotype}>
        <img className={classes.logotypeIcon} src={Images.hoodaMerchantlogo} alt="logo" />
        <Typography variant="h3" color="inherit" className={classes.logotypeText}>
          LRT Akda app  
        </Typography>
      </div>
      <Paper classes={{ root: classes.paperRoot }}>
        <Typography
          variant="h1"
        >
          404
        </Typography>
        <Typography variant="h5"  className={classes.textRow}>
          Oops. Looks like the page you're looking for no longer exists
        </Typography>
        <Typography
          variant="h6"
          color="text"
          colorBrightness="secondary"
        >
          But we're here to bring you back to safety
        </Typography>
        <Button
          variant="contained"
          
          component={Link}
          to="/"
          size="large"
          className={classes.backButton}
        >
          Back to Home
        </Button>
      </Paper>
    </Grid>
  );
}
