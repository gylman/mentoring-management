import React from "react";
import { Route, Switch } from "react-router-dom";
import About from "./pages/About";
import Home from "./pages/Home";
import NavigationPanel from "./components/NavigationPanel";

function Dashboard({ setIsUserLoggedIn }) {
  return (
    //everything outside of Switch is will be displayed in every route
    <>
      <NavigationPanel setIsUserLoggedIn={setIsUserLoggedIn} />
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/about">
          <About />
        </Route>
      </Switch>
    </>
  );
}

export default Dashboard;
