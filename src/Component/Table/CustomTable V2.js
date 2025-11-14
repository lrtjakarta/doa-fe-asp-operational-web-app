import PropTypes from "prop-types";
import {
  Card,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";
import React from "react";

const CustomTable = ({
  children,
  headers = [],
  useActionCol,
  emptyRows,
  data = [],
  rowsPerPage,
  page,
  pageCount,
  usePagination,
  useServerPagination,
  handleChangePage,
  handleChangeRowsPerPage,
  TablePaginationActions,
  ariaLabel = "custom pagination table",
}) => {
  // console.log("data", data);
  return (
    <Card elevation={0} sx={{ minWidth: 275 }}>
      <TableContainer>
        <Table
          sx={{
            minWidth: 650,
            borderCollapse: "separate",
            borderSpacing: "0px 10px",

            borderRadius: 3,
          }}
          aria-label={ariaLabel}
        >
          <TableHead>
            <TableRow
              sx={{
                "& >.MuiTableCell-root:last-of-type": {
                  textAlign: "right",
                },
              }}
            >
              {headers.map((item) => (
                <TableCell
                  key={item}
                  sx={{
                    color: "#35405B",
                    fontSize: "16px",
                  }}
                >
                  {item}
                </TableCell>
              ))}

              {useActionCol && (
                <TableCell
                  sx={{
                    color: "#35405B",
                    fontSize: "16px",
                  }}
                  align="right"
                >
                  Aksi
                </TableCell>
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {children}
            {emptyRows > 0 && (
              <TableRow
                style={{
                  height: 53 * emptyRows,
                }}
              >
                <TableCell
                  style={{
                    borderTopLeftRadius: 10,
                    borderBottomLeftRadius: 10,
                    overflow: "hidden",
                    border: "none",
                    fontWeight: 300,
                  }}
                  component="th"
                  scope="row"
                  colSpan={headers.length}
                >
                  {/* <Typography
                                                sx={{
                                                    fontSize: 20,
                                                    textAlign: "center",
                                                    mt: 4
                                                }}
                                            >
                                                Data Kosong
                                            </Typography> */}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
          {usePagination && (
            <TableFooter>
              <TableRow>
                <TablePagination
                  rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
                  colSpan={
                    useActionCol ? headers.length + 1 : headers.length - 1
                  }
                  count={data.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  slotProps={{
                    inputProps: {
                      "aria-label": "rows per page",
                    },
                    native: true,
                  }}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                  ActionsComponent={TablePaginationActions}
                />
              </TableRow>
            </TableFooter>
          )}

          {useServerPagination && (
            <TableFooter>
              <TableRow>
                <TablePagination
                  rowsPerPageOptions={[5, 10, 20, 30]}
                  colSpan={
                    useActionCol ? headers.length + 1 : headers.length - 1
                  }
                  count={pageCount}
                  rowsPerPage={rowsPerPage}
                  page={page - 1}
                  slotProps={{
                    inputProps: {
                      "aria-label": "rows per page",
                    },
                    native: true,
                  }}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                  ActionsComponent={TablePaginationActions}
                />
              </TableRow>
            </TableFooter>
          )}
        </Table>
      </TableContainer>
    </Card>
  );
};

CustomTable.propTypes = {
  children: PropTypes.element.isRequired,
  headers: PropTypes.array.isRequired,
  useActionCol: PropTypes.bool,
  emptyRows: PropTypes.bool,
  usePagination: PropTypes.bool,
  data: PropTypes.array,
  rowsPerPage: PropTypes.number,
  page: PropTypes.number,
  handleChangePage: PropTypes.func,
  handleChangeRowsPerPage: PropTypes.func,
  TablePaginationActions: PropTypes.element,
};

export default CustomTable;
