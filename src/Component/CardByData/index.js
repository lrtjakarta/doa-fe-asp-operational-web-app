import React, { useState, useEffect, useContext } from "react";
import {
  Typography,
  Container,
  Grid,
  Box,
  Paper,
  ButtonBase,
} from "@mui/material";

import useStyles from "./Styles";
// import logo
import Images from "../../Themes/Images";

// import style
import { Img, paperContent, buttonImg, boxTittle, qr, kode } from "./Styles";
import StaticVar from '../../Config/StaticVar'
import { ProfileContext } from '../../Context/index';
import UseDailyWork from "Hooks/DailyWork/useDailyWork";
import moment from 'moment'
// data 1
function createData(text1, text2) {
  return { text1, text2 };
}

// const datas = [
//   createData("Nama", profile.name),
//   createData("Loop", "3"),
//   createDatadua("NIK", profile.nik),
//   createDatadua("No KA", "100P 3"),
// ];

// data 2
// function createDatadua(text1, text2) {
//   return { text1, text2 };
// }

export default function Coba(props) {
  const classes = useStyles();
  const {  getProfileUser } = useContext(ProfileContext)
  const { dataScheduleTrainDriver, getDailyWorkByTrainDriver } = UseDailyWork();
  // const [ profile, setProfile]= useState({})
  useEffect(()=>{
    
    // setProfile(props.profile)
    let dateNow = moment().format("YYYY-MM-DD")    
    getDailyWorkByTrainDriver(props.profile?._id, dateNow)
  },[])
  return (
    <>
      <Paper sx={paperContent}>
        <Grid container spacing={2}>
          <Grid item>
            <ButtonBase className={classes.buttonImg}>
              <Img alt="complex" src={StaticVar.URL_PHOTO+ props.profile?.photo} style={{width:100, height:100, borderRadius:100}} />
            </ButtonBase>
          </Grid>

          <Grid item xs={12} sm container>
            {/* Box */}
            <Box sx={boxTittle}>
              <Grid
                container
                rowSpacing={2}
                columnSpacing={{ xs: 1, sm: 2, md: 3 }}
              >
                <Grid item xs="auto" sx={{ mt: 2 }}>
                    <Typography
                      className={classes.littleTxt}
                      xs={12}
                      md={12}
                    >
                      Nama
                    </Typography>
                    <Typography className={classes.bigTxt}>
                      {
                        props.profile.name
                      }
                    </Typography>
                </Grid>
                <Grid item xs="auto" sx={{ mt: 2 }}>
                    <Typography
                      className={classes.littleTxt}
                      xs={12}
                      md={12}
                    >
                      Mulai Dinas
                    </Typography>
                    <Typography className={classes.bigTxt}>
                      {
                        dataScheduleTrainDriver[0]?.loopRouteTrain.start
                      }
                    </Typography>
                  </Grid>
                  <Grid item xs="auto" sx={{ mt: 2 }}>
                    <Typography
                      className={classes.littleTxt}
                      xs={12}
                      md={12}
                    >
                      NIK
                    </Typography>
                    <Typography className={classes.bigTxt}>
                      {props.profile.nik}
                    </Typography>
                  </Grid>
                  <Grid item xs="auto" sx={{ mt: 2 }}>
                    <Typography
                      className={classes.littleTxt}
                      xs={12}
                      md={12}
                    >
                      Habis Dinas
                    </Typography>
                    <Typography className={classes.bigTxt}>
                      {
                        dataScheduleTrainDriver[0]?.loopRouteTrain.end
                      }
                    </Typography>
                  </Grid>
              </Grid>
            </Box>
          </Grid>

          <Grid item mt={2}>
            <Typography sx={{ color: "#b3b3b3", ml: -3, mb: -3 }}>
              Kode Dinasan
            </Typography>

            <Typography
              sx={{ fontSize: 45, color: "#000", ml: 0, mb: -3, mt: 3, textAlign:'center' }}
            >
               {
                  dataScheduleTrainDriver[0]?.loopRouteTrain.code
                }
                -
                {
                  dataScheduleTrainDriver[0]?.loopRouteTrain.loop
                }
            </Typography>
          </Grid>
        </Grid>
      </Paper>
    </>
  );
}
