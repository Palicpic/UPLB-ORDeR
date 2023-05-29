import React, { useState, useEffect } from "react";
import axios from "axios";

import { Table, TableBody, TableCell, TableHead, TableRow, TablePagination, Button, MenuItem, IconButton, Typography, InputAdornment, TextField, Grid, Container, Box, CircularProgress, Snackbar, Alert } from "@mui/material/";
import EditIcon from "@mui/icons-material/Edit";
import FilterListIcon from "@mui/icons-material/FilterList";

const columns = [
  { id: "ContractAddress", label: "Contract Address", width: "30%" },
  { id: "WalletAddress", label: "Wallet Address", width: "30%" },
  { id: "TestNet", label: "TestNet", width: "15%" },
  { id: "Status", label: "Status", width: "15%" },
  { id: "Edit Status", label: "Edit Status", width: "10%" },
];

const statusOptions = ["All", "Active", "Inactive"];

const SmartContract = () => {
  const [statusFilter, setStatusFilter] = useState("All");
  const rowsPerPage = 7;
  const [rows, setRows] = useState([]);
  const [statusValue, setStatusValue] = useState("");
  const [page, setPage] = useState(0);
  const [deploy, setDeploy] = useState(rows ? (rows.some((data) => data.status === "Inactive") ? true : false) : false);
  const [isLoading, setIsLoading] = useState(false);
  const [alert, setAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [severity, setSeverity] = useState("");

  const handleAlert = (type, message) => {
    setSeverity(type);
    setAlert(true);
    setAlertMessage(message);
    setIsLoading(false);
  };

  const canDeploy = () => {
    if (rows) {
      if (rows.some((data) => data.status === "Active")) setDeploy(false);
      if (rows.some((data) => data.status === "Inactive")) setDeploy(true);
    } else setDeploy(true);
  };

  const handleEditClick = (id) => {
    setRows((prevData) =>
      prevData.map((row) => {
        if (row._id === id) {
          setStatusValue(row.status);
          return { ...row, editMode: true };
        }
        return { ...row, editMode: false };
      })
    );
  };

  const handleSaveClick = async (id) => {
    const { data } = await axios.post(`/admin/contract/edit-status/${id}`, { statusValue });
    if (data.data === "Success") {
      getRows();
    }
    setRows((prevData) =>
      prevData.map((row) => {
        if (row._id === id) {
          return { ...row, editMode: false };
        }
        return row;
      })
    );
    setStatusValue("");
    canDeploy();
  };

  const handleCancelClick = (id) => {
    setRows((prevData) =>
      prevData.map((row) => {
        if (row._id === id) {
          return { ...row, editMode: false };
        }
        return row;
      })
    );
    getRows();
  };

  const handleChange = (e, id, key) => {
    const { value } = e.target;
    setStatusValue(value);
    setRows((prevData) =>
      prevData.map((row) => {
        if (row._id === id) {
          return { ...row, [key]: value };
        }
        return row;
      })
    );
  };

  const handleChangerStatusFilter = (event) => {
    setStatusFilter(event.target.value);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleDeployment = async () => {
    try {
      setIsLoading(true);
      const { data } = await axios.post(`/contract/deploy`);
      if (data) {
        getRows();
        canDeploy();
        setIsLoading(false);
        handleAlert("success", "Deployment Success!");
      }
    } catch (err) {
      handleAlert("error", "Error in Deployment!");
    }
  };

  const filteredRows = statusFilter === "All" ? rows : rows.filter((row) => row.status === statusFilter);

  const getRows = async () => {
    try {
      const url = `/admin/contracts`;
      const { data } = await axios.get(url, { withCredentials: true });
      setRows(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getRows();
  }, []);

  return (
    <Container maxWidth="xl">
      <Box px={2} pt={2} overflow="auto" height="73vh">
        <Grid container alignItems="center">
          <Grid item xs={12} md={12}>
            <Typography variant="h6" color="primary.main" fontWeight="bold">
              Manage Deployed Smart Contracts
            </Typography>
          </Grid>
          <Grid item xs={12} md={3}>
            {!isLoading && (
              <Button fullWidth variant="contained" disabled={!deploy} onClick={handleDeployment} sx={{ borderRadius: "40px", boxShadow: 4, m: 1 }}>
                Deploy New Smart Contract
              </Button>
            )}

            {isLoading && (
              <Box sx={{ m: 1, position: "relative", width: "100%" }}>
                <Button variant="contained" disabled={isLoading} fullWidth sx={{ borderRadius: "40px" }}>
                  Smart Contract Deploying...
                </Button>
                <CircularProgress
                  size={24}
                  sx={{
                    color: "primary.main",
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    marginTop: "-12px",
                    marginLeft: "-12px",
                  }}
                />
              </Box>
            )}
          </Grid>
          <Grid item xs={12} md={9}>
            <Grid container justifyContent="flex-end">
              <TextField
                select
                value={statusFilter}
                onChange={handleChangerStatusFilter}
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
              <TableRow key={row._id}>
                <TableCell align={"center"}>{row.address}</TableCell>
                <TableCell align={"center"}>{row.walletAddress}</TableCell>
                <TableCell align={"center"}>{row.testNet}</TableCell>
                <TableCell align={"center"}>
                  {row.editMode ? (
                    <TextField select value={row.status} onChange={(e) => handleChange(e, row._id, "status")} variant="standard" margin="dense">
                      {statusOptions.slice(1).map((option) => (
                        <MenuItem key={option} value={option}>
                          {option}
                        </MenuItem>
                      ))}
                    </TextField>
                  ) : (
                    <Typography>{row.status}</Typography>
                  )}
                </TableCell>
                <TableCell align={"center"}>
                  {row.editMode ? (
                    <>
                      <Button size="small" onClick={() => handleSaveClick(row._id)}>
                        Save
                      </Button>

                      <Button size="small" onClick={() => handleCancelClick(row._id)}>
                        Cancel
                      </Button>
                    </>
                  ) : (
                    <IconButton size="small" onClick={() => handleEditClick(row._id)}>
                      <EditIcon />
                    </IconButton>
                  )}
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
        <Snackbar open={alert} autoHideDuration={6000} onClose={() => setAlert(false)}>
          <Alert elevation={6} variant="filled" onClose={() => setAlert(false)} severity={severity}>
            {alertMessage}
          </Alert>
        </Snackbar>
      </Box>
    </Container>
  );
};

export default SmartContract;
