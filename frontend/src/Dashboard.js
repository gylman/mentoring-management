import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Redirect, Route, Switch } from "react-router-dom";
import NavigationPanel from "./components/NavigationPanel";
import { Toolbar } from "@material-ui/core";
import Status from "./pages/status/Status";
import ServerDetails from "./pages/server-details/ServerDetails";
import UserManagement from "./pages/user-management/UserManagement";
import UserRegister from "./pages/user-register/UserRegister";
import Statistics from "./pages/statistics/Statistics";
import Profile from "./pages/profile/Profile";
import DailyStatistics from "./pages/daily-statistics/DailyStatistics";
import MonthlyStatistics from "./pages/monthly-statistics/MonthlyStatistics";
import { AuthContext } from "./context/authContext";
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
  const auth = useContext(AuthContext);
  let routes;

  if (auth.status === "administrator") {
    routes = (
      <Switch>
        <Route exact path="/">
          <Status />
        </Route>
        <Route exact path="/statistics">
          <Statistics />
        </Route>

        <Route exact path="/user-management">
          <UserManagement />
        </Route>

        <Route exact path="/server-details/:serverId">
          <ServerDetails />
        </Route>
        <Route exact path="/add-user">
          <UserRegister />
        </Route>
        <Route exact path="/profile">
          <Profile />
        </Route>
        <Route exact path="/daily-statistics/:userId/:dateForStatistics?">
          <DailyStatistics />
        </Route>
        <Route exact path="/monthly-statistics/:userId">
          <MonthlyStatistics />
        </Route>
        <Redirect to="/statistics" />
      </Switch>
    );
  } else if (auth.status === "manager" || auth.status === "instructor") {
    routes = (
      <Switch>
        <Route exact path="/statistics">
          <Statistics />
        </Route>
        <Route exact path="/user-management">
          <UserManagement />
        </Route>
        <Route exact path="/add-user">
          <UserRegister />
        </Route>
        <Route exact path="/profile">
          <Profile />
        </Route>
        <Route exact path="/daily-statistics/:userId/:dateForStatistics?">
          <DailyStatistics />
        </Route>
        <Route exact path="/monthly-statistics/:userId">
          <MonthlyStatistics />
        </Route>
        <Redirect to="/statistics" />
      </Switch>
    );
  } else if (auth.status === "student") {
    routes = (
      <Switch>
        <Route exact path="/statistics">
          <Statistics />
        </Route>
        <Route exact path="/profile">
          <Profile />
        </Route>
        <Route exact path="/daily-statistics/:userId">
          <DailyStatistics />
        </Route>
        <Route exact path="/monthly-statistics/:userId">
          <MonthlyStatistics />
        </Route>
        <Redirect to="/statistics" />
      </Switch>
    );
  }

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
