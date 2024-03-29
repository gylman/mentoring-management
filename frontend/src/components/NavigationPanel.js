import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { Button } from "@material-ui/core";
import Logo from "../assets/images/logo.png";
import { Link, useHistory } from "react-router-dom";
import cuid from "cuid";
import BuildIcon from "@material-ui/icons/Build";
import PersonIcon from "@material-ui/icons/Person";
import PeopleIcon from "@material-ui/icons/People";
import AssessmentIcon from "@material-ui/icons/Assessment";
import { AuthContext } from "../context/authContext";
const drawerWidth = 280;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    backgroundColor: "white",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerContainer: {
    overflow: "auto",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  title: {
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
  const auth = useContext(AuthContext);
  const classes = useStyles();
  const history = useHistory();

  const [activeOption, setActiveOption] = React.useState("");
  let navigationPanelOptions;
  if (auth.status === "instructor" || auth.status === "manager") {
    navigationPanelOptions = [
      {
        name: "User Management",
        icon: <PeopleIcon />,
        path: "/user-management",
        id: cuid(),
      },
      {
        name: "Statistics",
        icon: <AssessmentIcon />,
        path: "/statistics",
        id: cuid(),
      },
    ];
  } else if (auth.status === "administrator") {
    navigationPanelOptions = [
      { name: "Status", icon: <BuildIcon />, path: "/", id: cuid() },

      {
        name: "User Management",
        icon: <PeopleIcon />,
        path: "/user-management",
        id: cuid(),
      },
      {
        name: "Statistics",
        icon: <AssessmentIcon />,
        path: "/statistics",
        id: cuid(),
      },
    ];
  } else if (auth.status === "student") {
    navigationPanelOptions = [
      {
        name: "Statistics",
        icon: <AssessmentIcon />,
        path: "/statistics",
        id: cuid(),
      },
    ];
  }

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar style={{ justifyContent: "space-between" }}>
          <img src={Logo} alt="wooksung_media" />
          <Typography className={classes.title}>iMentorCenter</Typography>
          <div className={classes.logoutContainer}>
            <Button
              color="primary"
              onClick={() => {
                // setIsUserLoggedIn(false);
                auth.logout();
                history.push("/signin");
              }}
            >
              LogOut
            </Button>
          </div>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <Toolbar />
        <div className={classes.drawerContainer}>
          <List>
            {navigationPanelOptions?.map((item) => (
              <ListItem
                onClick={() => setActiveOption(item.path)}
                selected={activeOption === item.path}
                component={Link}
                to={item.path}
                button
                key={item.id}
              >
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.name} />
              </ListItem>
            ))}
          </List>
          <Divider />
          <List>
            {[{ name: "Profile", path: "/profile", icon: <PersonIcon /> }].map(
              (item, index) => (
                <ListItem
                  button
                  key={cuid()}
                  component={Link}
                  to={item.path}
                  onClick={() => setActiveOption(item.path)}
                  selected={activeOption === item.path}
                >
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.name} />
                </ListItem>
              )
            )}
          </List>
        </div>
      </Drawer>
    </div>
  );
}
