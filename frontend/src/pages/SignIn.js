import {
  Button,
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
  const [password, setPassword] = React.useState("");
  const [openAlert, setOpenAlert] = React.useState(false);
  const auth = useContext(AuthContext);

  function handleClose() {
    setOpenAlert(false);
  }

  async function submitLoginForm() {
    if (!password.length || !userId.length) {
      return setOpenAlert(true);
    }
    
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/v1/auth`,
        {
          userId: userId,
          password: password,
          // userId: "12345678",
          // password: "ee591301",
        }
      );

      if (response.data.status === "success") {
        auth.login({
          token: response.data.token,
          id: response.data.user.userId,
          fullName: "Qilman",
          status: "teacher",
        });
        setUserId("");
        setPassword("");
        history.push("/");
      } else {
      }
    } catch (error) {
      setOpenAlert(true);
      console.log(error);
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
        <Grid item container justify="center">
          <Grid item md={3}>
            <Typography className={classes.forgotCredentials}>
              forgot ID / password
            </Typography>
          </Grid>
        </Grid>
        <Snackbar
          onClose={handleClose}
          open={openAlert}
          message="Your password or user id is not correct!"
          ContentProps={{
            style: {
              marginTop: "45px",
              backgroundColor: "#FF3232",
            },
          }}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          // onClose={() => setAlert({ ...alert, open: false })}
          autoHideDuration={2000}
        />
      </Grid>
    </>
  );
}

export default SignIn;
