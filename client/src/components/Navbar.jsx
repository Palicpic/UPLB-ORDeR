import React, { useContext, useState } from "react";
import { UserContext } from "../App.js";
import { useLocation } from "react-router-dom";

import { AppBar, Container, Toolbar, Typography, Box, Button, Tooltip, Avatar, Menu, MenuItem, IconButton } from "@mui/material";
import FolderCopyIcon from "@mui/icons-material/FolderCopy";
import MenuIcon from "@mui/icons-material/Menu";
import { NavButton } from "../Style.js";

const Navbar = () => {
  const user = useContext(UserContext);
  const path = useLocation();

  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const googleAuth = () => {
    window.open(`${process.env.REACT_APP_API_URL}/auth/google/callback`, "_self");
  };

  const logout = () => {
    window.open(`${process.env.REACT_APP_API_URL}/auth/logout`, "_self");
  };

  return (
    <AppBar position="sticky" color="primary" elevation={0}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <FolderCopyIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            href="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "poppins",
              fontWeight: 600,
              letterSpacing: ".2rem",
            }}
          >
            ORDeR
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton size="large" aria-haspopup="true" onClick={handleOpenNavMenu} color="inherit">
              <MenuIcon />
            </IconButton>

            <Menu
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {user && user.role === "student" && (
                <MenuItem href="/document-request" onClick={handleCloseNavMenu}>
                  Document Request
                </MenuItem>
              )}
              {user && user.role === "student" && (
                <MenuItem href="/signature-request" onClick={handleCloseNavMenu}>
                  Signature Request
                </MenuItem>
              )}
              {user && user.role === "ocs" && (
                <MenuItem href="/issue-document" onClick={handleCloseNavMenu}>
                  Issue Document
                </MenuItem>
              )}
              {user && user.role === "faculty" && (
                <MenuItem href="/sign-document" onClick={handleCloseNavMenu}>
                  Sign Document
                </MenuItem>
              )}
              {user && user.role === "admin" && (
                <MenuItem href="/admin" onClick={handleCloseNavMenu}>
                  Admin
                </MenuItem>
              )}
              <MenuItem href="/verify-document" onClick={handleCloseNavMenu}>
                Verify Document
              </MenuItem>
            </Menu>
          </Box>

          <Typography
            variant="h6"
            noWrap
            href="/"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "poppins",
              fontWeight: 600,
              letterSpacing: ".2rem",
              color: "inherit",
            }}
          >
            ORDeR
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {user && user.role === "student" && (
              <NavButton to="/document-request" onClick={handleCloseNavMenu}>
                Document Request
              </NavButton>
            )}
            {user && user.role === "student" && (
              <NavButton to="/signature-request" onClick={handleCloseNavMenu}>
                Signature Request
              </NavButton>
            )}
            {user && user.role === "ocs" && (
              <NavButton to="/issue-document" onClick={handleCloseNavMenu}>
                Issue Document
              </NavButton>
            )}
            {user && user.role === "faculty" && (
              <NavButton to="/sign-document" onClick={handleCloseNavMenu}>
                Sign Document
              </NavButton>
            )}
            {user && user.role === "admin" && (
              <NavButton to="/admin" onClick={handleCloseNavMenu}>
                Admin
              </NavButton>
            )}
            {path.pathname !== "/" && ( //search based on page
              <NavButton to="/verify-document" onClick={handleCloseNavMenu}>
                Verify Document
              </NavButton>
            )}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            {user && (
              <div>
                Hi, {user.name.firstName}!
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu}>
                    <Avatar alt={user.firstName + " " + user.lastName} src={user.profilePhoto} />
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: "45px" }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  <MenuItem onClick={logout}>
                    <Typography textAlign="center">Logout</Typography>
                  </MenuItem>
                </Menu>
              </div>
            )}
            {!user && (
              <div>
                <Button variant="contained" sx={{ color: "white", border: "2px solid", borderColor: "white", borderRadius: "40px" }} onClick={googleAuth}>
                  Login with UP Mail
                </Button>
              </div>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
