import React, { useState, useEffect, useContext } from "react";
import {
  Typography,
  Container,
  Grid,
  Box,
  Paper,
  ButtonBase,
  Avatar,
} from "@mui/material";

import useStyles from "./Styles";

// import style
import { Img, paperContent, buttonImg, boxTittle, qr, kode } from "./Styles";
import StaticVar from "../../../Config/StaticVar";
import { ProfileContext } from "../../../Context/index";
import UseDailyWork from "Hooks/DailyWork/useDailyWork";
import useTrainDriver from "Hooks/TrainDriver/useTrainDriver"
import moment from "moment"
import QRCode from "react-qr-code";

export default function CardTrainDriver(props) {
  const classes = useStyles();
  const { getProfileUser } = useContext(ProfileContext);
  const { getDailyWorkByTrainDriver, getDailyWorkById, dataDetailDaily } = UseDailyWork();
  const { getDetailTrainDriver } = useTrainDriver() 
  const [profile, setProfile] = useState({});
  const [dailywork, setDailyWork] = useState({});
  useEffect(() => {
    if(props.type === "traindriver"){
    getDetailTrainDriver(props.nik).then(async (data) => {
      setProfile(data);
      console.log('data profile driver', props.nik, data)
      if(localStorage.operational_id){
        let _dailywork = await getDailyWorkById(localStorage.operational_id)
        console.log('dailywork operational', _dailywork)
        if(_dailywork.status){
          setDailyWork(_dailywork.data)
        }
      }
      else{
        let _dailywork = await getDailyWorkByTrainDriver(data._id, moment().format("YYYY-MM-DD"))
        console.log('dailywork', _dailywork)
        if(_dailywork &&_dailywork.length > 0){
          setDailyWork(_dailywork[0])
        }
      }
    })
  } else if(props.type === "traindriver"){
    getProfileUser().then(async (data) => {
      setProfile(data);
      console.log('data profile user', data)
      if(localStorage.operational_id){
        let _dailywork = await getDailyWorkById(localStorage.operational_id)
        console.log('dailywork operational', _dailywork)
        if(_dailywork.status){
          setDailyWork(_dailywork.data)
        }
      }
      else{
        let _dailywork = await getDailyWorkByTrainDriver(data._id, moment().format("YYYY-MM-DD"))
        console.log('dailywork', _dailywork)
        if(_dailywork &&_dailywork.length > 0){
          setDailyWork(_dailywork[0])
        }
      }
    })
  }
  }, []);

  return (
    <>
      <Paper sx={paperContent}>
        {
          props.small ? 
          <Grid container columns={11} alignItems="center" spacing="1">
            <Grid item  xs={2} sm={2}>
              <ButtonBase className={classes.buttonImg}>
                <Avatar
                  alt={profile?.name}
                  src={StaticVar.URL_PHOTO + "/" + profile?.photo}
                  style={{ width: 80, height: 80 }}
                />
              </ButtonBase>
            </Grid>

            <Grid item xs={4} sm={4}>

              <Grid container>
                <Grid item xs="auto">
                  <Typography className={classes.littleTxt} xs={12} sm={12} md={12}>
                   Nama
                  </Typography>
                  <Typography className={classes.bigTxt}>
                  {profile.name || "-"}
                  </Typography>
                </Grid>
                <Grid item xs="auto">
                  <Typography className={classes.littleTxt} xs={12} sm={12} md={12}>
                    NIK
                  </Typography>
                  <Typography className={classes.bigTxt}>
                  {profile.nik || "-"}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={2} sm={2}>
              <Grid container>
                <Grid item xs="auto">
                  <Typography className={classes.littleTxt} xs={12} sm={12} md={12}>
                    Kode
                  </Typography>
                  <Typography className={classes.bigTxt}>
                  {
                    dataDetailDaily?.loopRouteTrain?.code
                  }
                  </Typography>
                </Grid>
                <Grid item xs="auto">
                  <Typography className={classes.littleTxt} xs={12} sm={12} md={12}>
                    Loop
                  </Typography>
                  <Typography className={classes.bigTxt}>
                  {
                    dataDetailDaily?.loopRouteTrain?.loop
                  }
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={3} sm={3}>

              <Grid container>
                <Grid item xs="auto">
                  <Typography className={classes.littleTxt} xs={12} sm={12} md={12}>
                    Jam Dinas
                  </Typography>
                  <Typography className={classes.bigTxt}>
                  {
                    dataDetailDaily?.loopRouteTrain?.start
                  }
                  -
                  {
                    dataDetailDaily?.loopRouteTrain?.end
                  }
                  </Typography>
                </Grid>
                <Grid item xs="auto">
                  <Typography className={classes.littleTxt} xs={12} sm={12} md={12}>
                    Nomor KA
                  </Typography>
                  <Typography className={classes.bigTxt}>
                  {
                    dataDetailDaily?.loopRouteTrain?.route.filter(x=>x.status !== "Finish")[0]?.trainNumber
                  }
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          :
          <Grid container alignItems="center">
          <Grid item>
            <ButtonBase className={classes.buttonImg}>
              <Avatar
                alt={profile?.name}
                src={StaticVar.URL_PHOTO + "/" + profile?.photo}
                style={{ width: 80, height: 80 }}
              />
            </ButtonBase>
          </Grid>

          <Grid item xs={3} sm container>
            {/* Box */}
            <Box sx={boxTittle}>
              <Grid
                container
                rowSpacing={2}
                columnSpacing={{ xs: 1, sm: 2, md: 3 }}
              >
                <Grid item xs="auto">
                  <Typography className={classes.littleTxt} xs={12} sm={12} md={12}>
                    Nama
                  </Typography>
                  <Typography className={classes.bigTxt}>
                    {profile.name || "-"}
                  </Typography>
                </Grid>
                <Grid item xs="auto">
                  <Typography className={classes.littleTxt} xs={12} sm={12} md={12}>
                    NIK
                  </Typography>
                  <Typography className={classes.bigTxt}>
                    {profile.nik || "-"}
                  </Typography>
                </Grid>
              </Grid>
            </Box>
          </Grid>

          <Grid item xs={4}>
            <Typography sx={{ color: "#b3b3b3",textAlign:'center' }}>
              Jam Dinas
            </Typography>

            <Typography
              sx={{ fontSize: 30, color: "#000",textAlign:'center' }}
            >

               {
                  dailywork?.loopRouteTrain?.start
                }
                -
                {
                  dailywork?.loopRouteTrain?.end
                }
            </Typography>
          </Grid>
          
          {
            profile.jobrole === "Penyelia" ? 
            <Grid item xs={2}>
            <Typography sx={{ color: "#b3b3b3",textAlign:'center' }}>
              Kode Dinas
            </Typography>

            <Typography
              sx={{ fontSize: 30, color: "#000",textAlign:'center' }}
            >
               {
                  dailywork?.loopRouteTrain?.code ?  dailywork?.loopRouteTrain?.code : "-"
                }
            </Typography>
          </Grid> :
          <>
            <Grid item xs={1}>
              <Typography sx={{ color: "#b3b3b3",textAlign:'center' }}>
                Kode
              </Typography>

              <Typography
                sx={{ fontSize: 30, color: "#000",textAlign:'center' }}
              >
                {
                    dataDetailDaily?.loopRouteTrain?.code
                  }
              </Typography>
            </Grid>
            <Grid item xs={1}>
              <Typography sx={{ color: "#b3b3b3",textAlign:'center' }}>
                Loop
              </Typography>

              <Typography
                sx={{ fontSize: 30, color: "#000",textAlign:'center' }}
              >
                  {
                    dailywork?.loopRouteTrain?.loop
                  }
              </Typography>
            </Grid>
          </>
          }

          
          <Grid item xs={2}>
            {
              profile.jobrole === "Penyelia" ? 
              <QRCode value={profile?._id} size={100} /> :
              <>
                <Typography sx={{ color: "#b3b3b3",textAlign:'center' }}>
                  Nomor KA
                </Typography>
                <Typography
                  sx={{ fontSize: 30, color: "#000",textAlign:'center' }}
                >
                  {
                    dailywork?.loopRouteTrain?.route.filter(x=>x.status === "")[0]?.trainNumber ? 
                    dailywork?.loopRouteTrain?.route.filter(x=>x.status === "")[0]?.trainNumber : "-"
                  }
                </Typography>
              </>
            }
            
          </Grid>
        </Grid>
        }
        
      </Paper>
    </>
  );
}
