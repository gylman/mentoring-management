import React from "react";
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
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";
import { Button } from "@material-ui/core";
import Logo from "../assets/images/logo.png";
import { Link, useHistory } from "react-router-dom";
import cuid from "cuid";
import TrendingUpIcon from "@material-ui/icons/TrendingUp";
import BuildIcon from "@material-ui/icons/Build";
import PersonIcon from "@material-ui/icons/Person";
import PeopleIcon from "@material-ui/icons/People";
import AssessmentIcon from "@material-ui/icons/Assessment";
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
  const [activeOption, setActiveOption] = React.useState("");
  const status = "administrator";
  let navigationPanelOptions;
  if (status === "instructor") {
    navigationPanelOptions = [
      { name: "Classroom registration" },
      { name: "Usage information" },
    ];
  } else if (status === "administrator") {
    navigationPanelOptions = [
      { name: "Status", icon: <TrendingUpIcon />, path: "/", id: cuid() },
      {
        name: "MCU Management",
        icon: <BuildIcon />,
        path: "/mcu-management",
        id: cuid(),
      },
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
                setIsUserLoggedIn(false);
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
            {navigationPanelOptions.map((item) => (
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
            {[{ name: "Profile", icon: <PersonIcon /> }].map((item, index) => (
              <ListItem button key={cuid()}>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.name} />
              </ListItem>
            ))}
          </List>
        </div>
      </Drawer>
    </div>
  );
}
