import React, { useContext, useState } from "react";
import { UserContext } from "../App.js";
import { useLocation, useNavigate } from "react-router-dom";

import { AppBar, Container, Toolbar, Typography, Box, Button, Tooltip, Avatar, Menu, MenuItem, IconButton } from "@mui/material";
import FolderCopyIcon from "@mui/icons-material/FolderCopy";
import MenuIcon from "@mui/icons-material/Menu";
import { NavButton } from "../Style.js";

const Navbar = () => {
  const user = useContext(UserContext);
  const path = useLocation();
  const navigate = useNavigate();

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

  const handleNavigation = (routePath) => {
    navigate(routePath);
    handleCloseNavMenu(); // Assuming you have a function to close the navigation menu
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
              {user && user.role === "Admin" && <MenuItem onClick={() => handleNavigation("/admin")}>Admin</MenuItem>}
              {user && user.role === "Student" && <MenuItem onClick={() => handleNavigation("/document-request")}>Document Request</MenuItem>}
              {user && user.role === "OCS Staff" && <MenuItem onClick={() => handleNavigation("/issue-document")}>Issue Document</MenuItem>}
              {user && user.role === "Student" && <MenuItem onClick={() => handleNavigation("/signature-request")}>Signature Request</MenuItem>}
              {user && user.role === "Faculty" && <MenuItem onClick={() => handleNavigation("/sign-document")}>Sign Document</MenuItem>}
              <MenuItem onClick={() => handleNavigation("/verify-document")}>Verify Document</MenuItem>
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
            {user && user.role === "Admin" && (
              <NavButton to="/admin" onClick={handleCloseNavMenu}>
                Admin
              </NavButton>
            )}
            {user && user.role === "Student" && (
              <NavButton to="/document-request" onClick={handleCloseNavMenu}>
                Document Request
              </NavButton>
            )}
            {user && user.role === "OCS Staff" && (
              <NavButton to="/issue-document" onClick={handleCloseNavMenu}>
                Issue Document
              </NavButton>
            )}
            {user && user.role === "Student" && (
              <NavButton to="/signature-request" onClick={handleCloseNavMenu}>
                Signature Request
              </NavButton>
            )}

            {user && user.role === "Faculty" && (
              <NavButton to="/sign-document" onClick={handleCloseNavMenu}>
                Sign Document
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
