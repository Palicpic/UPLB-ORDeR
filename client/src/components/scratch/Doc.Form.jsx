import React, { useState } from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TablePagination, Button, FormControl, Select, MenuItem, IconButton, InputLabel } from "@mui/material/";
import FilterListIcon from "@mui/icons-material/FilterList";

const columns = [
  { id: "dateRequested", label: "Date Requested" },
  { id: "documentName", label: "Document Name" },
  {
    id: "status",
    label: "Status",
    filterable: true,
  },

  { id: "viewFullDetails", label: "View Full Details" },
];

const rows = [
  {
    id: 1,
    dateRequested: "2022-05-09",
    documentName: "Document 1",
    status: "Approved",
  },
  {
    id: 2,
    dateRequested: "2022-05-08",
    documentName: "Document 2",
    status: "Pending",
  },
  {
    id: 3,
    dateRequested: "2022-05-07",
    documentName: "Document 3",
    status: "Denied",
  },
];

const statusOptions = ["All", "Approved", "Pending", "Denied"];

const DocRequestTable = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [statusFilter, setStatusFilter] = useState("All");

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeStatusFilter = (event) => {
    setStatusFilter(event.target.value);
    setPage(0);
  };

  const filteredRows = statusFilter === "All" ? rows : rows.filter((row) => row.status === statusFilter);

  return (
    <TableContainer component={Paper}>
      {/* <FormControl>
        <Select value={statusFilter} onChange={handleChangeStatusFilter} displayEmpty>
          {statusOptions.map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </Select>
      </FormControl> */}
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            {columns.map((column) => (
              <TableCell key={column.id}>
                <div>
                  {column.label}
                  {column.filterable && (
                    <>
                      <IconButton size="small" onClick={handleChangeStatusFilter}>
                        <FilterListIcon />
                      </IconButton>
                      <FormControl variant="outlined">
                        <InputLabel id="status-filter-label">Filter by Status</InputLabel>
                        <Select labelId="status-filter-label" id="status-filter" value={statusFilter} onChange={handleChangeStatusFilter} label="Filter by Status">
                          <MenuItem value="">
                            <em>None</em>
                          </MenuItem>
                          {statusOptions.map((status) => (
                            <MenuItem key={status} value={status}>
                              {status}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </>
                  )}
                </div>
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.dateRequested}</TableCell>
              <TableCell>{row.documentName}</TableCell>
              <TableCell>{row.status}</TableCell>
              <TableCell>
                <Button variant="contained" color="primary">
                  View
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <TablePagination rowsPerPageOptions={[5, 10, 25]} component="div" count={rows.length} rowsPerPage={rowsPerPage} page={page} onPageChange={handleChangePage} onRowsPerPageChange={handleChangeRowsPerPage} />
    </TableContainer>
  );
};

export default DocRequestTable;
