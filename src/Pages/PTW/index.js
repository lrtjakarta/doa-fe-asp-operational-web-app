import { Edit } from "@mui/icons-material";
import {
  Box,
  Button,
  Chip,
  Container,
  IconButton,
  Stack,
  TableCell,
  TableRow,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import CustomTable from "Component/Table/CustomTable V2";
import { PTWContext } from "Context";
import usePagination from "Hooks/Pagination/usePagination";
import { debounce } from "lodash";
import moment from "moment";
import { useContext, useEffect, useState } from "react";
import DialogForm from "./dialogForm";

const PTW = () => {
  const { count, ptws, getPTWs } = useContext(PTWContext);

  const [fetching, setFetching] = useState(true);
  const [openModal, setOpenModal] = useState({
    open: false,
    edit: false,
    data: null,
  });

  const [filters, setFilters] = useState({
    vendor: "",
  });
  const [debounceSearch, setDebounceSearch] = useState({});

  // pagination hooks
  const {
    emptyRows,
    page,
    rowsPerPage,
    handleChangePage,
    handleResetPageValues,
    handleChangeRowsPerPage,
  } = usePagination({ data: ptws, useServerSide: true });

  const handleFiltersChange = (event) => {
    handleResetPageValues();
    setFilters((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };
  const handleActions = debounce((action, row) => {
    switch (action) {
      case "edit":
        console.log("edit");
        setOpenModal((prev) => ({
          ...prev,
          edit: true,
          open: true,
          data: row,
        }));
        break;
      case "add":
        console.log("add");
        setOpenModal((prev) => ({
          ...prev,
          open: true,
        }));
        break;

      default:
        break;
    }
  }, 200);

  const handleClose = (isFetch) => {
    if (isFetch) setFetching((prev) => !prev);
    setOpenModal({ open: false, edit: false, data: null });
  };

  // debounce search
  useEffect(() => {
    const fetchData = setTimeout(() => {
      const params = { ...filters, pageIndex: page, pageSize: rowsPerPage };

      getPTWs(params);
    }, 400);
    return () => clearTimeout(fetchData);
  }, [fetching, filters, page, rowsPerPage]);

  return (
    <>
      <Box sx={{ pt: 2, pb: 4, bgcolor: "white" }}>
        <Container maxWidth="xl">
          <Stack
            direction={{ xs: "column", md: "row" }}
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography variant="h5">E-PTW</Typography>
            <Stack gap={2} direction={{ xs: "column", md: "row" }}>
              <TextField
                placeholder="Cari vendor.."
                value={filters.vendor}
                name="vendor"
                onChange={handleFiltersChange}
              />

              <Button onClick={() => handleActions("add")} variant="contained">
                Tambah
              </Button>
            </Stack>
          </Stack>

          <CustomTable
            useServerPagination
            headers={headerTable}
            useActionCol
            data={ptws}
            emptyRows={emptyRows}
            page={page}
            pageCount={count}
            rowsPerPage={rowsPerPage}
            handleChangePage={handleChangePage}
            handleChangeRowsPerPage={handleChangeRowsPerPage}
          >
            {ptws.map((item, index) => {
              const area = item.area?.map((i) => i.name) || [];
              let status = "-";
              if (item.isPtw === true) {
                status = "Sesuai Ptw";
              }
              if (item.isPtw === false) {
                status = "Tidak Sesuai Ptw";
              }

              const disabledEdit = item.isPtw === true;

              return (
                <TableRow key={item._id}>
                  {/* <TableCell>{index + 1 + (page - 1) * rowsPerPage}</TableCell> */}
                  <TableCell>{item.reqNum}</TableCell>
                  <TableCell>{item.vendor}</TableCell>
                  <TableCell>{item.jobType}</TableCell>
                  <TableCell>{item.letterNum}</TableCell>
                  <TableCell>{moment(item.startDate).format("LL")}</TableCell>
                  <TableCell>{item.startTime || "-"}</TableCell>
                  <TableCell>{item.endTime || "-"}</TableCell>
                  <TableCell>
                    {area.map((ar) => (
                      <Box>{ar}</Box>
                    ))}
                  </TableCell>
                  <TableCell>
                    {status !== "-" ? <Chip label={status} /> : status}
                  </TableCell>
                  <TableCell>
                    <Tooltip title="Edit">
                      <IconButton
                        disabled={disabledEdit}
                        onClick={() => handleActions("edit", item)}
                      >
                        <Edit />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              );
            })}
          </CustomTable>
        </Container>
      </Box>

      {/* Form */}
      {openModal.open && (
        <DialogForm
          open={openModal.open}
          data={openModal.data}
          onClose={handleClose}
          edit={openModal.edit}
        />
      )}
    </>
  );
};

const headerTable = [
  "No Req",
  "Vendor",
  "Jenis Pekerjaan",
  "No. Surat",
  "Tgl Mulai",
  "Waktu Mulai Kerja",
  "Waktu Selesai Kerja",
  "Area",
  "Status",
];

export default PTW;
