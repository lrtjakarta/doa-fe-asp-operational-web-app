import React, {
  useEffect,
  useRef,
  forwardRef,
  useState,
  useContext,
  Fragment,
} from 'react'
import { styled } from '@mui/material/styles'
import SearchIcon from '@mui/icons-material/Search'
import {
  Table,
  Button,
  Grid,
  TextField,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  IconButton,
  TableFooter,
  TablePagination,
  Box,
  CircularProgress,
  Backdrop,
  InputAdornment,
} from '@mui/material'
import TableCell, { tableCellClasses } from '@mui/material/TableCell'
import VisibilityIcon from '@mui/icons-material/Visibility'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import LastPageIcon from '@mui/icons-material/LastPage'
import FirstPageIcon from '@mui/icons-material/FirstPage'
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight'
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft'

import moment from 'moment'
import { Link } from 'react-router-dom'
// import { MonthPicker } from '@mui/x-date-pickers/MonthPicker'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import _ from 'lodash'

import Detail from './Detail'
import html2pdf from 'html2pdf.js'
import Dialog from '../../Component/CustomDialog/index'
import useUploadImg from 'Hooks/Upload/useUploadImg'

import { useTheme } from '@mui/material/styles'
import PropTypes from 'prop-types'

import { CabinRideContext } from 'Context'
import { searchStyle } from './Styles'

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: '#BB7E36',
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 12,
    fontWeight: 100,
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

export default function ListMasinis(props) {
  const { getCabinRide, cabinrides, setCabinRides, deleteCabinRide } =
    useContext(CabinRideContext)

  const [date, setDate] = useState(new Date())
  const [searchText, setSearchText] = useState('')
  const [opendelete, setOpenDelete] = useState(false)
  const [selected, setSelected] = useState('')

  // pagination
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(5)

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - cabinrides?.length) : 0

  console.log('emptyRows', emptyRows)

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  const handleOnDialog = (e) => {
    console.log(e)
    if (e) {
      handleDeleteSubmit(selected)
    } else {
      setOpenDelete(false)
    }
  }

  const handleDeleteSubmit = async (e) => {
    console.log('selected', e)
    let res = await deleteCabinRide(e)
    if (res.status == 'OK') {
      setOpenDelete(false)
    }
  }

  const onDelete = (e) => {
    setSelected(e._id)
    setOpenDelete(true)
  }

  console.log('cabinrides', cabinrides)

  const handleFilterMonth = (e) => {
    setDate(e.target.value)
    let month = moment(e.target.value).format('YYYY-MM')
    // console.log(e)
    getCabinRide({
      params: { month },
    })
  }

  const handleFilterText = (value) => {
    setSearchText(value)
    if (value !== '') {
      var searchQuery = value.toString().toLowerCase()

      let filtertext = cabinrides.filter(
        (item) =>
          item?.trainDriver?.name
            .toString()
            .toLowerCase()
            .indexOf(searchQuery) !== -1,
      )

      setCabinRides(filtertext)
    } else {
      fetchData()
    }
  }

  const { setLoader, loader } = useUploadImg()
  var element = useRef([])
  var opt = {
    filename: `cabinride-${moment().format('YYYYMMDDHHmmss')}.pdf`,
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
        <Detail dataDetail={props?.dataDetail} action='detail' />
      </div>
    )
  })

  const fetchData = () => {
    let month = moment(new Date()).format('YYYY-MM')
    getCabinRide({
      params: { month },
    })
  }

  useEffect(() => {
    fetchData()
  }, [])

  let idprofile = JSON.parse(localStorage.getItem('profile'))?._id
  // console.log("localstorage", idprofile)

  return (
    <Fragment>
      <Backdrop
        sx={{ color: '#fff', zIndex: 99999 }}
        open={loader}
        onClick={() => setLoader(false)}>
        <CircularProgress color='inherit' />
      </Backdrop>

      <div className={'print-source'}>
        {cabinrides.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
          ?.length > 0
          ? cabinrides
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => (
                <Content
                  ref={(el) => {
                    element.current[index] = el
                  }}
                  dataDetail={row}
                />
              ))
          : null}
      </div>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <Grid container mt={2} mb={5}>
          <Grid
            container
            justifyContent={'space-between'}
            alignItems='center'
            mb={2}>
            <div>
              <Typography variant='h5'>History Cabin Ride</Typography>
            </div>
            <div
              style={{
                display: 'flex',
                justifyContent: 'flex-end',
              }}>
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
                value={date}
                onChange={(newValue) => handleFilterMonth(newValue)}
              />
              <TextField
                value={searchText}
                placeholder='Pencarian'
                onChange={(e) => handleFilterText(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position='start'>
                      <IconButton>
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
                    marginLeft: 5,
                    backgroundColor: '#fff',
                    boxShadow: 'inset 0px 2px 4px rgba(0, 0, 0, 0.25)',
                  },
                }}
                className={searchStyle}
              />
              <Button
                fullWidth
                variant='contained'
                color='success'
                sx={{ ml: 1, height: 35, width: 100 }}
                onClick={async () => {
                  setLoader(true)
                  await handlePrint(1)
                }}>
                Download
              </Button>
              <Button
                variant='contained'
                sx={{ ml: 1, height: 35, width: 150 }}
                component={Link}
                to={`/app/operational/cabinride/scan`}>
                Scan QRCODE
              </Button>
            </div>
          </Grid>

          <Grid item md={12} lg={12} xl={12} sm={12}>
            <TableContainer component={Paper}>
              <Table
                // sx={{ minWidth: 700 }}
                aria-label='customized table'>
                <TableHead>
                  <TableRow>
                    <StyledTableCell>No.</StyledTableCell>
                    <StyledTableCell align='left'>Nama Masinis</StyledTableCell>
                    {/* <StyledTableCell align="left">
                                            NIK
                                        </StyledTableCell> */}
                    <StyledTableCell align='left'>Dinasan</StyledTableCell>
                    {/* <StyledTableCell align="left">
                                            No. KA
                                        </StyledTableCell> */}
                    <StyledTableCell align='left'>Tanggal</StyledTableCell>
                    <StyledTableCell align='left' width={250}>
                      Catatan
                    </StyledTableCell>

                    <StyledTableCell align='center'>
                      Total Nilai
                    </StyledTableCell>
                    <StyledTableCell align='center'>Aksi</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {
                    (rowsPerPage > 0
                      ? cabinrides.slice(
                          page * rowsPerPage,
                          page * rowsPerPage + rowsPerPage,
                        )
                      : cabinrides
                    ).map((row, index) => {
                      let datamaster =
                        Array.isArray(row?.cabinRide) &&
                        row?.cabinRide.length > 1
                          ? row.cabinRide
                          : []

                      console.log('datamaster', datamaster)
                      let _fdesc = datamaster.map((y) =>
                        y.desc.map((x) => parseInt(x.result)),
                      )
                      let _concat = [].concat.apply([], _fdesc)
                      return (
                        <StyledTableRow key={row.name}>
                          <StyledTableCell
                            fontSize={12}
                            component='th'
                            scope='row'>
                            {/* {index + 1} */}
                            {page * rowsPerPage + (index + 1)}
                          </StyledTableCell>
                          <StyledTableCell align='left'>
                            <Typography fontSize={12} fontWeight={100}>
                              {row?.trainDriver?.name}
                            </Typography>
                            <Typography fontSize={12} fontWeight={100}>
                              NIK: {row?.trainDriver?.nik}
                            </Typography>
                          </StyledTableCell>
                          {/* <StyledTableCell align="left">
                                                        
                                                    </StyledTableCell> */}
                          <StyledTableCell align='left'>
                            <Typography fontSize={12} fontWeight={100}>
                              Kode:{' '}
                              {row?.dailyWorkTrainDriver?.loopRouteTrain?.code}
                            </Typography>
                            <Typography fontSize={12} fontWeight={100}>
                              No. LRV: {row?.LRVNumber}
                            </Typography>
                            <Typography fontSize={12} fontWeight={100}>
                              No. KA: {row?.looptrain}
                            </Typography>
                          </StyledTableCell>

                          {/* <StyledTableCell align="left">
                                                        {row?.looptrain}
                                                    </StyledTableCell> */}

                          <StyledTableCell align='left'>
                            <Typography fontSize={12} fontWeight={100}>
                              Tanggal:{' '}
                              {row?.createdAt &&
                                moment(row?.createdAt).format('DD-MM-YYYY')}
                            </Typography>
                            <Typography fontWeight={100} fontSize={12}>
                              Jam Mulai:{' '}
                              {row?.createdAt &&
                                moment(row?.createdAt).format('HH:mm')}
                            </Typography>
                            <Typography fontSize={12} fontWeight={100}>
                              Jam Selesai:{' '}
                              {row?.finishTime &&
                                moment(row?.finishTime).format('HH:mm')}
                            </Typography>
                          </StyledTableCell>
                          <StyledTableCell align='left'>
                            <Typography fontSize={12} fontWeight={100}>
                              Dibuat: {row.createBy.name}
                            </Typography>
                            <Typography fontSize={12} fontWeight={100}>
                              Created At:{' '}
                              {moment(row.createdAt).format('DD:MM:YYYY HH:mm')}
                            </Typography>
                            <Typography fontSize={12} fontWeight={100}>
                              Updated At:{' '}
                              {moment(row.updatedAt).format('DD:MM:YYYY HH:mm')}
                            </Typography>
                            <Typography fontSize={12} fontWeight={100}>
                              {row?.note}
                            </Typography>
                          </StyledTableCell>
                          <StyledTableCell align='center'>
                            {_.sum(_concat)}
                          </StyledTableCell>
                          <StyledTableCell align='center'>
                            {/* <Button
                                                            variant="contained"
                                                            component={Link}
                                                            to={`/app/operational/cabinride/detail?id=${row._id}`}
                                                        >
                                                            Detail
                                                        </Button> */}
                            <IconButton
                              color='primary'
                              // aria-label="upload picture"
                              component={Link}
                              to={`/app/operational/cabinride/detail?id=${row._id}`}>
                              <VisibilityIcon />
                            </IconButton>
                            {idprofile == row?.createBy?._id && (
                              <IconButton
                                color='primary'
                                // aria-label="upload picture"
                                component={Link}
                                to={`/app/operational/cabinride/form?id=${row._id}`}>
                                <EditIcon />
                              </IconButton>
                            )}

                            {idprofile == row?.createBy?._id ? (
                              <IconButton
                                color='secondary'
                                component='label'
                                onClick={() => onDelete(row)}>
                                <DeleteIcon />
                              </IconButton>
                            ) : null}
                          </StyledTableCell>
                        </StyledTableRow>
                      )
                    })
                    // ) : (
                    // <StyledTableRow>
                    //     <StyledTableCell
                    //         align="center"
                    //         component="th"
                    //         scope="row"
                    //         colSpan={9}
                    //     >
                    //         Tidak ada data
                    //     </StyledTableCell>
                    // </StyledTableRow>
                  }

                  {emptyRows > 0 && (
                    <StyledTableRow
                      style={{
                        height: 53 * emptyRows,
                      }}>
                      <StyledTableCell align='center' colSpan={8}>
                        Tidak ada data
                      </StyledTableCell>
                      {/* <TableCell
                                                // style={tableRowAwalStyle}
                                                component="th"
                                                scope="row"
                                                colSpan={8}
                                            >
                                                {/* <Typography
                                                        sx={{
                                                            fontSize: 20,
                                                            textAlign: "center",
                                                            mt: 4
                                                        }}
                                                    >
                                                        Data Kosong
                                                    </Typography> */}
                      {/* </TableCell>  */}
                    </StyledTableRow>
                  )}
                </TableBody>

                <TableFooter>
                  <TableRow>
                    <TablePagination
                      rowsPerPageOptions={[
                        5,
                        10,
                        25,
                        { label: 'All', value: -1 },
                      ]}
                      // colSpan={9}
                      count={cabinrides.length}
                      rowsPerPage={rowsPerPage}
                      page={page}
                      SelectProps={{
                        inputProps: {
                          'aria-label': 'rows per page',
                        },
                        native: true,
                      }}
                      onPageChange={handleChangePage}
                      onRowsPerPageChange={handleChangeRowsPerPage}
                      ActionsComponent={TablePaginationActions}
                    />
                  </TableRow>
                </TableFooter>
              </Table>
            </TableContainer>
          </Grid>
        </Grid>
        {opendelete && <Dialog onDialog={handleOnDialog} />}
      </LocalizationProvider>
    </Fragment>
  )
}

function TablePaginationActions(props) {
  const theme = useTheme()
  const { count, page, rowsPerPage, onPageChange } = props

  const handleFirstPageButtonClick = (event) => {
    onPageChange(event, 0)
  }

  const handleBackButtonClick = (event) => {
    onPageChange(event, page - 1)
  }

  const handleNextButtonClick = (event) => {
    onPageChange(event, page + 1)
  }

  const handleLastPageButtonClick = (event) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1))
  }

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label='first page'>
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label='previous page'>
        {theme.direction === 'rtl' ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label='next page'>
        {theme.direction === 'rtl' ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label='last page'>
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  )
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
}
