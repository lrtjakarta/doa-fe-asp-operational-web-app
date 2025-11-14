import React, { useEffect } from "react";
import { Typography, Card, Grid, Button, Container, Divider, Paper, TextField, Table, TableHead, TableRow, TableBody, TableCell } from "@mui/material";
import { btn, cardStyle, linkMenu, typographyStyle,iconStyleContainer } from "../TrainJourney/Styles";
import Images from "Themes/Images";
import { Colors, Metrics, Types } from "Themes"
import { Link,withRouter } from "react-router-dom";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import MuiAlert from '@mui/material/Alert';
import { button, tableCellStyle } from '../TrainJourney/Styles';
// import useQuery from "Utils/QueryParams";
import useDailyWork from "../../Hooks/DailyWork/useDailyWork";
import moment from 'moment'
import {
    tableLeftIsiStyle,
    tableLeftStyle,
    tableRightIsiStyle,
    tableRightStyle,
    tableTextCellStyle,
    tableTextIsiStyle,
    alamatStyle,
    border,
    tableStyle,
    searchBorderStyle,
  } from "./StyleTakeGive";
import useStyles from './StyleTakeGive';
import _ from 'lodash'
import useQuery from "Utils/QueryParams";
import { TableContainer } from "@material-ui/core";
import StaticVar from "Config/StaticVar";

import postNavigate from "Utils/Custom Navigate";

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="standard" {...props} />;
});

export default function TakeGiveTrainDriver(props) {
    const customNavigate = postNavigate();
    const classes = useStyles();
    const query = useQuery();
    const id = query.get('id');
    const workorderId = query.get('workorderId');

    const {
        dataScheduleTrainDriver,
        dataScheduleLastTrainDriver,
        dinasan,
        getDailyWork,
        takegivework,
        setTakeGiveWork,
        startTime,
        endTime,
        putDailyWork,
        createDailyWork,
        getDataScheduleLastTrainDriver,
        getDailyWorkById,
        dataDetailDaily,
        getDailyWorkByIdLocal,
        dataDetailDailyLocal,
        logoutHandOver
    } = useDailyWork();


    const loadData = async()=>{
        console.log('operation_id', workorderId)
        console.log('handover_id', id)
        let dataresponse = await getDailyWorkById(workorderId)
        let dataresponseLocal = await getDailyWorkByIdLocal(id)
        // getDataScheduleLastTrainDriver(dataresponseLocal?.loopRouteTrain?.code, dataresponseLocal?.loopRouteTrain?.loop, moment(dataresponseLocal?.dailyWorkDate).format("YYYY-MM-DD"))
    }

    useEffect(()=>{
        loadData()
    },[])
  return (
    <div>
      <Container maxWidth="xl" sx={{ pt: 10 }}>
        <Paper sx={{p:2}}>
            <Typography variant="h5">TERIMA TIMBANG DINAS MASINIS</Typography>
            
            <Grid container spacing={1} sx={{mt:1}}>
                <Grid item md={12}><Typography>Hari / Tanggal  : {moment(dataDetailDaily?.dailyWorkDate).format("DD-MM-YYYY")}</Typography></Grid>
                <Grid item md={6}>
                    <table>
                        <tr>
                            <td>1. Nama Masinis</td>
                            <td>:</td>
                            <td>{dataDetailDaily?.trainDriver?.name}</td>
                        </tr>
                        <tr>
                            <td>2. Dinasan</td>
                            <td>:</td>
                            <td>{dataDetailDaily?.loopRouteTrain?.code + " - " + dataDetailDaily?.loopRouteTrain?.loop}</td>
                        </tr>
                        <tr>
                            <td>3. Jam Dinasan</td>
                            <td>:</td>
                            <td>{dataDetailDaily?.loopRouteTrain?.start + " - " + dataDetailDaily?.loopRouteTrain?.end}</td>
                        </tr>
                    </table>
                </Grid>
                <Grid item md="6">
                    <table>
                        <tr>
                            <td>1. Masinis sebelumnya</td>
                            <td>:</td>
                            <td>{dataDetailDailyLocal?.trainDriver?.name}</td>
                        </tr>
                        <tr>
                            <td>2. Dinasan sebelumnya</td>
                            <td>:</td>
                            <td>{dataDetailDailyLocal?.loopRouteTrain?.code + " - " + dataDetailDailyLocal?.loopRouteTrain?.loop} pada {moment(dataDetailDailyLocal?.dailyWorkDate).format("DD-MM-YYYY")}</td>
                        </tr>
                        <tr>
                            <td>3. Jam Dinasan</td>
                            <td>:</td>
                            <td>{dataDetailDailyLocal?.loopRouteTrain?.start + " - " + dataDetailDailyLocal?.loopRouteTrain?.end}</td>
                        </tr>
                    </table>
                </Grid>
                <Grid item md={12}>
                    <TableContainer>
                        <Table
                            style={{
                            borderCollapse: 'separate',
                            borderSpacing: '0px 10px',
                            align: 'center',
                            }}
                            className={classes.tableTxt}
                            sx={{ alignItems: 'center' }}
                            aria-label="simple table"
                        >
                            <TableHead>
                            <TableRow>
                                <TableCell className={classes.tableCellTxt} style={tableCellStyle} align="center">
                                <p>Nomor KA</p>
                                </TableCell>
                                <TableCell className={classes.tableCellTxt} style={tableCellStyle} align="center">
                                <p>Mulai</p>
                                </TableCell>
                                <TableCell className={classes.tableCellTxt} style={tableCellStyle} align="center">
                                <p>Sampai</p>
                                </TableCell>
                                <TableCell className={classes.tableCellTxt} style={tableCellStyle} align="center">
                                <p>Durasi</p>
                                </TableCell>
                                <TableCell className={classes.tableCellTxt} style={tableCellStyle} align="center">
                                <p>Dweling Time</p>
                                </TableCell>
                                
                            </TableRow>
                            </TableHead>
                            <TableBody>
                            {
                                dataDetailDailyLocal?.loopRouteTrain?.route.map((x, index) => {
                                //var timediff = dataDetailDaily?.loopRouteTrain?.start
                                return(
                                    <TableRow
                                    className={classes.tableRowTxt}
                                    key={x.station}
                                    sx={{
                                        '&:last-child td, &:last-child th': { border: 0 },
                                        bgcolor: x.status === "Start" ? "green": x.status === "Finish" ? '#EF7C8E' : '#F8F8F8'
                                    }}
                                    >
                                    <TableCell align="center" className={classes.tableLeftTxt} style={{ border: 'none', color : x.status === "Start" ? "white": "black" }} component="th" scope="row">
                                        {x.trainNumber}
                                    </TableCell>
                                    <TableCell align="center" style={{ border: 'none',color : x.status === "Start" ? "white": "black" }}>
                                        {x.startTime ? x.startTime : x.station[0]?.startPlan }
                                    </TableCell>
                                    <TableCell align="center" style={{ border: 'none', color : x.status === "Start" ? "white": "black" }}>
                                        {x.endTime ? x.endTime : x.station[x.station.length-2]?.endPlan }
                                    </TableCell>
                                    <TableCell align="center" style={{ border: 'none', color : x.status === "Start" ? "white": "black" }}>
                                        {x.duration ? `${Math.floor(x.duration/60)} menit ${(x.duration%60)} detik` : "-"}  
                                    </TableCell>
                                    <TableCell align="center" style={{ border: 'none', color : x.status === "Start" ? "white": "black" }}>
                                        {
                                        x.dweelingTime ?
                                        `${Math.floor(x.dweelingTime/60)} menit ${(x.dweelingTime%60)} detik` : "-"
                                        }
                                    </TableCell>
                                    </TableRow>
                                )
                                })}
                            
                            </TableBody>
                        </Table>
                        </TableContainer>
                    <Typography variant="h6">Catatan LRV sebelumnya </Typography>
                    <Alert severity="info">
                    {dataDetailDailyLocal && dataDetailDailyLocal?.kaIncident?.length > 0
                        ? dataDetailDailyLocal?.kaIncident.map((itemka, indexka) => (
                            <>
                              <div style={{ display: 'flex' }}>
                                <Typography>
                                  <small>
                                    {indexka + 1}. {itemka?.title} :
                                  </small>{' '}
                                </Typography>
                                <Typography>
                                  <small>
                                    <i>{itemka?.value}</i>
                                  </small>{' '}
                                </Typography>
                              </div>
                              <Grid container>
                                {itemka.file?.length > 0
                                  ? itemka.file.map((img) => (
                                      <img
                                        src={StaticVar.URL_PHOTO + '/' + img}
                                        style={{ height: 100 }}
                                      />
                                    ))
                                  : ''}
                              </Grid>
                            </>
                          ))
                        : '-'}
                    </Alert>
                    <Button variant="contained" color="primary" sx={{mt:1, fontSize:15}} onClick={async ()=>{
                        console.log('_id', dataDetailDaily?._id)
                        const datapost = {
                            readTakeGive : true,    
                            status : 'On Duty',                        
                            handOverWork: {
                                handOverWorkId : dataDetailDailyLocal?._id,
                                dailyWorkDate:dataDetailDailyLocal?.dailyWorkDate,
                                trainDriver:dataDetailDailyLocal?.trainDriver,
                                loopRouteTrain:dataDetailDailyLocal?.loopRouteTrain,
                                handOverTime : new Date(),
                                handOverNote: dataDetailDailyLocal?.noteLRV ,
                                hamdOverReport: {}
                            }
                        }
                        console.log('datapost', datapost, dataDetailDaily, dataDetailDailyLocal)
                        let statuslocal = "Finish"
                        if(dataDetailDailyLocal?.trainJourneyLog?.stateJourney === "REST"){
                            statuslocal = "REST"
                        }
                        const dataHandover = await logoutHandOver(dataDetailDailyLocal._id, statuslocal)
                        console.log('HandOver', dataHandover)
                        let datarespon = await putDailyWork(dataDetailDaily?._id, datapost);
                        console.log('dataRequest', dataDetailDaily?._id, datapost)
                        console.log('dataresponse', datarespon)
                        if(datarespon.status){
                            //window.location.reload();
                            customNavigate( '/operational/trainjourney');
                        }
                        }}>Terima Kedinasan</Button>
                </Grid>

                
            </Grid>
        </Paper>
      </Container>
    </div>
  )
}
