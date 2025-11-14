import { React, useState, Fragment, useEffect, useContext } from 'react';
import { Typography, Container, Grid, Box, Paper, ButtonBase, Card, Button, Stack, FormGroup, FormControlLabel, IconButton, TableBody, TableCell, TableContainer, TableHead, TableRow, CardContent, Table, Switch, Link, TextField, Divider } from '@mui/material';
import { styled } from '@mui/material/styles';
import usePagination from '@mui/material/usePagination';
import useStyles from './Styles';
import moment from 'moment'
import StaticVar from '../../Config/StaticVar'
import _ from 'lodash'
import useQuery from "Utils/QueryParams";
import QRCode from "react-qr-code";

import CardCabinRide from '../../Component/Card/CardCabinRide/index';

// dialog
import DialogFull from '../../Component/Dialog/DialogFull';

// icon
import DownloadIcon from '@mui/icons-material/Download';

// style
import { tableLeftIsiStyle, tableLeftStyle, tableRightIsiStyle, tableRightStyle, tableTextCellStyle, tableTextIsiStyle, alamatStyle, border } from './Styles';
import useDailyWork from '../../Hooks/DailyWork/useDailyWork';
import useTrainDriver from 'Hooks/TrainDriver/useTrainDriver';
import { ProfileContext } from 'Context';


export default function TakeGiveWork(props) {
  let query = useQuery();
  const workid = query.get('workid');
  const { dataDetailDaily, getDailyWorkById } = useDailyWork();
  useEffect(()=>{
    console.log('workid', workid)
    getDailyWorkById(workid)
  },[])

  let dataTrainDriver = dataDetailDaily?.trainDriver
  let loopRouteTrain = dataDetailDaily?.loopRouteTrain
  let durationTime = dataDetailDaily?.durationTime
  let dweelingTime = dataDetailDaily?.dweelingTime
  let status = dataDetailDaily?.status
  let note = dataDetailDaily?.kaIncident ? dataDetailDaily?.kaIncident.filter(x=>x.title === "Catatan LRV").length>0 ? dataDetailDaily?.kaIncident.filter(x=>x.title === "Catatan LRV")[0].value : "-" : "-"
  return (
    <>
      <Container maxWidth="xl" sx={{ mt: 13 }}>
        <Card>
          <Card sx={{ minWidth: 275 }}>
            <CardContent style={{textAlign:'center'}}>
                <Typography variant="h4">SERAH TERIMA KEDINASAN</Typography>
                <QRCode value={workid} size={200} style={{marginTop:10,marginBottom:10}} />
                <Typography variant="h5">{workid}</Typography>
                <center>
                    <table style={{fontSize:20, marginTop:10}}>
                        <tr>
                            <td align='left'>Nama Masinis</td>
                            <td style={{width:10}} align='center'>:</td>
                            <td align='left'>{dataTrainDriver?.name}</td>
                        </tr>
                        <tr>
                            <td align='left'>NIK</td>
                            <td style={{width:10}} align='center'>:</td>
                            <td align='left'>{dataTrainDriver?.nik}</td>
                        </tr>
                        <tr>
                            <td align='left'>Kode Dinasan</td>
                            <td style={{width:10}} align='center'>:</td>
                            <td align='left'>{loopRouteTrain?.code}</td>
                        </tr>
                        <tr>
                            <td align='left'>Loop</td>
                            <td style={{width:10}} align='center'>:</td>
                            <td align='left'>{loopRouteTrain?.loop}</td>
                        </tr>
                        <tr>
                            <td align='left'>Mulai Dinas</td>
                            <td style={{width:10}} align='center'>:</td>
                            <td align='left'>{loopRouteTrain?.start}</td>
                        </tr>
                        <tr>
                            <td align='left'>Habis Dinas</td>
                            <td style={{width:10}} align='center'>:</td>
                            <td align='left'>{loopRouteTrain?.end}</td>
                        </tr>
                        <tr>
                            <td align='left'>Catatan LRV</td>
                            <td style={{width:10}} align='center'>:</td>
                            <td align='left'>{note}</td>
                        </tr>
                    </table>
                </center>
                <Button variant="contained" color="primary" size="large" sx={{m:2}} onClick={()=>props.history.push('/app/operational')}>Kembali ke Halaman Utama</Button>
                
            </CardContent>
         </Card>
        </Card>
        
      </Container>
    </>
  );
}
