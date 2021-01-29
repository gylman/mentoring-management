import {
  Button,
  CircularProgress,
  Grid,
  makeStyles,
  Snackbar,
  TextField,
  Typography,
} from "@material-ui/core";
import React, { useContext } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Logo from "../assets/images/logo.png";
import { AuthContext } from "../context/authContext";
import ForgetPassword from "../components/dialogs/ForgetPassword";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  headerContainer: {
    display: "flex",
    justifyContent: "center",
    flex: 1,
  },
  header: {
    color: "black",
    fontSize: 35,
    fontWeight: "bold",
    color: "#003a76",
    fontFamily: "Open Sans Condensed",
  },
  loginTitle: {
    color: "black",
    fontSize: 35,
    fontWeight: "bold",
    color: "#003a76",
    textAlign: "center",
    fontFamily: "Open Sans Condensed",
  },
  forgotCredentials: {
    color: "#003a76",
    textAlign: "center",
    cursor: "pointer",
    textDecoration: "underline",
  },
}));

function SignIn() {
  const classes = useStyles();
  const history = useHistory();
  const [userId, setUserId] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [forgetPasswordState, setForgetPasswordState] = React.useState(false);
  const [password, setPassword] = React.useState("");

  const [alert, setAlert] = React.useState({
    message: "",
    open: false,
    color: "",
  });

  const auth = useContext(AuthContext);

  function handleClose() {
    setAlert({
      ...alert,
      open: false,
      color: "#f33336",
      message: "Your password or user id is not correct!",
    });
  }

  async function submitLoginForm() {
    if (!password.length || !userId.length) {
      return setAlert({
        ...alert,
        open: true,
        color: "#f33336",
        message: "Your password or user id is not correct!",
      });
    }
    setLoading(true);
    try {
      const response = await axios.post(
        `http://59.26.51.139:5555/api/v1/auth`,
        {
          userId: userId,
          password: password,
        }
      );

      if (response.data.status === "success") {
        auth.login({
          token: response.data.token,
          id: response.data.user.userId,
          fullName: "Qilman",
          status: "teacher",
        });
        setLoading(false);
        setUserId("");
        setPassword("");
        history.push("/");
      } else {
      }
    } catch (error) {
      setLoading(false);
      setAlert({
        ...alert,
        open: true,
        color: "#f33336",
        message: "Your password or user id is not correct!",
      });
    }
  }

  // function Alert(props) {
  //   return <MuiAlert elevation={6} variant="filled" {...props} />;
  // }

  return (
    <>
      <AppBar style={{ backgroundColor: "white" }} position="static">
        <Toolbar style={{ justifyContent: "space-between" }}>
          <img src={Logo} alt="wooksung_media" />
          <Typography className={classes.header}>iMentorCenter</Typography>
          <div style={{ width: "252px" }}></div>
        </Toolbar>
      </AppBar>
      <Grid
        container
        direction="column"
        alignItems="center"
        justify="center"
        style={{ height: "100vh" }}
      >
        <Grid item container justify="center">
          <Grid item md={3} style={{ marginBottom: "1em" }}>
            <Typography className={classes.loginTitle}>LOGIN</Typography>
          </Grid>
        </Grid>
        <Grid item container justify="center">
          <Grid item md={3} style={{ marginBottom: "1em" }}>
            <TextField
              fullWidth
              required
              id="filled-basic"
              label="User ID"
              variant="filled"
              value={userId}
              onChange={(event) => setUserId(event.target.value)}
            />
          </Grid>
        </Grid>
        <Grid item container justify="center" style={{ marginBottom: "1em" }}>
          <Grid item md={3}>
            <TextField
              fullWidth
              required
              id="filled-basic"
              label="Password"
              variant="filled"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </Grid>
        </Grid>
        {loading ? (
          <Grid
            style={{ minHeight: "10vh" }}
            container
            justify="center"
            alignItems="center"
          >
            <Grid item>
              <CircularProgress />
            </Grid>
          </Grid>
        ) : (
          <Grid item container justify="center" style={{ marginBottom: "1em" }}>
            <Grid item md={3}>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                onClick={() => {
                  // setIsUserLoggedIn(true);
                  submitLoginForm();
                }}
              >
                Sign in
              </Button>
            </Grid>
          </Grid>
        )}
        <Grid item container justify="center">
          <Grid item md={3}>
            <Typography
              className={classes.forgotCredentials}
              onClick={() => setForgetPasswordState(true)}
            >
              forgot ID / password
            </Typography>
          </Grid>
        </Grid>
        <Snackbar
          onClose={handleClose}
          open={alert.open}
          // message="Your password or user id is not correct!"
          message={alert.message}
          ContentProps={{
            style: {
              marginTop: "45px",
              backgroundColor: alert.color,
            },
          }}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          autoHideDuration={2000}
        />

        <ForgetPassword
          open={forgetPasswordState}
          handleClose={() => {
            setForgetPasswordState(false);
          }}
          setAlert={setAlert}
        />
      </Grid>
    </>
  );
}

export default SignIn;
