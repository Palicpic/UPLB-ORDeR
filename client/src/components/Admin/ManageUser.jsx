import React, { useState, useEffect } from "react";
import axios from "axios";

import { Table, TableBody, TableCell, TableHead, TableRow, TablePagination, Button, MenuItem, IconButton, Typography, InputAdornment, TextField, Grid, Container, Box, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material/";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import FilterListIcon from "@mui/icons-material/FilterList";

const columns = [
  { id: "email", label: "Email", width: "20%" },
  { id: "name", label: "Name", width: "25%" },
  { id: "college", label: "College", width: "20%" },
  { id: "role", label: "Role", filterable: true, width: "20%" },
  { id: "Actions", label: "Actions", width: "15%" },
];

const roleOptions = ["All", "Student", "Faculty", "OCS Staff", "Admin"];
const collegeOptions = ["CAFS", "CAS", "CDC", "CEAT", "CEM", "CFNR", "CHE", "CVM"];

const ManageUser = () => {
  const [roleFilter, setRoleFilter] = useState("All");
  const rowsPerPage = 8;
  const [rows, setRows] = useState([]);
  const [toDelete, setToDelete] = useState(false);
  const [toDeleteData, setToDeleteData] = useState([]);
  const [roleValue, setRoleValue] = useState("");
  const [collegeValue, setCollegeValue] = useState("");
  const [page, setPage] = useState(0);

  const handleEditClick = (id) => {
    setRows((prevData) =>
      prevData.map((row) => {
        if (row._id === id) {
          return { ...row, editMode: true };
        }
        return { ...row, editMode: false };
      })
    );
  };

  const handleSaveClick = async (id) => {
    const { data } = await axios.post(`${process.env.REACT_APP_API_URL}/admin/user/edit/${id}`, { roleValue, collegeValue });
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
    setRoleValue("");
    setCollegeValue("");
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
    if (key === "role") {
      setRoleValue(value);
    } else if (key === "college") {
      setCollegeValue(value);
    }
    setRows((prevData) =>
      prevData.map((row) => {
        if (row._id === id) {
          return { ...row, [key]: value };
        }
        return row;
      })
    );
  };

  const handleChangerRoleFilter = (event) => {
    setRoleFilter(event.target.value);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const filteredRows = roleFilter === "All" ? rows : rows.filter((row) => row.status === roleFilter);

  const handleDeleteUser = async () => {
    const { data } = await axios.delete(`${process.env.REACT_APP_API_URL}/admin/user/delete/${toDeleteData._id}`);
    if (data.data === "Success") {
      getRows();
      setToDelete(false);
    }
  };
  const handleDeleteButton = (row) => {
    setToDelete(true);
    setToDeleteData(row);
  };

  const getRows = async () => {
    try {
      const url = `${process.env.REACT_APP_API_URL}/admin/users`;
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
          <Grid item xs={12} md={8}>
            <Typography variant="h6" color="primary.main" fontWeight="bold">
              Manage Users
            </Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <Grid container justifyContent="flex-end">
              <TextField
                select
                value={roleFilter}
                onChange={handleChangerRoleFilter}
                variant="standard"
                margin="dense"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <IconButton size="small">
                        <FilterListIcon />
                      </IconButton>
                      <Typography>Role Filter:</Typography>
                    </InputAdornment>
                  ),
                }}
              >
                {roleOptions.map((option) => (
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
                <TableCell align={"center"}>{row.email}</TableCell>
                <TableCell align={"center"}>{row.name.displayName}</TableCell>
                <TableCell align={"center"}>
                  {row.editMode ? (
                    <TextField select value={row.college} onChange={(e) => handleChange(e, row._id, "college")} variant="standard" margin="dense">
                      {collegeOptions.map((option) => (
                        <MenuItem key={option} value={option}>
                          {option}
                        </MenuItem>
                      ))}
                    </TextField>
                  ) : (
                    <Typography>{row.college}</Typography>
                  )}
                </TableCell>
                <TableCell align={"center"}>
                  {row.editMode ? (
                    <TextField select value={row.role} onChange={(e) => handleChange(e, row._id, "role")} variant="standard" margin="dense">
                      {roleOptions.slice(1).map((option) => (
                        <MenuItem key={option} value={option}>
                          {option}
                        </MenuItem>
                      ))}
                    </TextField>
                  ) : (
                    <Typography>{row.role}</Typography>
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
                    <>
                      <IconButton size="small" onClick={() => handleEditClick(row._id)}>
                        <EditIcon />
                      </IconButton>
                      <IconButton size="small" onClick={() => handleDeleteButton(row)}>
                        <DeleteIcon />
                      </IconButton>
                    </>
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

        {toDelete && (
          <Dialog open={toDelete} onClose={() => setToDelete(false)} sx={{ display: "flex", justifyContent: "center" }}>
            <DialogTitle>Are you sure to delete User?</DialogTitle>
            <DialogContent sx={{ display: "flex", justifyContent: "center" }}>
              <DialogContentText>Email: {toDeleteData.email}</DialogContentText>
            </DialogContent>
            <DialogActions sx={{ display: "flex", justifyContent: "center" }}>
              <Button onClick={() => setToDelete(false)}>Cancel</Button>
              <Button onClick={handleDeleteUser}>Delete</Button>
            </DialogActions>
          </Dialog>
        )}
      </Box>
    </Container>
  );
};

export default ManageUser;
