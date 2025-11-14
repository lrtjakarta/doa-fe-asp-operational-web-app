import React from "react";
import "./DataTable.css";
import Typography14 from "Component/Typography/Typography14";
import { Stack } from "@mui/material";

function TtdPrint({
  infoOfficer,
  numberOfficer,
  infoPenumpang,
  namePenumpang,
}) {
  return (
    <>
      <table className="data-table">
        <tbody>
          <tr>
            <td
              style={{  borderTopColor: "white" }}
              width="35%"
            >
              <Stack  direction="row"
  justifyContent="center">
              <Typography14 title={infoOfficer} fontWeight={700} />
              </Stack>
            </td>
            <td
              colSpan={2}
              style={{ borderBottomColor: "white", borderTopColor: "white" }}
            ></td>
            <td
              style={{  borderTopColor: "white" }}
              width="35%"
            >
              <Stack  direction="row"
  justifyContent="center">
              <Typography14 title={infoPenumpang} fontWeight={700} />
              </Stack>
            </td>
          </tr>
          <tr>
            <td height="100px"></td>
            <td colSpan={2} style={{ borderBottomColor: "white" }}></td>
            <td height="100px"></td>
          </tr>
          <tr>
            <td>
              <Typography14 title={numberOfficer} fontWeight={700} />
            </td>
            <td colSpan={2} style={{ borderBottomColor: "white" }}></td>
            <td >
              <Stack  direction="row"
  justifyContent="center">
                <Typography14 title={namePenumpang} fontWeight={700} />
              </Stack>
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );
}

export default TtdPrint;
