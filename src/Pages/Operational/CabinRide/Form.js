import React from "react"
import {
  Container,
  Box,
  TableCell,
  Table,
  TableHead,
  TableRow,
  TableContainer,
  TableBody,
} from "@mui/material"
import { styled, useTheme } from "@mui/material/styles"
import usePagination from "@mui/material/usePagination"
import riwayatData from "./Data"

// style
import {
  tableLeftStyle,
  tableRightStyle,
  tableStyle,
} from "./Styles"

export default function FormCabinRide() {
  const theme = useTheme()
  const { items } = usePagination({
    count: 5,
  })
  return (
    <>
      <Container maxWidth="lg">
        <Box sx={{ display: "flex", mt: 10 }}>
          <TableContainer sx={{ mt: 5, mb: 10, borderSpacing: "10px 10px" }}>
            <Table
              sx={tableStyle}
              aria-label="simple table"
            >
              <TableHead>
                <TableRow>
                  <TableCell>
                    <p
                      align="center"
                      style={{
                        color: "#000",
                        fontWeight: "bold",
                        fontSize: "16px",
                        [theme.breakpoints.down("sm")]: {
                          fontSize: 14,
                          padding: "10px",
                        },
                      }}
                    >
                      No.
                    </p>
                  </TableCell>
                  <TableCell align="center">Cabin Ride</TableCell>
                  <TableCell align="center">Uraian</TableCell>
                  <TableCell align="center">Nilai Realisasi</TableCell>
                  <TableCell align="center">Keterangan</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {riwayatData.map((x, i) => (
                  <TableRow
                    key={i}
                    sx={{
                      // "&:last-child td, &:last-child th": { border: 0 },
                      // borderBottom: "none",
                      // border: "1px solid ",
                      borderRadius: 3,
                    }}
                    style={{
                      backgroundColor: "#Fff",
                      // border: "none",
                    }}
                  >
                    <TableCell
                      // style={tableLeftIsiStyle}
                      component="th"
                      scope="row"
                      align="center"
                      sx={tableLeftStyle}
                      // sx={{ border: "1px #fff" }}
                    >
                      {i+1}
                    </TableCell>

                    <TableCell align="left">{x.cabinride}</TableCell>
                    <TableCell sx={{ color: "red" }} align="left">
                      {x.desc}
                      <br />
                      {x.descdua}
                      <br />
                      {x.desctiga}
                      <br />
                      {x.descempat}
                    </TableCell>
                    <TableCell align="center">{x.realvalue}</TableCell>
                    <TableCell sx={tableRightStyle} align="center">
                      {x.info}
                    </TableCell>
                  </TableRow>
                ))}
                <TableRow sx={{ bgcolor: "#fff", color: "#000" }}>
                  {" "}
                  <TableCell
                    colSpan={3}
                    // style={tableLeftIsiStyle}
                    // sx={{ bgcolor: "#fff" }}
                    sx={tableLeftStyle}
                    style={{ color: " #000" }}
                    align="center"
                  >
                    Jumlah Isi
                  </TableCell>
                  <TableCell sx={{ bgcolor: "#fff" }} align="center">
                    0
                  </TableCell>
                  <TableCell
                    // sx={{ bgcolor: "#fff" }}
                    sx={tableRightStyle}
                    align="center"
                  >
                    -
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Container>
    </>
  )
}
