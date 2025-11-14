import { Grid, Typography } from '@mui/material'
import UseCounting from 'Hooks/Counting/useCounting'
import moment from 'moment'
import React, { memo } from 'react'
    
function Duration(props) {
    const { calculateTimeLeft } = UseCounting()

    return (
    <>
      {
        (calculateTimeLeft(moment(props.startTime).format("MM/DD/YYYY HH:mm:ss"))).hours + ":" +
        (calculateTimeLeft(moment(props.startTime).format("MM/DD/YYYY HH:mm:ss"))).minutes + ":" +
        (calculateTimeLeft(moment(props.startTime).format("MM/DD/YYYY HH:mm:ss"))).seconds 
      }
    </>
    )
}

export default memo(Duration)