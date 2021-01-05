import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Route, Switch } from "react-router-dom";
import NavigationPanel from "./components/NavigationPanel";
import { Toolbar } from "@material-ui/core";
import Status from "./pages/Status";
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

function Dashboard({ setIsUserLoggedIn }) {
  const classes = useStyles();
  const routes = (
    <Switch>
      <Route exact path="/">
        <Status />
      </Route>
    </Switch>
  );
  return (
    <div className={classes.root}>
      <NavigationPanel setIsUserLoggedIn={setIsUserLoggedIn} />
      <main className={classes.content}>
        <Toolbar />
        {routes}
      </main>
    </div>
  );
}

export default Dashboard;
