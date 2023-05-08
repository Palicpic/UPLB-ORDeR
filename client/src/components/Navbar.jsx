import { AppBar, Container, Toolbar, Typography, Box, Button, Tooltip, Avatar, Menu, MenuItem, IconButton } from '@mui/material';
import FolderCopyIcon from '@mui/icons-material/FolderCopy';
import MenuIcon from '@mui/icons-material/Menu';
import React from 'react';
import { useLocation, NavLink } from "react-router-dom";

const NavButton = (props) => {
  return (
    <Button
    variant="outlined" disableElevation
    size="large"
    elevation={12}
    sx={{ mx:0.1, mt: 3,  
      display: 'block', 
      color: 'primary', 
      backgroundColor: '#E0E0E0', 
      borderColor: '#E0E0E0', 
      borderRadius: "5px 20px 0px 0px" ,
      // boxShadow: "2px -2px 5px 2px black",
      '&:hover': {
        backgroundColor: '#F5F5F5',
        borderColor: '#F5F5F5', },
      '&.active': {
        backgroundColor: 'white',
        borderColor: 'white', }
      }}
      component={NavLink}
      onClick={(event) => {
        event.preventDefault();
      }}
      {...props}
    />
  );
}

const Navbar = (userDetails) => {
  const user = userDetails.user;
  const path = useLocation();

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

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
    window.open(
        `${process.env.REACT_APP_API_URL}/auth/google/callback`,
        "_self"
    );
  }

  const logout = () => {
    window.open(
        `${process.env.REACT_APP_API_URL}/auth/logout`,
        "_self"
    );
  }

  return (
    <AppBar position="sticky" color="primary" elevation={0}>
      <Container maxWidth="xl"  >
        <Toolbar disableGutters >
          <FolderCopyIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
            <Typography
              variant="h6"
              noWrap
              component="a"	
              href="/"	
              sx={{
                mr: 2,
                display: { xs: 'none', md: 'flex' },
                fontFamily: 'poppins',
                fontWeight: 600,
                letterSpacing: '.2rem',
                color: 'inherit',
                textDecoration: 'none'
              }}
            >
              ORDeR
            </Typography>

            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
							<IconButton
								size="large"
								aria-label="account of current user"
								aria-controls="menu-appbar"
								aria-haspopup="true"
								onClick={handleOpenNavMenu}
								color="inherit"
							>
								<MenuIcon />
							</IconButton>

							<Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
                {user && user.role==="student" && (
                  <MenuItem href="/doc-request" onClick={handleCloseNavMenu}>Document Request</MenuItem>
                )}
                {user && user.role==="student" && (
                  <MenuItem href="/signature-request" onClick={handleCloseNavMenu}>Signature Request</MenuItem>
                )}
                {user && user.role==="ocs" && (
                  <MenuItem href="/" onClick={handleCloseNavMenu}>Issue Document</MenuItem>
                )}
                {user && user.role==="faculty" && (
                  <MenuItem href="/" onClick={handleCloseNavMenu}>Sign Document</MenuItem>
                )}
                {user && user.role==="admin" && (
                  <MenuItem href="/" onClick={handleCloseNavMenu}>Admin</MenuItem>
                )}
                <MenuItem href="/" onClick={handleCloseNavMenu}>Verify Document</MenuItem>
            </Menu>
						</Box>

            <FolderCopyIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
            <Typography
              variant="h6"
              noWrap
              component="a"	//what is this
              href="/"	//todo: not sure
              sx={{
                mr: 2,
                display: { xs: 'flex', md: 'none' },
                flexGrow: 1,
                fontFamily: 'poppins',
                fontWeight: 600,
                letterSpacing: '.2rem',
                color: 'inherit',
                textDecoration: 'none'
              }}
            >
              ORDeR
            </Typography>

						<Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }} >
                  {user && user.role==="student" && (
                    <NavButton to="/doc-request" onClick={handleCloseNavMenu}>Document Request</NavButton>
                  )}
                  {user && user.role==="student" && (
                    <NavButton to="/signature-request" onClick={handleCloseNavMenu}>Signature Request</NavButton>
                  )}
                  {user && user.role==="ocs" && (
                    <NavButton to="/" onClick={handleCloseNavMenu}>Issue Document</NavButton>
                  )}
                  {user && user.role==="faculty" && (
                    <NavButton to="/" onClick={handleCloseNavMenu}>Sign Document</NavButton>
                  )}
                  {user && user.role==="admin" && (
                    <NavButton to="/" onClick={handleCloseNavMenu}>Admin</NavButton>
                  )}
                  {path.pathname!=="/" && ( //search based on page
                    <NavButton to="/" onClick={handleCloseNavMenu}>Verify Document</NavButton>
                  )}
            </Box>


            <Box sx={{ flexGrow: 0 }}>
              {user &&  (
                <div>
                <Tooltip title="Open settings">
                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                      <Avatar alt={user.firstName + " " + user.lastName} src={user.profilePhoto} />
                    </IconButton>
                  </Tooltip>
                  <Menu
                    sx={{ mt: '45px' }}
                    id="menu-appbar"
                    anchorEl={anchorElUser}
                    anchorOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                    open={Boolean(anchorElUser)}
                    onClose={handleCloseUserMenu}
                  >
                    <MenuItem onClick={handleCloseUserMenu}>
                      <Typography textAlign="center">Profile</Typography>
                    </MenuItem>
                    <MenuItem onClick={logout}>
                      <Typography textAlign="center">Logout</Typography>
                    </MenuItem>
                  </Menu>
                  </div>)}
              {!user && (
                <div>
                  <Button variant="contained" 
                    sx={{ my: 2, color: 'white', border: '2px solid', borderColor: 'white'}}
                    onClick={googleAuth}>
                    Login with UP Mail
                    </Button>
                </div>
              )}
            </Box>

        </Toolbar>
      </Container>
    </AppBar>
  )
}

export default Navbar;