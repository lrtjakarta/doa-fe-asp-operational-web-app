import React, { useState } from "react";
import { QrReader } from "react-qr-reader";
import { Box, Container } from "@mui/material";
import useTrainDriver from "Hooks/TrainDriver/useTrainDriver";
import UseCheckup from "Hooks/Checkup/useCheckup";
import { withRouter } from "react-router-dom";
import UseDailyWork from "Hooks/DailyWork/useDailyWork";
import moment from 'moment'

function Scanner(props) {
  const { getDetailTrainDriver } = useTrainDriver() 
  const { handleCheckup } = UseCheckup()
  const { finishWork } = UseDailyWork() 
  return (
    <div>
      <Container sx={{ mt: -4, width: "50%" }}>
        <QrReader
          onResult={async (result, error) => {
            if (!!result) {
              let datapost = {
                status : 'Completed',
                completeDate : new Date()
              }
              finishWork(result?.text, datapost, moment().format("YYYY-MM-DD"))
              props.history.push('/app/operational/trainjourneyreview?workid='+result?.text)
              // const resultTrainDriver  = await getDetailTrainDriver(result?.text)
              //  if(resultTrainDriver?._id){
              //   props.history.push("/app/operational/takegivework?workid="+result?.text)
              // }
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
