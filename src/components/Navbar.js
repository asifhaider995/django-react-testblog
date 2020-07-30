import React from 'react';
import { fade, makeStyles } from '@material-ui/core/styles';
import {AppBar, Button} from '@material-ui/core';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import MoreIcon from '@material-ui/icons/MoreVert';
import SideBar from './SideBar';


const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
}));

export default function NavBar(props) {
  const classes = useStyles();

  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const [drawer, setDrawer] = React.useState(false)

  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const handleMenuClick = (event) => {
    console.log("Hamburger Menu")
    console.log("Implement Drawer")
    setDrawer(true)
  }

  const handleMenuClose = () => {
    setDrawer(false)
  }

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      { props.isAuthenticated ? (
        <div>
          <MenuItem disableGutters style={{width: '6rem'}}>
          <Button
            href="/"
            fullWidth
            variant='text' size='large'
            style={{textTransform: 'capitalize' }} >
            <Typography variant='body1' color='inherit'> Home  </Typography>
          </Button>
          </MenuItem>
          <MenuItem disableGutters style={{width: '6rem' }}>
            <Button href='create/' size='large'
              fullWidth
              variant='text'
              style={{textTransform: 'capitalize' }} >
              <Typography variant='body1' color='inherit'> Create  </Typography>
            </Button>
          </MenuItem>

        </div>
      ) : ( <div /> ) }
      <MenuItem disableGutters style={{width: '6rem' }}>
      {
        props.isAuthenticated ? (
          <Button
            onClick={props.logOut} href='/'
            fullWidth
            variant='text' size='large'
            style={{ textTransform: 'capitalize' }} >
            <Typography variant='body1' color='inherit'> Logout </Typography>
          </Button>
        ) : (
          <Button href='/login'
            fullWidth
            variant='text' size='large'
            style={{ textTransform: 'capitalize' }} >
            <Typography variant='body1' color='inherit'> Login  </Typography>
          </Button>
        )
      }
      </MenuItem>
    </Menu>
  );

  const renderSideBar = (
    <SideBar open={drawer} onClose={handleMenuClose}/>
  )
  return (
    <React.Fragment>
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            {/* --------- Hamburger Menu Icon starts  ------- */}
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="open drawer"
              onClick={handleMenuClick}
            >
              <MenuIcon />
            </IconButton>
            <Typography className={classes.title} variant="body2" noWrap>
              Test Blog
            </Typography>
            {/* --------- Hamburger Menu Icon ends ------- */}
            {/* --------- Search Bar starts  ------- */}
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                placeholder="Search…"
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                inputProps={{ 'aria-label': 'search' }}
              />
            </div>
            {/* --------- Hamburger Menu Icon ends  ------- */}
            <div className={classes.grow} />
            {/* --------- Hamburger Icon starts  ------- */}
            <div className={classes.sectionDesktop}>
              { props.isAuthenticated ? (
                <div style={{ display: 'flex'}}>
                  <Button href='/'
                    fullWidth
                    style={{ color: 'white', textTransform: 'capitalize' }} >
                    <Typography variant='body1' color='inherit'> Home  </Typography>
                  </Button>
                  <Button onClick={props.handleCreate}
                    fullWidth
                    variant='text'
                    style={{ color: 'white', textTransform: 'capitalize' }} >
                    <Typography variant='body1' color='inherit'> Create  </Typography>
                  </Button>
                </div>
              ) : (<div />)

              }
              {
                props.isAuthenticated ? (
                  <Button onClick={props.logOut} href='/'
                    variant='text' fullWidth
                    style={{ color: 'white', textTransform: 'capitalize' }} >
                    <Typography variant='body1' color='inherit'> Logout  </Typography>
                  </Button>
                ) : (
                  <Button href='/login'
                    variant='text' fullWidth
                    style={{ color: 'white', textTransform: 'capitalize' }} >
                    <Typography variant='body1' color='inherit'> Login  </Typography>
                  </Button>
                )
              }

            </div>
            <div className={classes.sectionMobile}>
              <IconButton
                aria-label="show more"
                aria-controls={mobileMenuId}
                aria-haspopup="true"
                onClick={handleMobileMenuOpen}
                color="inherit"
              >
                <MoreIcon />
              </IconButton>
            </div>
            {/* --------- Hamburger Menu Icon ends  ------- */}
          </Toolbar>
        </AppBar>
        {renderMobileMenu}
        {renderSideBar}
      </div>
    </React.Fragment>
  );
}
