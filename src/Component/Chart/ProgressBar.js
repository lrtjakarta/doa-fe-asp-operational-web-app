import React from 'react'
import LinearProgress from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

function ProgressBar(props) {
    return (
        <div>
             <Box display="flex" alignItems="center">
                <Box width="100%" mr={1}>
                    <LinearProgress color={props.color} style={{paddingBottom: 10,}} variant="determinate" value={props.value} />
                </Box>
                <Box minWidth={35}>
                <Typography variant="body2" color="textSecondary">{props.title}</Typography>
                </Box>
                <Box minWidth={35}>
                <Typography variant="body2" color="textSecondary">({props.total})</Typography>
                </Box>
            </Box>
        </div>
    )
}

export default ProgressBar
