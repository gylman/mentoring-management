import { useState, useCallback, useEffect } from "react";
import Dashboard from "./Dashboard";
import Landing from "./Landing";
import { AuthContext } from "./context/authContext";
import { CircularProgress, Grid } from "@material-ui/core";

function App() {
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState("");
  const [userId, setUserId] = useState("");
  const [userFullName, setUserFullName] = useState("");
  const [userStatus, setUserStatus] = useState("");

  const login = useCallback(({ token, id, fullName, status }) => {
    setToken(token);
    setUserId(id);
    setUserFullName(fullName);
    setUserStatus(status);
    localStorage.setItem(
      "userData",
      JSON.stringify({
        userId: id,
        token: token,
        fullName: fullName,
        status: status,
      })
    );
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    setUserId(null);
    setUserFullName(null);
    localStorage.removeItem("userData");
  }, []);

  useEffect(() => {
    setLoading(true);
    const storedData = JSON.parse(localStorage.getItem("userData"));
    if (storedData && storedData.token) {
      login({
        token: storedData.token,
        id: storedData.userId,
        notifications: [],
        fullName: storedData.fullName,
        status: storedData.status,
      });
    }
    setLoading(false);
  }, [login]);
  //guarantee that only one route will be displayed among others

  if (loading) {
    return (
      <Grid
        style={{ minHeight: "80vh" }}
        container
        justify="center"
        alignItems="center"
      >
        <Grid item>
          <CircularProgress />
        </Grid>
      </Grid>
    );
  }

  return (
    <AuthContext.Provider
      value={{
        isLogggedIn: !!token,
        token,
        login,
        logout,
        userId,
        fullName: userFullName,
        status: userStatus,
      }}
    >
      {token ? <Dashboard /> : <Landing />}
    </AuthContext.Provider>
  );
}

export default App;
