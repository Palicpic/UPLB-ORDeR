import React, { useState } from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TablePagination, Button, FormControl, Select, MenuItem, IconButton, InputLabel, Typography, Container, Menu, Box, InputAdornment, TextField, Grid } from "@mui/material/";
import FilterListIcon from "@mui/icons-material/FilterList";

const columns = [
  { id: "dateRequested", label: "Date Requested", width: "20%" },
  { id: "documentName", label: "Document Name", width: "35%" },
  { id: "status", label: "Status", filterable: true, width: "25%" },
  { id: "viewFullDetails", label: "View Full Details", width: "20%" },
];

// const rows = [
//   {
//     id: 1,
//     dateRequested: "2022-05-09",
//     documentName: "Document 1",
//     status: "Approved",
//   },
//   {
//     id: 2,
//     dateRequested: "2022-05-08",
//     documentName: "Document 2",
//     status: "Pending",
//   },
//   {
//     id: 3,
//     dateRequested: "2022-05-07",
//     documentName: "Document 3",
//     status: "Denied",
//   },
// ];

const statusOptions = ["All", "Approved", "Pending", "Denied"];

const DocRequestTable = (props) => {
  const rows = props.docRequest;
  const [statusFilter, setStatusFilter] = useState("All");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangeStatusFilter = (event) => {
    setStatusFilter(event.target.value);
    setPage(0);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const filteredRows = statusFilter === "All" ? rows : rows.filter((row) => row.status === statusFilter);

  return (
    <TableContainer component={Paper} sx={{ mx: 5, minWidth: "xs", height: "80vh", borderRadius: "10px", bgcolor: "#F5F5F5" }}>
      <Grid container justifyContent="flex-end" pr={2}>
        <Grid item>
          <TextField
            select
            value={statusFilter}
            onChange={handleChangeStatusFilter}
            variant="standard"
            margin="dense"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <IconButton size="small">
                    <FilterListIcon />
                  </IconButton>
                  <Typography>Status Filter:</Typography>
                </InputAdornment>
              ),
            }}
          >
            {statusOptions.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
      </Grid>
      <Table aria-label="table">
        <TableHead>
          <TableRow>
            {columns.map((column) => (
              <TableCell key={column.id} align={"center"} sx={{ p: 1, width: column.width, fontSize: 16 }}>
                {column.label}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredRows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
            <TableRow key={row.id}>
              <TableCell align={"center"}>{row.createdAt.toString().replace(/T/, " ").replace(/\..+/, "")}</TableCell>
              <TableCell align={"center"}>{row.documentName}</TableCell>
              <TableCell align={"center"}>{row.status}</TableCell>
              <TableCell align={"center"}>
                <Button variant="outlined" color="primary">
                  View
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <TablePagination rowsPerPageOptions={[5, 10, 20]} component="div" count={rows.length} rowsPerPage={rowsPerPage} page={page} onPageChange={handleChangePage} onRowsPerPageChange={handleChangeRowsPerPage} />
    </TableContainer>
  );
};

export default DocRequestTable;
