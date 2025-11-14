import React, { useEffect, useState, useContext } from "react";
import { QrReader } from "react-qr-reader";
import useTrainDriver from "Hooks/TrainDriver/useTrainDriver";
import UseCheckup from "Hooks/Checkup/useCheckup";
import { withRouter } from "react-router-dom";
import { DinasanContext, UserProfilContext } from "Context";
import { Container } from "@mui/material";

function Scanner(props) {
  const { getDetailTrainDriver } = useTrainDriver() 

  

  return (
    <div>
      <Container sx={{ mt: -4, width: "50%" }}>
        
        <QrReader constraints={{ facingMode: 'environment' }}
          onResult={async (result, error) => {
            if (!!result) {
              //const resultTrainDriver  = await getDetailTrainDriver(result?.text)
               //if(resultTrainDriver?._id){
              //   const resultCheckup = await handleCheckup(resultTrainDriver)
              //   if(resultCheckup.status === "OK"){
              //     console.log("result",resultCheckup)
                  props.history.push("/app/operational/takegiveworktraindriver?id="+result?.text+"&workorderId="+props.chooseWorkorder)
              //   }
              //}
            }

            if (!!error) {
              // console.info(error);
            }
          }}
          style={{ width: "20%", mt: -20 }}
        />
        ID :  {props.chooseWorkorder}
      </Container>
    </div>
  );
}

export default withRouter(Scanner)
