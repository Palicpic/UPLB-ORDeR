import React, { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableRow, Paper, TablePagination, Button, MenuItem, IconButton, Typography, InputAdornment, TextField, Grid, Modal, Container, Box } from "@mui/material/";
import FilterListIcon from "@mui/icons-material/FilterList";

import SignDocumentModal from "./Modal.SignDocument";

const columns = [
  { id: "dateRequested", label: "Date Requested", width: "20%" },
  { id: "requestedby", label: "Requested by", width: "20%" },
  { id: "subject", label: "Subject", width: "25%" },
  { id: "status", label: "Status", filterable: true, width: "20%" },
  { id: "viewFullDetails", label: "View Full Details", width: "15%" },
];

const statusOptions = ["All", "Signed", "Pending", "Denied"];

const SignDocumentTable = (props) => {
  const rows = props.signRequestList;
  const rowsPerPage = 8;
  const [statusFilter, setStatusFilter] = useState("All");
  const [page, setPage] = useState(0);
  const [open, setOpen] = useState(false);
  const [selectedRowData, setSelectedRowData] = useState(null);

  const handleChangeStatusFilter = (event) => {
    setStatusFilter(event.target.value);
    setPage(0);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleViewClick = (rowData) => {
    setSelectedRowData(rowData);
    setOpen(true);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Pending":
        return "#fbc02d"; // Yellow color
      case "Signed":
        return "#4caf50"; // Green color
      case "Denied":
        return "#f44336"; // Red color
      default:
        return "#000000"; // Black color (fallback)
    }
  };

  const StatusCircle = ({ color }) => (
    <div
      style={{
        width: 10,
        height: 10,
        borderRadius: "50%",
        backgroundColor: color,
        display: "inline-block",
        marginRight: 5,
      }}
    />
  );

  const filteredRows = statusFilter === "All" ? rows : rows.filter((row) => row.status === statusFilter);
  return (
    <Box>
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
      <Paper elevation={4} sx={{ minHeight: "72vh", borderRadius: "40px", bgcolor: "#F5F5F5", overflow: "auto", mt: 1, pt: 2 }}>
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
                <TableCell align={"center"}>{row.user.name.displayName}</TableCell>
                <TableCell align={"center"}>{row.subject}</TableCell>
                <TableCell align={"center"}>
                  <StatusCircle color={getStatusColor(row.status)} />
                  {row.status}
                </TableCell>
                <TableCell align={"center"}>
                  <Button variant="outlined" color="primary" onClick={() => handleViewClick(row)} sx={{ borderRadius: "40px" }}>
                    View Details
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <TablePagination rowsPerPageOptions={[]} component="div" count={rows.length} rowsPerPage={rowsPerPage} page={page} onPageChange={handleChangePage} />
        {filteredRows.length === 0 && (
          <Container display="flex">
            <Typography variant="h4" align="center">
              No Data
            </Typography>
          </Container>
        )}
        <Modal open={open} onClose={() => setOpen(false)}>
          <>
            <SignDocumentModal rowData={selectedRowData} onClose={() => setOpen(false)} setSuccessMessage={props.setAlertMessage} setSuccessAlert={props.setSuccessAlert} getSignRequestList={props.getSignRequestList} />
          </>
        </Modal>
      </Paper>
    </Box>
  );
};

export default SignDocumentTable;
