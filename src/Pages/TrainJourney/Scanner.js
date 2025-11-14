import React, { useEffect, useState, useContext } from "react";
import { QrReader } from "react-qr-reader";
import useTrainDriver from "Hooks/TrainDriver/useTrainDriver";
import UseCheckup from "Hooks/Checkup/useCheckup";
import { withRouter } from "react-router-dom";
import { DinasanContext, UserProfilContext } from "Context";
import { Container } from "@mui/material";

function ScannerJourney({id, workorderId, setScanWorkOrderId, setEntryCabinStatus, setOpenModalHandOver, ...props}) {
  const changeWorkOrderid = (id) => {
    setScanWorkOrderId(id)
    setEntryCabinStatus(false)
    setOpenModalHandOver(true);
  }

  return (
    <div>
      <Container sx={{ width: "50%" }}>
        
        <QrReader constraints={{ facingMode: 'environment' }}
          onResult={async (result, error) => {
            if (!!result) {
                  changeWorkOrderid(result?.text);
              }

            if (!!error) {
              // console.info(error);
            }
          }}
          style={{ width: "20%",  }}
        />
        ID :  {id}
      </Container>
    </div>
  );
}

export default withRouter(ScannerJourney)
