import PropTypes from "prop-types";
import { Box, IconButton, useTheme } from "@mui/material";
import LastPageIcon from "@mui/icons-material/LastPage";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import { useEffect } from "react";
import { useState } from "react";

function TablePaginationActions({ count, page, rowsPerPage, onPageChange }) {
  const theme = useTheme();

  const handleFirstPageButtonClick = (event) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};

const usePagination = ({
  data = [],
  rowsPerPage: _rowsPerpage = 20,
  useServerSide,
}) => {
  let emptyRows = 0;
  // pagination
  const [page, setPage] = useState(useServerSide ? 1 : 0);
  const [rowsPerPage, setRowsPerPage] = useState(_rowsPerpage);

  if (useServerSide) {
    emptyRows = page > 0 ? Math.max(0, 0 * rowsPerPage - data?.length) : 0;
  } else {
    emptyRows =
      page > 0 ? Math.max(0, (1 + page) * rowsPerPage - data?.length) : 0;
  }

  const handleChangePage = (event, newPage) => {
    if (useServerSide) return setPage(newPage + 1);
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(useServerSide ? 1 : 0);
  };

  const handleResetPageValues = () => {
    setPage(useServerSide ? 1 : 0);
    setRowsPerPage(_rowsPerpage);
  };

  useEffect(() => {
    if (useServerSide) {
      emptyRows = page > 1 ? Math.max(0, page + rowsPerPage - data?.length) : 0;
    } else {
      emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - data?.length) : 0;
    }

    return () => {
      emptyRows = 0;
    };
  }, [data]);

  return {
    emptyRows,
    page,
    rowsPerPage,
    setPage,
    handleChangePage,
    handleChangeRowsPerPage,
    handleResetPageValues,
    TablePaginationActions,
  };
};

usePagination.propTypes = {
  data: PropTypes.array,
  useServerSide: PropTypes.bool,
  rowsPerPage: PropTypes.number,
  handleChangePage: PropTypes.func,
  handleChangeRowsPerPage: PropTypes.func,
  TablePaginationActions: PropTypes.element,
};

export default usePagination;
