import { React, useState, Fragment, useEffect, useContext } from 'react'
import {
  Container,
  Select,
  MenuItem,
  Typography,
  Box,
  TableCell,
  Grid,
  Table,
  TableHead,
  InputAdornment,
  TableRow,
  TableContainer,
  TableBody,
  IconButton,
  TextField,
  Button,
  ButtonGroup,
} from '@mui/material'
import { styled } from '@mui/material/styles'
import usePagination from '@mui/material/usePagination'
// import riwayatData from './Data';
import useStyles from './Styles'
import moment from 'moment'
import StaticVar from '../../Config/StaticVar'
import _ from 'lodash'

import CardCabinRide from '../../Component/Card/CardCabinRide/index'

// dialog
import DialogFull from '../../Component/Dialog/DialogFull'

// icon
import SearchIcon from '@mui/icons-material/Search'

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
  searchBorderStyle,
} from './Styles'
import useDailyWork from '../../Hooks/DailyWork/useDailyWork'
import useTrainDriver from 'Hooks/TrainDriver/useTrainDriver'
import { ProfileContext } from 'Context'

const sample = [
  { name: 'apple', detail: ['a', 'b', 'c', 'd'] },
  { name: 'banana', detail: ['a', 'b'] },
]

const List = styled('ul')({
  listStyle: 'none',
  padding: 0,
  margin: 0,
  display: 'flex',
  align: 'right',
})

export default function HandOverSpv() {
  const classes = useStyles()
  const { items } = usePagination({
    count: 5,
  })

  const {
    dataLoopTrain,
    dataScheduleTrainDriver,
    submitDataDailyWork,
    cancelDailyWork,
    getDataScheduleTrainDriver,
    dataDailySchedule,
    setDataDailySchedule,
    dateDailyWork,
    setDateDailyWork,
    updateDataScheduleTrainDriver,
    updateDataScheduleTrainDriverStatus,
    fetchDataHandOver,
  } = useDailyWork()
  const {
    trainDriver,
    getDataTrainDriver,
    trainDriverHook,
    getMasinis,
    getPenyelia,
  } = useTrainDriver()
  const [dailyWorkChoose, setDailyWorkChoose] = useState({})
  const [statusDailyWork, setStatusDailyWork] = useState('0')

  const [openModal, setOpenModal] = useState(false)

  useEffect(() => {
    fetchDataHandOver()
  }, [])

  const openModalDialog = (data) => {
    setOpenModal(true)
    setDailyWorkChoose(data)
  }

  const handleClose = () => {
    setOpenModal(false)
  }

  return (
    <>
      <Box sx={{ display: 'flex', pt: 13 }}>
        <DialogFull
          //fullWidth={true}
          open={openModal}
          close={handleClose}
          title={
            <Typography style={{ color: '#bf272b' }}>
              Update Status Serah Terima
            </Typography>
          }
          content={
            <>
              <Table>
                <TableRow>
                  <TableCell style={{ width: '15%' }}>Tanggal Dinas</TableCell>
                  <TableCell style={{ width: 15 }}>:</TableCell>
                  <TableCell>
                    {moment(dailyWorkChoose.dailyWorkDate).format('DD-MM-YYYY')}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell style={{ width: '15%' }}>Nama Penyelia</TableCell>
                  <TableCell style={{ width: 15 }}>:</TableCell>
                  <TableCell>
                    <Typography>
                      Dinasan : {dailyWorkChoose?.loopRouteTrain?.code} -{' '}
                      {dailyWorkChoose?.handOverWork?.loopRouteTrain?.loop}
                    </Typography>
                    <Typography>
                      Nama: {dailyWorkChoose?.trainDriver?.name}
                    </Typography>
                    <Typography>
                      MD: {dailyWorkChoose?.loopRouteTrain?.start}
                    </Typography>
                    <Typography>
                      HD: {dailyWorkChoose?.loopRouteTrain?.end}
                    </Typography>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell style={{ width: '15%' }}>
                    Nama Penyelia Sebelumnya
                  </TableCell>
                  <TableCell style={{ width: 15 }}>:</TableCell>
                  <TableCell>
                    <Typography>
                      Dinasan :{' '}
                      {dailyWorkChoose?.handOverWork?.loopRouteTrain?.code} -{' '}
                      {dailyWorkChoose?.handOverWork?.loopRouteTrain?.loop}
                    </Typography>
                    <Typography>
                      Nama: {dailyWorkChoose?.handOverWork?.trainDriver?.name}
                    </Typography>
                    <Typography>
                      MD: {dailyWorkChoose?.handOverWork?.loopRouteTrain?.start}
                    </Typography>
                    <Typography>
                      HD: {dailyWorkChoose?.handOverWork?.loopRouteTrain?.end}
                    </Typography>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell style={{ width: '15%' }}>
                    Catatan Kedinasan
                  </TableCell>
                  <TableCell style={{ width: 15 }}>:</TableCell>
                  <TableCell>
                    <TextField
                      multiline={true}
                      value={dailyWorkChoose?.handOverWork?.handOverNote}
                      onChange={(e) => {
                        let datachange = {
                          ...dailyWorkChoose,
                          handOverWork: {
                            ...dailyWorkChoose.handOverWork,
                            handOverNote: e.target.value,
                          },
                        }
                        console.log('datachange', datachange)
                        setDailyWorkChoose(datachange)
                      }}
                    />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell style={{ width: '15%' }}>
                    Status Kedinasan
                  </TableCell>
                  <TableCell style={{ width: 15 }}>:</TableCell>
                  <TableCell>
                    <Select
                      value={statusDailyWork}
                      onChange={(e) => {
                        setStatusDailyWork(e.target.value)
                      }}>
                      <MenuItem value='0'>Pilih Status</MenuItem>
                      <MenuItem value='1'>Sedang Bertugas</MenuItem>
                      <MenuItem value='2'>Selesai Bertugas</MenuItem>
                    </Select>
                  </TableCell>
                </TableRow>
              </Table>
            </>
          }
          cancel={handleClose}
          valueCancel={'Tutup'}
          valueConfirm={'Simpan'}
          confirm={async () => {
            if (statusDailyWork === '1') {
              const res = await updateDataScheduleTrainDriverStatus(
                dailyWorkChoose?._id,
                {
                  readTakeGive: true,
                  completeState: false,
                  handOverWork: dailyWorkChoose?.handOverWork,
                },
              )
              if (res.status) {
                handleClose()
                fetchDataHandOver()
              }
            }
            if (statusDailyWork === '2') {
              const res = await updateDataScheduleTrainDriverStatus(
                dailyWorkChoose?._id,
                {
                  readTakeGive: true,
                  completeState: true,
                  handOverWork: dailyWorkChoose?.handOverWork,
                },
              )
              if (res.status) {
                handleClose()
                fetchDataHandOver()
              }
            }
            if (statusDailyWork === '0') {
              const res = await updateDataScheduleTrainDriverStatus(
                dailyWorkChoose?._id,
                {
                  readTakeGive: false,
                  completeState: false,
                  handOverWork: dailyWorkChoose?.handOverWork,
                },
              )
              if (res.status) {
                handleClose()
                fetchDataHandOver()
              }
            }
          }}
          colorButtonConfirm={'#bf272b'}
        />

        <Container maxWidth='xl'>
          <Grid container>
            <Grid item xs={9}>
              <Typography variant='h3'>Serah Terima Dinas Penyelia</Typography>
            </Grid>
          </Grid>
          <Typography>Pilih Tanggal :</Typography>
          <TextField
            type='date'
            value={dateDailyWork}
            onChange={(e) => {
              let datework = e.target.value
              console.log('datework', datework)
              setDateDailyWork(datework)
            }}
          />
          <Button
            variant='contained'
            color='primary'
            onClick={() => fetchDataHandOver()}>
            Cari
          </Button>
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
                <TableCell style={tableTextCellStyle} align='center'>
                  Waktu Serah Terima
                </TableCell>
                <TableCell style={tableTextCellStyle} align='center'>
                  Kode Dinas
                </TableCell>

                <TableCell style={tableTextCellStyle} align='left'>
                  Penyelia
                </TableCell>
                <TableCell style={tableTextCellStyle} align='left'>
                  Penyelia Sebelumnya
                </TableCell>
                <TableCell style={tableTextCellStyle} align='left'>
                  Catatan
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
                dataScheduleTrainDriver,
                ['code', 'loop'],
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
                    <TableCell style={tableTextIsiStyle} align='center'>
                      {item?.handOverWork?.handOverTime
                        ? moment(item?.handOverWork?.handOverTime).format(
                            'DD-MM-YYYY HH:mm:ss',
                          )
                        : '-'}
                    </TableCell>
                    <TableCell style={tableTextIsiStyle} align='center'>
                      {item?.loopRouteTrain?.code} -{' '}
                      {item?.loopRouteTrain?.loop}
                    </TableCell>

                    <TableCell style={tableTextIsiStyle} align='left'>
                      {item?.trainDriver?.name} <br />
                      <small>NIK : {item?.trainDriver?.nik}</small>
                      <br />
                      <small>
                        MD: {item?.loopRouteTrain?.start} HD:{' '}
                        {item?.loopRouteTrain?.end}
                      </small>
                    </TableCell>
                    <TableCell style={tableTextIsiStyle} align='left'>
                      {item?.handOverWork?.trainDriver?.name}
                      <br />
                      {item?.handOverWork?.trainDriver?.nik ? (
                        <small>
                          NIK : {item?.handOverWork?.trainDriver?.nik}
                        </small>
                      ) : null}
                      <br />
                      {item?.handOverWork?.loopRouteTrain ? (
                        <small>
                          MD: {item?.handOverWork?.loopRouteTrain?.start} HD:{' '}
                          {item?.handOverWork?.loopRouteTrain?.end}
                        </small>
                      ) : (
                        ''
                      )}
                    </TableCell>
                    <TableCell style={tableTextIsiStyle} align='left'>
                      <small>
                        <i>{item?.handOverWork?.handOverNote}</i>
                      </small>
                    </TableCell>
                    <TableCell style={tableTextIsiStyle} align='center'>
                      {item?.completeState == true
                        ? 'Selesai'
                        : item?.readTakeGive == true
                        ? 'Sedang Bertugas'
                        : '-'}
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
                        color='primary'
                        onClick={() => {
                          openModalDialog(item)
                          if (item?.completeState == true) {
                            setStatusDailyWork('2')
                          } else {
                            if (item?.readTakeGive == true) {
                              setStatusDailyWork('1')
                            } else {
                              setStatusDailyWork('0')
                            }
                          }
                        }}>
                        Ubah Status
                      </Button>
                    </TableCell>
                  </TableRow>
                )
              })}

              {/* <TableRow>
                {' '}
                <TableCell colSpan={3} style={tableLeftIsiStyle} sx={{ bgcolor: '#fff' }} align="center">
                  Jumlah Isi
                </TableCell>
                <TableCell style={tableTextIsiStyle} sx={{ bgcolor: '#fff' }} align="center">
                  0
                </TableCell>
                <TableCell style={tableRightIsiStyle} sx={{ bgcolor: '#fff' }} align="center">
                  -
                </TableCell>
              </TableRow> */}
            </TableBody>
          </Table>

          {/* <Typography>Catatan</Typography>
          <TextField
            placeholder="Masukkan catatan disini "
            multiline
            sx={alamatStyle}
            style={border}
            inputProps={{
              style: {
                height: 75,
              },
            }}
            onChange={(e) => setAddress(e.target.value)}
            value={address}
          ></TextField> */}
        </Container>
      </Box>
    </>
  )
}
