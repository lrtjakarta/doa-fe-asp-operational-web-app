import React, {
  useState,
  Fragment,
  useEffect,
  forwardRef,
  useContext,
  useRef,
} from 'react'
import { styled } from '@mui/material/styles'
import TableCell, { tableCellClasses } from '@mui/material/TableCell'
import {
  Alert,
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
  TableContainer,
  TableHead,
  TableRow,
  CardContent,
  Table,
  Switch,
  TextField,
  Divider,
  InputAdornment,
  Dialog,
  DialogContent,
  DialogActions,
  DialogTitle,
  Backdrop,
  CircularProgress,
  Snackbar,
  Avatar,
  Tab,
  Tabs,
  CardMedia,
  CardActions,
  DialogContentText,
  ImageListItem,
  ImageList,
  List,
  ListItem,
  ListItemText,
} from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit';
import { Link, useHistory } from 'react-router-dom'

//img
import logo from '../../Assets/Images/org.png'

//styles
import {
  boxIcon,
  paperContent,
  noteStyles,
  submitBtnStyle,
  TabStyle,
} from './Styles'
import useStyles from './Styles'
import StaticVar from 'Config/StaticVar'
import useUploadImg from 'Hooks/Upload/useUploadImg'
import UsePreliminaryReport from 'Hooks/PreliminaryReport/usePreliminaryReport'
import { AddPhotoAlternateOutlined as AddPhotoAlternateOutlinedIcon } from '@mui/icons-material'
import Contact from '../../Component/Card/index'
import NotFound from '../../Assets/Images/NotFound.png'
import UseDailyWork from 'Hooks/DailyWork/useDailyWork'
import moment from 'moment'
import FormPreliminaryReport from './Form'
import html2pdf from 'html2pdf.js'
import { StamformasiContext, UserProfilContext } from 'Context'

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

export default function PreliminaryReport() {
  const classes = useStyles()
  const history = useHistory()

  const { setLoader, loader } = useUploadImg()
  const { getDataStamformasi, dataStamformasi, postDataStamformasi, putDataStamformasi, deleteDataStamformasi } = useContext(StamformasiContext);
  const [date, setDate] = useState()
  const fetchData = async () => {
    let createAt = moment().format('YYYY-MM-DD')
    let monthly = moment().format('YYYY-MM')
    getDataStamformasi()
  }

  const handleClose = () =>{
    setOpenDialog(false)
    setSelectedData({})
  }

  const [openDialog, setOpenDialog] = useState(false)
  const [selectedData, setSelectedData] = useState({})

  useEffect(() => {
    fetchData()
  }, [])

  var element = useRef([])
  var opt = {
    filename: `preliminaryreport-${moment().format('YYYYMMDDHHmmss')}.pdf`,
    html2canvas: { dpi: 300, letterRendering: true, useCORS: true },
    jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' },
  }

  const handlePrint = async (condition) => {
    switch (condition) {
      case 1:
        setTimeout(() => {
          setLoader(false)
          if (element?.current.length > 0) {
            element.current.map((item, index) =>
              html2pdf().from(element.current[index]).set(opt).save(),
            )
          }
        }, 5000)
        break
      default:
        html2pdf().from(element.current[0]).set(opt).save()
        break
    }
  }

  const Content = forwardRef((props, ref) => {
    return (
      <div ref={ref}>
        <FormPreliminaryReport dataDetail={props?.dataDetail} action='detail' />
      </div>
    )
  })

  return (
    <>
      <Dialog
        open={openDialog}
        onClose={handleClose}
        scroll='paper'
        maxWidth={'lg'}
        aria-labelledby='scroll-dialog-title'
        aria-describedby='scroll-dialog-description'>
        <DialogContent sx={{ width: 600 }}>
          <Typography>
            Apakah anda yakin menghapus dengan Standformasi Tgl: {' '}
            {selectedData?.operationDate}
          </Typography>
        </DialogContent>
        <DialogActions sx={{ m: 1 }}>
          <Button
            variant='contained'
            color='inherit'
            sx={{
              color: '#000',
              textTransform: 'none',
            }}
            onClick={handleClose}>
            Tutup
          </Button>
          <Button
            variant='contained'
            color='error'
            sx={{
              color: '#fff',
              textTransform: 'none',
            }}
            onClick={() => {
              deleteDataStamformasi(selectedData._id)
              handleClose()
            }}>
            Hapus
          </Button>
        </DialogActions>
      </Dialog>
      <div
        style={{
          width: '100%',
          backgroundColor: '#A2A2A2',
          height: 50,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: 50,
        }}>
        <Typography sx={{ color: '#fff', fontSize: 15 }}>
          Stamformasi KA
        </Typography>
      </div>
        <Container maxWidth='xl' sx={{ mt: 2, pb: 5 }}>
          <Grid container justifyContent={'flex-end'}>
            <div style={{ marginRight: 10 }}>
              <Grid container justifyContent={'flex-end'} alignItems='center'>
                <Typography sx={{ mb: 2, mr: 1 }}>Pilih Tanggal : </Typography>
                <TextField
                  type='date'
                  value={date}
                  InputProps={{
                    style: {
                      width: 300,
                      fontSize: 12,
                      height: 33,
                      backgroundColor: '#fff',
                      border: 'none',
                      borderRadius: 7,
                      boxShadow: 'inset 0px 2px 4px rgba(0, 0, 0, 0.25)',
                    },
                  }}
                  sx={{
                    width: 300,
                    mb: 2,
                  }}
                  onChange={e=>setDate(e.target.value)}
                />
              </Grid>
            </div>
            <div style={{ marginRight: 10 }}>
              <Button
                fullWidth
                variant='contained'
                color='success'
                onClick={async () => {
                  if(date){
                    getDataStamformasi({operationDate : moment(date).format("YYYY-MM-DD")})
                  }
                  else{
                    getDataStamformasi()
                  }
                  
                }}>
                Cari
              </Button>
            </div>
            <div>
              <Grid container justifyContent={'flex-end'} alignItems='center'>
                
                <Button
                  onClick={async () => {
                    history.push('/app/operational/stamformasi/form?action=add')
                  }}
                  variant='contained'
                  sx={{ mb: 2, width: 150, textDecoration: 'none' }}>
                  Tambah
                </Button>
              </Grid>
            </div>
          </Grid>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label='customized table'>
              <TableHead>
                <TableRow>
                  <StyledTableCell width={20}>No.</StyledTableCell>
                  <StyledTableCell align='center' width={120}>
                    Tanggal
                  </StyledTableCell>
                  <StyledTableCell align='center' width={120}>
                    Siap Operasi
                  </StyledTableCell>
                  <StyledTableCell align='center' width={120}>
                    Cadangan
                  </StyledTableCell>
                  <StyledTableCell align='center' width={120}>
                    Periodik
                  </StyledTableCell>
                  <StyledTableCell align='center' width={120}>
                    Tidak Siap Operasi
                  </StyledTableCell>
                  <StyledTableCell align='center' width={100}>
                    Aksi
                  </StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {dataStamformasi?.length > 0 ? (
                  dataStamformasi.map((row, index) => {
                    return (
                      <StyledTableRow key={row.name}>
                        <StyledTableCell component='th' scope='row'>
                          {index + 1}
                        </StyledTableCell>
                        <StyledTableCell align='center'>
                          {row.operationDate}
                        </StyledTableCell>
                        <StyledTableCell align='center'>
                          {row.readyOperationList.length>1 ?
                          row.readyOperationList.map((itemlrv, index)=>{
                            return(<Typography>{index+1}.{itemlrv.numberLrv}</Typography>)
                          }):
                        row.readyOperationList.length>0 ? <Typography>{row.readyOperationList[0].numberLrv} </Typography> : "-"}
                          
                        </StyledTableCell>
                        <StyledTableCell align='center'>
                        {row.standByList.length>1 ?
                          row.standByList.map((itemlrv, index)=>{
                            return(<Typography>{index+1}.{itemlrv.numberLrv}</Typography>)
                          }):
                        row.standByList.length>0 ? <Typography>{row.standByList[0].numberLrv} </Typography> : "-"}
                        </StyledTableCell>
                        <StyledTableCell align='center'>
                        {row.periodicList.length>1 ?
                          row.periodicList.map((itemlrv, index)=>{
                            return(<Typography>{index+1}.{itemlrv.numberLrv}</Typography>)
                          }):
                        row.periodicList.length>0 ? <Typography>{row.periodicList[0].numberLrv} </Typography> : "-"}
                        </StyledTableCell>
                        <StyledTableCell align='center'>
                        {row.noOperationList.length>1 ?
                          row.noOperationList.map((itemlrv, index)=>{
                            return(<Typography>{index+1}.{itemlrv.numberLrv}</Typography>)
                          }):
                        row.noOperationList.length>0 ? <Typography>{row.noOperationList[0].numberLrv} </Typography> : "-"}
                        </StyledTableCell>
                        <StyledTableCell align='center'>
                          <IconButton edge="end" aria-label="edit" onClick={() => 
                              {
                                history.push('/app/operational/stamformasi/form?action=edit&id='+row._id)
                            }
                            }>
                            <EditIcon />
                          </IconButton>
                          <IconButton edge="end" aria-label="delete" onClick={() => 
                            {
                              setOpenDialog(true)
                              setSelectedData(row)
                          }
                          }>
                          <DeleteIcon />
                        </IconButton>
                        </StyledTableCell>
                      </StyledTableRow>
                    )
                  })
                ) : (
                  <StyledTableRow>
                    <StyledTableCell
                      align='center'
                      component='th'
                      scope='row'
                      colSpan={7}>
                      Tidak ada data
                    </StyledTableCell>
                  </StyledTableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Container>
      {/* )} */}
    </>
  )
}

{
  /*  */
}
