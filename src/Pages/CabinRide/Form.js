import { React, useState, Fragment, useContext, useEffect } from 'react'
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
  Select,
  InputLabel,
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
import QRCode from 'react-qr-code'

import useQuery from 'Utils/QueryParams'

import CardCabinRide from '../../Component/Card/CardCabinRide/index'
import { CabinRideContext } from 'Context'
import { toast } from 'react-toastify'
import useUploadImg from 'Hooks/Upload/useUploadImg'
import StaticVar from 'Config/StaticVar'

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

export default function Riwayat() {
  const classes = useStyles()
  let query = useQuery()
  const history = useHistory()

  const id = query.get('id')

  const { getCabinRide, cabinrides, updateCabinRide } =
    useContext(CabinRideContext)
  console.log(
    'cabinrides[0]?.loopRouteTrain?.route',
    cabinrides[0]?.dailyWorkTrainDriver?.loopRouteTrain?.route,
  )

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
    handleOpenDialogDelete,
    openImg,
    setOpenImg,
    openCamera,
    setOpenCamera,
  } = useUploadImg()

  const fetchDate = async (e) => {
    let res = await getCabinRide({
      // params: { month, id }
      params: { id },
    })
    if (res.status == 'OK') {
      let _filter = res?.result[0]?.cabinRide?.map((x) => x.desc)
      setSelectedVal([].concat.apply([], _filter))
      setLoading(false)
      setNote(res?.result[0]?.note)
      setChangedCR(res?.result[0]?.cabinRide)
      setSkorNilai(res?.result[0]?.cabinRide)
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
  const handleSelectNilai = async (item, val, e) => {
    const result = parseFloat(e.target.value)
    let desc = [{ ...val, result }]

    console.log('handlenilai', desc)

    let fselected = [...skorNilai]
    let selectedtrue = skorNilai.filter((x) => x._id == item._id)

    let valselected = [...selectedVal]
    let _labelval = selectedVal.map((x) => x.label)
    if (_labelval.includes(val.label)) {
      let pulldouble = valselected.filter((x) => x.label !== val.label)
      setSelectedVal([...pulldouble, { ...val, result }])
    } else {
      valselected.push({ ...val, result })
      setSelectedVal(valselected)
    }

    if (selectedtrue?.length > 0) {
      // console.log("array terisis", selectedtrue)
      let withoutdouble = fselected.filter((x) => x._id !== item._id)

      let _alldesc = []
      _alldesc.push({ ...val, result })

      let _filterada = selectedtrue[0]?.desc?.filter(
        (x) => x.label !== val.label,
      )
      let newdata = {
        ...item,
        desc: concat(desc, _filterada),
      }

      setSkorNilai(concat(withoutdouble, newdata))
    } else {
      // console.log("array kosong")
      fselected.push({
        ...item,
        desc,
      })
      setSkorNilai(fselected)
    }
  }

  const handleKeterangan = async (item, val, e) => {
    const result = e.target.value
    // parseInt(e.target.value)
    let desc = [{ ...val, keterangan: result }]

    let fselected = [...skorNilai]
    let selectedtrue = skorNilai.filter((x) => x._id == item._id)

    let valselected = [...selectedVal]
    let _labelval = selectedVal.map((x) => x.label)
    if (_labelval.includes(val.label)) {
      let pulldouble = valselected.filter((x) => x.label !== val.label)
      setSelectedVal([...pulldouble, { ...val, keterangan: result }])
    } else {
      valselected.push({ ...val, keterangan: result })
      setSelectedVal(valselected)
    }

    if (selectedtrue?.length > 0) {
      // console.log("array terisis", selectedtrue)
      let withoutdouble = fselected.filter((x) => x._id !== item._id)

      let _alldesc = []
      _alldesc.push({ ...val, keterangan: result })

      let _filterada = selectedtrue[0]?.desc?.filter(
        (x) => x.label !== val.label,
      )
      let newdata = {
        ...item,
        desc: concat(desc, _filterada),
      }

      setSkorNilai(concat(withoutdouble, newdata))
    } else {
      // console.log("array kosong")
      fselected.push({
        ...item,
        desc,
      })
      setSkorNilai(fselected)
    }
  }

  const handleSubmit = async () => {
    setSubmit(true)
    setLoading(true)

    let datasend = {
      cabinRide: skorNilai,
      note,
      looptrain: selectedKA,
      LRVNumber: lrvVal,
      finishTime: new Date(),
      file: multiImage,
    }

    let resupdate = await updateCabinRide(id, datasend)
    if (resupdate.status == 'OK') {
      await fetchDate({ submit: true })
    } else {
      toast.error('Gagal update nilai.')
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchDate()
  }, [])

  let _fdesc = skorNilai?.map((y) => y.desc.map((x) => parseFloat(x.result)))
  let _concat = [].concat.apply([], _fdesc)

  return (
    <>
      <Box sx={{ display: 'flex', pt: 10, minHeight: '101vh' }}>
        <Container maxWidth='xl'>
          <CardCabinRide
            profile={cabinrides.length > 0 && cabinrides[0]}
            cabinride={cabinrides[0] ? cabinrides[0] : {}}
          />

          <Grid container spacing={2}>
            <Grid item xs={12} sm={12} md={6} lg={6}>
              <Typography sx={{ mt: '10px' }}>No. KA</Typography>
              <TextField
                id='outlined-select-currency'
                select
                // label="Pilih No. KA"
                // placeholder="Pilih Nomor KA"
                sx={alamatStyle}
                style={border}
                onChange={(e) => setSelectedKA(e.target.value)}
                value={selectedKA}>
                {cabinrides[0]?.dailyWorkTrainDriver?.loopRouteTrain?.route?.map(
                  (option) => (
                    <MenuItem
                      key={option.trainNumber}
                      value={option.trainNumber}>
                      {option.trainNumber}
                    </MenuItem>
                  ),
                )}
              </TextField>
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6}>
              <Typography sx={{ mt: '10px' }}>No. LRV</Typography>
              <TextField
                placeholder='Masukkan no. LRV disini '
                // multiline
                // rows={4}
                sx={alamatStyle}
                style={border}
                onChange={(e) => setLrvVal(e.target.value)}
                value={lrvVal}></TextField>
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
                        <TableCell style={tableTextIsiStyle} align='left'>
                          {/* <TextField
                                                            error={
                                                                selectedVal?.filter(
                                                                    (y) =>
                                                                        y.label ==
                                                                        val.label
                                                                )[0]?.result >
                                                                val.value
                                                            }
                                                            helperText={
                                                                selectedVal?.filter(
                                                                    (y) =>
                                                                        y.label ==
                                                                        val.label
                                                                )[0]?.result >
                                                                val.value
                                                                    ? "Melebihi batas bobot"
                                                                    : null
                                                            }
                                                            type={"number"}
                                                            id="outlined-basic"
                                                            variant="outlined"
                                                            value={
                                                                selectedVal?.filter(
                                                                    (y) =>
                                                                        y.label ==
                                                                        val.label
                                                                )[0]?.result
                                                            }
                                                            onChange={(e) =>
                                                                handleSelectNilai(
                                                                    item,
                                                                    val,
                                                                    e
                                                                )
                                                            }
                                                        /> */}
                          <InputLabel id='demo-simple-select-label'>
                            Pilih Nilai
                          </InputLabel>
                          <Select
                            disabled={loading}
                            style={{
                              width: 150,
                            }}
                            labelId='demo-simple-select-label'
                            id='demo-simple-select'
                            value={val.result}
                            label='Pilih Nilai'
                            onChange={(e) =>
                              handleSelectNilai(
                                item,
                                val,
                                e,
                                // e.target
                                //     .value
                              )
                            }>
                            {val.rangepoint?.map((x) => (
                              <MenuItem value={x}>{x}</MenuItem>
                            ))}

                            {/* <MenuItem
                                                                value={10}
                                                            >
                                                                10
                                                            </MenuItem>
                                                            <MenuItem value={5}>
                                                                5
                                                            </MenuItem>
                                                            <MenuItem value={0}>
                                                                0
                                                            </MenuItem> */}
                          </Select>
                        </TableCell>
                        <TableCell style={tableTextIsiStyle} align='left'>
                          <TextField
                            value={
                              selectedVal?.filter(
                                (y) => y.label == val.label,
                              )[0]?.keterangan
                            }
                            onChange={(e) => handleKeterangan(item, val, e)}
                            id='outlined-basic'
                            label='Keterangan'
                            variant='outlined'
                          />
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
                <TableCell align='center'>{/* {_.sum(_concat)} */}</TableCell>
              </TableRow>
            </TableBody>
          </Table>

          <Grid container spacing={2}>
            <Grid item xs={12} sm={12} md={12} lg={12}>
              <Typography sx={{ marginTop: 2 }}>Catatan</Typography>
              <TextField
                placeholder='Masukkan catatan disini '
                multiline
                rows={4}
                sx={alamatStyle}
                style={border}
                onChange={(e) => setNote(e.target.value)}
                value={note}></TextField>
            </Grid>
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
                    <Button
                      onClick={() => handleOpenDialogDelete(item)}
                      fullWidth
                      sx={{
                        backgroundColor: 'red',
                        color: 'white',
                        py: 1,
                        '&:hover': {
                          backgroundColor: 'rgba(255,0,0,0.5)',
                        },
                        borderTopLeftRadius: 0,
                        borderTopRightRadius: 0,
                        borderBottomLeftRadius: 10,
                        borderBottomRightRadius: 10,
                      }}>
                      <DeleteIcon />
                    </Button>
                  </Box>
                ))}
                <Button
                  onClick={(openImg) => setOpenImg(true)}
                  sx={{
                    flexDirection: 'column',
                    width: 200,
                    height: 270,
                    border: '1px dashed #BDBDBD',
                    borderRadius: 4,
                    backgroundColor: '#F2F2F2',
                    textTransform: 'none',
                  }}>
                  <div>
                    <AddPhotoAlternateOutlinedIcon
                      style={{
                        color: '#BDBDBD',
                        fontSize: 40,
                      }}
                    />
                    <Typography
                      style={{
                        fontStyle: 'italic',
                        color: '#BDBDBD',
                      }}>
                      Unggah Gambar
                    </Typography>
                  </div>
                </Button>
              </Stack>
            </Grid>
          </Grid>

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
              {loading ? (
                <LoadingButton
                  fullWidth
                  loading
                  loadingIndicator='Loading…'
                  variant='outlined'>
                  SUBMIT
                </LoadingButton>
              ) : (
                <Button
                  variant='contained'
                  fullWidth
                  size='large'
                  onClick={handleSubmit}>
                  SUBMIT
                </Button>
              )}
            </Grid>
          </Grid>

          <Snackbar
            open={open}
            autoHideDuration={6000}
            onClose={() => setOpen(false)}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
            <Alert
              onClose={() => setOpen(false)}
              severity='success'
              sx={{ width: '100%' }}>
              Update data berhasil.
            </Alert>
          </Snackbar>

          <Modal
            open={openImg}
            onClose={(openImg) => setOpenImg(false)}
            aria-labelledby='modal-modal-title'
            aria-describedby='modal-modal-description'>
            <Box
              sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: 350,
                bgcolor: 'background.paper',
                boxShadow: 24,
                borderRadius: 5,
                p: 4,
                display: 'flex',
                justifyContent: 'space-between',
              }}>
              <Button
                onClick={(openCamera) => setOpenCamera(true)}
                sx={{
                  flexDirection: 'column',
                  width: 120,
                  height: 120,
                  border: '1px dashed #BDBDBD',
                  borderRadius: 4,
                  backgroundColor: '#F2F2F2',
                  textTransform: 'none',
                }}>
                <div>
                  <PhotoCameraIcon
                    style={{
                      color: '#BDBDBD',
                      fontSize: 40,
                    }}
                  />
                  <Typography
                    style={{
                      fontStyle: 'italic',
                      color: '#BDBDBD',
                    }}>
                    Ambil Gambar
                  </Typography>
                </div>
              </Button>
              <Button
                onClick={handleMultiInputImage}
                sx={{
                  flexDirection: 'column',
                  width: 120,
                  height: 120,
                  border: '1px dashed #BDBDBD',
                  borderRadius: 4,
                  backgroundColor: '#F2F2F2',
                  textTransform: 'none',
                }}>
                <div>
                  <CollectionsIcon
                    style={{
                      color: '#BDBDBD',
                      fontSize: 40,
                    }}
                  />
                  <Typography
                    style={{
                      fontStyle: 'italic',
                      color: '#BDBDBD',
                    }}>
                    Pilih dari Galeri
                  </Typography>
                </div>
              </Button>
            </Box>
          </Modal>
          <Modal
            open={openCamera}
            onClose={(openCamera) => setOpenCamera(false)}
            aria-labelledby='modal-modal-title'
            aria-describedby='modal-modal-description'>
            <Box
              sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: 768,
                bgcolor: 'none',
                boxShadow: 24,
                padding: 0,
              }}>
              <Camera
                idealFacingMode={FACING_MODES.ENVIRONMENT}
                imageCompression={0.9}
                onTakePhoto={(e) =>
                  handleMultiUploadImgBase(e, 'cabinrides', id, 'capture')
                }
              />
            </Box>
          </Modal>
        </Container>
      </Box>
    </>
  )
}
