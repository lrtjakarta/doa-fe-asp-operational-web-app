import {
  React,
  useState,
  Fragment,
  useContext,
  useEffect,
  useRef,
  useCallback,
} from 'react'
import {
  Container,
  Typography,
  Box,
  TableCell,
  Table,
  TableHead,
  TableRow,
  TableBody,
  TextField,
  Grid,
  Button,
  Alert,
  Snackbar,
  MenuItem,
  Stack,
  Modal,
} from '@mui/material'
import LoadingButton from '@mui/lab/LoadingButton'
import { Link, useHistory } from 'react-router-dom'
import useStyles from './Styles'
import moment from 'moment'
import _, { concat } from 'lodash'
import DeleteIcon from '@mui/icons-material/Delete'
import { AddPhotoAlternateOutlined as AddPhotoAlternateOutlinedIcon } from '@mui/icons-material'
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera'
import CollectionsIcon from '@mui/icons-material/Collections'

import Camera, { FACING_MODES } from 'react-html5-camera-photo'

import useQuery from 'Utils/QueryParams'
import QRCode from 'react-qr-code'
import ReactToPrint from 'react-to-print'
import { useReactToPrint } from 'react-to-print'

import CardCabinRide from '../../Component/Card/CardCabinRide/index'
import { CabinRideContext } from 'Context'
import { toast } from 'react-toastify'
import useUploadImg from 'Hooks/Upload/useUploadImg'
import StaticVar from 'Config/StaticVar'

import { ComponentToPrint } from './ComponentToPrint'

// style
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
} from './Styles'

export default function Riwayat(props) {
  const classes = useStyles()
  let query = useQuery()
  const history = useHistory()

  const id = props?.id ? props.id : query.get('id')

  const componentRef = useRef()

  const { getCabinRide, cabinrides, updateCabinRide } =
    useContext(CabinRideContext)

  const [note, setNote] = useState('')
  const [lrvVal, setLrvVal] = useState('')
  const [selectedKA, setSelectedKA] = useState('')
  const [submit, setSubmit] = useState(false)
  const [loading, setLoading] = useState(false)
  const [selectedNilai, setSelectedNilai] = useState({})
  const [changedCR, setChangedCR] = useState([])
  // const [alldesc, setAlldesc] = useState([])
  const [skorNilai, setSkorNilai] = useState([])
  const [value, setValue] = useState(0)
  const [selectedVal, setSelectedVal] = useState([])
  const [open, setOpen] = useState(false)

  // console.log("selectedVal", selectedVal)

  // upload image
  const {
    handleMultiInputImage,
    multiUploadedImage,
    multiImage,
    setMultiImage,
    handleMultiUploadImgBase,
  } = useUploadImg()

  const fetchDate = async (e) => {
    if (props?.dataDetail) {
      let dataMasterCabinRide =
        Array.isArray(props?.dataDetail?.cabinRide) &&
        props?.dataDetail?.cabinRide.length > 1
          ? props?.dataDetail?.cabinRide
          : []
      let _filter = dataMasterCabinRide?.map((x) => x.desc)
      setSelectedVal([].concat.apply([], _filter))
      setLoading(false)
      setNote(props?.dataDetail?.note)
      setChangedCR(dataMasterCabinRide)
      setSkorNilai(dataMasterCabinRide)
      setSelectedKA(props?.dataDetail?.looptrain)
      setLrvVal(props?.dataDetail?.LRVNumber)
      setMultiImage(props?.dataDetail?.file)
    } else {
      let res = await getCabinRide({
        // params: { month, id }
        params: { id },
      })
      if (res.status == 'OK') {
        let dataMasterCabinRide =
          Array.isArray(res?.result[0]?.cabinRide) &&
          res?.result[0]?.cabinRide.length > 1
            ? res?.result[0]?.cabinRide
            : []
        let _filter = dataMasterCabinRide.map((x) => x.desc)
        setSelectedVal([].concat.apply([], _filter))
        setLoading(false)
        setNote(res?.result[0]?.note)
        setChangedCR(dataMasterCabinRide)
        setSkorNilai(dataMasterCabinRide)
        setSelectedKA(res?.result[0]?.looptrain)
        setLrvVal(res?.result[0]?.LRVNumber)
        setMultiImage(res?.result[0]?.file)
        // toast.success("Berhasil update cabin ride.")
        if (e?.submit) {
          setOpen(true)

          history.push('/app/operational/cabinride')
          toast.success('Berhasil update cabin ride.')
        }
      } else {
        toast.error('Gagal update nilai.')
        setLoading(false)
      }
    }
  }

  // print
  const reactToPrintContent = useCallback(() => {
    return componentRef.current
  }, [componentRef.current])

  useEffect(() => {
    fetchDate()
  }, [])

  console.log('skorNilai', skorNilai)

  let _fdesc = skorNilai?.map((y) => y.desc.map((x) => parseInt(x.result)))
  let _concat = [].concat.apply([], _fdesc)

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          pt: 10,
          // minHeight: "101vh"
        }}>
        <Container maxWidth='xl' sx={{ mb: 5 }}>
          {/* <CardCabinRide
                        profile={cabinrides.length > 0 && cabinrides[0]}
                        cabinride={cabinrides[0] ? cabinrides[0] : {}}
                    /> */}

          {/* <Grid container spacing={2}>
                        <Grid item xs={12} sm={12} md={6} lg={6}>
                            <Typography sx={{ mt: "10px" }}>No. KA</Typography>
                            <TextField
                                id="outlined-select-currency"
                                select
                                // label="Pilih No. KA"
                                // placeholder="Pilih Nomor KA"
                                sx={alamatStyle}
                                style={border}
                                onChange={(e) => setSelectedKA(e.target.value)}
                                value={selectedKA}
                            >
                                {cabinrides[0]?.dailyWorkTrainDriver?.loopRouteTrain?.route?.map(
                                    (option) => (
                                        <MenuItem
                                            key={option.trainNumber}
                                            value={option.trainNumber}
                                        >
                                            {option.trainNumber}
                                        </MenuItem>
                                    )
                                )}
                            </TextField>
                        </Grid>
                        <Grid item xs={12} sm={12} md={6} lg={6}>
                            <Typography sx={{ mt: "10px" }}>No. LRV</Typography>
                            <TextField
                                placeholder="Masukkan no. LRV disini "
                                // multiline
                                // rows={4}
                                sx={alamatStyle}
                                style={border}
                                onChange={(e) => setLrvVal(e.target.value)}
                                value={lrvVal}
                            ></TextField>
                        </Grid>
                    </Grid> */}

          <Grid container justifyContent={'space-between'}>
            <Grid item md={6} lg={6}>
              <TableRow>
                <TableCell align='left' sx={{ padding: '10px' }}>
                  Nama
                </TableCell>
                <TableCell align='left' sx={{ padding: '10px' }}>
                  : {cabinrides[0]?.trainDriver?.name}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell align='left' sx={{ padding: '10px' }}>
                  NIK
                </TableCell>
                <TableCell align='left' sx={{ padding: '10px' }}>
                  : {cabinrides[0]?.trainDriver?.nik}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell align='left' sx={{ padding: '10px' }}>
                  Tanggal
                </TableCell>
                <TableCell align='left' sx={{ padding: '10px' }}>
                  :{' '}
                  {cabinrides[0]?.createdAt &&
                    moment(cabinrides[0]?.createdAt).format('DD-MM-YYYY')}
                </TableCell>
              </TableRow>
            </Grid>
            <Grid item md={6} lg={6}>
              <TableRow>
                <TableCell align='left' sx={{ padding: '10px' }}>
                  No. LRV
                </TableCell>
                <TableCell align='left' sx={{ padding: '10px' }}>
                  : {cabinrides[0]?.LRVNumber}
                  {/* {
                                        cabinrides[0]?.dailyWorkTrainDriver
                                            ?.loopRouteTrain?.lrv
                                    } */}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell align='left' sx={{ padding: '10px' }}>
                  No. KA
                </TableCell>
                <TableCell align='left' sx={{ padding: '10px' }}>
                  : {cabinrides[0]?.looptrain}
                  {/* {
                                        cabinrides[0]?.dailyWorkTrainDriver
                                            ?.loopRouteTrain?.code
                                    } */}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell align='left' sx={{ padding: '10px' }}>
                  Jam Mulai/Berakhir
                </TableCell>
                <TableCell align='left' sx={{ padding: '10px' }}>
                  :{' '}
                  {cabinrides[0]?.createdAt &&
                    moment(cabinrides[0]?.createdAt).format('HH:mm')}{' '}
                  /{' '}
                  {cabinrides[0]?.finishTime &&
                    moment(cabinrides[0]?.finishTime).format('HH:mm')}
                </TableCell>
              </TableRow>
            </Grid>
          </Grid>

          <Table
            sx={({ borderRadius: 3, mb: 3 }, tableStyle)}
            aria-label='simple table'>
            <TableHead>
              <TableRow style={{ backgroundColor: '#C4C4C4' }}>
                <TableCell style={tableLeftStyle}>
                  <p className={classes.tableLeftTxt} align='center'>
                    No.
                  </p>
                </TableCell>
                <TableCell style={tableTextCellStyle} align='center'>
                  Cabin Ride
                </TableCell>
                <TableCell style={tableTextCellStyle} align='center'>
                  Uraian
                </TableCell>
                <TableCell style={tableTextCellStyle} align='center'>
                  Bobot
                </TableCell>
                <TableCell style={tableTextCellStyle} align='center'>
                  Nilai Realisasi
                </TableCell>
                <TableCell style={tableTextCellStyle} align='center'>
                  Keterangan
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {cabinrides[0] &&
                cabinrides[0]?.cabinRide.map((item, index) => (
                  <Fragment>
                    <TableRow
                      key={index}
                      sx={{
                        borderSpacing: '5px',
                        borderBottom: '30',
                        borderRadius: 3,
                      }}
                      style={{
                        borderCollapse: 'seperate',
                        // borderSpacing: "5px",
                        backgroundColor: '#Fff',
                      }}>
                      <TableCell
                        rowSpan={item.desc.length + 1}
                        style={tableLeftIsiStyle}
                        component='th'
                        align='center'>
                        {index + 1}
                      </TableCell>

                      <TableCell
                        rowSpan={item.desc.length + 1}
                        style={tableTextIsiStyle}>
                        {item.question}
                      </TableCell>
                    </TableRow>
                    {_.sortBy(item?.desc, ['label']).map((val) => (
                      <TableRow
                        sx={{
                          borderRadius: 3,
                        }}
                        style={{
                          backgroundColor: '#Fff',
                        }}>
                        <TableCell style={tableTextIsiStyle} align='left'>
                          {val.label}
                        </TableCell>
                        <TableCell style={tableTextIsiStyle} align='center'>
                          {val.value}
                        </TableCell>
                        <TableCell style={tableTextIsiStyle} align='center'>
                          {val.result}
                        </TableCell>
                        <TableCell style={tableTextIsiStyle} align='left'>
                          {val.keterangan}
                        </TableCell>
                      </TableRow>
                    ))}
                  </Fragment>
                ))}
              <TableRow
                sx={{
                  borderSpacing: '5px',
                  borderBottom: '30',
                  borderRadius: 3,
                }}
                style={{
                  borderCollapse: 'seperate',
                  borderSpacing: '5px',
                  backgroundColor: '#Fff',
                }}>
                <TableCell
                  // rowSpan={item.desc.length}
                  style={tableLeftIsiStyle}
                  // component="th"
                  scope='row'
                  align='center'
                  colSpan={4}>
                  Total
                </TableCell>
                <TableCell align='center'>{_.sum(_concat)}</TableCell>
                <TableCell align='center'></TableCell>
              </TableRow>
            </TableBody>
          </Table>

          <Grid container spacing={2}>
            {note && (
              <Grid item xs={12} sm={12} md={12} lg={12}>
                <Typography sx={{ marginTop: 2 }}>Catatan</Typography>
                {/* <Typography fontWeight={100}>{note}</Typography> */}
                <TextField
                  disabled
                  placeholder='Masukkan catatan disini '
                  multiline
                  // rows={4}
                  sx={alamatStyle}
                  style={border}
                  onChange={(e) => setNote(e.target.value)}
                  value={note}></TextField>
              </Grid>
            )}

            <Grid item xs={12} sm={12} md={12} lg={12}>
              <Stack
                flexDirection='row'
                gap={3}
                sx={{
                  // mb: 5,
                  flexWrap: 'wrap',
                }}>
                <input
                  accept='image/*'
                  hidden
                  ref={multiUploadedImage}
                  type='file'
                  onChange={(e) =>
                    handleMultiUploadImgBase(e, 'cabinrides', id, 'upload')
                  }
                />
                {multiImage?.map((item, index) => (
                  <Box key={index}>
                    <Box
                      sx={{
                        flexDirection: 'column',
                        width: 200,
                        height: 270,
                        borderTopRightRadius: 10,
                        borderTopLeftRadius: 10,
                        backgroundColor: '#F2F2F2',
                        textTransform: 'none',
                        p: 0,
                        overflow: 'hidden',
                        display: 'flex',
                        justifyContent: 'center',
                      }}>
                      <img
                        src={StaticVar.URL_API + '/upload/' + item}
                        style={{
                          width: '100%',
                          objectFit: 'contain',
                        }}
                      />
                      <br />
                    </Box>
                    {/* <Button
                                            onClick={() =>
                                                handleOpenDialogDelete(item)
                                            }
                                            fullWidth
                                            sx={{
                                                backgroundColor: "red",
                                                color: "white",
                                                py: 1,
                                                "&:hover": {
                                                    backgroundColor:
                                                        "rgba(255,0,0,0.5)"
                                                },
                                                borderTopLeftRadius: 0,
                                                borderTopRightRadius: 0,
                                                borderBottomLeftRadius: 10,
                                                borderBottomRightRadius: 10
                                            }}
                                        >
                                            <DeleteIcon />
                                        </Button> */}
                  </Box>
                ))}
              </Stack>
            </Grid>
          </Grid>

          <Grid
            container
            alignItems={'center'}
            mt={2}
            justifyContent='space-around'
            // spacing={5}
          >
            <Grid item textAlign={'center'}>
              <Typography textAlign={'center'}>Masinis</Typography>
              <QRCode
                value={
                  cabinrides[0]?.trainDriver?.nik
                    ? cabinrides[0]?.trainDriver?.nik
                    : '-'
                }
                size={100}
              />
              <Typography textAlign={'center'}>
                {cabinrides[0]?.trainDriver?.name}
              </Typography>
              <Typography textAlign={'center'}>
                NIK: {cabinrides[0]?.trainDriver?.nik}
              </Typography>
            </Grid>
            <Grid item textAlign={'center'}>
              <Typography textAlign={'center'}>Penyelia</Typography>
              <QRCode
                value={
                  cabinrides[0]?.createBy?.nik
                    ? cabinrides[0]?.createBy?.nik
                    : '-'
                }
                size={100}
              />
              <Typography textAlign={'center'}>
                {cabinrides[0]?.createBy?.name}
              </Typography>
              <Typography textAlign={'center'}>
                NIK: {cabinrides[0]?.createBy?.nik}
              </Typography>
            </Grid>
          </Grid>
          {props?.dataDetail ? null : (
            <Grid
              container
              spacing={2}
              justifyContent={'space-between'}
              mt={3}
              mb={5}>
              <Grid item sm={6} xs={12} md={6} lg={6}>
                <Button
                  component={Link}
                  to='/app/operational/cabinride'
                  variant='contained'
                  color='error'
                  fullWidth
                  size='large'>
                  KEMBALI
                </Button>
              </Grid>
              <Grid item sm={6} xs={12} md={6} lg={6}>
                <ReactToPrint
                  trigger={() => {
                    return (
                      <Button
                        variant='contained'
                        fullWidth
                        size='large'
                        // onClick={handleSubmit}
                      >
                        CETAK
                      </Button>
                    )
                  }}
                  // content={() => componentRef.current}
                  content={reactToPrintContent}
                />
                <div style={{ display: 'none' }}>
                  <ComponentToPrint ref={componentRef} />
                </div>
                {/* <ComponentToPrint ref={componentRef} />
                            <Button
                                variant="contained"
                                fullWidth
                                size="large"
                                onClick={handlePrint}
                            >
                                CETAK
                            </Button> */}
              </Grid>
            </Grid>
          )}
        </Container>
      </Box>
    </>
  )
}
