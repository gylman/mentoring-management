import { useState } from "react";
import Dashboard from "./Dashboard";
import Landing from "./Landing";

function App() {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  //guarantee that only one route will be displayed among others
  return isUserLoggedIn ? (
    <Dashboard setIsUserLoggedIn={setIsUserLoggedIn} />
  ) : (
    <Landing setIsUserLoggedIn={setIsUserLoggedIn} />
  );
}

export default App;
