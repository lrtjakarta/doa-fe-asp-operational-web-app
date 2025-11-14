import {
  React,
  useState,
  Fragment,
  useEffect,
  useContext,
  useRef,
  forwardRef,
} from 'react'
import { useReactToPrint } from 'react-to-print'
import {
  Container,
  Typography,
  Box,
  TableCell,
  Grid,
  Table,
  TableHead,
  InputAdornment,
  TableRow,
  TableBody,
  IconButton,
  TextField,
  Button,
  Paper,
  CircularProgress,
  Backdrop,
} from '@mui/material'
import useStyles from './Styles'
import moment from 'moment'
import StaticVar from '../../Config/StaticVar'
import _ from 'lodash'
import QRCode from 'react-qr-code'
import html2pdf from 'html2pdf.js'
import Dialog from '../../Component/Dialog/Dialog'

// icon
import SearchIcon from '@mui/icons-material/Search'

// style
import { tableLeftStyle, tableTextCellStyle, tableTextIsiStyle } from './Styles'
import useDailyWork from '../../Hooks/DailyWork/useDailyWork'
import useLetter from 'Hooks/Letter/useLetter'
import { Images } from 'Themes'
import romanize from 'Utils/Romanize'

export default function HandOver() {
  const classes = useStyles()
  const {
    fetchDataAssignmentMasinis,
    dataDailySchedule,
    filterStartDate,
    setfilterStartDate,
    filterEndDate,
    setfilterEndDate,
    setLoader,
    loader,
  } = useDailyWork()
  const [dataDetailDaily, setDataDetailDaily] = useState({})
  const [openWorkOrder, setOpenWorkOrder] = useState(false)
  const printRef = useRef()

  const { getDataLetter, filterLetter } = useLetter()

  const detailLetter = filterLetter.filter(
    (item) => item.type === 'Surat Tugas Masinis',
  )[0]

  var opt = {
    margin: [
      // detailLetter?.padding,
      detailLetter?.padding,
      // detailLetter?.padding,
      detailLetter?.padding,
    ],
    filename: `surat-tugas-masinis-${moment().format('YYYYMMDDHHmmss')}.pdf`,
    html2canvas: {
      dpi: 360,
      letterRendering: true,
      useCORS: true,
      scale: 2,
    },
    pagebreak: { mode: ['css'], pagebreak: { avoid: 'tr' } },
    jsPDF: {
      unit: 'mm',
      orientation: 'portrait',
      format: [220, 320],
    },
  }

  useEffect(() => {
    const fetchData = async () => {
      await getDataLetter()
      await fetchDataAssignmentMasinis()
    }
    fetchData()
  }, [])

  const openModalWorkOrder = async (data) => {
    setOpenWorkOrder(true)
    setDataDetailDaily(data)
  }

  const handleClose = () => {
    setOpenWorkOrder(false)
  }

  const handlePrint = async (condition) => {
    setTimeout(() => {
      html2pdf().from(printRef.current).set(opt).save()
      setLoader(false)
    }, 3000)
  }

  const Content = forwardRef((props, ref) => {
    const { data, type } = props
    return (
      <div ref={ref}>
        {type === 'multi' ? (
          data.map((item, index) => (
            <div key={index} style={{ height: 1172 }}>
              <Box>
                <Table>
                  <TableHead>
                    <TableRow sx={{ border: '1.5px solid #000000' }}>
                      <TableCell
                        align='center'
                        sx={{
                          borderRight: '1.6px solid #000000',
                          width: '50%',
                        }}>
                        <Grid
                          container
                          justifyContent='center'
                          alignItems='center'>
                          <img
                            src={Images.logoIcon}
                            alt='img'
                            style={{
                              height: 30,
                              marginRight: 5,
                              objectFit: 'cover',
                              objectPosition: 'center',
                            }}
                          />
                          <Typography
                            sx={{ fontStyle: 'italic', fontSize: 18 }}>
                            LRT
                          </Typography>
                          <Typography
                            sx={{
                              fontSize: 18,
                              fontWeight: 200,
                              fontStyle: 'italic',
                            }}>
                            JAKARTA
                          </Typography>
                        </Grid>
                      </TableCell>
                      <TableCell align='center' sx={{ width: '50%' }}>
                        <Typography>{detailLetter?.titleHead}</Typography>
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow sx={{ p: 0, border: '1.5px solid #000000' }}>
                      <TableCell colSpan={2} sx={{ p: 0 }}>
                        <TableRow>
                          <TableCell
                            align='center'
                            sx={{
                              borderRight: '1.6px solid #000000',
                              width: '20%',
                              py: 0,
                            }}>
                            <Typography>Nomor Dokumen</Typography>
                          </TableCell>
                          <TableCell
                            align='center'
                            sx={{
                              borderRight: '1.6px solid #000000',
                              width: '25%',
                              py: 0,
                            }}>
                            <Typography>{detailLetter?.numberHead}</Typography>
                          </TableCell>
                          <TableCell
                            align='center'
                            sx={{
                              borderRight: '1.6px solid #000000',
                              width: '15%',
                              py: 0,
                            }}>
                            <Typography>Nomor Revisi</Typography>
                          </TableCell>
                          <TableCell
                            align='center'
                            sx={{
                              borderRight: '1.6px solid #000000',
                              width: '15%',
                              py: 0,
                            }}>
                            <Typography>
                              {detailLetter?.revisionNumber}
                            </Typography>
                          </TableCell>
                          <TableCell
                            align='center'
                            sx={{
                              borderRight: '1.6px solid #000000',
                              width: '10%',
                              py: 0,
                            }}>
                            <Typography>Halaman</Typography>
                          </TableCell>
                          <TableCell
                            align='center'
                            sx={{
                              width: '15%',
                              py: 0,
                            }}>
                            <Typography>{detailLetter?.page}</Typography>
                          </TableCell>
                        </TableRow>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </Box>
              <Box
                sx={{
                  justifyContent: 'center',
                  pt: 3,
                  textAlign: 'center',
                }}>
                <Typography sx={{ fontSize: 16, fontWeight: 600 }}>
                  {detailLetter?.titleDoc}
                </Typography>
                <Typography sx={{ fontSize: 16, fontWeight: 200 }}>
                  {'No. ' +
                    moment(item?.dailyWorkDate).format('DD') +
                    ' / ' +
                    item?.loopRouteTrain?.code +
                    ' / ' +
                    detailLetter?.numberDoc +
                    ' / ' +
                    romanize(moment(item?.dailyWorkDate).format('M')) +
                    ' / ' +
                    moment(item?.dailyWorkDate).format('YYYY')}
                </Typography>
              </Box>
              <Grid container>
                <Grid item xs={12}>
                  <Grid container>
                    <Grid item xs='4' sx={{ pt: 2 }}>
                      <table sx={{ mt: 2 }}>
                        <tr>
                          <td>Hari, Tanggal</td>
                          <td>:</td>
                          <td>
                            {moment(item?.dailyWorkDate).format('DD-MMMM-YYYY')}
                          </td>
                        </tr>
                        <tr>
                          <td>Masinis</td>
                          <td>:</td>
                          <td>{item?.trainDriver?.name}</td>
                        </tr>
                      </table>

                      {/* <table sx={{ mt: 2 }}>
                    </table> */}
                    </Grid>
                    <Grid
                      item
                      xs='4'
                      sx={{ pt: 2, justifyContent: 'end', display: 'flex' }}>
                      <table sx={{ mt: 2 }}>
                        <tr>
                          <td>Dari</td>
                          <td>:</td>
                          <td>
                            {
                              item?.loopRouteTrain?.route[0]?.station[0]
                                ?.stationName
                            }
                          </td>
                        </tr>
                        <tr>
                          <td>Ke</td>
                          <td>:</td>
                          <td>
                            {
                              item?.loopRouteTrain?.route[0]?.station[
                                item?.loopRouteTrain?.route[0]?.station.length -
                                  1
                              ]?.stationName
                            }
                          </td>
                        </tr>

                        <tr>
                          <td> </td>
                          <td> </td>
                          <td></td>
                        </tr>
                      </table>
                    </Grid>
                    <Grid
                      item
                      xs='4'
                      sx={{ pt: 2, justifyContent: 'end', display: 'flex' }}>
                      <table sx={{ mt: 2 }}>
                        <tr>
                          <td>Kode Dinas</td>
                          <td>:</td>
                          <td>{item?.loopRouteTrain?.code}</td>
                        </tr>
                        <tr>
                          <td>Loop</td>
                          <td>:</td>
                          <td>{item?.loopRouteTrain?.loop}</td>
                        </tr>
                        <tr>
                          <td>LRV</td>
                          <td>:</td>
                          <td>
                            {item?.LRVList.length > 0
                              ? item?.LRVList.map((item) => item + ',')
                              : ''}
                          </td>
                        </tr>
                      </table>
                    </Grid>
                    <Grid item xs='12'>
                      <table sx={{ mt: 2 }}>
                        <tr>
                          <td>Jam Dinasan</td>
                          <td></td>
                          <td></td>
                        </tr>
                        <tr>
                          <td>Mulai</td>
                          <td>:</td>
                          <td>{item?.loopRouteTrain?.start}</td>
                        </tr>
                        <tr>
                          <td>Selesai</td>
                          <td>:</td>
                          <td>{item?.loopRouteTrain?.end}</td>
                        </tr>
                      </table>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs='12'>
                  <Table sx={{ mt: 2, mb: 2 }}>
                    <TableHead>
                      <TableRow>
                        <TableCell>No. Kereta</TableCell>
                        <TableCell>Pengangsaan Dua</TableCell>
                        <TableCell>Velodrome</TableCell>

                        <TableCell>No. Kereta</TableCell>
                        <TableCell>Velodrome</TableCell>
                        <TableCell>Pengangsaan Dua</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {item?.loopRouteTrain?.route
                        .filter((x) => Number(x.trainNumber) % 2 == 0)
                        .map((itemRoute, indexRoute) => {
                          let itemRouteOdd = item?.loopRouteTrain?.route.filter(
                            (y) => Number(y.trainNumber) % 2 > 0,
                          )[indexRoute]
                          return (
                            <TableRow>
                              <>
                                <TableCell>{itemRoute?.trainNumber}</TableCell>
                                <TableCell>{itemRoute?.startTime}</TableCell>
                                <TableCell>{itemRoute?.endTime}</TableCell>
                              </>
                              <>
                                <TableCell>
                                  {itemRouteOdd?.trainNumber}
                                </TableCell>
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
                          {item.kaIncident.length > 0
                            ? item?.kaIncident
                                .filter((item) => item?.title !== 'image')
                                .map((itemka, indexka) => (
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
                                ))
                            : ''}
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </Grid>
                <Grid item xs={12} sx={{ mb: 1 }}>
                  <center>
                    Rangkaian kereta api beserta go no item telah diperiksa
                    dengan baik dan laik jalan
                  </center>
                </Grid>
                <Grid item xs={6}>
                  <center>
                    <Typography> MASINIS </Typography>
                    <QRCode
                      value={
                        item?.trainDriver?.nik ? item?.trainDriver?.nik : '0'
                      }
                      size={100}
                    />
                    <Typography>{item?.trainDriver?.name}</Typography>
                    <Typography>{item?.trainDriver?.nik}</Typography>
                  </center>
                </Grid>
                <Grid item xs={6}>
                  <center>
                    <Typography> PENYELIA </Typography>
                    <QRCode
                      value={
                        item?.assessment?.createBy?.nik
                          ? item?.assessment?.createBy?.nik
                          : '-'
                      }
                      size={100}
                    />
                    <Typography>
                      {item?.assessment?.createBy?.name
                        ? item?.assessment?.createBy?.name
                        : '-'}
                    </Typography>
                    <Typography>
                      {item?.assessment?.createBy?.nik
                        ? item?.assessment?.createBy?.nik
                        : '-'}
                    </Typography>
                  </center>
                </Grid>
              </Grid>
            </div>
          ))
        ) : (
          <div>
            <Box>
              <Table>
                <TableHead>
                  <TableRow sx={{ border: '1.5px solid #000000' }}>
                    <TableCell
                      align='center'
                      sx={{
                        borderRight: '1.6px solid #000000',
                        width: '50%',
                      }}>
                      <Grid
                        container
                        justifyContent='center'
                        alignItems='center'>
                        <img
                          src={Images.logoIcon}
                          alt='img'
                          style={{
                            height: 30,
                            marginRight: 5,
                            objectFit: 'cover',
                            objectPosition: 'center',
                          }}
                        />
                        <Typography sx={{ fontStyle: 'italic', fontSize: 18 }}>
                          LRT
                        </Typography>
                        <Typography
                          sx={{
                            fontSize: 18,
                            fontWeight: 200,
                            fontStyle: 'italic',
                          }}>
                          JAKARTA
                        </Typography>
                      </Grid>
                    </TableCell>
                    <TableCell align='center' sx={{ width: '50%' }}>
                      <Typography>{detailLetter?.titleHead}</Typography>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow sx={{ p: 0, border: '1.5px solid #000000' }}>
                    <TableCell colSpan={2} sx={{ p: 0 }}>
                      <TableRow>
                        <TableCell
                          align='center'
                          sx={{
                            borderRight: '1.6px solid #000000',
                            width: '20%',
                            py: 0,
                          }}>
                          <Typography>Nomor Dokumen</Typography>
                        </TableCell>
                        <TableCell
                          align='center'
                          sx={{
                            borderRight: '1.6px solid #000000',
                            width: '25%',
                            py: 0,
                          }}>
                          <Typography>{detailLetter?.numberHead}</Typography>
                        </TableCell>
                        <TableCell
                          align='center'
                          sx={{
                            borderRight: '1.6px solid #000000',
                            width: '15%',
                            py: 0,
                          }}>
                          <Typography>Nomor Revisi</Typography>
                        </TableCell>
                        <TableCell
                          align='center'
                          sx={{
                            borderRight: '1.6px solid #000000',
                            width: '15%',
                            py: 0,
                          }}>
                          <Typography>
                            {detailLetter?.revisionNumber}
                          </Typography>
                        </TableCell>
                        <TableCell
                          align='center'
                          sx={{
                            borderRight: '1.6px solid #000000',
                            width: '10%',
                            py: 0,
                          }}>
                          <Typography>Halaman</Typography>
                        </TableCell>
                        <TableCell
                          align='center'
                          sx={{
                            width: '15%',
                            py: 0,
                          }}>
                          <Typography>
                            Page 1 of {detailLetter?.page}
                          </Typography>
                        </TableCell>
                      </TableRow>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Box>
            <Box
              sx={{
                justifyContent: 'center',
                pt: 3,
                textAlign: 'center',
              }}>
              <Typography sx={{ fontSize: 16, fontWeight: 600 }}>
                {detailLetter?.titleDoc}
              </Typography>
              <Typography sx={{ fontSize: 16, fontWeight: 200 }}>
                {'No. ' +
                  moment(data?.dailyWorkDate).format('DD') +
                  ' / ' +
                  data?.loopRouteTrain?.code +
                  ' / ' +
                  detailLetter?.numberDoc +
                  ' / ' +
                  romanize(moment(data?.dailyWorkDate).format('M')) +
                  ' / ' +
                  moment(data?.dailyWorkDate).format('YYYY')}
              </Typography>
            </Box>
            <Grid container>
              <Grid item xs={12}>
                <Grid container>
                  <Grid item xs='4' sx={{ pt: 2 }}>
                    <table sx={{ mt: 2 }}>
                      <tr>
                        <td>Hari, Tanggal</td>
                        <td>:</td>
                        <td>
                          {moment(data?.dailyWorkDate).format('DD-MMMM-YYYY')}
                        </td>
                      </tr>
                      <tr>
                        <td>Masinis</td>
                        <td>:</td>
                        <td>{data?.trainDriver?.name}</td>
                      </tr>
                    </table>

                    {/* <table sx={{ mt: 2 }}>
                  </table> */}
                  </Grid>
                  <Grid
                    item
                    xs='4'
                    sx={{ pt: 2, justifyContent: 'end', display: 'flex' }}>
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
                              data?.loopRouteTrain?.route[0]?.station.length - 1
                            ]?.stationName
                          }
                        </td>
                      </tr>

                      <tr>
                        <td> </td>
                        <td> </td>
                        <td></td>
                      </tr>
                    </table>
                  </Grid>
                  <Grid
                    item
                    xs='4'
                    sx={{ pt: 2, justifyContent: 'end', display: 'flex' }}>
                    <table sx={{ mt: 2 }}>
                      <tr>
                        <td>Kode Dinas</td>
                        <td>:</td>
                        <td>{data?.loopRouteTrain?.code}</td>
                      </tr>
                      <tr>
                        <td>Loop</td>
                        <td>:</td>
                        <td>{data?.loopRouteTrain?.loop}</td>
                      </tr>
                      <tr>
                        <td>LRV</td>
                        <td>:</td>
                        <td>
                          {data?.LRVList.length > 0
                            ? data?.LRVList.map((item) => item + ',')
                            : ''}
                        </td>
                      </tr>
                    </table>
                  </Grid>
                  <Grid item xs='12'>
                    <table sx={{ mt: 2 }}>
                      <tr>
                        <td>Jam Dinasan</td>
                        <td></td>
                        <td></td>
                      </tr>
                      <tr>
                        <td>Mulai</td>
                        <td>:</td>
                        <td>{data?.loopRouteTrain?.start}</td>
                      </tr>
                      <tr>
                        <td>Selesai</td>
                        <td>:</td>
                        <td>{data?.loopRouteTrain?.end}</td>
                      </tr>
                    </table>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs='12'>
                <Table sx={{ mt: 2, mb: 2 }}>
                  <TableHead>
                    <TableRow>
                      <TableCell>No. Kereta</TableCell>
                      <TableCell>Pengangsaan Dua</TableCell>
                      <TableCell>Velodrome</TableCell>

                      <TableCell>No. Kereta</TableCell>
                      <TableCell>Velodrome</TableCell>
                      <TableCell>Pengangsaan Dua</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {data?.loopRouteTrain?.route
                      .filter((x) => Number(x.trainNumber) % 2 == 0)
                      .map((itemRoute, indexRoute) => {
                        let itemRouteOdd = data?.loopRouteTrain?.route.filter(
                          (y) => Number(y.trainNumber) % 2 > 0,
                        )[indexRoute]
                        return (
                          <TableRow>
                            <>
                              <TableCell>{itemRoute?.trainNumber}</TableCell>
                              <TableCell>{itemRoute?.startTime}</TableCell>
                              <TableCell>{itemRoute?.endTime}</TableCell>
                            </>
                            <>
                              <TableCell>{itemRouteOdd?.trainNumber}</TableCell>
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
                        {data.kaIncident.length > 0
                          ? data?.kaIncident
                              .filter((item) => item?.title !== 'image')
                              .map((itemka, indexka) => (
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
                              ))
                          : ''}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </Grid>
              <Grid item xs={12} sx={{ mb: 1 }}>
                <center>
                  Rangkaian kereta api beserta go no item telah diperiksa dengan
                  baik dan laik jalan
                </center>
              </Grid>
              <Grid item xs={6}>
                <center>
                  <Typography> MASINIS </Typography>
                  <QRCode
                    value={
                      data?.trainDriver?.nik ? data?.trainDriver?.nik : '0'
                    }
                    size={100}
                  />
                  <Typography>{data?.trainDriver?.name}</Typography>
                  <Typography>{data?.trainDriver?.nik}</Typography>
                </center>
              </Grid>
              <Grid item xs={6}>
                <center>
                  <Typography> PENYELIA </Typography>
                  <QRCode
                    value={
                      data?.assessment?.createBy?.nik
                        ? data?.assessment?.createBy?.nik
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
                </center>
              </Grid>
            </Grid>
          </div>
        )}
      </div>
    )
  })

  return (
    <>
      <Backdrop
        sx={{ color: '#fff', zIndex: 99999 }}
        open={loader}
        onClick={() => setLoader(false)}>
        <CircularProgress color='inherit' />
      </Backdrop>
      <div className={'print-source'}>
        <Content
          ref={printRef}
          type='multi'
          data={_.orderBy(
            dataDailySchedule,
            ['loopRouteTrain.code', 'loopRouteTrain.loop'],
            ['asc', 'asc'],
          )}
        />
      </div>

      <Box sx={{ display: 'flex', pt: 13 }}>
        <Dialog
          fullWidth={true}
          open={openWorkOrder}
          maxWidth={'md'}
          content={
            <Content ref={printRef} data={dataDetailDaily} type='single' />
          }
          cancel={handleClose}
          valueCancel='Batal'
          valueConfirm='Print'
          confirm={handlePrint}
          submit={true}
        />

        <Container maxWidth='xl'>
          <Grid container>
            <Grid item xs={5}>
              <Typography variant='h4'>Surat Tugas Masinis</Typography>
            </Grid>

            <Grid item xs={7}>
              <Grid
                spacing={2}
                container
                alignItems='end'
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'end',
                  marginBottom: 3,
                }}>
                <Grid item xs={2.5}>
                  <Typography className={classes.dateTxt} sx={{ mt: 1 }}>
                    Tgl Mulai:
                  </Typography>
                  <TextField
                    type={'Date'}
                    value={filterStartDate}
                    placeholder='Pencarian'
                    onChange={(e) => {
                      setfilterStartDate(e.target.value)
                    }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position='start'>
                          <IconButton sx={{ padding: 0 }}>
                            <SearchIcon
                              sx={{
                                fontSize: 15,
                                color: 'gray',
                              }}
                            />
                          </IconButton>
                        </InputAdornment>
                      ),
                      style: {
                        fontSize: 12,
                        height: 35.5,
                        backgroundColor: '#fff',
                        boxShadow: 'inset 0px 2px 4px rgba(0, 0, 0, 0.25)',
                      },
                    }}
                    className={classes.searchTxt}
                  />
                </Grid>
                <Grid item xs={2.5}>
                  <Typography className={classes.dateTxt} sx={{ mt: 1 }}>
                    Tgl Selesai:
                  </Typography>
                  <TextField
                    type={'Date'}
                    value={filterEndDate}
                    placeholder='Pencarian'
                    onChange={(e) => {
                      setfilterEndDate(e.target.value)
                    }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position='start'>
                          <IconButton sx={{ padding: 0 }}>
                            <SearchIcon
                              sx={{
                                fontSize: 15,
                                color: 'gray',
                              }}
                            />
                          </IconButton>
                        </InputAdornment>
                      ),
                      style: {
                        fontSize: 12,
                        height: 35.5,
                        backgroundColor: '#fff',
                        boxShadow: 'inset 0px 2px 4px rgba(0, 0, 0, 0.25)',
                      },
                    }}
                    className={classes.searchTxt}
                  />
                </Grid>
                <Grid item xs={1}>
                  <Button
                    variant='contained'
                    color='primary'
                    onClick={async () => {
                      setLoader(true)
                      await fetchDataAssignmentMasinis()
                    }}>
                    Cari
                  </Button>
                </Grid>
                <Grid item xs={1.5}>
                  <Button
                    fullWidth
                    variant='contained'
                    color='success'
                    onClick={async () => {
                      setLoader(true)
                      await handlePrint()
                    }}>
                    Download
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Table
            sx={{ minWidth: 650, borderRadius: 3, mb: 3 }}
            aria-label='simple table'>
            <TableHead>
              <TableRow style={{ backgroundColor: '#C4C4C4' }}>
                <TableCell style={tableLeftStyle}>
                  <p className={classes.tableLeftTxt} align='center'>
                    No.
                  </p>
                </TableCell>
                <TableCell style={tableTextCellStyle} align='left'>
                  Masinis
                </TableCell>
                <TableCell style={tableTextCellStyle} align='left'>
                  Catatan
                </TableCell>
                <TableCell style={tableTextCellStyle} align='center'>
                  Pesan
                </TableCell>
                <TableCell style={tableTextCellStyle} align='center'>
                  Status
                </TableCell>
                <TableCell style={tableTextCellStyle} align='center'>
                  Aksi
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {_.orderBy(
                dataDailySchedule,
                ['loopRouteTrain.code', 'loopRouteTrain.loop'],
                ['asc', 'asc'],
              ).map((item, index) => {
                return (
                  <TableRow
                    key={index++}
                    style={{
                      borderCollapse: 'seperate',
                      backgroundColor: '#F3F3F3',
                      border: '5px solid #F6F7FF',
                    }}>
                    <TableCell style={tableTextIsiStyle} align='center'>
                      {index + 1}
                    </TableCell>

                    <TableCell style={tableTextIsiStyle} align='left'>
                      {item?.trainDriver?.name}
                      {item?.rotationTrainDriver ? (
                        <span>
                          <br /> Dari{' '}
                          {item?.rotationTrainDriver?.after?.loopRouteTrain
                            ?.code +
                            '-' +
                            item?.rotationTrainDriver?.after?.loopRouteTrain
                              ?.loop}
                        </span>
                      ) : (
                        ''
                      )}
                      {item?.rotationTrainDriver ? (
                        <i style={{ color: 'red' }}>
                          <br />
                          <small>
                            menggantikan{' '}
                            {
                              item?.rotationTrainDriver?.before?.trainDriver
                                ?.name
                            }
                            <br />
                            dikarenakan {
                              item?.rotationTrainDriver?.note
                            } pada{' '}
                            {moment(
                              item?.rotationTrainDriver?.rotationDate,
                            ).format('HH:mm:ss')}
                          </small>
                        </i>
                      ) : (
                        ''
                      )}
                      <br />
                      <small>
                        Kode : {item?.loopRouteTrain?.code} / Loop :{' '}
                        {item?.loopRouteTrain?.loop} / LRV :{' '}
                        {item?.LRVList && item?.LRVList.length > 0
                          ? item?.LRVList.map((item) => item)
                          : ''}
                      </small>
                      <br />
                      <small>NIK : {item?.trainDriver?.nik}</small>
                      <br />
                      <small>
                        MD: {item?.loopRouteTrain?.start} HD:{' '}
                        {item?.loopRouteTrain?.end}
                      </small>
                    </TableCell>
                    <TableCell style={tableTextIsiStyle} align='left'>
                      {item.kaIncident.length > 0
                        ? item?.kaIncident.map((itemka, indexka) => (
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
                      <small>
                        <i>
                          {item.kaIncident.length > 0 &&
                            moment(item.kaIncident[0]?.createdAt).format(
                              'DD MMMM YYYY HH:mm',
                            )}
                        </i>
                      </small>
                    </TableCell>
                    <TableCell style={tableTextIsiStyle} align='left'>
                      <small>
                        <i>{item?.message}</i>
                      </small>
                    </TableCell>
                    <TableCell style={tableTextIsiStyle} align='center'>
                      <small>
                        {item?.status === 'Finish'
                          ? 'Selesai'
                          : item?.status === 'On Duty'
                          ? 'Sedang Bertugas'
                          : '-'}
                      </small>
                      <br />
                      {item?.completeDate ? (
                        <small>
                          Updated:{' '}
                          {moment(item?.completeDate).format('HH:mm:ss')}
                        </small>
                      ) : (
                        ''
                      )}
                    </TableCell>
                    <TableCell style={tableTextIsiStyle} align='center'>
                      <Button
                        variant='contained'
                        color='success'
                        style={{ width: '100%', marginBottom: 2.8 }}
                        size='small'
                        onClick={() => openModalWorkOrder(item)}>
                        Detail
                      </Button>
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </Container>
      </Box>
    </>
  )
}
