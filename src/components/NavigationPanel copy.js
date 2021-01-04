import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Logo from "../assets/images/logo.png";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  header: {
    backgroundColor: "white",
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    color: "black",
    fontSize: 35,
    fontWeight: "bold",
    color: "#003a76",
    fontFamily: "Open Sans Condensed",
  },
  logoutContainer: {
    width: "252px",
    display: "flex",
    justifyContent: "flex-end",
  },
}));

export default function NavigationPanel({ setIsUserLoggedIn }) {
  const classes = useStyles();
  const history = useHistory();

  return (
    <div className={classes.root}>
      <AppBar className={classes.header} position="static">
        <Toolbar style={{ justifyContent: "space-between" }}>
          <img src={Logo} alt="wooksung_media" />
          <Typography className={classes.title}>iMentorCenter</Typography>
          <div className={classes.logoutContainer}>
            <Button
              color="primary"
              onClick={() => {
                setIsUserLoggedIn(false);
                history.push("/signin");
              }}
            >
              LogOut
            </Button>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}
