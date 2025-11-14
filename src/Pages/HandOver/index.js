import {
  React,
  useState,
  Fragment,
  useEffect,
  useContext,
  useRef,
  forwardRef,
} from 'react'
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
  TableBody,
  IconButton,
  TextField,
  Button,
  ButtonGroup,
  CircularProgress,
  Backdrop,
} from '@mui/material'
import { styled } from '@mui/material/styles'
import usePagination from '@mui/material/usePagination'
import useStyles from './Styles'
import moment from 'moment'
import StaticVar from '../../Config/StaticVar'
import _ from 'lodash'
import QRCode from 'react-qr-code'
import Dialog from '../../Component/Dialog/Dialog'

// icon
import SearchIcon from '@mui/icons-material/Search'

// style
import { tableLeftStyle, tableTextCellStyle, tableTextIsiStyle } from './Styles'
import useDailyWork from '../../Hooks/DailyWork/useDailyWork'
import { QrReader } from 'react-qr-reader'
import html2pdf from 'html2pdf.js'
import useLetter from 'Hooks/Letter/useLetter'
import { Images } from 'Themes'
import romanize from 'Utils/Romanize'

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

export default function HandOver() {
  const classes = useStyles()
  const {
    dataDailyScheduleBackUp,
    dataDailySchedule,
    dateDailyWork,
    setDateDailyWork,
    updateDataScheduleTrainDriverStatus,
    fetchDataHandOverMasinis,
    getDataScheduleLastTrainDriver,
    dataScheduleLastTrainDriver,
    updateChangeHandOver,
    logoutHandOverTablet,
  } = useDailyWork()
  const { getDataLetter, filterLetter } = useLetter()
  const [dailyWorkChoose, setDailyWorkChoose] = useState({})
  const [dailyWorkChooseBackUp, setDailyWorkChooseBackUp] = useState({})
  const [statusDailyWork, setStatusDailyWork] = useState('0')
  const [loader, setLoader] = useState(true)

  const [openModal, setOpenModal] = useState(false)
  const [openChangeTrainDriverModal, setOpenChangeTrainDriverModal] =
    useState(false)
  const [openWorkOrder, setOpenWorkOrder] = useState(false)

  const [noteRotation, setNoteRotation] = useState('')
  const detailLetter = filterLetter.filter(
    (item) => item.type === 'Serah Terima Masinis',
  )[0]

  useEffect(() => {
    const fetchData = async () => {
      await getDataLetter()
      await fetchDataHandOverMasinis()
      setLoader(false)
    }
    fetchData()
  }, [])

  const openModalDialog = (data) => {
    setOpenModal(true)
    setDailyWorkChoose(data)
  }

  const openModalChange = (data) => {
    setOpenChangeTrainDriverModal(true)
    setDailyWorkChoose(data)
  }
  const openModalWorkOrder = (data) => {
    setOpenWorkOrder(true)
    setDailyWorkChoose(data)
  }

  const openModalHandOverTrainDriver = (data) => {
    setOpenHandOverTrainDriver(true)
    setDailyWorkChoose(data)
  }

  const handleClose = () => {
    setOpenModal(false)
    setOpenChangeTrainDriverModal(false)
    setOpenHandOverTrainDriver(false)
    setOpenWorkOrder(false)
  }

  const [openHandOverTrainDriver, setOpenHandOverTrainDriver] = useState(false)
  const [dinasan, setDinasan] = useState('Masinis')

  var element = useRef()
  var opt = {
    margin: [
      // detailLetter?.padding,
      detailLetter?.padding,
      // detailLetter?.padding,
      detailLetter?.padding,
    ],
    filename: `serah-terima-masinis-${moment().format('YYYYMMDDHHmmss')}.pdf`,
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
      format: [220, 260],
    },
  }

  const handlePrint = async () => {
    setTimeout(() => {
      html2pdf().from(element.current).set(opt).save()
      setLoader(false)
    }, 3000)
  }

  const ContentPrint = forwardRef((props, ref) => {
    return (
      <div ref={ref}>
        {dinasan === 'Masinis'
          ? _.orderBy(
              dataDailySchedule,
              ['loopRouteTrain.code', 'loopRouteTrain.loop'],
              ['asc', 'asc'],
            ).map((item, index) => (
              <div key={index} style={{ height: 945 }}>
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
                              <Typography>
                                {detailLetter?.numberHead}
                              </Typography>
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
                      ' - ' +
                      item?.handOverWork?.loopRouteTrain?.code +
                      ' / ' +
                      detailLetter?.numberDoc +
                      ' / ' +
                      romanize(moment(item?.dailyWorkDate).format('M')) +
                      ' / ' +
                      moment(item?.dailyWorkDate).format('YYYY')}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    pt: 3,
                    px: 3,
                  }}>
                  <Grid container>
                    <Grid item xs={12}>
                      <Grid container>
                        <Grid item xs={4}>
                          <Typography sx={{ fontSize: 13, fontWeight: 600 }}>
                            Nama
                          </Typography>
                        </Grid>
                        <Grid item xs={1}>
                          :
                        </Grid>
                        <Grid item xs={7}>
                          {item?.trainDriver?.name}
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item xs={12}>
                      <Grid container>
                        <Grid item xs={4}>
                          <Typography sx={{ fontSize: 13, fontWeight: 600 }}>
                            NIK
                          </Typography>
                        </Grid>
                        <Grid item xs={1}>
                          :
                        </Grid>
                        <Grid item xs={7}>
                          {item?.trainDriver?.nik}
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item xs={12}>
                      <Grid container>
                        <Grid item xs={4}>
                          <Typography sx={{ fontSize: 13, fontWeight: 600 }}>
                            Kode Dinasan
                          </Typography>
                        </Grid>
                        <Grid item xs={1}>
                          :
                        </Grid>
                        <Grid item xs={7}>
                          {item?.loopRouteTrain?.code}
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item xs={12}>
                      <Grid container>
                        <Grid item xs={4}>
                          <Typography sx={{ fontSize: 13, fontWeight: 600 }}>
                            Loop
                          </Typography>
                        </Grid>
                        <Grid item xs={1}>
                          :
                        </Grid>
                        <Grid item xs={7}>
                          {item?.loopRouteTrain?.loop}
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item xs={12} sx={{ my: 2 }}>
                      <Typography sx={{ fontSize: 13, fontWeight: 600 }}>
                        Telah selesai berdinas dan dengan ini menyerahkan LRV{' '}
                        {item?.LRVList && item?.LRVList.length > 0
                          ? item?.LRVList.map((item) => item)
                          : ''}{' '}
                        kepada
                      </Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <Grid container>
                        <Grid item xs={4}>
                          <Typography sx={{ fontSize: 13, fontWeight: 600 }}>
                            Nama
                          </Typography>
                        </Grid>
                        <Grid item xs={1}>
                          :
                        </Grid>
                        <Grid item xs={7}>
                          {item?.handOverWork?.trainDriver?.name}
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item xs={12}>
                      <Grid container>
                        <Grid item xs={4}>
                          <Typography sx={{ fontSize: 13, fontWeight: 600 }}>
                            NIK
                          </Typography>
                        </Grid>
                        <Grid item xs={1}>
                          :
                        </Grid>
                        <Grid item xs={7}>
                          {item?.handOverWork?.trainDriver?.nik}
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item xs={12}>
                      <Grid container>
                        <Grid item xs={4}>
                          <Typography sx={{ fontSize: 13, fontWeight: 600 }}>
                            Kode Dinasan
                          </Typography>
                        </Grid>
                        <Grid item xs={1}>
                          :
                        </Grid>
                        <Grid item xs={7}>
                          {item?.handOverWork?.loopRouteTrain?.code}
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item xs={12}>
                      <Grid container>
                        <Grid item xs={4}>
                          <Typography sx={{ fontSize: 13, fontWeight: 600 }}>
                            Loop
                          </Typography>
                        </Grid>
                        <Grid item xs={1}>
                          :
                        </Grid>
                        <Grid item xs={7}>
                          {item?.handOverWork?.loopRouteTrain?.loop}
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item xs={12} sx={{ my: 2 }}>
                      <Typography sx={{ fontSize: 13, fontWeight: 600 }}>
                        Adapun catatan kondisi LRV selama berdinas adalah
                        sebagai berikut
                      </Typography>
                    </Grid>
                    <Grid
                      item
                      xs={12}
                      sx={{
                        my: 2,
                        border: '1.5px solid #000',
                        borderRadius: 1,
                        p: 2,
                      }}>
                      <Typography sx={{ fontSize: 13, fontWeight: 600 }}>
                        Catatan
                      </Typography>
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
                    </Grid>
                  </Grid>
                </Box>
                <Box sx={{ mt: 10 }}>
                  <Grid item xs={12}>
                    <Grid container>
                      <Grid item xs={6}>
                        <center>
                          <Typography> Masinis Yang Menerima </Typography>
                          <QRCode
                            value={
                              item?.handOverWork?.trainDriver?.nik
                                ? item?.handOverWork?.trainDriver?.nik
                                : '0'
                            }
                            size={100}
                          />
                          <Typography>
                            {item?.handOverWork?.trainDriver?.name
                              ? item?.handOverWork?.trainDriver?.name
                              : '-'}
                          </Typography>
                          <Typography>
                            {item?.handOverWork?.trainDriver?.nik
                              ? item?.handOverWork?.trainDriver?.nik
                              : '-'}
                          </Typography>
                        </center>
                      </Grid>
                      <Grid item xs={6}>
                        <center>
                          <Typography> Masinis Yang Menyerahkan </Typography>
                          <QRCode
                            value={
                              item?.trainDriver?.nik
                                ? item?.trainDriver?.nik
                                : '0'
                            }
                            size={100}
                          />
                          <Typography>{item?.trainDriver?.name}</Typography>
                          <Typography>{item?.trainDriver?.nik}</Typography>
                        </center>
                      </Grid>
                    </Grid>
                  </Grid>
                </Box>
              </div>
            ))
          : null}
      </div>
    )
  })

  const ContentTable = () => {
    return (
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
            <TableCell style={tableTextCellStyle} align='left'>
              Masinis
            </TableCell>
            {/* <TableCell style={tableTextCellStyle} align="left">
            Masinis Sebelumnya
          </TableCell> */}
            <TableCell style={tableTextCellStyle} align='left'>
              Catatan
            </TableCell>
            <TableCell style={tableTextCellStyle} align='center'>
              Pesan
            </TableCell>
            <TableCell style={tableTextCellStyle} align='center'>
              Status
            </TableCell>
            {/* {dinasan === 'Masinis' ? ( */}
              <TableCell style={tableTextCellStyle} align='center'>
                Aksi
              </TableCell>
            {/* ) : null} */}
          </TableRow>
        </TableHead>
        <TableBody>
          {
          // dinasan === 'Masinis'? 
            _.orderBy(
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
                    <TableCell style={tableTextIsiStyle} align='center'>
                      {item?.handOverWork?.handOverTime
                        ? moment(item?.handOverWork?.handOverTime).format(
                            'DD-MM-YYYY HH:mm:ss',
                          )
                        : '-'}
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
                      <small>NIK : {item?.trainDriver?.nik || item?.trainDriver?.idNumber || "-"}</small>
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
                          : item?.status}
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
                        color='primary'
                        size='small'
                        style={{ width: '100%', marginBottom: 2 }}
                        onClick={() => {
                          openModalDialog(item)
                          if (item?.status == 'Finish') {
                            setStatusDailyWork('2')
                          } else {
                            if (item?.status == 'On Duty') {
                              setStatusDailyWork('1')
                            } else {
                              setStatusDailyWork('0')
                            }
                            getDataScheduleLastTrainDriver(
                              item?.loopRouteTrain?.code,
                              item?.loopRouteTrain?.loop,
                              dateDailyWork,
                            )
                          }
                        }}>
                        Lihat Data
                      </Button>
                      {/* <br />
                      <Button
                        variant='contained'
                        color='secondary'
                        style={{ width: '100%', marginBottom: 2 }}
                        size='small'
                        onClick={() => openModalChange(item)}>
                        Ganti Cadangan atau Dinas OFF
                      </Button>
                      <br /> */}
                      <Button
                        variant='contained'
                        style={{ width: '100%' }}
                        size='small'
                        onClick={() => openModalHandOverTrainDriver(item)}>
                        Terima Tablet
                      </Button>
                    </TableCell>
                  </TableRow>
                )
              })
            // :
            //  _.orderBy(
            //     dataDailyScheduleBackUp,
            //     ['loopRouteTrain.code', 'loopRouteTrain.loop'],
            //     ['asc', 'asc'],
            //   ).map((item, index) => {
            //     return (
            //       <TableRow
            //         key={index++}
            //         style={{
            //           borderCollapse: 'seperate',
            //           backgroundColor: '#F3F3F3',
            //           border: '5px solid #F6F7FF',
            //         }}>
            //         <TableCell style={tableTextIsiStyle} align='center'>
            //           {index + 1}
            //         </TableCell>
            //         <TableCell style={tableTextIsiStyle} align='center'>
            //           {item?.handOverWork?.handOverTime
            //             ? moment(item?.handOverWork?.handOverTime).format(
            //                 'DD-MM-YYYY HH:mm:ss',
            //               )
            //             : '-'}
            //         </TableCell>

            //         <TableCell style={tableTextIsiStyle} align='left'>
            //           {item?.trainDriver?.name}
            //           {item?.rotationTrainDriver ? (
            //             <span>
            //               <br /> Dari{' '}
            //               {
            //                 item?.rotationTrainDriver?.after?.loopRouteTrain
            //                   ?.code
            //               }
            //             </span>
            //           ) : (
            //             ''
            //           )}
            //           {item?.rotationTrainDriver ? (
            //             <i style={{ color: 'red' }}>
            //               <br />
            //               <small>
            //                 menggantikan{' '}
            //                 {
            //                   item?.rotationTrainDriver?.after?.trainDriver
            //                     ?.name
            //                 }
            //                 <br />
            //                 dikarenakan {
            //                   item?.rotationTrainDriver?.note
            //                 } pada{' '}
            //                 {moment(
            //                   item?.rotationTrainDriver?.rotationDate,
            //                 ).format('HH:mm:ss')}
            //               </small>
            //             </i>
            //           ) : (
            //             ''
            //           )}
            //           <br />
            //           <small>Kode : {item?.loopRouteTrain?.code}</small>
            //           <br />
            //           <small>NIK : {item?.trainDriver?.nik}</small>
            //         </TableCell>
            //         <TableCell style={tableTextIsiStyle} align='left'>
            //           {item.kaIncident.length > 0
            //             ? item?.kaIncident.map((itemka, indexka) => (
            //                 <>
            //                   <div style={{ display: 'flex' }}>
            //                     <Typography>
            //                       <small>
            //                         {indexka + 1}. {itemka?.title} :
            //                       </small>{' '}
            //                     </Typography>
            //                     <Typography>
            //                       <small>
            //                         <i>{itemka?.value}</i>
            //                       </small>{' '}
            //                     </Typography>
            //                   </div>
            //                   <Grid container>
            //                     {itemka.file?.length > 0
            //                       ? itemka.file.map((img) => (
            //                           <img
            //                             src={StaticVar.URL_PHOTO + '/' + img}
            //                             style={{ height: 100 }}
            //                           />
            //                         ))
            //                       : ''}
            //                   </Grid>
            //                 </>
            //               ))
            //             : '-'}
            //           <small>
            //             <i>
            //               {item.kaIncident.length > 0 &&
            //                 moment(item.kaIncident[0]?.createdAt).format(
            //                   'DD MMMM YYYY HH:mm',
            //                 )}
            //             </i>
            //           </small>
            //         </TableCell>
            //         <TableCell style={tableTextIsiStyle} align='left'>
            //           <small>
            //             <i>{item?.message}</i>
            //           </small>
            //         </TableCell>
            //         <TableCell style={tableTextIsiStyle} align='center'>
            //           <small>
            //             {item?.status === 'Finish'
            //               ? 'Selesai'
            //               : item?.status === 'On Duty'
            //               ? 'Sedang Bertugas'
            //               : item?.status}
            //           </small>
            //           <br />
            //           {item?.completeDate ? (
            //             <small>
            //               Updated:{' '}
            //               {moment(item?.completeDate).format('HH:mm:ss')}
            //             </small>
            //           ) : (
            //             ''
            //           )}
            //         </TableCell>
            //       </TableRow>
            //     )
            //   })
              }
        </TableBody>
      </Table>
    )
  }

  return (
    <>
      <Box sx={{ display: 'flex', pt: 12 }}>
        <Backdrop
          sx={{ color: '#fff', zIndex: 99999 }}
          open={loader}
          onClick={() => setLoader(false)}>
          <CircularProgress color='inherit' />
        </Backdrop>
        <Dialog
          fullWidth={true}
          open={openChangeTrainDriverModal}
          maxWidth={'lg'}
          title='Form Perubahan'// Masinis'
          content={
            <>
              <Grid container spacing='2'>
                <Grid item md='6' xs='12' sm='12'>
                  <Box style={{ backgroundColor: '#CFCFCF' }}>
                    <Typography>Data Masinis Utama</Typography>
                  </Box>

                  <Table>
                    <TableRow>
                      <TableCell style={{ widht: '20%' }}>
                        Nama Masinis
                      </TableCell>
                      <TableCell style={{ widht: '2%' }}>:</TableCell>
                      <TableCell>
                        {dailyWorkChoose?.trainDriver?.name}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell style={{ widht: '20%' }}>Kode Dinas</TableCell>
                      <TableCell style={{ widht: '2%' }}>:</TableCell>
                      <TableCell>
                        {dailyWorkChoose?.loopRouteTrain?.code}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell style={{ widht: '20%' }}>Loop</TableCell>
                      <TableCell style={{ widht: '2%' }}>:</TableCell>
                      <TableCell>
                        {dailyWorkChoose?.loopRouteTrain?.loop}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell style={{ widht: '20%' }}>
                        Mulai Dinas
                      </TableCell>
                      <TableCell style={{ widht: '2%' }}>:</TableCell>
                      <TableCell>
                        {dailyWorkChoose?.loopRouteTrain?.start}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell style={{ widht: '20%' }}>
                        Habis Dinas
                      </TableCell>
                      <TableCell style={{ widht: '2%' }}>:</TableCell>
                      <TableCell>
                        {dailyWorkChoose?.loopRouteTrain?.end}
                      </TableCell>
                    </TableRow>
                  </Table>
                </Grid>
                <Grid item md='6' xs='12' sm='12'>
                  <Box style={{ backgroundColor: '#CFCFCF' }}>
                    <Typography>Data Masinis Pengganti</Typography>
                  </Box>
                  <Table>
                    <TableRow>
                      <TableCell>Pilih Nama Masinis</TableCell>
                      <TableCell>:</TableCell>
                      <TableCell style={{ padding: 5 }}>
                        <Select
                          size='small'
                          style={{ marginBottom: 0 }}
                          value={
                            dailyWorkChooseBackUp?._id
                              ? dailyWorkChooseBackUp?._id
                              : '0'
                          }
                          onChange={(e) => {
                            if (e.target.value !== '0') {
                              let datachoose = dataDailyScheduleBackUp.filter(
                                (x) => x._id === e.target.value,
                              )[0]
                              console.log('datachoose', datachoose)
                              setDailyWorkChooseBackUp(datachoose)
                            } else {
                              setDailyWorkChooseBackUp({})
                            }
                          }}>
                          <MenuItem value='0'>Pilih Cadangan</MenuItem>
                          {dataDailyScheduleBackUp.map((item) => {
                            return (
                              <MenuItem value={item._id}>
                                {item?.loopRouteTrain?.code}{' '}
                                {item?.loopRouteTrain?.lopp} -{' '}
                                {item?.trainDriver?.name}
                              </MenuItem>
                            )
                          })}
                        </Select>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Kode Dinas</TableCell>
                      <TableCell>:</TableCell>
                      <TableCell>
                        {dailyWorkChooseBackUp?.loopRouteTrain?.code}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Keterangan</TableCell>
                      <TableCell>:</TableCell>
                      <TableCell>
                        {dailyWorkChooseBackUp?.loopRouteTrain?.loop}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Mulai Dinas</TableCell>
                      <TableCell>:</TableCell>
                      <TableCell>
                        {dailyWorkChooseBackUp?.loopRouteTrain?.start}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Habis Dinas</TableCell>
                      <TableCell>:</TableCell>
                      <TableCell>
                        {dailyWorkChooseBackUp?.loopRouteTrain?.end}
                      </TableCell>
                    </TableRow>
                  </Table>
                </Grid>
                <Grid item md='12' sm='12' xs='12'>
                  <Typography>Alasan Pergantian Masinis</Typography>
                  <TextField
                    multiline='true'
                    placeholder='Isikan Alasan pergantian'
                    style={{ width: '100%' }}
                    value={noteRotation}
                    onChange={(e) => setNoteRotation(e.target.value)}
                  />
                </Grid>
              </Grid>
            </>
          }
          cancel={handleClose}
          valueCancel='Batal'
          submit={true}
          confirm={async () => {
            let datapost = {
              trainDriver: dailyWorkChooseBackUp.trainDriver,
              rotationTrainDriver: {
                rotationDate: new Date(),
                rotationBy: JSON.parse(localStorage.profile),
                before: dailyWorkChoose,
                after: dailyWorkChooseBackUp,
                note: noteRotation,
              },
            }
            console.log('datapost', datapost)
            await updateChangeHandOver(
              dailyWorkChoose?._id,
              datapost,
              dateDailyWork,
            )
            handleClose()
          }}
          valueConfirm='Simpan Perubahan'
        />

        <Dialog
          fullWidth={true}
          maxWidth={'md'}
          open={openModal}
          close={handleClose}
          title={
            <Typography style={{ color: '#bf272b' }}>
              Update Status Serah Terima
            </Typography>
          }
          content={
            <center>
              <Typography variant='h4'>SERAH TERIMA KEDINASAN</Typography>
              <Typography variant='h5'>
                Nomor : {dailyWorkChoose?._id}
              </Typography>
              <QRCode
                value={dailyWorkChoose?._id}
                size={150}
                style={{ marginTop: 10, marginBottom: 10 }}
              />
              <Table style={{ width: '100%' }}>
                <TableRow>
                  <TableCell style={{ width: '35%' }}>Tanggal Dinas</TableCell>
                  <TableCell style={{ width: 15 }}>:</TableCell>
                  <TableCell>
                    {moment(dailyWorkChoose.dailyWorkDate).format('DD-MM-YYYY')}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell style={{ width: '35%' }}>Nama</TableCell>
                  <TableCell style={{ width: 15 }}>:</TableCell>
                  <TableCell>
                    <Typography>
                      Dinasan : {dailyWorkChoose?.loopRouteTrain?.code} -{' '}
                      {dailyWorkChoose?.loopRouteTrain?.loop}
                    </Typography>
                    <Typography>
                      Nama: {dailyWorkChoose?.trainDriver?.name}
                    </Typography>
                    <Typography>
                      Waktu Dinas: {dailyWorkChoose?.loopRouteTrain?.start} -{' '}
                      {dailyWorkChoose?.loopRouteTrain?.end}
                    </Typography>
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell style={{ width: '35%' }}>
                    Nama Sebelumnya
                  </TableCell>
                  <TableCell style={{ width: 15 }}>:</TableCell>
                  <TableCell>
                    <Typography>
                      Dinasan :{' '}
                      {dataScheduleLastTrainDriver?.loopRouteTrain?.code} -{' '}
                      {dataScheduleLastTrainDriver?.loopRouteTrain?.loop}
                    </Typography>
                    <Typography>
                      Nama: {dataScheduleLastTrainDriver?.trainDriver?.name}
                    </Typography>
                    <Typography>
                      Waktu Dinas:{' '}
                      {dataScheduleLastTrainDriver?.loopRouteTrain?.start} -{' '}
                      {dataScheduleLastTrainDriver?.loopRouteTrain?.end}
                    </Typography>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell style={{ width: '35%' }}>
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
                <TableRow>
                  <TableCell colSpan={3}></TableCell>
                </TableRow>
              </Table>
            </center>
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
                  status: 'On Duty',
                  handOverWork: {
                    handOverWorkId: dataScheduleLastTrainDriver?._id,
                    dailyWorkDate: dataScheduleLastTrainDriver?.dailyWorkDate,
                    trainDriver: dataScheduleLastTrainDriver?.trainDriver,
                    loopRouteTrain: dataScheduleLastTrainDriver?.loopRouteTrain,
                    noteLRV: dataScheduleLastTrainDriver?.noteLRV,
                    handOverTime: new Date(),
                    handOverNote: dataScheduleLastTrainDriver?.noteLRV,
                    handOverReport: {},
                  },
                },
              )
              if (res.status) {
                handleClose()
                fetchDataHandOverMasinis()
              }
            }
            if (statusDailyWork === '2') {
              const res = await updateDataScheduleTrainDriverStatus(
                dailyWorkChoose?._id,
                {
                  readTakeGive: true,
                  completeState: true,
                  status: 'Finish',
                  handOverWork: {
                    handOverWorkId: dataScheduleLastTrainDriver?._id,
                    dailyWorkDate: dataScheduleLastTrainDriver?.dailyWorkDate,
                    trainDriver: dataScheduleLastTrainDriver?.trainDriver,
                    loopRouteTrain: dataScheduleLastTrainDriver?.loopRouteTrain,
                    noteLRV: dataScheduleLastTrainDriver?.noteLRV,
                    handOverTime: new Date(),
                    handOverNote: dataScheduleLastTrainDriver?.noteLRV,
                    handOverReport: {},
                  },
                },
              )
              if (res.status) {
                handleClose()
                fetchDataHandOverMasinis()
              }
            }
            if (statusDailyWork === '0') {
              const res = await updateDataScheduleTrainDriverStatus(
                dailyWorkChoose?._id,
                {
                  readTakeGive: false,
                  completeState: false,
                  handOverWork: {
                    handOverWorkId: dataScheduleLastTrainDriver?._id,
                    dailyWorkDate: dataScheduleLastTrainDriver?.dailyWorkDate,
                    trainDriver: dataScheduleLastTrainDriver?.trainDriver,
                    loopRouteTrain: dataScheduleLastTrainDriver?.loopRouteTrain,
                    noteLRV: dataScheduleLastTrainDriver?.noteLRV,
                    handOverTime: new Date(),
                    handOverNote: dataScheduleLastTrainDriver?.noteLRV,
                    handOverReport: {},
                  },
                },
              )
              if (res.status) {
                handleClose()
                fetchDataHandOverMasinis()
              }
            }
          }}
          colorButtonConfirm={'#bf272b'}
        />

        <Dialog
          fullWidth={true}
          open={openHandOverTrainDriver}
          maxWidth={'md'}
          title={`Terima Tablet - ${dailyWorkChoose?.trainDriver?.name}`}
          content={
            <>
              
                <center>
                  <Typography variant='h4'>SERAH TERIMA KEDINASAN</Typography>
                  <Typography variant='h5'>
                    Nomor : {dailyWorkChoose?._id}
                  </Typography>
                  <QRCode
                    value={dailyWorkChoose?._id}
                    size={150}
                    style={{ marginTop: 10, marginBottom: 10 }}
                  />
                  <Table style={{ width: '100%' }}>
                    <TableRow>
                      <TableCell style={{ width: '35%' }}>Tanggal Dinas</TableCell>
                      <TableCell style={{ width: 15 }}>:</TableCell>
                      <TableCell>
                        {moment(dailyWorkChoose.dailyWorkDate).format('DD-MM-YYYY')}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell style={{ width: '35%' }}>Nama</TableCell>
                      <TableCell style={{ width: 15 }}>:</TableCell>
                      <TableCell>
                        <Typography>
                          Dinasan : {dailyWorkChoose?.loopRouteTrain?.code} -{' '}
                          {dailyWorkChoose?.loopRouteTrain?.loop}
                        </Typography>
                        <Typography>
                          Nama: {dailyWorkChoose?.trainDriver?.name}
                        </Typography>
                        <Typography>
                          Waktu Dinas: {dailyWorkChoose?.loopRouteTrain?.start} -{' '}
                          {dailyWorkChoose?.loopRouteTrain?.end}
                        </Typography>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell colSpan={3}></TableCell>
                    </TableRow>
                  </Table>
                </center>
                {/* <QrReader
                  constraints={{ facingMode: 'environment' }}
                  onResult={async (result, error) => {
                    if (!!result) {
                      const response = await logoutHandOverTablet(result.text)
                      if (response.status) {
                        fetchDataHandOverMasinis()
                        handleClose()
                      }
                      //signQR({qrcode:result.text})
                    }

                    if (!!error) {
                    }
                  }}
                /> */}
            </>
          }
          cancel={()=>{handleClose();fetchDataHandOverMasinis()}}
          valueCancel='Batal'
          submit={false}
          // confirm={async ()=>{
          //   handleClose()
          // }}
          //valueConfirm="Simpan Perubahan"
        />

        <Dialog
          fullWidth={true}
          open={openWorkOrder}
          maxWidth={'lg'}
          title='Surat Tugas'
          content={
            <>
              <Grid container>
                <Grid item xs={12}>
                  <center>
                    <Typography variant='h5'>Surat Tugas </Typography>
                    <Typography>Nomor : {dailyWorkChoose._id}</Typography>
                    <Typography>
                      Kode Dinas: {dailyWorkChoose?.loopRouteTrain?.code} /
                      Loop: {dailyWorkChoose?.loopRouteTrain?.loop} / LRV:
                      {/* {dailyWorkChoose?.LRVList.map(item=>
                      {return(<span>{item}</span>)})} */}
                      {JSON.stringify(dailyWorkChoose?.LRVList)}
                    </Typography>
                  </center>
                </Grid>
                <Grid item xs='6'>
                  <table sx={{ mt: 2 }}>
                    <tr>
                      <td>Hari, Tanggal</td>
                      <td>:</td>
                      <td>
                        {moment(dailyWorkChoose?.dailyWorkDate).format(
                          'DD-MM-YYYY',
                        )}
                      </td>
                    </tr>
                    <tr>
                      <td>Nama</td>
                      <td>:</td>
                      <td>{dailyWorkChoose?.trainDriver?.name}</td>
                    </tr>
                    <tr>
                      <td>Jam Dinasan</td>
                      <td>:</td>
                      <td></td>
                    </tr>
                    <tr>
                      <td>- Mulai</td>
                      <td>:</td>
                      <td>{dailyWorkChoose?.loopRouteTrain?.start}</td>
                    </tr>
                    <tr>
                      <td>- Selesai</td>
                      <td>:</td>
                      <td>{dailyWorkChoose?.loopRouteTrain?.end}</td>
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
                          dailyWorkChoose?.loopRouteTrain?.route[0]?.station[0]
                            ?.stationName
                        }
                      </td>
                    </tr>
                    <tr>
                      <td>Ke</td>
                      <td>:</td>
                      <td>
                        {
                          dailyWorkChoose?.loopRouteTrain?.route[0]?.station[
                            dailyWorkChoose?.loopRouteTrain?.route[0]?.station
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
                        <TableCell>Pengangsaan Dua</TableCell>
                        <TableCell>Velodrome</TableCell>

                        <TableCell>No. Kereta</TableCell>
                        <TableCell>Velodrome</TableCell>
                        <TableCell>Pengangsaan Dua</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {dailyWorkChoose?.loopRouteTrain?.route
                        .filter((x) => Number(x.trainNumber) % 2 == 0)
                        .map((itemRoute, indexRoute) => {
                          let itemRouteOdd =
                            dailyWorkChoose?.loopRouteTrain?.route.filter(
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
                          <Typography>
                            1. Catatan LRV : {dailyWorkChoose?.noteLRV}
                          </Typography>
                          <Typography>
                            2. Jalan dan Bangunan :{' '}
                            {dailyWorkChoose?.roadBuilding}
                          </Typography>
                          <Typography>
                            3. STT : {dailyWorkChoose?.STT}
                          </Typography>
                          <Typography>
                            4. Kejadian Lainnya : {dailyWorkChoose?.otherNote}
                          </Typography>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </Grid>
                <Grid item xs={12}>
                  <center>
                    Rangkaian kereta api beserta go no item telah diperiksa
                    dengan baik dan laik jalan
                  </center>
                </Grid>
                <Grid item xs={6}>
                  <center>
                    <Typography> NAMA </Typography>
                    <QRCode
                      value={
                        dailyWorkChoose?.trainDriver?.nik
                          ? dailyWorkChoose?.trainDriver?.nik
                          : '0'
                      }
                      size={100}
                    />
                    <Typography>
                      {dailyWorkChoose?.trainDriver?.name}
                    </Typography>
                    <Typography>{dailyWorkChoose?.trainDriver?.nik}</Typography>
                  </center>
                </Grid>
                <Grid item xs={6}>
                  <center>
                    <Typography> PENYELIA </Typography>
                    <QRCode
                      value={
                        dailyWorkChoose?.supervisor?.nik
                          ? dailyWorkChoose?.supervisor?.nik
                          : '-'
                      }
                      size={100}
                    />
                    <Typography>
                      {dailyWorkChoose?.supervisor?.name
                        ? dailyWorkChoose?.supervisor?.name
                        : '-'}
                    </Typography>
                    <Typography>
                      {dailyWorkChoose?.supervisor?.nik
                        ? dailyWorkChoose?.supervisor?.nik
                        : '-'}
                    </Typography>
                  </center>
                </Grid>
              </Grid>
            </>
          }
          cancel={handleClose}
          valueCancel='Batal'
          submit={false}
        />

        <Container maxWidth='xl'>
          <Grid container justifyContent={'space-between'}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <Typography variant='h4'>Serah Terima Dinas Masinis</Typography>
            </div>
            <div>
              <Grid
                container
                alignItems='end'
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'start',
                  marginBottom: 3,
                }}>
                <div>
                  <Grid container>
                    <Typography
                      className={classes.dateTxt}
                      sx={{ mt: 1, mr: 1 }}>
                      Pilih Tanggal :
                    </Typography>
                    <TextField
                      type={'Date'}
                      placeholder='Pencarian'
                      value={dateDailyWork}
                      onChange={(e) => {
                        let datework = e.target.value
                        console.log('datework', datework)
                        setDateDailyWork(datework)
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
                </div>
                {/* <div style={{ marginLeft: 10 }}>
                  <Typography className={classes.dateTxt} sx={{ mt: 1 }}>
                    Tgl Selesai:
                  </Typography>
                  <TextField
                    type={'Date'}
                    placeholder='Pencarian'
                    value={dateDailyWork}
                    onChange={(e) => {
                      let datework = e.target.value
                      console.log('datework', datework)
                      setDateDailyWork(datework)
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
                </div> */}
                <div style={{ marginLeft: 10 }}>
                  <Button
                    variant='contained'
                    color='primary'
                    onClick={fetchDataHandOverMasinis}>
                    Cari
                  </Button>
                </div>
                <div style={{ marginLeft: 10 }}>
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
                </div>
              </Grid>
            </div>
          </Grid>

          {/* <ButtonGroup
            variant='contained'
            aria-label='large button group'
            style={{ width: '100%', marginTop: 5, marginBottom: 15 }}>
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
                setDinasan('Masinis')
              }}>
              Bertugas
            </Button>
            <Button
              sx={{
                color: dinasan === 'Cadangan' ? '#fff' : 'gray',
                bgcolor: dinasan === 'Cadangan' ? '#BB7E36' : '#DCDCDC',
                width: '100%',
                cursor: 'pointer',
                '&:hover': {
                  backgroundColor: '#BB7E36',
                  color: '#fff',
                  textDecoration: 'none',
                },
              }}
              onClick={() => {
                setDinasan('Cadangan')
              }}>
              Cadangan & OFF
            </Button>
          </ButtonGroup> */}
          {/* <Typography>Dinas Harian : {dinasan}</Typography> */}
          <div className='print'>
            <ContentPrint ref={element} />
          </div>
          <ContentTable />
        </Container>
      </Box>
    </>
  )
}
