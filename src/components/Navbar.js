import React from 'react';
import { fade, makeStyles } from '@material-ui/core/styles';
import {AppBar, Button} from '@material-ui/core';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import MenuIcon from '@material-ui/icons/Menu';
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
    display: 'flex',
    fontSize: '1.25rem',
    fontFamily: 'Ubuntu',
    [theme.breakpoints.down('sm')]: {
      fontSize: '1rem'
    }
  },
  sectionDesktop: {
    display: 'flex',
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  navButtons: {
    color: 'white',
    textTransform: 'capitalize',
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.15),
    },
  },
  mobileNavButtons: {
    color: 'black',
    textTransform: 'capitalize',
    '&:hover': {
      backgroundColor: fade(theme.palette.common.black, 0.15),
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
    // console.log("Hamburger Menu")
    // console.log("Implement Drawer")
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
            className={classes.mobileNavButtons} >
            <Typography variant='body1' color='inherit'> Home  </Typography>
          </Button>
          </MenuItem>
          <MenuItem disableGutters style={{width: '6rem' }}>
            <Button href='create/' size='large'
              fullWidth
              variant='text'
              className={classes.mobileNavButtons} >
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
            className={classes.mobileNavButtons} >
            <Typography variant='body1' color='inherit'> Logout </Typography>
          </Button>
        ) : (
          <Button href='/login'
            fullWidth
            variant='text' size='large'
            className={classes.mobileNavButtons} >
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
            <Typography className={classes.title} variant="h4" noWrap>
              TestBlog
            </Typography>
            {/* --------- Hamburger Menu Icon ends ------- */}
            <div className={classes.grow} />
            {/* --------- Section Desktop Nav buttons start  ------- */}
            <div className={classes.sectionDesktop}>
              { props.isAuthenticated ? (
                <div style={{ display: 'flex'}}>
                  <Button href='/'
                    fullWidth
                    className={classes.navButtons} >
                    <Typography variant='body1'> Home  </Typography>
                  </Button>
                  <Button onClick={props.handleCreate}
                    fullWidth
                    variant='text'
                    className={classes.navButtons} >
                    <Typography variant='body1'> Create  </Typography>
                  </Button>
                </div>
              ) : (<div />)

              }
              {
                props.isAuthenticated ? (
                  <Button onClick={props.logOut} href='/'
                    variant='text' fullWidth
                    className={classes.navButtons} >
                    <Typography variant='body1'> Logout  </Typography>
                  </Button>
                ) : (
                  <Button href='/login'
                    variant='text' fullWidth
                    className={classes.navButtons} >
                    <Typography variant='body1'> Login  </Typography>
                  </Button>
                )
              }

            </div>
            {/*------- Section Desktop Nav buttons end -------- */}
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
