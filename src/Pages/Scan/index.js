import React, { useEffect, useContext } from 'react'
import {
  Box,
  TextField,
  Typography,
  Grid,
  CardActions,
  CardContent,
  DialogContentText,
  DialogTitle,
  Button,
  Container,
  Card,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material'
import useMediaQuery from '@mui/material/useMediaQuery'

import PropTypes from 'prop-types'
import AppBar from '@mui/material/AppBar'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import { useTheme } from '@mui/material/styles'
import OutlinedInput from '@mui/material/OutlinedInput'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import Scanner from './Scanner'
import UseDailyWork from 'Hooks/DailyWork/useDailyWork'

import { appBarStyle, TabStyle, buttonStyle } from './Styles'
import Api from 'Services/ApiOperational'
import { withRouter } from 'react-router-dom'
import useTrainDriver from 'Hooks/TrainDriver/useTrainDriver'
import useCheckup from 'Hooks/Checkup/useCheckup'
import QRCode from 'react-qr-code'
import { DinasanContext, UserProfilContext } from 'Context'
import { jwtDecode } from 'jwt-decode'
import useQuery from 'Utils/QueryParams'
import moment from 'moment'

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

function Scan(props) {
  const [value, setValue] = React.useState(0)
  const [open, setOpen] = React.useState(0)
  const [nik, setNik] = React.useState('')
  const { getDetailTrainDriver } = useTrainDriver()
  const [chooseWorkorder, setChooseWorkorder] = React.useState({})

  const { dataDetailDaily, handoverTablet, getDailyWorkById } = UseDailyWork()
  const { listDinasan, getDataDinas } = useContext(DinasanContext);
  const { getUserProfilById, userProfile, userWorkorder, operational_id } = useContext(UserProfilContext);
  // const { handleCheckup } = useCheckup()

  const theme = useTheme()
  const query = useQuery();

  const loadData = async()=>{
    console.log('userProfile', userProfile)
    let accessToken = query.get('accessToken')
    if(!accessToken){
      accessToken = localStorage.accessToken
    }
    const decodedToken = jwtDecode(accessToken);
		const id = decodedToken.id;
			// console.log('data user', id);

		const {workOrder} = await getUserProfilById(id, { date: new Date() });
    console.log('workOrder', workOrder, 'id', id)
    const dinasanList = await getDataDinas(workOrder.profile._id, {date: moment().format("YYYY-MM-DD")});
    console.log('dinasanList', dinasanList)
    // if(dinasanList && dinasanList?.length>0){
      // getDailyWorkById(workOrder.operational_id)
    // }

    // getDataDinas(workOrder?.officerId, {date: new Date(workOrder?.dailyWorkDate)});
  }

  useEffect(() => {
    loadData()
  }, [])

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  const handleSubmit = async (nik) => {
    //const result  = await getDetailTrainDriver(nik)
    //if(result?._id){
    props.history.push('/app/operational/takegiveworktraindriver?id=' + nik)
    // const resultCheckup = await handleCheckup(result)
    // if(resultCheckup.status === "OK"){

    // }
    //}
  }

  const handleClose = () => {
    props.history.push('/app/operational')
  }

  return (
    <>
      <Container maxWidth='xl' sx={{ mt: 20 }}>
        <Paper elevation={3} sx={{ p: 2, mb: 2 }}>
          <div>
            <Typography sx={{ fontSize: 14, fontWeight: 600 }}>
              Pilih Dinasan yang akan diperiksa
            </Typography>
            <Grid
              container
              sx={{ borderTop: "2px solid #A2A2A2", pt: 2, mt: 2 }}
            >
              <Grid item md={2.5}>
                <Typography
                  sx={{ fontSize: 13, color: "#A2A2A2", fontWeight: 500 }}
                >
                  Nama
                </Typography>
                <Typography
                  sx={{ fontSize: 13, color: "#A2A2A2", fontWeight: 500 }}
                >
                  Nik
                </Typography>
                <Typography
                  sx={{ fontSize: 13, color: "#A2A2A2", fontWeight: 500 }}
                >
                  Jabatan
                </Typography>
              </Grid>
              <Grid item md={9.5}>
                <Typography sx={{ fontSize: 13, fontWeight: 500 }}>
                  {userProfile?.officerName}
                </Typography>
                <Typography sx={{ fontSize: 13, fontWeight: 500 }}>
                  {userProfile?.officerNumber}
                </Typography>
                <Typography sx={{ fontSize: 13, fontWeight: 500 }}>
                  {userProfile?.officerPosition}
                </Typography>
              </Grid>
            </Grid>
          </div>

          <div>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Kode</TableCell>
                  <TableCell>Waktu</TableCell>
                  <TableCell>Pilih</TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {listDinasan.map((item, i) => (
                  <TableRow key={i}>
                    <TableCell>
                      {item.workOrder.code}
                    </TableCell>
                    <TableCell>
                      {item.workOrder?.start} -{" "}
                      {item.workOrder?.end}
                    </TableCell>
                    <TableCell>
                      <Button
                        onClick={() =>
                        {
                          setChooseWorkorder({...item.workOrder, operational_id:item.operational_id})
                        }
                          // handleSubmitDialog(
                          //   item.status,
                          //   item.dailyWorkTrainDriver?.loopRouteTrain?.code
                          // )
                        }
                        variant="contained"
                        style={{ backgroundColor: item.workOrder._id === chooseWorkorder?._id ? `#BB7E36` : "gray" }}
                      >
                        <Typography
                          style={{ textTransform: "none", color: "#ffffff" }}
                        >
                          Pilih
                        </Typography>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </Paper>
        {chooseWorkorder?._id && 
        <>
        <AppBar position='static' style={appBarStyle}>
          <Tabs
            indicatorColor='white'
            value={value}
            onChange={handleChange}
            textColor='gray'
            variant='fullWidth'>
            {/* Tab 1 */}
            <Tab sx={TabStyle} label='SCAN QRcode' {...a11yProps(0)} />

            {/* Tab 2 */}
            {/* <Tab sx={TabStyle} label='INPUT MANUAL' {...a11yProps(1)} /> */}

            <Tab sx={TabStyle} label='My QR' {...a11yProps(1)} />
          </Tabs>
        </AppBar>

        {/* TabPanel 1 */}
        <TabPanel value={value} index={0} style={{textAlign:'center', alignContent:'center', alignItems:'center' }} dir={theme.direction}>
          <Typography variant="h4">Silahkan Scan QR di masinis sebelum untuk melakukan serah terima tugas</Typography>
          <Scanner chooseWorkorder={chooseWorkorder.operational_id} />
        </TabPanel>

        {/* TabPanel 2 */}

        {/* <TabPanel value={value} index={1} dir={theme.direction}>
          <Card sx={{ width: '70%', height: 300, align: 'center', m: 'auto' }}>
            <CardContent sx={{ mt: 5 }}>
              <Typography
                sx={{
                  justifyContent: 'center',
                  display: 'flex',
                  color: '#BB7E36',
                  fontSize: '24px',
                  fontWeight: 'bold',
                }}>
                QRcode tidak terbaca, silakan masukkan NIK Masinis secara manual
              </Typography>
              <Typography
                sx={{
                  justifyContent: 'center',
                  display: 'flex',
                  fontSize: '17px',
                  opacity: 0.5,
                }}>
                Input Nomor Surat Tugas Masinis
              </Typography>
              <Grid sx={{ justifyContent: 'center', display: 'flex' }}>
                <TextField
                  sx={{
                    '&:hover': {
                      border: 'none',
                    },
                  }}
                  onChange={(e) => setNik(e.target.value)}
                  value={nik}
                  style={{ textAlign: 'center' }}
                  fullWidth
                  placeholder='Masukan Nomor Surat Tugas Masinis'
                />
              </Grid>
            </CardContent>
            <CardActions sx={{ justifyContent: 'center', display: 'flex' }}>
              <Button
                variant='contained'
                sx={buttonStyle}
                autoFocus
                onClick={handleClose}>
                Kembali
              </Button>
              <Button
                variant='contained'
                sx={buttonStyle}
                onClick={() => handleSubmit(nik)}
                autoFocus>
                Submit
              </Button>
            </CardActions>
          </Card>
        </TabPanel> */}
        <TabPanel value={value} index={1} dir={theme.direction}>
          <center style={{ padding: 30 }}>
            <Typography variant="h4">QRcode untuk Dinasan</Typography>
            <Typography variant='h6'>Kode Dinas: {chooseWorkorder.code || ""}</Typography>
            <QRCode value={chooseWorkorder?.operational_id || ""} size={300} />
            <p>Nomor : {chooseWorkorder?.operational_id || ""}</p>
          </center>
        </TabPanel>
        </>}
      </Container>
    </>
  )
}

export default withRouter(Scan)
