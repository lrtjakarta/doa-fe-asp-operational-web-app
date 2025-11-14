import React, { useState, useEffect, useContext } from 'react'
import {
  Typography,
  Container,
  Grid,
  Box,
  Paper,
  ButtonBase,
  Card,
  Button,
  Stack,
  FormGroup,
  FormControlLabel,
  IconButton,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  CardContent,
  Table,
  Switch,
  Link,
  TextField,
} from '@mui/material'

// styles
import useStyles from './Styles'
import { button, tableCellStyle } from './Styles'
import { styled } from '@mui/material/styles'

// import
import ContactByData from '../../Component/CardByData/index'
import { useStopwatch } from 'react-timer-hook'

// icon
import InfoIcon from '@mui/icons-material/Info'
import ChatIcon from '@mui/icons-material/Chat'
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera'
import PhoneIcon from '@mui/icons-material/Phone'
import { ProfileContext } from '../../Context/index'
import UseDailyWork from 'Hooks/DailyWork/useDailyWork'
import moment from 'moment'
import _ from 'lodash'
import useTrainDriver from 'Hooks/TrainDriver/useTrainDriver'
import useQuery from 'Utils/QueryParams'
// from switch
const IOSSwitch = styled((props) => (
  <Switch focusVisibleClassName='.Mui-focusVisible' disableRipple {...props} />
))(({ theme }) => ({
  borderRadius: 26 / 2,
  width: 200,
  height: 100,
  padding: 0,

  '& .MuiSwitch-switchBase': {
    padding: 0,
    marginLeft: 0,
    transitionDuration: '200ms',
    color: '#28A745',
    '&.Mui-checked': {
      transform: 'translateX(100px)',
      color: '#28A745',
      '& + .MuiSwitch-track': {
        backgroundColor: '#fff',
        opacity: 1,
        border: 0,
      },
      '&.Mui-disabled + .MuiSwitch-track': {
        opacity: 0.5,
      },
    },
    '&.Mui-focusVisible .MuiSwitch-thumb': {
      color: '#28A745',
      border: '6px solid #fff',
    },
    '&.Mui-disabled .MuiSwitch-thumb': {
      color: '#28A745',
    },
    '&.Mui-disabled + .MuiSwitch-track': {
      opacity: theme.palette.mode === 'light' ? 0.7 : 0.3,
    },
  },
  '& .MuiSwitch-thumb': {
    boxSizing: 'border-box',
    width: 100,
    height: 100,
  },
  '& .MuiSwitch-track': {
    borderRadius: 50,
    color: 'green',
    backgroundColor: '#fff',
    content: '"Tiba"',
    opacity: 1,
    transition: theme.transitions.create(['background-color'], {
      duration: 300,
    }),
  },
  '&:after, &:before': {
    color: ' #999999',
    fontSize: '17px',
    position: 'absolute',
    top: '35px',
  },
  '&:after': {
    content: "'Tiba'",
    left: '30px',
  },
  '&:before': {
    content: "'Berangkat'",
    right: '7px',
  },
}))

export default function MenuTablet(props) {
  const classes = useStyles()
  let query = useQuery()
  const workid = query.get('workid')
  const { dataScheduleTrainDriver, getDailyWorkById } = UseDailyWork()

  const [loopRouteTrain, setloopRouteTrain] = useState({})
  const [route, setroute] = useState([])
  const [trainDriver, settrainDriver] = useState({})
  const [timeDurationTrain, setTimeDurationTrain] = useState(0)
  const [dweelingTimeTrain, setDweelingTimeTrain] = useState(0)
  useEffect(() => {
    console.log('workid', workid)
    getDailyWorkById(workid).then((data) => {
      console.log('dataschedule', data)
      setloopRouteTrain(data[0]?.loopRouteTrain)
      setloopRouteTrain(data[0]?.loopRouteTrain)
      settrainDriver(data[0]?.trainDriver)
      let loopTrainData = data[0]?.loopRouteTrain?.route
      console.log('loopTrainData', loopTrainData)
      setroute(loopTrainData)
      setTimeDurationTrain(_.sumBy(loopTrainData, 'duration'))
      setDweelingTimeTrain(_.sumBy(loopTrainData, 'dweelingTime'))
    })
  }, [])

  return (
    <>
      <Container maxWidth='xl' sx={{ mt: 13 }}>
        <Card>
          <Card sx={{ minWidth: 275 }}>
            <CardContent style={{ textAlign: 'center' }}>
              <Typography variant='h4'>SERAH TERIMA KEDINASAN</Typography>
              <Typography variant='h5'>Nomor : {workid}</Typography>
              <center>
                <table style={{ fontSize: 20, marginTop: 10 }}>
                  <tr>
                    <td align='left'>Nama Masinis</td>
                    <td style={{ width: 10 }} align='center'>
                      :
                    </td>
                    <td align='left'>{trainDriver?.name}</td>
                  </tr>
                  <tr>
                    <td align='left'>NIK</td>
                    <td style={{ width: 10 }} align='center'>
                      :
                    </td>
                    <td align='left'>{trainDriver?.nik}</td>
                  </tr>
                  <tr>
                    <td align='left'>Kode Dinasan</td>
                    <td style={{ width: 10 }} align='center'>
                      :
                    </td>
                    <td align='left'>
                      {loopRouteTrain?.code} - {loopRouteTrain?.loop}
                    </td>
                  </tr>
                  <tr>
                    <td align='left'>Waktu Dinas</td>
                    <td style={{ width: 10 }} align='center'>
                      :
                    </td>
                    <td align='left'>
                      {loopRouteTrain?.start} - {loopRouteTrain?.end}
                    </td>
                  </tr>
                </table>
              </center>

              <TableContainer>
                <Table
                  style={{
                    borderCollapse: 'separate',
                    borderSpacing: '0px 10px',
                    align: 'center',
                  }}
                  className={classes.tableTxt}
                  sx={{ alignItems: 'center' }}
                  aria-label='simple table'>
                  <TableHead>
                    <TableRow>
                      <TableCell
                        className={classes.tableCellTxt}
                        style={tableCellStyle}
                        align='center'>
                        <p>Nomor KA</p>
                      </TableCell>
                      <TableCell
                        className={classes.tableCellTxt}
                        style={tableCellStyle}
                        align='center'>
                        <p>Mulai</p>
                      </TableCell>
                      <TableCell
                        className={classes.tableCellTxt}
                        style={tableCellStyle}
                        align='center'>
                        <p>Sampai</p>
                      </TableCell>
                      <TableCell
                        className={classes.tableCellTxt}
                        style={tableCellStyle}
                        align='center'>
                        <p>Durasi</p>
                      </TableCell>
                      <TableCell
                        className={classes.tableCellTxt}
                        style={tableCellStyle}
                        align='center'>
                        <p>Dweling Time</p>
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {route.map((x, index) => {
                      //var timediff = dataScheduleTrainDriver[0]?.loopRouteTrain?.start
                      return (
                        <TableRow
                          className={classes.tableRowTxt}
                          key={x?.station}
                          sx={{
                            '&:last-child td, &:last-child th': { border: 0 },
                            bgcolor:
                              x.status === 'Start'
                                ? 'green'
                                : x.status === 'Finish'
                                ? '#EF7C8E'
                                : '#F8F8F8',
                          }}>
                          <TableCell
                            align='center'
                            className={classes.tableLeftTxt}
                            style={{
                              border: 'none',
                              color: x?.status === 'Start' ? 'white' : 'black',
                            }}
                            component='th'
                            scope='row'>
                            {x?.trainNumber}
                          </TableCell>
                          <TableCell
                            align='center'
                            style={{
                              border: 'none',
                              color: x.status === 'Start' ? 'white' : 'black',
                            }}>
                            {x?.startTime}
                          </TableCell>
                          <TableCell
                            align='center'
                            style={{
                              border: 'none',
                              color: x.status === 'Start' ? 'white' : 'black',
                            }}>
                            {x?.endTime}
                          </TableCell>
                          <TableCell
                            align='center'
                            style={{
                              border: 'none',
                              color: x.status === 'Start' ? 'white' : 'black',
                            }}>
                            {Math.floor(x?.duration / 60)} menit{' '}
                            {x?.duration % 60} detik
                          </TableCell>
                          <TableCell
                            align='center'
                            style={{
                              border: 'none',
                              color: x?.status === 'Start' ? 'white' : 'black',
                            }}>
                            {x?.dweelingTime
                              ? `${Math.floor(x?.dweelingTime / 60)} menit ${
                                  x?.dweelingTime % 60
                                } detik`
                              : '-'}
                          </TableCell>
                        </TableRow>
                      )
                    })}
                  </TableBody>
                </Table>
              </TableContainer>
              <Box
                style={{
                  backgroundColor: 'white',
                  width: '100%',
                  marginBottom: 10,
                  border: '1px solid #CFCFCF',
                  padding: 10,
                }}>
                <Typography>
                  Durasi Waktu Tempuh KA (1) :{' '}
                  {Math.floor(timeDurationTrain / 60)} menit{' '}
                  {timeDurationTrain % 60} detik
                </Typography>
                <Typography>
                  Durasi Waktu Tunggu (2): {Math.floor(dweelingTimeTrain / 60)}{' '}
                  menit {dweelingTimeTrain % 60} detik
                </Typography>
                <Typography>
                  Duras Waktu Tempuh Kedinasan (1+2) :{' '}
                  {Math.floor((timeDurationTrain + dweelingTimeTrain) / 60)}{' '}
                  menit {(timeDurationTrain + dweelingTimeTrain) % 60} detik
                </Typography>
                <Typography>
                  Catatan LRV : {dataScheduleTrainDriver[0]?.note}
                </Typography>

                <Button
                  variant='contained'
                  sx={{
                    fontSize: 18,
                    width: '40%',
                    height: 70,
                    bgcolor: '#BB7E36',
                    marginTop: 1,
                    borderRadius: 2,
                    '&:hover': {
                      backgroundColor: '#BB7E36',
                      border: 'none',
                    },
                  }}
                  onClick={() => {
                    props.history.push('/app/operational')
                  }}>
                  KEMBALI KE HOME
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Card>
      </Container>
    </>
  )
}
