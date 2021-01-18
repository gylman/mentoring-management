import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import SignIn from "./pages/SignIn";

function Landing({ setIsUserLoggedIn }) {
  return (
    <Switch>
      <Route exact path="/signin">
        <SignIn setIsUserLoggedIn={setIsUserLoggedIn} />
      </Route>
      <Redirect to="/signin" />
    </Switch>
  );
}
export default Landing;
