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
} from '@mui/material'
import TableCell, { tableCellClasses } from '@mui/material/TableCell'
import { styled } from '@mui/material/styles'
import PropTypes from 'prop-types'
import { useTheme } from '@mui/material/styles'
import Select from 'react-select'
import { riwayatData } from './Data'
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
function TabPanel(props) {
  const { children, value, index, ...other } = props

  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}>
      {value === index && (
        <Box sx={{ p: 0, pt: 2, width: '100%' }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  )
}

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: '#BB7E36',
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}))

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: 'theme.palette.action.hover',
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}))

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
}

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  }
}

export default function WorkOrder() {
  const {
    fetchDataLoop,
    dataScheduleTrainDriver,
    getDataScheduleTrainDriver,
    dataLoopTrain,
    submitDataMonthlyWork,
  } = useDailyWork()
  const { trainDriver, getDataTrainDriver } = useTrainDriver()
  const {
    submitDataAbsence,
    handleOpen,
    selectTrainDriver,
    setSelectTrainDriver,
    openDialogDelete,
    getDataAbsence,
    absence,
    filterAbsence,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    note,
    setNote,
    listType,
    type,
    setType,
    openDialog,
    handleClose,
    monthlyWork,
    setMonthlyWork,
  } = UseAbsence()

  const theme = useTheme()
  const [dinasan, setDinasan] = useState('Masinis')

  const [dayNumber, setDayNumber] = useState([])
  const [openModalDinasan, setOpenModalDinasan] = useState(false)

  const [inputDailyWork, setInputDailyWork] = useState([])
  const [chooseTrainDriver, setChooseTrainDriver] = useState('0')

  const handleCloseDinasan = () => {
    setOpenModalDinasan(false)
  }

  useEffect(() => {
    let monthly = moment().format('YYYY-MM')
    setMonthlyWork(monthly)
    getDataTrainDriver()
    getDataAbsence({ monthly })

    fetchDataLoop(dinasan)
    if (monthlyWork === '') {
      getDataScheduleTrainDriver({ params: { monthlyWorkDate: monthly } })
      countDay(moment().format('M'))
    }
  }, [dinasan])

  const countDay = (month) => {
    if (
      month === '1' ||
      month === '3' ||
      month === '5' ||
      month === '7' ||
      month === '8' ||
      month === '10' ||
      month === '12'
    ) {
      let day = []
      for (let x = 1; x <= 31; x++) {
        day = [...day, x]
      }
      setDayNumber(day)
    }
    if (month === '4' || month === '6' || month === '9' || month === '11') {
      let day = []
      for (let x = 1; x <= 30; x++) {
        day = [...day, x]
      }
      setDayNumber(day)
    }
    if (month === '2') {
      let day = []
      for (let x = 1; x <= 28; x++) {
        day = [...day, x]
      }
      setDayNumber(day)
    }
  }

  return (
    <>
      <Dialog
        open={openDialog}
        onClose={handleClose}
        scroll='paper'
        maxWidth={'lg'}
        aria-labelledby='scroll-dialog-title'
        aria-describedby='scroll-dialog-description'>
        <DialogContent sx={{ width: 400 }}>
          <div>
            <Typography sx={{ fontSize: 13, fontWeight: 500 }}>
              Pilih Masinis atau Penyelia
            </Typography>
            <Select
              styles={selectBoxStyles}
              menuPortalTarget={document.body}
              placeholder={'Pilih Masinis atau Penyelia'}
              options={trainDriver}
              isSearchable={true}
              isClearable={true}
              value={trainDriver.filter(
                (option) => option.value === selectTrainDriver?.value,
              )}
              onChange={(selected) =>
                setSelectTrainDriver(selected ? selected : {})
              }
            />
          </div>
          <div style={{ marginTop: 10 }}>
            <Typography sx={{ fontSize: 13, fontWeight: 500 }}>
              Pilih Tipe Izin
            </Typography>
            <Select
              styles={selectBoxStyles}
              menuPortalTarget={document.body}
              placeholder='Pilih Izin'
              options={listType}
              isSearchable={true}
              isClearable={true}
              value={listType.filter((option) => option.value === type)}
              onChange={(selected) =>
                setType(selected.value ? selected.value : '')
              }
            />
          </div>
          <div style={{ marginTop: 10 }}>
            <Grid container justifyContent={'space-between'}>
              <div>
                <Typography sx={{ fontSize: 13, fontWeight: 500 }}>
                  Tanggal Mulai
                </Typography>
                <TextField
                  type='date'
                  InputProps={{
                    style: {
                      width: 160,
                      fontSize: 12,
                      height: 40,
                      backgroundColor: '#fff',
                      border: 'none',
                      borderRadius: 7,
                      boxShadow: 'inset 0px 2px 4px rgba(0, 0, 0, 0.25)',
                    },
                  }}
                  sx={{
                    width: 160,
                    mb: 2,
                  }}
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                />
              </div>
              <div>
                <Typography sx={{ fontSize: 13, fontWeight: 500 }}>
                  Tanggal Selesai
                </Typography>
                <TextField
                  type='date'
                  InputProps={{
                    style: {
                      width: 160,
                      fontSize: 12,
                      height: 40,
                      backgroundColor: '#fff',
                      border: 'none',
                      borderRadius: 7,
                      boxShadow: 'inset 0px 2px 4px rgba(0, 0, 0, 0.25)',
                    },
                  }}
                  sx={{
                    width: 160,
                    mb: 2,
                  }}
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                />
              </div>
            </Grid>
          </div>
          <div>
            <Typography sx={{ fontSize: 13, fontWeight: 500 }}>
              Catatan
            </Typography>
            <TextField
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder='Tulis Komentar Disini'
              InputProps={{
                style: {
                  fontSize: 12,
                  minHeight: 75,
                  backgroundColor: '#fff',
                },
              }}
              sx={noteStyles}
              fullWidth
              multiline
            />
          </div>
        </DialogContent>
        <DialogActions sx={{ m: 1 }}>
          <Button
            sx={{
              backgroundColor: '#ababab',
              color: '#fff',
              textTransform: 'none',
            }}
            onClick={handleClose}>
            Tutup
          </Button>
          <Button
            sx={{
              width: 150,
              color: '#fff',
              textTransform: 'none',
            }}
            variant='contained'
            onClick={submitDataAbsence}>
            Submit
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={openDialogDelete}
        onClose={handleClose}
        scroll='paper'
        maxWidth={'lg'}
        aria-labelledby='scroll-dialog-title'
        aria-describedby='scroll-dialog-description'>
        <DialogContent sx={{ width: 400 }}>
          <Typography>
            Apakah anda yakin menghapus izin dengan nama{' '}
            {selectTrainDriver?.name}
          </Typography>
        </DialogContent>
        <DialogActions sx={{ m: 1 }}>
          <Button
            sx={{
              backgroundColor: '#ababab',
              color: '#fff',
              textTransform: 'none',
            }}
            onClick={handleClose}>
            Tutup
          </Button>
          <Button
            sx={{
              width: 150,
              color: '#fff',
              textTransform: 'none',
            }}
            variant='contained'
            onClick={submitDataAbsence}>
            Hapus
          </Button>
        </DialogActions>
      </Dialog>

      <DialogComponent
        fullWidth={true}
        open={openModalDinasan}
        close={handleCloseDinasan}
        maxWidth={'sm'}
        title={
          <Typography style={{ color: '#bf272b' }}>
            Isikan Jadwal Dinasan dibawah ini
          </Typography>
        }
        content={
          <>
            <Typography>
              Pilih Nama :
              <Select
                options={[
                  { value: '0', label: 'Pilih Nama' },
                  ...trainDriver
                    .filter((x) => x.jobrole === dinasan)
                    .map((x) => ({ value: x._id, label: x.name })),
                ]}
                value={
                  trainDriver
                    .filter(
                      (x) =>
                        x.jobrole === dinasan && x._id === chooseTrainDriver,
                    )
                    .map((x) => ({ value: x._id, label: x.name }))[0]
                }
                onChange={(selectedOption) =>
                  setChooseTrainDriver(selectedOption.value)
                }
              />
            </Typography>
            <Table size='small'>
              <TableRow>
                <TableCell style={{ width: 20 }}>Tgl</TableCell>
                <TableCell>Kode Dinasan</TableCell>
              </TableRow>
              {dayNumber.map((itemday) => {
                let schedule = dataScheduleTrainDriver
                  .filter((x) => x?.trainDriver?._id === chooseTrainDriver)
                  .map((itemdetail) => {
                    return {
                      day: moment(itemdetail.dailyWorkDate).format('D'),
                      data: itemdetail,
                    }
                  })
                let schedulechoose = schedule
                  .filter((x) => x.day.toString() === itemday.toString())
                  .map((y) => y.data)
                return (
                  <TableRow>
                    {/* {
                        JSON.stringify(schedule)
                      }
                      {
                        JSON.stringify(chooseTrainDriver)
                      } */}
                    <TableCell>{itemday}</TableCell>
                    <TableCell>
                      <Select
                        options={[
                          { value: '0', label: 'Pilih Dinas' },
                          ...dataLoopTrain.map((x) => {
                            return { value: x._id, label: x.code }
                          }),
                        ]}
                        value={
                          schedulechoose.map((x) => {
                            return {
                              value: x._id,
                              label: x?.loopRouteTrain?.code,
                            }
                          })[0]
                        }
                        onChange={(selectedOption) => {
                          if (selectedOption.value !== '0') {
                            setInputDailyWork([
                              ...inputDailyWork,
                              { day: itemday, work: selectedOption },
                            ])
                          } else {
                            setInputDailyWork(
                              inputDailyWork.filter((x) => x.day !== itemday),
                            )
                          }
                          //setInputDailyWork
                        }}
                      />
                    </TableCell>
                  </TableRow>
                )
              })}
            </Table>
          </>
        }
        cancel={handleCloseDinasan}
        valueCancel={'Tutup'}
        colorButtonConfirm={'#bf272b'}
        valueConfirm={'Simpan'}
        submit={true}
        confirm={() => {
          console.log('input', inputDailyWork)
          let datapostArray = []
          inputDailyWork.forEach(async (itemInput) => {
            console.log('filter', itemInput?.work)
            console.log(
              'dataloop',
              dataLoopTrain.filter((x) => x._id === itemInput?.work?.value),
            )
            if (
              dataLoopTrain.filter((x) => x._id === itemInput?.work?.value)
                .length > 0
            ) {
              let dataloopTrain = dataLoopTrain.filter(
                (x) => x._id === itemInput?.work?.value,
              )[0]
              let loopRouteFormat = {}
              if (dinasan === 'Masinis') {
                loopRouteFormat = {
                  ...dataloopTrain,
                  route: dataloopTrain?.route.map((itemloop) => {
                    let station = []
                    if (Number(itemloop) % 2 > 0) {
                      station = dataloopTrain?.station
                        .filter((x) => x.flag === 'Ganjil')[0]
                        .stationList.map((item) => {
                          return {
                            ...item,
                            start: '',
                            end: '',
                            status: '',
                            duration: 0,
                            dweelingTime: 0,
                          }
                        })
                    } else {
                      station = dataloopTrain?.station
                        .filter((x) => x.flag === 'Genap')[0]
                        .stationList.map((item) => {
                          return {
                            ...item,
                            start: '',
                            end: '',
                            status: '',
                            duration: 0,
                            dweelingTime: 0,
                          }
                        })
                    }
                    return {
                      trainNumber: itemloop,
                      startTime: '',
                      endTime: '',
                      duration: 0,
                      dweelingTime: 0,
                      status: '',
                      note: itemloop.note,
                      station,
                    }
                  }),
                }
              } else {
                loopRouteFormat = {
                  ...dataloopTrain,
                  route: dataloopTrain?.route,
                }
              }
              // let loopRouteFormat = {
              //   ...dataloopTrain,
              //   route : dataloopTrain?.route.map(itemloop=>{

              //       let station  = []
              //       if(Number(itemloop)%2 > 0){
              //         station =  dataloopTrain?.station.filter(x=>x.flag === "Ganjil")[0].stationList.map(item=>{
              //           return(
              //             {
              //               ...item,
              //               start: "",
              //               end : "",
              //               status : "",
              //               duration :0,
              //               dweelingTime : 0
              //             }
              //           )
              //         })
              //       }
              //       else{
              //         station =  dataloopTrain?.station.filter(x=>x.flag === "Genap")[0].stationList.map(item=>{
              //           return(
              //             {
              //               ...item,
              //               start: "",
              //               end : "",
              //               status : "",
              //               duration :0,
              //               dweelingTime : 0
              //             }
              //           )
              //         })
              //       }
              //       return {
              //         trainNumber: itemloop,
              //         startTime: "",
              //         endTime: "",
              //         duration: 0,
              //         dweelingTime:0,
              //         status: "",
              //         note: itemloop.note,
              //         station
              //       };
              //     })
              // }
              let dailyDate = ''
              if (itemInput.day < 10) {
                dailyDate = monthlyWork + '-0' + itemInput.day + ' 07:00:00'
              } else {
                dailyDate = monthlyWork + '-' + itemInput.day + ' 07:00:00'
              }
              let datapost = {
                dailyWorkDate: dailyDate,
                trainDriver: trainDriver.filter(
                  (x) => x._id === chooseTrainDriver,
                )[0],
                // supervisor: profileUser,
                loopRouteTrain: loopRouteFormat,
                createDate: new Date(),
              }

              datapostArray = [...datapostArray, datapost]
              // console.log("datapost", datapost);
              // console.log("datapdatapostArrayost", datapostArray);
              if (datapostArray.length === inputDailyWork.length) {
                console.log('datapostArray', datapostArray)
                const response = await submitDataMonthlyWork(
                  datapostArray,
                  monthlyWork,
                )
                if (response.status) {
                  handleCloseDinasan()
                }
              }
            }

            //submitDataDailyWork(datapost, dateDailyWork);
          })

          // var loopRouteFormat = {
          //   ...loopRouteTrainChoose,
          //   route: loopRouteTrainChoose.route.map((x) => {
          //     return {
          //       trainNumber: x,
          //       startTime: "",
          //       endTime: "",
          //       duration: 0,
          //       status: "",
          //       note: x.note,
          //     };
          //   }),
          // };

          // handleClose();
          //handleCloseDinasan()
        }}
      />

      <Box sx={{ display: 'flex', pl: 8, pt: 13 }}>
        <Container maxWidth='xl'>
          <Grid container>
            <Grid item xs={9}>
              <Typography variant='h5'>
                Jadwal Kedinasan Bulanan Masinis{' '}
              </Typography>
            </Grid>
          </Grid>
          <Typography>Pilih Bulan :</Typography>
          <TextField
            type='month'
            value={monthlyWork}
            onChange={(e) => setMonthlyWork(e.target.value)}
          />
          <Button
            variant='contained'
            color='primary'
            onClick={() => {
              getDataScheduleTrainDriver({
                params: { monthlyWorkDate: monthlyWork },
              })
              getDataAbsence({ monthly: monthlyWork })
              let datemonth = moment(monthlyWork).format('M')
              countDay(datemonth)
            }}>
            Cari
          </Button>
          <ButtonGroup
            variant='contained'
            aria-label='large button group'
            style={{ width: '100%', marginTop: 5, marginBottom: 5 }}>
            <Button
              style={{ width: '100%' }}
              onClick={() => {
                fetchDataLoop('Masinis')
                setDinasan('Masinis')
              }}>
              Masinis
            </Button>
            <Button
              style={{ width: '100%' }}
              onClick={() => {
                fetchDataLoop('Penyelia')
                setDinasan('Penyelia')
              }}>
              Penyelia
            </Button>
            <Button
              style={{ width: '100%' }}
              onClick={() => {
                fetchDataLoop('Penyelia')
                setDinasan('Daftar Izin')
              }}>
              Daftar Izin
            </Button>
          </ButtonGroup>

          {dinasan === 'Daftar Izin' ? (
            <div>
              <Grid container justifyContent='flex-end'>
                <Button
                  variant='contained'
                  onClick={() => handleOpen({}, 'add')}>
                  Tambah Daftar Izin
                </Button>
              </Grid>
              <Table
                sx={{ borderRadius: 3, mb: 3, mt: 2, width: '100%' }}
                aria-label='simple table'>
                <TableHead>
                  <StyledTableRow
                    style={{ backgroundColor: '#fff', height: 40 }}>
                    <StyledTableCell
                      style={{ width: 10, textAlign: 'center', padding: 5 }}>
                      No
                    </StyledTableCell>
                    <StyledTableCell style={{ padding: 5 }}>
                      Nama Masinis
                    </StyledTableCell>
                    <StyledTableCell style={{ padding: 5 }}>
                      Ketidakhadiran
                    </StyledTableCell>
                    <StyledTableCell style={{ padding: 5 }}>
                      Tanggal Mulai
                    </StyledTableCell>
                    <StyledTableCell style={{ padding: 5 }}>
                      Tanggal Selesai
                    </StyledTableCell>
                    <StyledTableCell style={{ padding: 5 }}>
                      Catatan
                    </StyledTableCell>
                    <StyledTableCell style={{ width: 300, padding: 5 }}>
                      Aksi
                    </StyledTableCell>
                  </StyledTableRow>
                </TableHead>
                <TableBody>
                  {filterAbsence.map((item, index) => (
                    <StyledTableRow
                      style={{
                        backgroundColor: '#fff',
                        paddingTop: 10,
                        paddingBottom: 10,
                      }}>
                      <StyledTableCell
                        style={{ width: 10, textAlign: 'center', padding: 5 }}>
                        <Typography sx={{ fontSize: 13, fontWeight: 500 }}>
                          {index + 1}
                        </Typography>
                      </StyledTableCell>
                      <StyledTableCell style={{ padding: 5 }}>
                        <Typography sx={{ fontSize: 13, fontWeight: 500 }}>
                          {item?.trainDriver?.name}
                        </Typography>
                        <Typography sx={{ fontSize: 13, fontWeight: 500 }}>
                          {item?.trainDriver?.role}
                        </Typography>
                        <Typography sx={{ fontSize: 13, fontWeight: 500 }}>
                          {item?.trainDriver?.nik}
                        </Typography>
                      </StyledTableCell>
                      <StyledTableCell style={{ padding: 5 }}>
                        <Typography sx={{ fontSize: 13, fontWeight: 500 }}>
                          {item?.type}
                        </Typography>
                      </StyledTableCell>
                      <StyledTableCell style={{ padding: 5 }}>
                        <Typography sx={{ fontSize: 13, fontWeight: 500 }}>
                          {moment(item?.startDate).format('DD-MM-YYYY')}
                        </Typography>
                      </StyledTableCell>
                      <StyledTableCell style={{ padding: 5 }}>
                        <Typography sx={{ fontSize: 13, fontWeight: 500 }}>
                          {moment(item?.endDate).format('DD-MM-YYYY')}
                        </Typography>
                      </StyledTableCell>
                      <StyledTableCell style={{ padding: 5 }}>
                        <Typography sx={{ fontSize: 13, fontWeight: 500 }}>
                          {item?.note}
                        </Typography>
                      </StyledTableCell>
                      <StyledTableCell style={{ padding: 5 }}>
                        <Button
                          size='small'
                          color='warning'
                          variant='contained'
                          sx={{ mr: 2 }}
                          onClick={() => handleOpen(item, 'edit')}>
                          <Typography sx={{ fontSize: 13, fontWeight: 500 }}>
                            Ubah
                          </Typography>
                        </Button>
                        <Button
                          size='small'
                          color='secondary'
                          variant='contained'
                          onClick={() => handleOpen(item, 'delete')}>
                          <Typography sx={{ fontSize: 13, fontWeight: 500 }}>
                            Hapus
                          </Typography>
                        </Button>
                      </StyledTableCell>
                    </StyledTableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          ) : (
            <div>
              <Grid container justifyContent='flex-start'>
                <Typography>Dinasan : {dinasan}</Typography>
              </Grid>

              <Button
                variant='contained'
                color='primary'
                onClick={() => setOpenModalDinasan(true)}>
                Tambah Dinas
              </Button>

              <Table
                sx={{ borderRadius: 3, mb: 3, mt: 2 }}
                aria-label='simple table'>
                <TableHead>
                  <TableRow style={{ backgroundColor: '#C4C4C4' }}>
                    <TableCell
                      style={{ width: 10, textAlign: 'center', padding: 5 }}>
                      No
                    </TableCell>
                    <TableCell style={{ width: 300, padding: 5 }}>
                      Nama Masinis
                    </TableCell>
                    {dayNumber.map((item) => {
                      return (
                        <TableCell
                          style={{
                            fontSize: 12,
                            color: '#000',
                            fontWeight: 'bold',
                          }}
                          align='center'>
                          {item}
                        </TableCell>
                      )
                    })}
                  </TableRow>
                </TableHead>

                <TableBody>
                  {_.orderBy(
                    trainDriver.filter((x) => x.jobrole === dinasan),
                    ['name'],
                    ['asc'],
                  ).map((item, index) => {
                    return (
                      <TableRow
                        key={index++}
                        // sx={{
                        //   borderSpacing: '5px',
                        //   borderBottom: '30',
                        //   borderRadius: 3,
                        // }}
                        style={{
                          borderCollapse: 'seperate',
                          //borderSpacing: '5px',
                          backgroundColor: '#F3F3F3',
                          border: '5px solid #F6F7FF',
                        }}>
                        <TableCell
                          style={{
                            width: 10,
                            textAlign: 'center',
                            padding: 5,
                          }}>
                          {index + 1}
                        </TableCell>

                        <TableCell
                          style={{ width: 300, padding: 5 }}
                          component={Link}
                          to={
                            'monthlywork/reportdetail?id=' +
                            item._id +
                            '&nik=' +
                            item?.nik
                          }>
                          {item.name}
                          <br />
                          <small style={{ fontSize: 10 }}>{item.jobrole}</small>
                          <br />
                          <small style={{ fontSize: 10 }}>
                            NIK : {item.nik}
                          </small>
                        </TableCell>

                        {dayNumber.map((itemdate) => {
                          var datatraindriverschedule = dataScheduleTrainDriver
                            .filter(
                              (x) =>
                                x.trainDriver?._id.toString() === item?._id,
                            )
                            .map((itemdetail) => {
                              return {
                                day: moment(itemdetail.dailyWorkDate).format(
                                  'D',
                                ),
                                data: itemdetail,
                              }
                            })
                          let work = false
                          let data_dinasan = ''
                          if (
                            datatraindriverschedule.filter(
                              (x) => x.day === itemdate.toString(),
                            ).length > 0
                          ) {
                            work = true
                            data_dinasan = datatraindriverschedule.filter(
                              (x) => x.day === itemdate.toString(),
                            )[0]?.data?.loopRouteTrain?.code
                          }

                          let absenceCuti = false
                          let absence = false
                          filterAbsence
                            .filter(
                              (x) =>
                                x?.trainDriver?._id === item._id &&
                                x?.type === 'Cuti',
                            )
                            .forEach((item) => {
                              item.absenceDate.forEach((itemAbsence) => {
                                if (
                                  moment(itemAbsence).format('DD') ===
                                  itemdate.toString()
                                ) {
                                  absenceCuti = true
                                  absence = true
                                }
                              })
                            })

                          let absenceSakit = false
                          filterAbsence
                            .filter(
                              (x) =>
                                x?.trainDriver?._id === item._id &&
                                x?.type === 'Sakit',
                            )
                            .forEach((item) => {
                              item.absenceDate.forEach((itemAbsence) => {
                                if (
                                  moment(itemAbsence).format('DD') ===
                                  itemdate.toString()
                                ) {
                                  absenceSakit = true
                                  absence = true
                                }
                              })
                            })

                          return (
                            <TableCell
                              style={{
                                backgroundColor: work
                                  ? 'greenyellow'
                                  : absence
                                  ? 'red'
                                  : 'inherit',
                                border: '1px solid #CFCFCF',
                                color: absence ? 'white' : 'inherit',
                              }}>
                              {data_dinasan}
                              {absenceCuti
                                ? 'Cuti'
                                : absenceSakit
                                ? 'Sakit'
                                : null}
                            </TableCell>
                          )
                        })}
                      </TableRow>
                    )
                  })}
                </TableBody>
              </Table>
            </div>
          )}
        </Container>
      </Box>
    </>
  )
}
