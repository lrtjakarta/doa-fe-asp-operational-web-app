import { React, useState, useEffect, useContext } from 'react'
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
  TextField,
  Button,
  ButtonGroup,
  TableContainer,
  Tooltip,
  CircularProgress,
  Backdrop,
  InputAdornment,
  IconButton,
} from '@mui/material'
// icon
import SearchIcon from '@mui/icons-material/Search'
import TableCell, { tableCellClasses } from '@mui/material/TableCell'
import { styled } from '@mui/material/styles'
import Select from 'react-select'
import { selectBoxStyles, StickyTableCell } from './Styles'
import moment from 'moment'
import _ from 'lodash'
import useDailyWork from '../../Hooks/DailyWorkPlanning/useDailyWork'
import useTrainDriver from '../../Hooks/TrainDriver/useTrainDriver'
import UseAbsence from '../../Hooks/Absence/useAbsence'
import { Container } from '@material-ui/core'
import DialogComponent from '../../Component/Dialog/Dialog'
import { ProfileContext, StationMasterContext } from 'Context'
import { CSVLink } from 'react-csv'
import DownloadForOfflineIcon from '@mui/icons-material/DownloadForOffline'

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

// TabPanel.propTypes = {
//   children: PropTypes.node,
//   index: PropTypes.number.isRequired,
//   value: PropTypes.number.isRequired,
// };

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  }
}

export default function MonthlyWork(props) {
  const {
    fetchDataLoop,
    dataScheduleTrainDriver,
    dataScheduleTrainDriverRealisasi,
    getDataScheduleTrainDriver,
    getDataScheduleTrainDriverRealisasi,
    dataLoopTrain,
    submitDataDailyWorkRealisasi,
    submitDataMonthlyWork,
    cancelDailyWork,
    loadingSubmit,
    cancelDailyWorkRealisasi,
  } = useDailyWork()
  const { trainDriver, getDataTrainDriver } = useTrainDriver()
  const {
    submitDataAbsence,
    handleOpen,
    selectTrainDriver,
    setSelectTrainDriver,
    openDialogDelete,
    getDataAbsence,
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
  const { profileUser, getProfileUser } = useContext(ProfileContext)

  const [loader, setLoader] = useState(false)
  const [dinasan, setDinasan] = useState('Masinis')
  const [dayNumber, setDayNumber] = useState([])
  const [openModalDinasan, setOpenModalDinasan] = useState(false)
  const [openModalSinkronisasi, setOpenModalSinkronisasi] = useState(false)
  const [deletedata, setdeletedata] = useState(false)
  const [inputDailyWork, setInputDailyWork] = useState([])
  const [inputDailyWork2, setInputDailyWork2] = useState([])
  const [chooseTrainDriver, setChooseTrainDriver] = useState('0')
  const [reportMonthlyExport, setReportMonthlyExport] = useState([])
  const { getTimeTable, timetables } = useContext(StationMasterContext)

  const handleCloseDinasan = () => {
    setOpenModalDinasan(false)
    setOpenModalSinkronisasi(false)
  }

  const loadData = async (monthly) => {
    await setLoader(true)
    let datemonth = moment(monthly).format('M')
    let _dayNumber = await countDay(datemonth)
    await getDataScheduleTrainDriver({ params: { monthlyWorkDate: monthly } })
    const dataTrainDriver = await getDataTrainDriver()
    const dataRealisasi = await getDataScheduleTrainDriverRealisasi({
      params: {
        monthlyWorkDate: monthly,
        projection: {
          dailyWorkDate: 1,
          trainDriver: {
            _id: '$trainDriver._id',
            name: '$trainDriver.name',
          },
          loopRouteTrain: {
            _id: '$loopRouteTrain._id',
            code: '$loopRouteTrain.code',
            loop: '$loopRouteTrain.loop',
          },
        },
      },
    })
    const dataAbsence = await getDataAbsence({ monthly })

    let dataReportMonthly = []
    _.orderBy(
      dataTrainDriver.filter(
        (x) => x.jobrole === 'Masinis' || x.jobrole === 'Asisten Masinis',
      ),
      ['index'],
      ['asc'],
    ).forEach((itemTrainDriver, index) => {
      let dateField = {}
      _dayNumber.forEach((itemdate) => {
        let datascheduleRealisasiList = dataRealisasi.filter(
          (x) =>
            x.trainDriver?._id.toString() === itemTrainDriver?._id &&
            moment(x.dailyWorkDate).format('D') === itemdate.toString(),
        )

        let dinas_realisasi = '-'
        if (datascheduleRealisasiList.length > 0) {
          if (datascheduleRealisasiList.length > 1) {
            dinas_realisasi =
              datascheduleRealisasiList[0]?.loopRouteTrain?.code +
              ' dan ' +
              datascheduleRealisasiList[1]?.loopRouteTrain?.code
          } else {
            dinas_realisasi = datascheduleRealisasiList[0]?.loopRouteTrain?.code
          }
        }

        let noteAbsense = ''
        dataAbsence.result
          .filter((x) => x?.trainDriver?._id.toString() === itemTrainDriver._id)
          .forEach((item) => {
            item.absenceDate.forEach((itemAbsence) => {
              if (
                moment(itemAbsence).format('D') === itemdate.toString() &&
                moment(itemAbsence).format('YYYY-MM') === monthly
              ) {
                noteAbsense = item.type
              }
            })
          })

        dateField['_d' + itemdate] =
          noteAbsense !== '' ? noteAbsense : dinas_realisasi
        // dateField["_d"+itemdate] = dinas_realisasi
      })

      let dataItem = Object.assign(
        {},
        {
          No: index + 1,
          Nama: itemTrainDriver.name,
          NIK: '.' + itemTrainDriver.nik,
        },
        dateField,
      )
      dataReportMonthly = [...dataReportMonthly, dataItem]
    })
    setReportMonthlyExport(dataReportMonthly)
    await setLoader(false)
  }

  useEffect(() => {
    getTimeTable()
    fetchDataLoop(dinasan)
    if (monthlyWork === '') {
      let monthly = moment().format('YYYY-MM')
      setMonthlyWork(monthly)
      loadData(monthly)

      // countDay(moment().format("M"))
      // getDataScheduleTrainDriver({params:{monthlyWorkDate:monthly}})
      // getDataScheduleTrainDriverRealisasi({params:{monthlyWorkDate:monthly}})
      // getDataAbsence({monthly})
    }
    // if(dinasan === "Daftar Izin"){
    //   getDataAbsence({monthly})
    // }
    // else{
    //   fetchDataLoop()
    //   if(monthlyWork === ""){
    //     getDataScheduleTrainDriver({params:{monthlyWorkDate:monthly}})
    //     countDay(moment().format("M"))
    //   }
    // }
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
      return day
    }
    if (month === '4' || month === '6' || month === '9' || month === '11') {
      let day = []
      for (let x = 1; x <= 30; x++) {
        day = [...day, x]
      }
      setDayNumber(day)
      return day
    }
    if (month === '2') {
      let day = []
      //Kabisat
      for (let x = 1; x <= 29; x++) {
        day = [...day, x]
      }
      setDayNumber(day)
      return day
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
              options={[
                { value: '0', label: 'Pilih Nama' },
                ...trainDriver.map((x) => {
                  return { label: x.name, value: x._id }
                }),
              ]}
              isSearchable={true}
              isClearable={true}
              //value={trainDriver.filter(option => option.value === selectTrainDriver?.value)}
              value={selectTrainDriver}
              onChange={(selected) =>
                setSelectTrainDriver(
                  selected ? selected : { label: 'Pilih', value: '0' },
                )
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
              multiline
              fullWidth
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
            onClick={async () => {
              submitDataAbsence()
              let _realisasi = await getDataScheduleTrainDriverRealisasi({
                params: {
                  trainDriverId: selectTrainDriver.value,
                  startDate,
                  endDate,
                },
              })
              let _planning = await getDataScheduleTrainDriver({
                params: {
                  trainDriverId: selectTrainDriver.value,
                  startDate,
                  endDate,
                },
              })
              _realisasi.forEach((itemRealisasi) => {
                cancelDailyWorkRealisasi(
                  itemRealisasi._id,
                  '',
                  monthlyWork,
                  true,
                )
              })
              _planning.forEach((itemPlanning) => {
                cancelDailyWork(itemPlanning._id, '', monthlyWork, true)
              })
            }}>
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
          <Typography style={{ color: '#0D3879', fontSize: 13 }}>
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
                    .filter(
                      (x) =>
                        x.jobrole === dinasan ||
                        x.jobrole ===
                          (dinasan === 'Masinis' ? 'Asisten Masinis' : ''),
                    )
                    .map((x) => ({ value: x._id, label: x.name })),
                ]}
                value={
                  trainDriver
                    .filter(
                      (x) =>
                        (x.jobrole === dinasan ||
                          x.jobrole ===
                            (dinasan === 'Masinis' ? 'Asisten Masinis' : '')) &&
                        x._id === chooseTrainDriver,
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
                <TableCell>Kode Dinasan - 1</TableCell>
                <TableCell>Kode Dinasan - 2</TableCell>
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
                  <>
                    {schedulechoose.length == 0 ? (
                      <TableRow>
                        <TableCell>{itemday}</TableCell>
                        <TableCell>
                          <Select
                            options={[
                              { value: '0', label: 'Pilih Dinas' },
                              ..._.orderBy(
                                dataLoopTrain.map((x) => {
                                  return { value: x._id, label: x.code }
                                }),
                                ['value'],
                                'asc',
                              ),
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
                                if (
                                  inputDailyWork.filter((x) => x.day == itemday)
                                    .length > 0
                                ) {
                                  let datachange = inputDailyWork.map((x) => {
                                    if (x.day == itemday) {
                                      return { ...x, work: selectedOption }
                                    } else {
                                      return x
                                    }
                                  })
                                  setInputDailyWork(datachange)
                                } else {
                                  setInputDailyWork([
                                    ...inputDailyWork,
                                    { day: itemday, work: selectedOption },
                                  ])
                                }
                              } else {
                                setInputDailyWork(
                                  inputDailyWork.filter(
                                    (x) => x.day !== itemday,
                                  ),
                                )
                              }
                            }}
                          />
                        </TableCell>
                        <TableCell>
                          <Select
                            options={[
                              { value: '0', label: 'Pilih Dinas' },
                              ..._.orderBy(
                                dataLoopTrain.map((x) => {
                                  return { value: x._id, label: x.code }
                                }),
                                ['value'],
                                'asc',
                              ),
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
                                if (
                                  inputDailyWork2.filter(
                                    (x) => x.day == itemday,
                                  ).length > 0
                                ) {
                                  let datachange = inputDailyWork2.map((x) => {
                                    if (x.day == itemday) {
                                      return { ...x, work: selectedOption }
                                    } else {
                                      return x
                                    }
                                  })
                                  setInputDailyWork2(datachange)
                                } else {
                                  setInputDailyWork2([
                                    ...inputDailyWork2,
                                    { day: itemday, work: selectedOption },
                                  ])
                                }
                              } else {
                                setInputDailyWork2(
                                  inputDailyWork2.filter(
                                    (x) => x.day !== itemday,
                                  ),
                                )
                              }
                            }}
                          />
                        </TableCell>
                      </TableRow>
                    ) : null}
                  </>
                )
              })}
            </Table>
          </>
        }
        cancel={handleCloseDinasan}
        valueCancel={'Tutup'}
        colorButtonConfirm={'#0D3879'}
        valueConfirm={'Simpan'}
        submit={true}
        confirm={() => {
          let datapostArray = []
          let dataInput = [...inputDailyWork, ...inputDailyWork2]
          dataInput.forEach(async (itemInput) => {
            if (
              dataLoopTrain.filter((x) => x._id === itemInput?.work?.value)
                .length > 0
            ) {
              let dataloopTrain = dataLoopTrain.filter(
                (x) => x._id === itemInput?.work?.value,
              )[0]

              let loopRouteFormat = {}
              if (dinasan === 'Masinis') {
                if (dataloopTrain?.route.length > 0) {
                  loopRouteFormat = {
                    ...dataloopTrain,
                    route: dataloopTrain?.route.map((itemloop) => {
                      let station = []
                      if (Number(itemloop) % 2 > 0) {
                        station = _.orderBy(
                          dataloopTrain?.station.filter(
                            (x) => x.flag === 'Ganjil',
                          )[0].stationList,
                          ['loopIndex'],
                          ['asc'],
                        ).map((item) => {
                          let datadistance = timetables.filter(
                            (x) =>
                              x.flag === 'Ganjil' &&
                              x.stationCode === item.stationCode,
                          )[0]
                          let datatimetable = datadistance?.route.filter(
                            (x) => x.route === itemloop,
                          )[0]
                          return {
                            ...item,
                            start: '',
                            end: '',
                            status: '',
                            duration: 0,
                            dweelingTime: 0,
                            startPlan: datatimetable?.start,
                            endPlan: datatimetable?.end,
                            distance: datadistance?.distance,
                            vOps: datadistance?.vOps,
                            vMax: datadistance?.vMax,
                          }
                        })
                      } else {
                        station = _.orderBy(
                          dataloopTrain?.station.filter(
                            (x) => x.flag === 'Genap',
                          )[0].stationList,
                          ['loopIndex'],
                          ['asc'],
                        ).map((item) => {
                          let datadistance = timetables.filter(
                            (x) =>
                              x.flag === 'Genap' &&
                              x.stationCode === item.stationCode,
                          )[0]
                          let datatimetable = datadistance?.route.filter(
                            (x) => x.route === itemloop,
                          )[0]
                          return {
                            ...item,
                            start: '',
                            end: '',
                            status: '',
                            duration: 0,
                            dweelingTime: 0,
                            startPlan: datatimetable?.start,
                            endPlan: datatimetable?.end,
                            distance: datadistance?.distance,
                            vOps: datadistance?.vOps,
                            vMax: datadistance?.vMax,
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
              } else {
                loopRouteFormat = {
                  ...dataloopTrain,
                  route: dataloopTrain?.route,
                }
              }

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
              if (datapostArray.length === dataInput.length) {
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

      <DialogComponent
        fullWidth={true}
        open={openModalSinkronisasi}
        close={handleCloseDinasan}
        maxWidth={'sm'}
        title={
          <Typography style={{ color: '#bf272b' }}>
            Sinkronisasi Data
          </Typography>
        }
        content={
          <>
            <Typography>
              Harap bersabar. Sistem sedang melakukan sinkronisasi menjadi data
              harian. Jangan Tutup Dialog ini sampai proses telah selesai.
            </Typography>
          </>
        }
        cancel={handleCloseDinasan}
        valueCancel={'Tutup'}
        colorButtonConfirm={'#bf272b'}
        valueConfirm={'Selesai'}
        submit={false}
        confirm={() => {}}
      />

      {/* Loader */}
      <Backdrop
        sx={{ color: '#fff', zIndex: 99999 }}
        open={loader}
        onClick={() => setLoader(false)}>
        <CircularProgress color='inherit' />
      </Backdrop>

      <Box sx={{ display: 'flex', pt: 12 }}>
        <Container maxWidth='xl'>
          <Grid container>
            <Grid item xs={9}>
              <Typography variant='h4'>Jadwal Kedinasan Bulanan </Typography>
            </Grid>
          </Grid>
          <Typography>Pilih Bulan :</Typography>
          <Grid container mb={1}>
            <div style={{ display: 'flex', flex: 1 }}>
              <TextField
                placeholder='Pencarian'
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
                type='month'
                value={monthlyWork}
                onChange={(e) => setMonthlyWork(e.target.value)}
              />
              <Button
                sx={{ mr: 1, ml: 1 }}
                variant='contained'
                color='primary'
                onClick={() => {
                  loadData(monthlyWork)
                }}>
                Cari
              </Button>
              {deletedata ? (
                <Button
                  variant='contained'
                  color='secondary'
                  onClick={() => setdeletedata(false)}>
                  Batal
                </Button>
              ) : (
                <Button
                  variant='contained'
                  color='error'
                  onClick={() => setdeletedata(true)}>
                  Hapus
                </Button>
              )}
              <Button
                variant='contained'
                color='primary'
                sx={{ ml: 1 }}
                onClick={() => {
                  setOpenModalDinasan(true)
                  setInputDailyWork([])
                  setInputDailyWork2([])
                }}>
                Tambah Dinas
              </Button>
            </div>
            <div
              style={{ display: 'flex', justifyContent: 'flex-end', flex: 1 }}>
              <CSVLink
                data={reportMonthlyExport}
                filename={`DinasBulanan-${monthlyWork}.csv`}
                separator=';'>
                <Button variant='contained' sx={{ bgcolor: '#31C126' }}>
                  <DownloadForOfflineIcon />
                  Unduh Excel
                </Button>
              </CSVLink>
              <Button
                variant='contained'
                sx={{ ml: 1, bgcolor: '#176A4E' }}
                onClick={() => {
                  props.history.push('/app/operational/monthlywork/import')
                  // handleOpen({}, 'add')
                }}>
                Import Excel
              </Button>
              <Button
                variant='contained'
                sx={{ ml: 1 }}
                onClick={() => handleOpen({}, 'add')}>
                Tambah Daftar Izin
              </Button>
            </div>
          </Grid>

          <ButtonGroup
            variant='contained'
            aria-label='large button group'
            style={{ width: '100%', marginBottom: 5 }}>
            <Button
              sx={{
                color: dinasan === 'Masinis' ? '#fff' : 'gray',
                bgcolor: dinasan === 'Masinis' ? '#BB7E36' : '#DCDCDC',
                width: '100%',
                cursor: 'pointer',
                '&:hover': {
                  backgroundColor: '#BB7E36',
                  color: '#fff',
                  textDecoration: 'none',
                },
              }}
              onClick={() => {
                fetchDataLoop('Masinis')
                setDinasan('Masinis')
              }}>
              Masinis
            </Button>
            <Button
              sx={{
                color: dinasan === 'Penyelia' ? '#fff' : 'gray',
                bgcolor: dinasan === 'Penyelia' ? '#BB7E36' : '#DCDCDC',
                width: '100%',
                cursor: 'pointer',
                '&:hover': {
                  backgroundColor: '#BB7E36',
                  color: '#fff',
                  textDecoration: 'none',
                },
              }}
              onClick={() => {
                fetchDataLoop('Penyelia')
                setDinasan('Penyelia')
              }}>
              Penyelia
            </Button>
            <Button
              sx={{
                color: dinasan === 'Daftar Izin' ? '#fff' : 'gray',
                bgcolor: dinasan === 'Daftar Izin' ? '#BB7E36' : '#DCDCDC',
                width: '100%',
                cursor: 'pointer',
                '&:hover': {
                  backgroundColor: '#BB7E36',
                  color: '#fff',
                  textDecoration: 'none',
                },
              }}
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
              {/* <Grid container justifyContent='flex-start'>
                <Typography>Dinasan : {dinasan}</Typography>
              </Grid> */}
              <Typography>Legend : </Typography>
              <div style={{ display: 'flex' }}>
                <div
                  style={{
                    width: 30,
                    height: 30,
                    backgroundColor: 'orange',
                  }}></div>
                <p style={{ marginTop: 2, marginLeft: 2 }}>
                  Plan dan Realisasi tidak sesuai
                </p>
                <div
                  style={{
                    marginLeft: 20,
                    width: 30,
                    height: 30,
                    backgroundColor: 'greenyellow',
                  }}></div>
                <p style={{ marginTop: 2, marginLeft: 2 }}>
                  Plan dan Realisasi sesuai
                </p>
                <div
                  style={{
                    marginLeft: 20,
                    width: 30,
                    height: 30,
                    backgroundColor: '#CFCFCF',
                  }}></div>
                <p style={{ marginTop: 2, marginLeft: 2 }}>
                  Data Realisasi belum dibuat
                </p>
              </div>
              <TableContainer sx={{ maxHeight: 500 }}>
                <Table
                  stickyHeader
                  sx={{ borderRadius: 3, mb: 3, mt: 2 }}
                  aria-label='simple table'>
                  <TableHead>
                    <TableRow style={{ backgroundColor: '#C4C4C4' }}>
                      <TableCell
                        style={{
                          width: 10,
                          textAlign: 'center',
                          padding: 5,
                          zIndex: 1102,
                        }}>
                        No
                      </TableCell>
                      <TableCell
                        style={{ width: 200, padding: 5, zIndex: 1102 }}>
                        Nama Masinis
                      </TableCell>
                      {dayNumber.map((item) => {
                        return (
                          <TableCell
                            style={{
                              fontSize: 12,
                              color: '#000',
                              fontWeight: 'bold',
                              zIndex: 1102,
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
                      trainDriver.filter(
                        (x) =>
                          x.jobrole === dinasan ||
                          x.jobrole ===
                            (dinasan === 'Masinis' ? 'Asisten Masinis' : ''),
                      ),
                      ['index'],
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
                          <StickyTableCell
                            style={{
                              width: 10,
                              textAlign: 'center',
                              padding: 5,
                            }}>
                            {index + 1}
                          </StickyTableCell>

                          <StickyTableCell style={{ width: 200, padding: 5 }}>
                            {item.name}
                            <br />
                            <small style={{ fontSize: 10 }}>
                              {item.jobrole}
                            </small>
                            <br />
                            <small style={{ fontSize: 10 }}>
                              NIK : {item.nik}
                            </small>
                          </StickyTableCell>

                          {dayNumber.map((itemdate) => {
                            var datatraindriverschedule =
                              dataScheduleTrainDriver
                                .filter(
                                  (x) =>
                                    x.trainDriver?._id.toString() === item?._id,
                                )
                                .map((itemdetail) => {
                                  return {
                                    day: moment(
                                      itemdetail.dailyWorkDate,
                                    ).format('D'),
                                    data: itemdetail,
                                  }
                                })
                            var datatraindriver =
                              dataScheduleTrainDriver.filter(
                                (x) =>
                                  x.trainDriver?._id.toString() === item?._id &&
                                  moment(x.dailyWorkDate).format('D') ===
                                    itemdate.toString(),
                              )

                            var dataschedule = datatraindriver[0]
                            let work = false
                            let data_dinasan = ''
                            let datatrainDriverAll =
                              datatraindriverschedule.filter(
                                (x) => x.day === itemdate.toString(),
                              )
                            if (datatrainDriverAll.length > 0) {
                              work = true
                              data_dinasan =
                                datatrainDriverAll[0]?.data?.loopRouteTrain
                                  ?.code
                              //if(data_dinasan !== "OFF"){
                              if (datatrainDriverAll.length > 1) {
                                data_dinasan =
                                  data_dinasan +
                                  ' dan ' +
                                  datatrainDriverAll[1]?.data?.loopRouteTrain
                                    ?.code
                              }
                              //}
                            }
                            let datascheduleRealisasi =
                              dataScheduleTrainDriverRealisasi.filter(
                                (x) =>
                                  x?.trainDriver?._id ===
                                    dataschedule?.trainDriver?._id &&
                                  x.dailyWorkDate ===
                                    dataschedule.dailyWorkDate,
                              )

                            let datascheduleRealisasiList =
                              dataScheduleTrainDriverRealisasi.filter(
                                (x) =>
                                  x.trainDriver?._id.toString() === item?._id &&
                                  moment(x.dailyWorkDate).format('D') ===
                                    itemdate.toString(),
                              )

                            let absence = false
                            let noteAbsense = ''
                            filterAbsence
                              .filter((x) => x?.trainDriver?._id === item._id)
                              .forEach((item) => {
                                item.absenceDate.forEach((itemAbsence) => {
                                  if (
                                    moment(itemAbsence).format('D') ===
                                      itemdate.toString() &&
                                    moment(itemAbsence).format('YYYY-MM') ===
                                      monthlyWork
                                  ) {
                                    absence = true
                                    noteAbsense = item.type
                                  }
                                })
                              })
                            let dinas_realisasi = ''
                            if (datascheduleRealisasi.length > 0) {
                              if (datascheduleRealisasi.length > 1) {
                                dinas_realisasi =
                                  datascheduleRealisasi[0]?.loopRouteTrain
                                    ?.code +
                                  ' dan ' +
                                  datascheduleRealisasi[1]?.loopRouteTrain?.code
                              } else {
                                dinas_realisasi =
                                  datascheduleRealisasi[0]?.loopRouteTrain?.code
                              }
                            }
                            return (
                              <TableCell
                                style={{
                                  padding: 2,
                                  backgroundColor: work
                                    ? data_dinasan === 'OFF' &&
                                      datascheduleRealisasi.length > 0 &&
                                      dinas_realisasi === data_dinasan
                                      ? 'red'
                                      : data_dinasan === 'OFF' &&
                                        datascheduleRealisasi.length > 0 &&
                                        dinas_realisasi !== data_dinasan
                                      ? 'orange'
                                      : datascheduleRealisasi.length > 0 &&
                                        dinas_realisasi !== data_dinasan
                                      ? 'orange'
                                      : datascheduleRealisasiList.length > 0
                                      ? 'greenyellow'
                                      : '#CFCFCF'
                                    : absence
                                    ? noteAbsense === 'Cuti'
                                      ? '#ffff04'
                                      : noteAbsense === 'Sakit'
                                      ? '#9DD0F7'
                                      : noteAbsense === 'DD' ||
                                        noteAbsense === 'DL' ||
                                        noteAbsense === 'DT'
                                      ? '#176A4E'
                                      : 'red'
                                    : 'inherit',
                                  border: '1px solid #CFCFCF',
                                  color:
                                    noteAbsense === 'DD' ||
                                    noteAbsense === 'DL' ||
                                    noteAbsense === 'DT'
                                      ? '#fff'
                                      : '#000',
                                  textAlign: 'center',
                                  fontWeight: 600,
                                }}>
                                {deletedata && data_dinasan !== '' ? (
                                  <Button
                                    size='small'
                                    color='secondary'
                                    variant='contained'
                                    onClick={async () => {
                                      // if(datascheduleRealisasi.length>0){
                                      datascheduleRealisasi.forEach(
                                        async (element) => {
                                          await cancelDailyWorkRealisasi(
                                            element._id,
                                            moment(
                                              element.dailyWorkDate,
                                            ).format('YYYY-MM-DD'),
                                            monthlyWork,
                                          )
                                        },
                                      )
                                      // let datacancelrealisasi = datascheduleRealisasi.filter(x=>x.loopRouteTrain.code === dataschedule.loopRouteTrain.code)
                                      // await cancelDailyWorkRealisasi(datacancelrealisasi[0]._id, moment(datacancelrealisasi.dailyWorkDate).format("YYYY-MM-DD"), monthlyWork)
                                      // }
                                      datatraindriver.forEach(
                                        async (element) => {
                                          await cancelDailyWork(
                                            element._id,
                                            moment(
                                              element.dailyWorkDate,
                                            ).format('YYYY-MM-DD'),
                                            monthlyWork,
                                          )
                                        },
                                      )
                                    }}>
                                    Hapus {data_dinasan.substring(0, 1)}
                                  </Button>
                                ) : (
                                  <>
                                    {datascheduleRealisasi.length > 0 &&
                                    dinas_realisasi !== data_dinasan ? (
                                      <center style={{ fontSize: 9 }}>
                                        {data_dinasan} <br />{' '}
                                        <small>
                                          To:
                                          {dinas_realisasi}
                                        </small>
                                      </center>
                                    ) : work ? (
                                      <div style={{ fontSize: 9 }}>
                                        {data_dinasan}{' '}
                                        {noteAbsense !== ''
                                          ? '& ' + noteAbsense
                                          : ''}
                                      </div>
                                    ) : (
                                      <div style={{ fontSize: 9 }}>
                                        {noteAbsense}
                                      </div>
                                    )}
                                    {datascheduleRealisasiList.length == 0 &&
                                    datatraindriver.length > 0 ? (
                                      loadingSubmit !== dataschedule._id ? (
                                        <Tooltip title='Tambah Data Realiasi'>
                                          <Button
                                            style={{
                                              margin: 0,
                                              width: 10,
                                              backgroundColor: '#CFCFCF',
                                              border: '1px solid #000',
                                            }}
                                            onClick={() => {
                                              console.log(
                                                'loopRouteTrainChoose',
                                                dataschedule?.loopRouteTrain,
                                              )
                                              console.log(
                                                'dataschedule',
                                                dataschedule,
                                              )
                                              if (dinasan === 'Masinis') {
                                                datatraindriver.map(
                                                  (itemPost) => {
                                                    let datapost = {
                                                      dailyWorkDate: moment(
                                                        itemPost?.dailyWorkDate,
                                                      ).format(
                                                        'YYYY-MM-DD 07:00:00',
                                                      ),
                                                      trainDriver:
                                                        itemPost?.trainDriver,
                                                      supervisor: profileUser,
                                                      loopRouteTrain:
                                                        itemPost?.loopRouteTrain,
                                                      createDate: new Date(),
                                                    }
                                                    console.log(
                                                      'datapost',
                                                      datapost,
                                                    )
                                                    setTimeout(() => {
                                                      submitDataDailyWorkRealisasi(
                                                        dataschedule?._id,
                                                        datapost,
                                                        moment(
                                                          itemPost?.dailyWorkDate,
                                                        ).format('YYYY-MM'),
                                                      )
                                                    }, 10)
                                                  },
                                                )
                                              } else {
                                                let datapost = {
                                                  dailyWorkDate: moment(
                                                    dataschedule?.dailyWorkDate,
                                                  ).format(
                                                    'YYYY-MM-DD 07:00:00',
                                                  ),
                                                  trainDriver:
                                                    dataschedule?.trainDriver,
                                                  supervisor: profileUser,
                                                  loopRouteTrain:
                                                    dataschedule?.loopRouteTrain,
                                                  createDate: new Date(),
                                                }
                                                console.log(
                                                  'datapost',
                                                  datapost,
                                                )
                                                submitDataDailyWorkRealisasi(
                                                  dataschedule?._id,
                                                  datapost,
                                                  moment(
                                                    dataschedule?.dailyWorkDate,
                                                  ).format('YYYY-MM'),
                                                )
                                              }
                                            }}
                                            color='primary'>
                                            +
                                          </Button>
                                        </Tooltip>
                                      ) : null
                                    ) : null}
                                  </>
                                )}
                              </TableCell>
                            )
                          })}
                        </TableRow>
                      )
                    })}
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
          )}
        </Container>
      </Box>
    </>
  )
}

// export default memo(MonthlyWork)
