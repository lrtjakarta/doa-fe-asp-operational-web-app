import {
  Box,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Typography,
} from "@mui/material";
import QRCode from "react-qr-code";

const CoachingFormTemplate = ({ dataDetail }) => {
  return (
    <Box
      sx={{
        width: "8.5in",
        minHeight: "11in",
        padding: "0.5in",
        margin: "0 auto",
        backgroundColor: "white",
        boxSizing: "border-box",
      }}
    >
      {/* Header */}
      <Table sx={{ width: "100%", mb: 4 }}>
        <TableBody>
          <TableRow>
            <TableCell colSpan={2} sx={{ border: "none" }}>
              <Typography variant="h6" align="left">
                LRT JAKARTA
              </Typography>
            </TableCell>
            <TableCell colSpan={4} sx={{ border: "none" }}>
              <Typography variant="h6" align="right">
                FORMULIR COACHING
              </Typography>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>

      {/* Form Content */}
      <Table sx={{ width: "100%", mb: 2 }}>
        <TableBody>
          <TableRow>
            <TableCell sx={{ width: "25%" }}>Nama Penyelia</TableCell>
            <TableCell sx={{ width: "5%" }}>:</TableCell>
            <TableCell sx={{ width: "30%" }}>
              {dataDetail?.supervisor?.name}
            </TableCell>
            <TableCell sx={{ width: "15%" }}>NIK</TableCell>
            <TableCell sx={{ width: "5%" }}>:</TableCell>
            <TableCell sx={{ width: "20%" }}>
              {dataDetail?.supervisor?.idNumber}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Nama Masinis</TableCell>
            <TableCell>:</TableCell>
            <TableCell>{dataDetail?.trainDriver?.name}</TableCell>
            <TableCell>NIK</TableCell>
            <TableCell>:</TableCell>
            <TableCell>{dataDetail?.trainDriver?.idNumber}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Tanggal</TableCell>
            <TableCell>:</TableCell>
            <TableCell>{dataDetail?.dateCoaching}</TableCell>
            <TableCell>Waktu</TableCell>
            <TableCell>:</TableCell>
            <TableCell>{dataDetail?.timeCoaching}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Kategori Coaching</TableCell>
            <TableCell>:</TableCell>
            <TableCell>{dataDetail?.categoryCoaching}</TableCell>
            <TableCell>Fase Coaching</TableCell>
            <TableCell>:</TableCell>
            <TableCell>{dataDetail?.phaseCoaching}</TableCell>
          </TableRow>
        </TableBody>
      </Table>

      <Divider sx={{ my: 2, borderWidth: 1 }} />

      {/* Performance Issues */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="subtitle1" fontWeight="bold">
          Permasalahan Kinerja
        </Typography>
        <Typography
          sx={{ mt: 1, minHeight: "40mm" }}
          dangerouslySetInnerHTML={{ __html: dataDetail?.performanceProblems }}
        />
      </Box>

      <Divider sx={{ my: 2, borderWidth: 1 }} />

      {/* Agreed Solution */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="subtitle1" fontWeight="bold">
          Solusi Yang Disepakati
        </Typography>
        <Typography
          sx={{ mt: 1, minHeight: "40mm" }}
          dangerouslySetInnerHTML={{ __html: dataDetail?.solution }}
        />
      </Box>

      <Divider sx={{ my: 2, borderWidth: 1 }} />

      {/* Action Plan */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="subtitle1" fontWeight="bold">
          Action Plan Terhadap Solusi
        </Typography>
        <Typography
          sx={{ mt: 1, minHeight: "40mm" }}
          dangerouslySetInnerHTML={{ __html: dataDetail?.actionPlan }}
        />
      </Box>

      <Divider sx={{ my: 2, borderWidth: 1 }} />

      {/* Review Plan */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="subtitle1" fontWeight="bold">
          Rencana Review
        </Typography>
        <Typography
          sx={{ mt: 1, minHeight: "40mm" }}
          dangerouslySetInnerHTML={{ __html: dataDetail?.reviewPlan }}
        />
      </Box>

      <Divider sx={{ my: 2, borderWidth: 1 }} />

      {/* Signatures */}
      <Box sx={{ display: "flex", justifyContent: "space-between", mt: 4 }}>
        <Box sx={{ textAlign: "center", width: "45%" }}>
          <Typography fontWeight="bold">Coach</Typography>
          <QRCode value={dataDetail?.supervisor?.idNumber} size={100} />
          <Typography>( {dataDetail?.supervisor?.name} )</Typography>
          <Typography>NIK: {dataDetail?.supervisor?.idNumber}</Typography>
        </Box>
        <Box sx={{ textAlign: "center", width: "45%" }}>
          <Typography fontWeight="bold">Coachee</Typography>
          <QRCode value={dataDetail?.trainDriver?.idNumber} size={100} />
          <Typography>( {dataDetail?.trainDriver?.name} )</Typography>
          <Typography>NIK: {dataDetail?.trainDriver?.idNumber}</Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default CoachingFormTemplate;
