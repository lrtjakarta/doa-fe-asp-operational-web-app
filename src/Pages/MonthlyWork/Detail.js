import {
  Paper,
  Box,
  Grid,
  Typography,
  FormControl,
  Select,
  InputLabel,
  MenuItem,
  TextField,
  InputAdornment,
  IconButton,
  Button,
  Stack,
  TableCell,
  TableRow,
  TableBody,
  Table,
} from '@mui/material'
import React, { useState, useEffect, useContext } from 'react'
import _ from 'lodash'
import RedoImage from '../../Assets/Images/redo.png'
import UseStyles, { textPaperStyle, Img } from './Styles'
import { useHistory } from 'react-router-dom'
import Images from '../../Themes/Images'
import ProgressBar from '../../Component/Chart/ProgressBar'
import QRCode from 'react-qr-code'
import useAchievement from 'Hooks/Achievement/useAchievement'
import moment from 'moment'
import useQuery from 'Utils/QueryParams'

const Achievement = () => {
  let query = useQuery()
  const id = query.get('id')
  const nik = query.get('nik')
  const classes = UseStyles()
  const history = useHistory()

  const {
    handleFilterDate,
    date,
    getDataCountCheckup,
    totalAssessment,
    countCheckup,
    getAbsenceSummary,
    absenceSummary,
    getTotalAssessment,
  } = useAchievement()

  useEffect(() => {
    const fetchData = async () => {
      let createAt = moment().format('YYYY-MM')
      let createBy = nik
      let trainDriverID = id
      await getDataCountCheckup(createBy, createAt)
      await getAbsenceSummary(trainDriverID, createAt)
      getTotalAssessment(createBy, createAt)
    }
    fetchData()
  }, [])

  return (
    <>
      <div style={{ marginTop: 60 }}></div>
      <div
        style={{
          backgroundColor: '#d4d4d5',
          width: '100%',
          height: 70,
          padding: 50,
          display: 'flex',
          justifyContent: 'flex-start',
          alignItems: 'center',
          position: 'relative',
        }}>
        <Typography sx={{ fontSize: 20, fontWeight: 'bold', color: '#464748' }}>
          Raport Bulanan
        </Typography>
      </div>
      <Box sx={{ padding: '10px 50px' }}>
        <Grid container spacing={1} sx={{ mb: 1 }}>
          <Grid item xs={12}>
            <TextField
              type='month'
              InputProps={{
                style: {
                  width: 300,
                  fontSize: 12,
                  height: 33,
                  backgroundColor: '#fff',
                  border: 'none',
                  borderRadius: 7,
                  boxShadow: 'inset 0px 2px 4px rgba(0, 0, 0, 0.25)',
                },
              }}
              sx={{
                width: '100%',
              }}
            />
          </Grid>
        </Grid>
        <Grid container spacing={1}>
          <Grid item xs={5}>
            <Grid container spacing={1} sx={{ mb: 1 }}>
              <Grid item xs={5}>
                <Typography
                  sx={{ fontSize: 18, fontWeight: 500, color: '#333333' }}>
                  Jumlah Hari
                </Typography>
                <Box sx={{ bgcolor: '#fff', borderRadius: 2, height: 110 }}>
                  <Grid
                    container
                    sx={{
                      py: 1,
                      justifyContent: 'center',
                      alignItems: 'center',
                      height: '100%',
                    }}>
                    <Box sx={{ m: 'auto' }}>
                      <Typography sx={{ fontSize: 12 }}>Kerja</Typography>
                      <Typography
                        sx={{
                          fontSize: 20,
                          fontWeight: 'bold',
                          color: '#000',
                        }}>
                        {absenceSummary?.work ? absenceSummary?.work : 0}
                      </Typography>
                    </Box>
                    <Box sx={{ m: 'auto' }}>
                      <Typography sx={{ fontSize: 12 }}>Cuti</Typography>
                      <Typography
                        sx={{
                          fontSize: 20,
                          fontWeight: 'bold',
                          color: '#000',
                        }}>
                        {absenceSummary?.cuti ? absenceSummary?.cuti : 0}
                      </Typography>
                    </Box>
                    <Box sx={{ m: 'auto' }}>
                      <Typography sx={{ fontSize: 12 }}>Sakit</Typography>
                      <Typography
                        sx={{
                          fontSize: 20,
                          fontWeight: 'bold',
                          color: '#000',
                        }}>
                        {absenceSummary?.sakit ? absenceSummary?.sakit : 0}
                      </Typography>
                    </Box>
                  </Grid>
                </Box>
              </Grid>
              <Grid item xs={7}>
                <Typography
                  sx={{ fontSize: 18, fontWeight: 500, color: '#333333' }}>
                  Logbook Dinasan
                </Typography>
                <Box sx={{ bgcolor: '#fff', borderRadius: 2, height: 110 }}>
                  <Grid
                    container
                    sx={{
                      py: 1,
                      justifyContent: 'center',
                      alignItems: 'center',
                      height: '100%',
                    }}>
                    <Box sx={{ m: 'auto' }}>
                      <Typography sx={{ fontSize: 12 }}>
                        Total Jam Dinas
                      </Typography>
                      <div>
                        <Grid container>
                          <Typography
                            sx={{
                              fontSize: 20,
                              fontWeight: 'bold',
                              color: '#000',
                            }}>
                            {Math.round(absenceSummary?.workTime)}
                          </Typography>
                          <Typography
                            sx={{ fontSize: 12, marginTop: 1, color: '#000' }}>
                            Jam
                          </Typography>
                        </Grid>
                      </div>
                    </Box>
                  </Grid>
                </Box>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={7}>
            <Typography
              sx={{ fontSize: 18, fontWeight: 500, color: '#333333' }}>
              Kondisi Kesehatan
            </Typography>
            <Grid container spacing={1} sx={{ mb: 1 }}>
              <Grid item xs={4}>
                <Paper
                  className={classes.paperTxt}
                  sx={{
                    height: 'auto',
                    borderRadius: 2,
                    backgroundColor: 'primary.white',
                  }}>
                  <Stack
                    direction='row'
                    spacing={1}
                    alignItems='center'
                    justifyContent='space-between'
                    sx={{ py: 1, mx: 2.5 }}>
                    <Stack direction='row' alignItems='center'>
                      <Box sx={{ ml: -1, mr: 0.5 }}>
                        <Img src={Images.heart} width='35px' />
                      </Box>
                      <Typography
                        sx={{
                          fontSize: 18,
                          color: '#A2A2A2',
                        }}>
                        Fit to Work
                      </Typography>
                    </Stack>
                    <Typography sx={textPaperStyle} variant='body2'>
                      {countCheckup?.fittowork}
                    </Typography>
                  </Stack>
                </Paper>
              </Grid>
              <Grid item xs={4}>
                <Paper
                  className={classes.paperTxt}
                  sx={{
                    height: 'auto',
                    borderRadius: 2,
                    backgroundColor: 'primary.white',
                  }}>
                  <Stack
                    direction='row'
                    spacing={1}
                    alignItems='center'
                    justifyContent='space-between'
                    sx={{ py: 1.3, mx: 2.5 }}>
                    <Stack direction='row' spacing={1} alignItems='center'>
                      <Box>
                        <Img src={Images.danger} width='30px' />
                      </Box>
                      <Typography
                        sx={{
                          fontSize: 18,
                          color: '#A2A2A2',
                        }}>
                        Unfit to Work
                      </Typography>
                    </Stack>
                    <Typography sx={textPaperStyle} variant='body2'>
                      {countCheckup?.unfittowork}
                    </Typography>
                  </Stack>
                </Paper>
              </Grid>
              <Grid item xs={4}>
                <Paper
                  className={classes.paperTxt}
                  sx={{
                    height: 'auto',
                    borderRadius: 2,
                    backgroundColor: 'primary.white',
                  }}>
                  <Stack
                    direction='row'
                    spacing={1}
                    justifyContent='space-between'
                    alignItems='center'
                    sx={{ py: 1, mx: 2.5 }}>
                    <Stack direction='row' spacing={1} alignItems='center'>
                      <Box>
                        <Img src={Images.report} width='35px' />
                      </Box>
                      <Typography
                        sx={{
                          fontSize: 18,
                          color: '#A2A2A2',
                        }}>
                        Fit to Work with Note
                      </Typography>
                    </Stack>
                    <Typography sx={textPaperStyle} variant='body2'>
                      {countCheckup?.fittoworkwithnote}
                    </Typography>
                  </Stack>
                </Paper>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Typography sx={{ fontSize: 18, fontWeight: 500, color: '#333333' }}>
          Penilaian Harian
        </Typography>
        <Grid container>
          <Table size='small' sx={{ bgcolor: '#fff' }}>
            <TableBody>
              <TableRow sx={{ borderRadius: 2 }}>
                <TableCell width='50%' sx={{ py: 1.5 }}>
                  <Typography sx={{ fontSize: 16 }}>Kehadiran</Typography>
                </TableCell>
                <TableCell width='50%' sx={{ py: 1.5 }}>
                  <ProgressBar
                    color={'primary'}
                    value={
                      totalAssessment.kehadiran ? totalAssessment.kehadiran : 0
                    }
                    title={
                      totalAssessment.kehadiran
                        ? totalAssessment.kehadiran.toFixed(2) + '%'
                        : 0 + '%'
                    }
                  />
                </TableCell>
              </TableRow>
              <TableRow sx={{ borderRadius: 2 }}>
                <TableCell width='50%' sx={{ py: 1.5 }}>
                  <Typography sx={{ fontSize: 16 }}>Kelengkapan</Typography>
                </TableCell>
                <TableCell width='50%' sx={{ py: 1.5 }}>
                  <ProgressBar
                    color={'primary'}
                    value={
                      totalAssessment.kelengkapan
                        ? totalAssessment.kelengkapan
                        : 0
                    }
                    title={
                      totalAssessment.kelengkapan
                        ? totalAssessment.kelengkapan.toFixed(2) + '%'
                        : 0 + '%'
                    }
                  />
                </TableCell>
              </TableRow>
              <TableRow sx={{ borderRadius: 2 }}>
                <TableCell width='50%' sx={{ py: 1.5 }}>
                  <Typography sx={{ fontSize: 16 }}>Pengetahuan</Typography>
                </TableCell>
                <TableCell width='50%' sx={{ py: 1.5 }}>
                  <ProgressBar
                    color={'primary'}
                    value={
                      totalAssessment.pengatahuan
                        ? totalAssessment.pengatahuan
                        : 0
                    }
                    title={
                      totalAssessment.pengatahuan
                        ? totalAssessment.pengatahuan.toFixed(2) + '%'
                        : 0 + '%'
                    }
                  />
                </TableCell>
              </TableRow>
              <TableRow sx={{ borderRadius: 2 }}>
                <TableCell width='50%' sx={{ py: 1.5 }}>
                  <Typography sx={{ fontSize: 16 }}>Tunjuk Sebut</Typography>
                </TableCell>
                <TableCell width='50%' sx={{ py: 1.5 }}>
                  <ProgressBar
                    color={'primary'}
                    value={
                      totalAssessment.tunjuksebut
                        ? totalAssessment.tunjuksebut
                        : 0
                    }
                    title={
                      totalAssessment.tunjuksebut
                        ? totalAssessment.tunjuksebut.toFixed(2) + '%'
                        : 0 + '%'
                    }
                  />
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Grid>
        {/* <Paper sx={{padding: '20px 50px', mt: 5}}>
            <Typography align="center" sx={{my: 3, fontSize: 18}}>Surat Tugas</Typography>
            <p align="center" style={{margin: '20px 0'}}>
              <QRCode value="0092018029" size={120}/>
            </p>
            <Table style={{width:"100%"}}>
              <TableRow>
                  <TableCell style={{width:"35%"}}>
                    <Typography sx={{fontSize: 16, fontWeight: 'bold'}}>
                      Tanggal Dinas	
                    </Typography>
                  </TableCell>
                  <TableCell style={{width:15}}>:</TableCell>
                  <TableCell>
                    <Typography sx={{fontSize: 16, fontWeight: 500}}>
                      15-07-2022
                    </Typography>
                  </TableCell>
              </TableRow>
              <TableRow>
                  <TableCell style={{width:"35%"}}>
                    <Typography sx={{fontSize: 16, fontWeight: 'bold'}}>
                      Dinasan
                    </Typography>
                  </TableCell>
                  <TableCell style={{width:15}}>:</TableCell>
                  <TableCell>
                    <Typography sx={{fontSize: 16, fontWeight: 500}}>
                      No LRV : - Office Hour
                    </Typography>
                  </TableCell>
              </TableRow>
              <TableRow>
                  <TableCell style={{width:"35%"}}>
                    <Typography sx={{fontSize: 16, fontWeight: 'bold'}}>
                      Nama Masinis		
                    </Typography>
                  </TableCell>
                  <TableCell style={{width:15}}>:</TableCell>
                  <TableCell>
                    <Typography sx={{fontSize: 16, fontWeight: 500}}>
                      Nama Masinis: penyelia test<br/>
                      Waktu Dinas: 08:00 - 17:00
                    </Typography>
                  </TableCell>
              </TableRow>
              <TableRow>
                  <TableCell style={{width:"35%"}}>
                    <Typography sx={{fontSize: 16, fontWeight: 'bold'}}>
                      Nama Masinis Sebelumnya	
                    </Typography>
                  </TableCell>
                  <TableCell style={{width:15}}>:</TableCell>
                  <TableCell>
                    <Typography sx={{fontSize: 16, fontWeight: 500}}>
                    Dinasan : -<br/>
                    Nama:<br/>
                    Waktu Dinas: -	
                    </Typography>
                  </TableCell>
              </TableRow>
              <TableRow>
                  <TableCell style={{width:"35%"}}>
                    <Typography sx={{fontSize: 16, fontWeight: 'bold'}}>
                      Catatan Kedinasan	
                    </Typography>
                  </TableCell>
                  <TableCell style={{width:15}}>:</TableCell>
                  <TableCell>
                    <Typography sx={{fontSize: 16, fontWeight: 500}}>
                      Waktu Dinas: -	
                    </Typography>
                  </TableCell>
              </TableRow>
              <TableRow>
                  <TableCell style={{width:"35%"}}>
                    <Typography sx={{fontSize: 16, fontWeight: 'bold'}}>
                      Status Kedinasan	
                    </Typography>
                  </TableCell>
                  <TableCell style={{width:15}}>:</TableCell>
                  <TableCell>
                    <Typography sx={{fontSize: 16, fontWeight: 500}}>
                      Terjadwal	
                    </Typography>
                  </TableCell>
              </TableRow>
            </Table>
          </Paper> */}
      </Box>
    </>
  )
}

export default Achievement
