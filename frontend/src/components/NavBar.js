import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import { makeStyles } from "@mui/styles";
import { useNavigate } from 'react-router-dom';

const useStyles = makeStyles(() => ({
  title: {
    flexGrow: 1,
  },
  linkButton: {
    color: "white",
    textDecoration: "none",
  },
}));

const NavBar = ({ authState, setAuthState }) => {
  const classes = useStyles();
  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem("accessToken");
    setAuthState({ username: "", id: 0, status: false });
    navigate('/');
  };

  return (
    <AppBar className={classes.appBar}>
      <Toolbar>
        <Typography variant="h6" className={classes.title}>
          Banking Service
        </Typography>
        {!authState.status && (
          <>
            <Button
              color="inherit"
              component={Link}
              to="/signin"
              className={classes.linkButton}
            >
              Sign In
            </Button>
            <Button
              color="inherit"
              component={Link}
              to="/signup"
              className={classes.linkButton}
            >
              Sign Up
            </Button>
          </>
        )}
        {authState.status && (
          <>
            <h3> Hi,{authState.username} </h3>

            <Button
              color="inherit"
              onClick={logout}
              className={classes.linkButton}
            >
              Logout
            </Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
