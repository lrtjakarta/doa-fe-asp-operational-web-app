import React, { useEffect } from 'react'
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

  const { dataDetailDaily, handoverTablet, getDailyWorkById } = UseDailyWork()
  // const { handleCheckup } = useCheckup()

  const theme = useTheme()

  useEffect(() => {
    // getDailyWorkById(localStorage.operational_id)
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
      <Container maxWidth='xl' sx={{ mt: 20, textAlign:'center', alignContent:'center', alignItems:'center' }}>
        <Typography variant="h4">Silahkan Scan QR di penyelia untuk melakukan serah terima tablet</Typography>
        <Scanner />
      </Container>
    </>
  )
}

export default withRouter(Scan)
