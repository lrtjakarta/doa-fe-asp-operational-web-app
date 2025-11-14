import React from 'react'
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
} from '@mui/material'
import { useHistory } from 'react-router-dom'

import PropTypes from 'prop-types'
import AppBar from '@mui/material/AppBar'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import { useTheme } from '@mui/material/styles'
import Scanner from './Scanner'

import { appBarStyle, TabStyle, buttonStyle } from './Styles'
import { withRouter } from 'react-router-dom'
import useTrainDriver from '../../Hooks/TrainDriver/useTrainDriver'
import useCheckup from '../../Hooks/Checkup/useCheckup'
import { toast } from 'react-toastify'

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
  const { handleCheckup, getDetailCheckup } = useCheckup()
  const history = useHistory()

  const theme = useTheme()

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  const handleSubmit = async () => {
    const result = await getDetailTrainDriver(nik)
    // console.log("result", result)

    if (result?._id) {
      const resultCheckup = await handleCheckup(result)
      if (resultCheckup?.status === 'OK') {
        props.history.push(
          '/app/operational/cabinride/form?id=' + resultCheckup?.result?._id,
        )
      } else {
        // console.log("condition false")
        toast.error(
          'Maaf hasil pemeriksaan anda tidak memenuhi untuk lanjut cabin ride',
        )
      }
    }
  }
  return (
    <>
      <Container maxWidth='xl' sx={{ pt: 13 }}>
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
            <Tab sx={TabStyle} label='INPUT MANUAL' {...a11yProps(1)} />
          </Tabs>
        </AppBar>

        {/* TabPanel 1 */}
        <TabPanel value={value} index={0} dir={theme.direction}>
          <Scanner />
        </TabPanel>

        {/* TabPanel 2 */}

        <TabPanel value={value} index={1} dir={theme.direction}>
          <Card
            sx={{
              width: '70%',
              height: 300,
              align: 'center',
              m: 'auto',
            }}>
            <CardContent sx={{ mt: 5 }}>
              <Typography
                sx={{
                  justifyContent: 'center',
                  display: 'flex',
                  color: '#BB7E36',
                  fontSize: '24px',
                  fontWeight: 'bold',
                }}>
                QRcode tidak terbaca, silakan masukkan NIK secara manual
              </Typography>
              <Typography
                sx={{
                  justifyContent: 'center',
                  display: 'flex',
                  fontSize: '17px',
                  opacity: 0.5,
                }}>
                Input NIK
              </Typography>
              <Grid
                sx={{
                  justifyContent: 'center',
                  display: 'flex',
                }}>
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
                  placeholder='Masukan NIK '
                />
              </Grid>
            </CardContent>
            <CardActions sx={{ justifyContent: 'center', display: 'flex' }}>
              <Button
                variant='contained'
                sx={buttonStyle}
                autoFocus
                onClick={history.goBack}>
                Kembali
              </Button>
              <Button
                variant='contained'
                sx={buttonStyle}
                onClick={handleSubmit}
                autoFocus>
                Submit
              </Button>
            </CardActions>
          </Card>
        </TabPanel>
      </Container>
    </>
  )
}

export default withRouter(Scan)
