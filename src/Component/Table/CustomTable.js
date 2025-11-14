import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

export default function BasicTable(props) {
  let { header, tablebody, sx } = props;
  return (
    <TableContainer component={Paper} sx={sx}>
      <Table size="small" aria-label="simple table">
        <TableHead>
          <TableRow>
            {header?.map((x) => (
              <TableCell
                align="center"
                width={x == "Stasiun" ? 200 : x == "No" ? 50 : 100}
              >
                {x}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>{tablebody}</TableBody>
      </Table>
    </TableContainer>
  );
}
