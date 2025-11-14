import React, { useState } from 'react'
import { QrReader } from 'react-qr-reader'
import { Box, Container } from '@mui/material'
import useTrainDriver from 'Hooks/TrainDriver/useTrainDriver'
import UseCheckup from 'Hooks/Checkup/useCheckup'
import { withRouter } from 'react-router-dom'
import { toast } from 'react-toastify'

function Scanner(props) {
  const { getDetailTrainDriver } = useTrainDriver()
  const { handleCheckup } = UseCheckup()

  return (
    <div>
      <Container sx={{ mt: -4, width: '50%' }}>
        <QrReader
          constraints={{ facingMode: 'environment' }}
          onResult={async (result, error) => {
            if (!!result) {
              console.log(result?.text)
              const resultTrainDriver = await getDetailTrainDriver(result?.text)
              if (resultTrainDriver?._id) {
                console.log('resultTrainDriver', resultTrainDriver)
                const resultCheckup = await handleCheckup(resultTrainDriver)
                console.log('resultCheckup', resultCheckup)
                if (resultCheckup?.status === 'OK') {
                  props.history.push(
                    '/app/operational/cabinride/form?id=' +
                      resultCheckup?.result?._id,
                  )
                } else {
                  // console.log("condition false")
                  toast.error(
                    'Maaf hasil pemeriksaan anda tidak memenuhi untuk lanjut cabin ride',
                  )
                }
              }
            }

            if (!!error) {
              // console.info(error);
            }
          }}
          style={{ width: '20%', mt: -20 }}
        />
      </Container>
    </div>
  )
}

export default withRouter(Scanner)
