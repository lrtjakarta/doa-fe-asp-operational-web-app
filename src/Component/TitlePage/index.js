import React, { useState } from "react";
import { Grid, Typography } from "@mui/material";
import useStyles from "./Styles"

const TitlePage = (props) => {
    const classes = useStyles();
    return (
        <div className={classes.container}>
            <Grid container className={[classes.backgroundTitle,props.style]} style={{ backgroundImage: `url(${props.images ? props.images : ""})` }}>
                <div>{props.title}</div>
                <div>{props.content}</div>
            </Grid>
        </div>
    );
};

export default TitlePage;
