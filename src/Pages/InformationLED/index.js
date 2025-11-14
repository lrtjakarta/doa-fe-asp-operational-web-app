import { Box, Button, Container, TextField, Typography } from "@mui/material";
import { useState } from "react";

//styles
import StaticVar from "Config/StaticVar";
import { CopyToClipboard } from "react-copy-to-clipboard";
import "react-html5-camera-photo/build/css/index.css";
import "video-react/dist/video-react.css";
import { infoStyles } from "./Styles";

export default function InformatoinLED() {
  const [copied, setCopied] = useState(false);
  const accessToken = localStorage.getItem("access_token");
  const refreshToken = localStorage.getItem("refresh_token");

  return (
    <>
      <Box sx={{ display: "flex" }}>
        <Container maxWidth="xl">
          <Typography sx={{ fontSize: 18 }}>
            Information Upload Preview
          </Typography>
          <div>
            <Typography sx={{ fontSize: 14 }}>URL Information LED</Typography>
            <Box flexDirection={"column"}>
              <TextField
                value={`${StaticVar.OPERATIONAL_ASP_MICRO_APP}/app/operational/infoupload/preview`}
                InputProps={{
                  style: {
                    fontSize: 12,
                    minHeight: 75,
                    backgroundColor: "#fff",
                  },
                }}
                sx={infoStyles}
                style={{ marginTop: 10 }}
                fullWidth
                multiline
              />

              <CopyToClipboard
                text={`${StaticVar.OPERATIONAL_ASP_MICRO_APP}/app/operational/infoupload/preview?accessToken=${accessToken}&refreshToken=${refreshToken}`}
                onCopy={() => {
                  setCopied(true);
                }}
              >
                <Button
                  variant="contained"
                  color="primary"
                  sx={{
                    width: 100,
                    fontSize: 14,
                    mt: 1,
                  }}
                >
                  Copy
                </Button>
              </CopyToClipboard>
            </Box>
          </div>
          <div>
            {copied ? <span style={{ color: "black" }}>Copied.</span> : null}
          </div>
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            {/* <Button
              variant="contained"
              onClick={() => history.goBack()}
              sx={{
                color: "#A56C28",
                bgcolor: "#fff",
                border: "2px solid #A56C28",
                width: 300,
                fontSize: 14,
                mx: 5,
                my: 3,
                "&:hover": {
                  backgroundColor: "#BB7E36",
                  color: "#fff",
                  border: "2px solid #A56C28",
                },
              }}
            >
              <ArrowBackIosNewIcon sx={{ mr: 1, fontSize: 14 }} /> Kembali
            </Button> */}
            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                window
                  .open(
                    `${StaticVar.OPERATIONAL_ASP_MICRO_APP}/app/operational/infoupload/preview?accessToken=${accessToken}&refreshToken=${refreshToken}`,
                    "_blank"
                  )
                  .focus();
              }}
              sx={{
                width: 300,
                fontSize: 14,
                mx: 5,
                my: 3,
              }}
            >
              Preview
            </Button>
          </Box>
        </Container>
      </Box>
    </>
  );
}
