import { Alert, Button, Container, TextField, Typography } from "@mui/material";
import UseDailyWork from "Hooks/DailyWork/useDailyWork";

import React, { useEffect } from "react";

const HandoverPenyelia = (props) => {
  const {
    getDailyWork,
    takegivework,
    roleSupervisorState,
    dataScheduleSupervisor,
    noteLRV,
    setNoteLRV,
    putDailyWork,
  } = UseDailyWork();

  useEffect(() => {
    getDailyWork();
    return () => {};
  }, []);

  return (
    <Container maxWidth="xl">
      <Alert severity="info" sx={{ mt: 2, mb: 2 }}>
        <Typography variant="h6">
          Hi, penyelia {dataScheduleSupervisor?.trainDriver?.name}. Anda
          memiliki kedinasan mulai{" "}
          {dataScheduleSupervisor?.loopRouteTrain?.start} sampai{" "}
          {dataScheduleSupervisor?.loopRouteTrain?.end} dengan kode dinasan{" "}
          {dataScheduleSupervisor?.loopRouteTrain?.code} -{" "}
          {dataScheduleSupervisor?.loopRouteTrain?.loop}. Selamat Bekerja.
        </Typography>
      </Alert>

      {roleSupervisorState ? (
        <>
          <Typography variant="h6">Catatan Kondisi Perka saat ini</Typography>
          <TextField
            value={noteLRV}
            onChange={(e) => setNoteLRV(e.target.value)}
            style={{ width: "100%", backgroundColor: "white" }}
            multiline={true}
            placeholder="Isikan kondisi perka anda disini untuk memberikan informasi kepada penyelia selanjutnya"
          />
          <Button
            variant="contained"
            color="primary"
            sx={{ mt: 1, mb: 1, mr: 1 }}
            onClick={() => {
              putDailyWork(dataScheduleSupervisor?._id, {
                noteLRV,
              });
              alert("Data Terkirim");
            }}
          >
            Submit
          </Button>
        </>
      ) : null}

      {roleSupervisorState && !dataScheduleSupervisor?.completeState ? (
        <Button
          variant="contained"
          color="secondary"
          sx={{ mt: 1, mb: 1 }}
          onClick={() => {
            putDailyWork(dataScheduleSupervisor?._id, {
              completeState: true,
              completeDate: new Date(),
            });
            alert("Anda telah menyelesaikan dinasan hari ini. Terima kasih.");
          }}
        >
          Selesai Dinas
        </Button>
      ) : null}
    </Container>
  );
};

export default HandoverPenyelia;
