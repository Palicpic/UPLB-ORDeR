import { AppBar, Toolbar, Container, Typography, Box, IconButton, Menu, MenuItem, Button, Tooltip, Avatar} from '@mui/material';
import FolderCopyIcon from '@mui/icons-material/FolderCopy';
import MenuIcon from '@mui/icons-material/Menu';
import React from 'react';

// const role = 'Student';

// const pagesStudent = ['Document Request', 'Signature Request', 'Issue Document', 'Sign Document', 'Verify Document', 'Admin'];
const pages = ['Document Request', 'Signature Request','Verify Document'];

// const pagesStudent = ['Document Request', 'Signature Request','Verify Document'];
// const pagesOCS = ['Issue Document','Verify Document'];
// const pagesFaculty = ['Sign Document', 'Verify Document'];
// const pagesAdmin = ['Admin'];
// const pagesVerify = ['Verify Document'];
const settings = ['Profile', 'Logout'];
const auth = false;


const Navbar = () => {
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
	return (
		<AppBar position="static" color="primary" >
			<Container maxWidth="false"  >
				<Toolbar disableGutters >
					<FolderCopyIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
						<Typography
							variant="h6"
							noWrap
							component="a"	//what is this
							href="/"	//todo: not sure
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
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
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

						<Box sx={{ mb: -4, flexGrow: 1, display: { xs: 'none', md: 'flex' } }} >
            {pages.map((page) => (
              // <Button
              //   key={page}
              //   onClick={handleCloseNavMenu}
              //   variant="outlined" disableElevation
              //   // sx={{ my: 2, color: 'white', display: 'block'}}
              // >
              //   {page}
              // </Button>
              <Button 
                key={page}
                onClick={handleCloseNavMenu}
                variant="outlined" disableElevation
                >
                  {page}
              </Button>
            ))}
          </Box>

					<Box sx={{ flexGrow: 0 }}>

						{!auth && (
							<div>
								<Button sx={{ my: 2, color: 'white'}}>Login with UP Mail</Button>
							</div>
						)}
          {auth &&  (
					<div>
					<Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Jisoo Flower" src="/https://img.i-scmp.com/cdn-cgi/image/fit=contain,width=425,format=auto/sites/default/files/styles/768x768/public/d8/images/methode/2020/06/08/4b0bdfc6-a639-11ea-8ea0-d7434be00753_image_hires_121748.jpg?itok=zq4iUnBF&v=1591589877" />
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
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
						</div>)}
          </Box>
				</Toolbar>
			</Container>
		</AppBar>
	)

}

export default Navbar;


<Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
<Grid container spacing={3}>
  {/* Chart */}
  <Grid item xs={12} md={8} lg={9}>
    <Paper
      sx={{
        p: 2,
        display: 'flex',
        flexDirection: 'column',
        height: 240,
      }}
    >
      <Chart />
    </Paper>
  </Grid>
  {/* Recent Deposits */}
  <Grid item xs={12} md={4} lg={3}>
    <Paper
      sx={{
        p: 2,
        display: 'flex',
        flexDirection: 'column',
        height: 240,
      }}
    >
      <Deposits />
    </Paper>
  </Grid>
  {/* Recent Orders */}
  <Grid item xs={12}>
    <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
      <Orders />
    </Paper>
  </Grid>
</Grid>
<Copyright sx={{ pt: 4 }} />
</Container>
