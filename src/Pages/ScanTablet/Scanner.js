import React, { useState } from "react";
import { QrReader } from "react-qr-reader";
import { Box, Container } from "@mui/material";
import useTrainDriver from "Hooks/TrainDriver/useTrainDriver";
import UseCheckup from "Hooks/Checkup/useCheckup";
import { withRouter } from "react-router-dom";
import UseDailyWork from "Hooks/DailyWork/useDailyWork";

function Scanner(props) {
  const { getDetailTrainDriver } = useTrainDriver() 
  const { handleCheckup } = UseCheckup()

  const {
      updateDataScheduleTrainDriverStatus
    } = UseDailyWork()

  return (
    <div>
      <Container sx={{ mt: -4, width: "50%" }}>
        <QrReader constraints={{ facingMode: 'environment' }}
          onResult={async (result, error) => {
            if (!!result) {

              const res = await updateDataScheduleTrainDriverStatus(
                result.text,
                {
                  readTakeGive: true,
                  completeState: true,
                  status: 'Finish',
                  handOverWork: {
                    handOverTime: new Date(),
                  },
                },
              )
              if (res.status) {
                alert('Serah terima tablet berhasil dilakukan')
              }
              // localStorage.setItem('operational_id', result.text)
              // alert('Lanjutkan dengan melakukan serah terima dengan masinis sebelumnya')
              // props.history.push('/app/operational/scan')
              // props.history.push('/')
                  // props.history.push("/app/operational/takegiveworktraindriver?id="+result?.text)
            }

            if (!!error) {
              // console.info(error);
            }
          }}
          style={{ width: "20%", mt: -20 }}
        />
      </Container>
    </div>
  );
}

export default withRouter(Scanner)
