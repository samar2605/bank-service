import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles(() => ({
    title: {
      flexGrow: 1,
    },
    linkButton: {
      color: 'white',
      textDecoration: 'none',
    },
  }));

const NavBar = () => {
  const classes = useStyles();

  return (
    <AppBar className={classes.appBar}>
      <Toolbar>
        <Typography variant="h6" className={classes.title} >
          My Banking Service
        </Typography>
        <Button color="inherit" component={Link} to="/signin" className={classes.linkButton}>
          Sign In
        </Button>
        <Button color="inherit" component={Link} to="/signup" className={classes.linkButton}>
          Sign Up
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
