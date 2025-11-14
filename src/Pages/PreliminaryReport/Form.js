import React, { useState, Fragment, useEffect, useContext } from 'react'
import { styled } from '@mui/material/styles'
import TableCell, { tableCellClasses } from '@mui/material/TableCell'
import {
  Alert,
  Typography,
  Container,
  Grid,
  Box,
  Paper,
  Button,
  Stack,
  IconButton,
  TableBody,
  TableHead,
  TableRow,
  Table,
  TextField,
  Modal,
  Snackbar,
  Dialog,
  DialogTitle,
  DialogActions,
} from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew'
import useStyles from './Styles'
import useUploadImg from 'Hooks/Upload/useUploadImg'
import UsePreliminaryReport from 'Hooks/PreliminaryReport/usePreliminaryReport'
import UseDailyWork from 'Hooks/DailyWork/useDailyWork'
import ContentEditor from '../../Component/ContentEditor'
import { useHistory } from 'react-router-dom'
import moment from 'moment'
import Camera, { FACING_MODES } from 'react-html5-camera-photo'
import 'react-html5-camera-photo/build/css/index.css'
import StaticVar from 'Config/StaticVar'
import { AddPhotoAlternateOutlined as AddPhotoAlternateOutlinedIcon } from '@mui/icons-material'
import CollectionsIcon from '@mui/icons-material/Collections'
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline'
import useQuery from 'Utils/QueryParams'

export default function PreliminaryForm(props) {
  const classes = useStyles()
  let query = useQuery()
  const id = props?.id ? props.id : query.get('id')
  const action = props?.action ? props.action : query.get('action')

  const history = useHistory()

  const {
    handleMultiInputImage,
    multiUploadedImage,
    multiImage,
    setMultiImage,
    handleMultiUploadImgBase,
    dialogDelete,
    handleDeleteImage,
    handleCloseDialogDelete,
    handleOpenDialogDelete,
    dialogUpload,
    handleOpenDialogUpload,
    handleCloseDialogUpload,
    loader,
    setLoader,
    openImg,
    setOpenImg,
    openCamera,
    setOpenCamera,
  } = useUploadImg()

  const {
    accident,
    setAccident,
    location,
    setLocation,
    department,
    setDepartment,
    dateOccurence,
    setDateOccurence,
    dateReport,
    setDateReport,
    lossInformation,
    setLossInformation,
    description,
    setDescription,
    chronology,
    setChronology,
    preliminaryReport,
    updateDataPreliminaryReport,
    setOpenSnackbar,
    openSnackbar,
    getDataPreliminaryReport,
    handleDelete,
    setSelectedData,
    setUpdated,
    updated,
  } = UsePreliminaryReport()

  const { getDailyWorkByTrainDriver, dataScheduleTrainDriver } = UseDailyWork()

  const fetchData = async () => {
    if (props?.dataDetail) {
      setAccident(props?.dataDetail.accident)
      setLocation(props?.dataDetail.location)
      setDepartment(props?.dataDetail.department)
      setDateOccurence(
        moment(props?.dataDetail.dateOccurence).format('YYYY-MM-DDTHH:mm'),
      )
      setDateReport(moment(props?.dataDetail.dateReport).format('YYYY-MM-DD'))
      setLossInformation(props?.dataDetail.lossInformation)
      setDescription(props?.dataDetail.description)
      setChronology(props?.dataDetail.chronology)
      setMultiImage(props?.dataDetail.file)
    } else {
      const response = await getDataPreliminaryReport({ id })
      if (response.status === 'OK' && response.result.length > 0) {
        setAccident(response.result[0]?.accident)
        setLocation(response.result[0]?.location)
        setDepartment(response.result[0]?.department)
        setDateOccurence(
          moment(response.result[0]?.dateOccurence).format('YYYY-MM-DDTHH:mm'),
        )
        setDateReport(
          moment(response.result[0]?.dateReport).format('YYYY-MM-DD'),
        )
        setLossInformation(response.result[0]?.lossInformation)
        setDescription(response.result[0]?.description)
        setChronology(response.result[0]?.chronology)
        setMultiImage(response.result[0]?.file)
      }
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <>
      <Snackbar
        autoHideDuration={6000}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={openSnackbar}
        onClose={() => setOpenSnackbar(false)}>
        <Alert
          onClose={() => setOpenSnackbar(false)}
          severity='success'
          sx={{ width: '100%' }}>
          Berhasil Mengirim Data Briefing
        </Alert>
      </Snackbar>

      <Dialog
        open={dialogDelete}
        onClose={handleCloseDialogDelete}
        aria-labelledby='delete-verification'
        aria-describedby='delete-verification'>
        <DialogTitle id='delete-verification'>
          {'Apakah Anda yakin ingin menghapus gambar ini?'}
        </DialogTitle>
        <DialogActions>
          <Button onClick={handleCloseDialogDelete}>Batal</Button>
          <Button onClick={handleDeleteImage} autoFocus>
            Hapus
          </Button>
        </DialogActions>
      </Dialog>

      <Container maxWidth='xl' sx={{ pt: 13 }}>
        <Paper sx={{ padding: '20px 50px' }}>
          <Typography variant='h4' align='center' sx={{ my: 3 }}>
            Preliminary Incident Report
          </Typography>
          <Table style={{ width: '100%' }}>
            <TableRow>
              <TableCell style={{ width: '35%' }}>
                <Typography>Accident</Typography>
              </TableCell>
              <TableCell sx={{ width: '2%' }}>:</TableCell>
              <TableCell>
                {action === 'detail' ? (
                  <Typography>{accident}</Typography>
                ) : (
                  <TextField
                    value={accident}
                    onChange={(e) => setAccident(e.target.value)}
                    type='text'
                    InputProps={{
                      style: {
                        width: 500,
                        fontSize: 12,
                        height: 33,
                        backgroundColor: '#fff',
                        border: 'none',
                        borderRadius: 7,
                        padding: 0,
                      },
                    }}
                    sx={{
                      width: 500,
                      padding: 0,
                    }}
                  />
                )}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell style={{ width: '35%' }}>
                <Typography>
                  Accident/Incident Location/ Lokasi Kejadian Kecelakaan
                </Typography>
              </TableCell>
              <TableCell sx={{ width: '2%' }}>:</TableCell>
              <TableCell>
                {action === 'detail' ? (
                  <Typography>{location}</Typography>
                ) : (
                  <TextField
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    type='text'
                    InputProps={{
                      style: {
                        width: 500,
                        fontSize: 12,
                        height: 33,
                        backgroundColor: '#fff',
                        border: 'none',
                        borderRadius: 7,
                        padding: 0,
                      },
                    }}
                    sx={{
                      width: 500,
                      padding: 0,
                    }}
                  />
                )}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell style={{ width: '35%' }}>
                <Typography>
                  Department & Business Unit ( Kontraktor )/ Bagian & Unit
                  Bisnis ( Kontraktor )
                </Typography>
              </TableCell>
              <TableCell sx={{ width: '2%' }}>:</TableCell>
              <TableCell>
                {action === 'detail' ? (
                  <Typography>{department}</Typography>
                ) : (
                  <TextField
                    type='text'
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                    InputProps={{
                      style: {
                        width: 500,
                        fontSize: 12,
                        height: 33,
                        backgroundColor: '#fff',
                        border: 'none',
                        borderRadius: 7,
                        padding: 0,
                      },
                    }}
                    sx={{
                      width: 500,
                      padding: 0,
                    }}
                  />
                )}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell style={{ width: '35%' }}>
                <Typography>
                  Date & Time Occurence / Tanggal & Waktu Kejadian
                </Typography>
              </TableCell>
              <TableCell sx={{ width: '2%' }}>:</TableCell>
              <TableCell>
                {action === 'detail' ? (
                  <Typography>{dateOccurence}</Typography>
                ) : (
                  <TextField
                    type='datetime-local'
                    value={dateOccurence}
                    onChange={(e) => setDateOccurence(e.target.value)}
                    InputProps={{
                      style: {
                        width: 500,
                        fontSize: 12,
                        height: 33,
                        backgroundColor: '#fff',
                        border: 'none',
                        borderRadius: 7,
                        padding: 0,
                      },
                    }}
                    sx={{
                      width: 500,
                      padding: 0,
                    }}
                  />
                )}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell style={{ width: '35%' }}>
                <Typography>
                  Date of Report Created/ Tanggal Laporan dibuat
                </Typography>
              </TableCell>
              <TableCell sx={{ width: '2%' }}>:</TableCell>
              <TableCell>
                {action === 'detail' ? (
                  <Typography>{dateReport}</Typography>
                ) : (
                  <TextField
                    type='datetime-local'
                    value={dateReport}
                    onChange={(e) => setDateReport(e.target.value)}
                    InputProps={{
                      style: {
                        width: 500,
                        fontSize: 12,
                        height: 33,
                        backgroundColor: '#fff',
                        border: 'none',
                        borderRadius: 7,
                        padding: 0,
                      },
                    }}
                    sx={{
                      width: 500,
                      padding: 0,
                    }}
                  />
                )}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell style={{ width: '35%' }}>
                <Typography>Loss Information / Informasi Kerugian</Typography>
              </TableCell>
              <TableCell sx={{ width: '2%' }}>:</TableCell>
              <TableCell>
                {action === 'detail' ? (
                  <Typography>{lossInformation}</Typography>
                ) : (
                  <TextField
                    type='text'
                    value={lossInformation}
                    onChange={(e) => setLossInformation(e.target.value)}
                    InputProps={{
                      style: {
                        width: 500,
                        fontSize: 12,
                        height: 33,
                        backgroundColor: '#fff',
                        border: 'none',
                        borderRadius: 7,
                        padding: 0,
                      },
                    }}
                    sx={{
                      width: 500,
                      padding: 0,
                    }}
                  />
                )}
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell style={{ width: '100%' }} colSpan={3}>
                <Typography>Unggah Gambar</Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={3}>
                <div>
                  <Box>
                    <Grid container>
                      <>
                        <Stack
                          flexDirection='row'
                          gap={3}
                          sx={{
                            mb: 5,
                            flexWrap: 'wrap',
                          }}>
                          <input
                            accept='image/*'
                            hidden
                            ref={multiUploadedImage}
                            type='file'
                            onChange={(e) =>
                              handleMultiUploadImgBase(
                                e,
                                'preliminaryreport',
                                id,
                                'upload',
                              )
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
                                  borderBottomLeftRadius: `${
                                    action === 'edit' || action === 'add'
                                      ? '0'
                                      : '10px'
                                  }`,
                                  borderBottomRightRadius: `${
                                    action === 'edit' || action === 'add'
                                      ? '0'
                                      : '10px'
                                  }`,
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
                              {action === 'edit' || action === 'add' ? (
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
                              ) : (
                                ''
                              )}
                            </Box>
                          ))}
                          {action === 'edit' || action === 'add' ? (
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
                          ) : (
                            ''
                          )}
                        </Stack>
                      </>
                    </Grid>
                  </Box>
                </div>
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
                        handleMultiUploadImgBase(
                          e,
                          'preliminaryreport',
                          id,
                          'capture',
                        )
                      }
                    />
                  </Box>
                </Modal>
              </TableCell>
            </TableRow>

            <TableRow>
              {action === 'detail' ? (
                <>
                  <TableCell style={{ width: '35%' }}>
                    <Typography>Keterangan Kejadian</Typography>
                  </TableCell>
                  <TableCell sx={{ width: '2%' }}>:</TableCell>
                  <TableCell>
                    <Typography
                      dangerouslySetInnerHTML={{ __html: description }}
                    />
                  </TableCell>
                </>
              ) : (
                <TableCell colSpan={3}>
                  <Typography sx={{ mb: 1 }}>Keterangan Kejadian</Typography>
                  <ContentEditor
                    handleChange={(event, editor) =>
                      setDescription(editor.getData())
                    }
                    value={description}
                  />
                </TableCell>
              )}
            </TableRow>
            <TableRow>
              <TableCell colSpan={3}>
                <Typography sx={{ mb: 1 }}>Kronologis Kejadian</Typography>
                <Table
                  sx={{ minWidth: 650, borderRadius: 3, mb: 3 }}
                  aria-label='simple table'>
                  <TableHead>
                    <TableRow style={{ backgroundColor: '#C4C4C4' }}>
                      <TableCell
                        style={{
                          color: '#ffffff',
                          width: '5%',
                          fontWeight: 'bold',
                        }}
                        align='center'>
                        No
                      </TableCell>
                      <TableCell
                        style={{
                          color: '#ffffff',
                          width: '25%',
                          fontWeight: 'bold',
                        }}
                        align='left'>
                        Waktu
                      </TableCell>
                      <TableCell
                        style={{
                          color: '#ffffff',
                          width: '55%',
                          fontWeight: 'bold',
                        }}
                        align='left'>
                        Kronologi
                      </TableCell>
                      {action === 'edit' || action === 'add' ? (
                        <TableCell
                          style={{
                            color: '#ffffff',
                            width: '25%',
                            fontWeight: 'bold',
                          }}
                          align='left'>
                          Aksi
                        </TableCell>
                      ) : null}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {chronology.map((item, index) => (
                      <TableRow>
                        <TableCell style={{ width: '5%' }}>
                          {index + 1}
                        </TableCell>
                        <TableCell style={{ width: '25%' }}>
                          {action === 'detail' ? (
                            <Typography>{item.time}</Typography>
                          ) : (
                            <TextField
                              type='time'
                              InputProps={{
                                style: {
                                  width: '100%',
                                  fontSize: 12,
                                  height: 33,
                                  backgroundColor: '#fff',
                                  border: 'none',
                                  borderRadius: 7,
                                  padding: 0,
                                },
                              }}
                              sx={{
                                width: '100%',
                                padding: 0,
                              }}
                              value={item.time}
                              onChange={(e) => {
                                const datatemp = chronology.map((i) => {
                                  if (i.id === item.id) {
                                    i.time = e.target.value
                                  }
                                  return i
                                })
                                setChronology(datatemp)
                              }}
                            />
                          )}
                        </TableCell>
                        <TableCell style={{ width: '55%' }}>
                          {action === 'detail' ? (
                            <Typography>{item.value}</Typography>
                          ) : (
                            <TextField
                              type='text'
                              InputProps={{
                                style: {
                                  width: '100%',
                                  fontSize: 12,
                                  height: 33,
                                  backgroundColor: '#fff',
                                  border: 'none',
                                  borderRadius: 7,
                                  padding: 0,
                                },
                              }}
                              sx={{
                                width: '100%',
                                padding: 0,
                              }}
                              value={item.value}
                              onChange={(e) => {
                                const datatemp = chronology.map((i) => {
                                  if (i.id === item.id) {
                                    i.value = e.target.value
                                  }
                                  return i
                                })
                                setChronology(datatemp)
                              }}
                            />
                          )}
                        </TableCell>
                        {action === 'edit' || action === 'add' ? (
                          <TableCell style={{ width: '25%' }}>
                            <IconButton
                              sx={{ backgroundColor: '#ababab' }}
                              onClick={() => {
                                if (
                                  chronology.length > 1 &&
                                  index !== chronology.length - 1
                                ) {
                                  const removeEl = chronology.filter(
                                    (i, idx) => idx !== index,
                                  )
                                  setChronology(removeEl)
                                } else {
                                  setChronology([
                                    ...chronology,
                                    {
                                      id: chronology.length + 1,
                                      time: '',
                                      value: '',
                                    },
                                  ])
                                }
                              }}>
                              {chronology.length > 1 &&
                              index !== chronology.length - 1 ? (
                                <RemoveCircleOutlineIcon />
                              ) : (
                                <AddCircleOutlineIcon />
                              )}
                            </IconButton>
                          </TableCell>
                        ) : null}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableCell>
            </TableRow>
          </Table>
        </Paper>

        {props?.action ? null : (
          <Grid
            container
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              paddingBottom: 5,
            }}>
            <Button
              variant='contained'
              onClick={async () => {
                if (
                  accident === '' &&
                  location === '' &&
                  department === '' &&
                  dateOccurence === '' &&
                  description === '' &&
                  chronology.length === 0
                ) {
                  await handleDelete(id)
                  history.goBack()
                } else {
                  history.goBack()
                }
              }}
              sx={{
                color: '#A56C28',
                bgcolor: '#fff',
                border: '2px solid #A56C28',
                width: 300,
                fontSize: 18,
                mr: 3,
                mt: 3,
                '&:hover': {
                  backgroundColor: '#BB7E36',
                  color: '#fff',
                  border: 'none',
                },
              }}>
              <ArrowBackIosNewIcon sx={{ mr: 1 }} /> Kembali
            </Button>
            {action === 'edit' || action === 'add' ? (
              <Button
                onClick={async () => {
                  const response = await updateDataPreliminaryReport(
                    multiImage,
                    id,
                    dataScheduleTrainDriver[0],
                    action === 'edit' ? new Date() : null,
                  )
                  if (response.status === 'OK') {
                    history.push('/app/operational/preliminaryreport')
                  }
                }}
                variant='contained'
                sx={{
                  color: '#fff',
                  bgcolor: '#BB7E36',
                  border: '1px solid #A56C28',
                  width: 300,
                  fontSize: 18,
                  mr: 3,
                  mt: 3,
                  '&:hover': {
                    backgroundColor: '#BB7E36',
                    color: '#fff',
                    border: 'none',
                  },
                }}>
                Submit
              </Button>
            ) : null}
          </Grid>
        )}
      </Container>
    </>
  )
}

{
  /*  */
}
