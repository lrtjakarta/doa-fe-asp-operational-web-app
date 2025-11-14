import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
  useTheme,
} from "@mui/material";
import Loading from "Component/Loading Screen";
import { PTWContext } from "Context";
import moment from "moment";
import { useContext, useEffect, useMemo, useState } from "react";

const PTWPopup = ({ open, setForm, onClose }) => {
  const theme = useTheme();
  const { listPtw, getListPTW } = useContext(PTWContext);

  const [filters, setFilters] = useState({ reqNum: "", vendor: "" });
  const [loading, setLoading] = useState(true);
  const [selectedPTW, setSelectedPTW] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleFilterChange = (event) => {
    setFilters((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
    setPage(0);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSelectPTW = (row) => {
    setSelectedPTW(row.letter_number);
    const selectedRow = {
      ptwNum: row.letter_number,
      validDate: row.start_date,
      reqNum: row.request_number,
      vendor: row.org_name,
    };

    setForm((prev) => ({ ...prev, ...selectedRow }));

    onClose();
  };

  useEffect(() => {
    setLoading(true);
    const fetchData = setTimeout(async () => {
      const params = { ...filters };

      await getListPTW(params);
      setLoading(false);
    }, 400);

    return () => clearTimeout(fetchData);
  }, [open, filters]);

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - listPtw.length) : 0;

  const memoizedListPTW = useMemo(
    () =>
      [...listPtw].slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
    [page, rowsPerPage, filters, listPtw]
  );

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md">
      <DialogTitle>Cari PTW</DialogTitle>
      <DialogContent>
        <Stack gap={2}>
          <Stack direction="row" gap={2}>
            <TextField
              fullWidth
              name="reqNum"
              label="No Request"
              value={filters.reqNum}
              onChange={handleFilterChange}
            />
            <TextField
              fullWidth
              name="vendor"
              label="Vendor"
              value={filters.vendor}
              onChange={handleFilterChange}
            />
          </Stack>

          <Stack>
            <Loading loading={loading}>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      {headers.map((item, index) => (
                        <TableCell key={index}>{item}</TableCell>
                      ))}
                      <TableCell align="right">Aksi</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {memoizedListPTW.map((item, index) => {
                      const isSelected = item.letter_number === selectedPTW;

                      return (
                        <TableRow
                          sx={{
                            bgcolor: isSelected
                              ? theme.palette.primary.main
                              : "inherit",
                          }}
                          key={index}
                        >
                          <TableCell>{item.request_number}</TableCell>
                          <TableCell>{item.letter_number}</TableCell>
                          <TableCell>{item.org_name}</TableCell>
                          <TableCell>
                            {moment(item.start_date).format("LL")}
                          </TableCell>
                          <TableCell align="right">
                            <Button
                              onClick={() => handleSelectPTW(item)}
                              variant="contained"
                            >
                              {isSelected ? "Dipilih" : "Pilih"}
                            </Button>
                          </TableCell>
                        </TableRow>
                      );
                    })}

                    {emptyRows > 0 && (
                      <TableRow
                        style={{
                          height: 53 * emptyRows,
                        }}
                      >
                        <TableCell colSpan={5} />
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={listPtw.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </Loading>
          </Stack>
        </Stack>
      </DialogContent>
    </Dialog>
  );
};

const headers = ["No Request", "No PTW", "Vendor", "Tgl Mulai"];

export default PTWPopup;
