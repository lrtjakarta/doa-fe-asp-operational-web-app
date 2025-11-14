import { React, useState, Fragment, useEffect, useContext } from 'react'
import {
  Typography,
  Box,
  Table,
  TableHead,
  TableRow,
  Grid,
  TableBody,
  Dialog,
  DialogContent,
  DialogActions,
  Tab,
  Tabs,
  DialogTitle,
  TextField,
  Button,
  ButtonGroup,
  MenuItem,
  Paper,
} from '@mui/material'
import TableCell, { tableCellClasses } from '@mui/material/TableCell'
import { styled } from '@mui/material/styles'
import PropTypes from 'prop-types'
import { useTheme } from '@mui/material/styles'
import Select from 'react-select'
import useStyles, { selectBoxStyles, noteStyles, TabStyle } from './Styles'
import moment from 'moment'
import StaticVar from '../../Config/StaticVar'
import _ from 'lodash'
import { Link } from 'react-router-dom'
import useDailyWork from '../../Hooks/DailyWork/useDailyWork'
import useTrainDriver from 'Hooks/TrainDriver/useTrainDriver'
import UseAbsence from 'Hooks/Absence/useAbsence'
import { Container } from '@material-ui/core'
import DialogComponent from '../../Component/Dialog/Dialog'
import QRCode from 'react-qr-code'

export default function MonthlyWork() {
  const {
    getDailyWorkById,
    dataDetailDaily,
    dataDailySchedule,
    fetchDataHandOverMasinis
  } = useDailyWork()

  const [showWorkLetter, setShowWorkLetter] = useState({  open: false, data: {}})
  // const loaddata = async () => {
  //   const respWO = await getDailyWorkById(localStorage.operational_id)
  //   if (respWO.status) {
  //     let codeWork = respWO?.data?.loopRouteTrain?.code
  //     let dateWO = moment(respWO?.data?.dailyWorkDate).format('YYYY-MM-DD')
  //     console.log('codeWork', codeWork)
  //     if (
  //       codeWork === 'A' ||
  //       codeWork === 'B' ||
  //       codeWork === 'C' ||
  //       codeWork === 'D' ||
  //       codeWork === 'E' ||
  //       codeWork === 'F' ||
  //       codeWork === 'G' ||
  //       codeWork === 'H'
  //     ) {
  //       getSupervisor('PA', dateWO)
  //     } else {
  //       getSupervisor('PB', dateWO)
  //     }
  //   }
  //   console.log('respWO', respWO)
  // }
  useEffect(() => {
    // getDailyWorkById(localStorage.operational_id)
    fetchDataHandOverMasinis()
  }, [])

  function LetterLangsiran({data}){
    return(
      <Grid container spacing={2}>
                <Grid item xs={12}>
                  <center>
                    <Typography>
                      Kode Dinas: {data?.loopRouteTrain?.code} 
                    </Typography>
                  </center>
                </Grid>
                <Grid item xs='6'>
                  <table sx={{ mt: 2 }}>
                    <tr>
                      <td>Hari, Tanggal</td>
                      <td>:</td>
                      <td>
                        {moment(data?.dailyWorkDate).format(
                          'DD-MM-YYYY',
                        )}
                      </td>
                    </tr>
                    <tr>
                      <td>Masinis</td>
                      <td>:</td>
                      <td>{data?.trainDriver?.name}</td>
                    </tr>
                    <tr>
                      <td>Jam Dinasan</td>
                      <td>:</td>
                      <td></td>
                    </tr>
                    <tr>
                      <td>- Mulai</td>
                      <td>:</td>
                      <td>{data?.loopRouteTrain?.start}</td>
                    </tr>
                    <tr>
                      <td>- Selesai</td>
                      <td>:</td>
                      <td>{data?.loopRouteTrain?.end}</td>
                    </tr>
                  </table>
                </Grid>
                <Grid item xs='12'>
                  <Table sx={{ mt: 2, mb: 2 }}>
                    <TableHead>
                      <TableRow>
                        <TableCell>Rangkaian LRV</TableCell>
                        <TableCell>Jam Langsir</TableCell>
                        <TableCell>Posisi Awal</TableCell>
                        <TableCell>Posisi Akhir</TableCell>
                        <TableCell>Keterangan</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {data?.langsir.map((itemRoute, indexRoute) => {
                          return (
                            <TableRow>
                              <>
                                <TableCell>{itemRoute?.lrvlist.map(x=>x.numberLrv+".")}</TableCell>
                                <TableCell>{itemRoute?.langsirTime}</TableCell>
                                <TableCell>{itemRoute?.startPosition.stationName}</TableCell>
                                <TableCell>{itemRoute?.endPosition.stationName}</TableCell>
                                <TableCell>{itemRoute?.description}</TableCell>
                              </>
                            </TableRow>
                          )
                        })}
                    </TableBody>
                  </Table>
                </Grid>
                <Grid item xs={12}>
                  <center>
                    <Typography> MASINIS </Typography>
                    <QRCode
                      value={
                        data?.trainDriver?.idNumber
                          ? data?.trainDriver?.idNumber
                          : '0'
                      }
                      size={100}
                    />
                    <Typography>{data?.trainDriver?.name}</Typography>
                    <Typography>{data?.trainDriver?.idNumber}</Typography>
                  </center>
                </Grid>
                <Grid item xs={12}>
                  <Button
                    variant='contained'
                    sx={{ mt: 2, mb: 2 }} onClick={() => setShowWorkLetter({ open: false, data: null })}>Tutup</Button>
                </Grid>
              </Grid>
    )}

  function LetterMasinis({data}){
    return(
      <Grid container spacing={2}>
                <Grid item xs={12}>
                  <center>
                    <Typography>
                      Nomor : {data?.assessment?.assessmentNumber || '< -- Belum assessment -- >'}
                    </Typography>
                    <Typography>
                      Kode Dinas: {data?.loopRouteTrain?.code} 
                    </Typography>
                  </center>
                </Grid>
                <Grid item xs='6'>
                  <table sx={{ mt: 2 }}>
                    <tr>
                      <td>Hari, Tanggal</td>
                      <td>:</td>
                      <td>
                        {moment(data?.dailyWorkDate).format(
                          'DD-MM-YYYY',
                        )}
                      </td>
                    </tr>
                    <tr>
                      <td>Masinis</td>
                      <td>:</td>
                      <td>{data?.trainDriver?.name}</td>
                    </tr>
                    {
                      data?.assistanTrainDriver &&
                      <tr>
                        <td>Asisten Masinis</td>
                        <td>:</td>
                        <td>{data?.assistanTrainDriver?.name}</td>
                      </tr>
                    }
                    <tr>
                      <td>Jam Dinasan</td>
                      <td>:</td>
                      <td></td>
                    </tr>
                    <tr>
                      <td>- Mulai</td>
                      <td>:</td>
                      <td>{data?.loopRouteTrain?.start}</td>
                    </tr>
                    <tr>
                      <td>- Selesai</td>
                      <td>:</td>
                      <td>{data?.loopRouteTrain?.end}</td>
                    </tr>
                  </table>
                </Grid>
                <Grid item xs='6'>
                  <table sx={{ mt: 2 }}>
                    <tr>
                      <td>Dari</td>
                      <td>:</td>
                      <td>
                        {
                          data?.loopRouteTrain?.route[0]?.station[0]
                            ?.stationName
                        }
                      </td>
                    </tr>
                    <tr>
                      <td>Ke</td>
                      <td>:</td>
                      <td>
                        {
                          data?.loopRouteTrain?.route[0]?.station[
                            data?.loopRouteTrain?.route[0]?.station
                              .length - 1
                          ]?.stationName
                        }
                      </td>
                    </tr>
                    {/* <tr>
                    <td>Jam Kabin</td>
                    <td>:</td>
                    <td>
                      Cocok
                    </td>
                  </tr> */}
                  </table>
                </Grid>
                <Grid item xs='12'>
                  <Table sx={{ mt: 2, mb: 2 }}>
                    <TableHead>
                      <TableRow>
                        <TableCell>No. Kereta</TableCell>
                        <TableCell>Loop</TableCell>
                        <TableCell>LRV</TableCell>
                        <TableCell>Pengangsaan Dua</TableCell>
                        <TableCell>Velodrome</TableCell>

                        <TableCell>No. Kereta</TableCell>
                        <TableCell>Loop</TableCell>
                        <TableCell>LRV</TableCell>
                        <TableCell>Velodrome</TableCell>
                        <TableCell>Pengangsaan Dua</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {data?.loopRouteTrain?.route
                        .filter((x) => Number(x.trainNumber) % 2 == 0)
                        .map((itemRoute, indexRoute) => {
                          let itemRouteOdd =
                            data?.loopRouteTrain?.route.filter(
                              (y) => Number(y.trainNumber) % 2 > 0,
                            )[indexRoute]
                          return (
                            <TableRow>
                              <>
                                <TableCell>{itemRoute?.trainNumber}</TableCell>
                                <TableCell>{itemRoute?.loop}</TableCell>
                                <TableCell>{itemRoute?.lrv}</TableCell>
                                <TableCell>{itemRoute?.startTime}</TableCell>
                                <TableCell>{itemRoute?.endTime}</TableCell>
                              </>
                              <>
                                <TableCell>{itemRouteOdd?.trainNumber}</TableCell>
                                <TableCell>{itemRouteOdd?.loop}</TableCell>
                                <TableCell>{itemRouteOdd?.lrv}</TableCell>
                                <TableCell>{itemRouteOdd?.startTime}</TableCell>
                                <TableCell>{itemRouteOdd?.endTime}</TableCell>
                              </>
                            </TableRow>
                          )
                        })}
                      <TableRow>
                        
                        <TableCell colSpan={6}>
                          <Typography>
                            Catatan kejadian-kejadian penting
                          </Typography>
                          {
                            data?.kaIncident && data?.kaIncident.length > 0 ?
                              data?.kaIncident.map((itemIncident,index)=>{
                                if(itemIncident.title !== "image"){
                                  return(
                                    <Typography>
                                      {index+1}. {itemIncident.title} : {itemIncident.value}
                                    </Typography>
                                  )
                                }
                              })
                            : null
                          }
                          
                          {/* // <Typography>
                          //   2. Jalan dan Bangunan :{' '}
                          //   {data?.roadBuilding}
                          // </Typography>
                          // <Typography>3. STT : {data?.STT}</Typography>
                          // <Typography>
                          //   4. Kejadian Lainnya : {data?.otherNote}
                          // </Typography> */}
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </Grid>
                <Grid item xs={12}>
                  <center style={{ marginTop: 20, marginBottom: 20 }}>
                    Rangkaian kereta api beserta go no item telah diperiksa dengan
                    baik dan laik jalan
                  </center>
                </Grid>
                <Grid item xs={6}>
                  <center>
                    <Typography> MASINIS </Typography>
                    <QRCode
                      value={
                        data?.trainDriver?.idNumber
                          ? data?.trainDriver?.idNumber
                          : '0'
                      }
                      size={100}
                    />
                    <Typography>{data?.trainDriver?.name}</Typography>
                    <Typography>{data?.trainDriver?.idNumber}</Typography>
                  </center>
                </Grid>
                
                <Grid item xs={6}>
                  <center>
                    <Typography> PENYELIA </Typography>
                    {data?.assessment ?
                    <><QRCode
                      value={
                        data?.assessment?.createBy?.idNumber
                          ? data?.assessment?.createBy?.idNumber
                          : '-'
                      }
                      size={100}
                    />
                    <Typography>
                      {data?.assessment?.createBy?.name
                        ? data?.assessment?.createBy?.name
                        : '-'}
                    </Typography>
                    <Typography>
                      {data?.assessment?.createBy?.nik
                        ? data?.assessment?.createBy?.nik
                        : '-'}
                    </Typography>
                    </>: 
                    <Typography>{`< -- Belum assessment -- >`}</Typography>}
                  </center>
                </Grid>
                <Grid item xs={12}>
                  <Button
                    variant='contained'
                    sx={{ mt: 2, mb: 2 }} onClick={() => setShowWorkLetter({ open: false, data: null })}>Tutup</Button>
                </Grid>
              </Grid>
    )}

  return (
    <>
      <Box sx={{ display: 'flex', pl: 8, pt: 13 }}>
        <Container maxWidth='xl'>
          
          <Paper sx={{ p: 2, m: 2 }}>
            <center>
              <Typography variant='h5'>Surat Tugas Masinis </Typography>
            </center>
            
            {
              showWorkLetter.open ?
              showWorkLetter?.data?.loopRouteTrain?.loop === "Langsiran" ?
                <LetterLangsiran data={ showWorkLetter?.data} />
              :
                <LetterMasinis data={ showWorkLetter?.data} />
              :

              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell> No</TableCell>
                    <TableCell> Tanggal Dinas</TableCell>
                    <TableCell align='center'>Mulai Dinas </TableCell>
                    <TableCell align='center'>Selesai Dinas</TableCell>
                    <TableCell align='center'> Kode Dinas</TableCell>
                    <TableCell> Masinis</TableCell>
                    <TableCell> Detail</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>   
                  {dataDailySchedule?.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>
                        {moment(item.dailyWorkDate).format('DD-MM-YYYY')}
                      </TableCell>
                      <TableCell align='center'>{item?.loopRouteTrain?.start}</TableCell>
                      <TableCell align='center'>{item?.loopRouteTrain?.end}</TableCell>
                      <TableCell align='center'>{item.loopRouteTrain?.code}</TableCell>
                      <TableCell align='left'>{item.trainDriver?.name}</TableCell>
                      <TableCell>
                        <Button variant='contained' onClick={() => setShowWorkLetter({ open: true, data: item })}>Detail</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            }
            
          </Paper>
        </Container>
      </Box>
    </>
  )
}
