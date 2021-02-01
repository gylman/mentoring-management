import React from "react";
import axios from "axios";
import {
  Button,
  CircularProgress,
  Grid,
  Snackbar,
  TextField,
  Typography,
} from "@material-ui/core";
import { AuthContext } from "../../context/authContext";

function Profile() {
  const auth = React.useContext(AuthContext);
  const [loading, setLoading] = React.useState("");
  const [currentPassword, setCurrentPassword] = React.useState("");
  const [newPassword, setNewPassword] = React.useState("");
  const [newPassword2, setNewPassword2] = React.useState("");
  const [alert, setAlert] = React.useState({
    message: "",
    open: false,
    color: "",
  });

  async function submitLoginForm() {
    if (
      !currentPassword.length ||
      !newPassword.length ||
      !newPassword2.length
    ) {
      return setAlert({
        ...alert,
        open: true,
        color: "#f33336",
        message: "None of the fields can be empty",
      });
    }
    setLoading(true);

    const headersObject = {
      "Content-Type": "application/json",
      authorization: "Bearer " + auth.token,
    };

    const requestObject = {
      currentPassword,
      newPassword,
      newPassword2,
    };
    try {
      const response = await axios.post(
        `http://59.26.51.139:5555/api/v1/auth/changepassword`,
        requestObject,
        { headers: headersObject }
      );

      if (response.data.status === "success") {
        setLoading(false);
        setCurrentPassword("");
        setNewPassword("");
        setNewPassword2("");
        return setAlert({
          ...alert,
          open: true,
          color: "#00C851",
          message: "Your password is successfully changed",
        });
      }
    } catch (error) {
      setLoading(false);
      setAlert({
        ...alert,
        open: true,
        color: "#f33336",
        message: error.response.data.message,
      });
    }
  }

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h5">Reset your password</Typography>
      </Grid>
      <Grid item xs={12} container>
        <Grid item xs={5}>
          <TextField
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            size="small"
            fullWidth
            variant="outlined"
            label="Current password"
            required
            type="password"
          />
        </Grid>
      </Grid>
      <Grid item xs={12} container>
        <Grid item xs={5}>
          <TextField
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            size="small"
            required
            fullWidth
            label="New password"
            variant="outlined"
            type="password"
          />
        </Grid>
      </Grid>
      <Grid item xs={12} container>
        <Grid item xs={5}>
          <TextField
            value={newPassword2}
            onChange={(e) => setNewPassword2(e.target.value)}
            size="small"
            required
            fullWidth
            label="Confirm new password"
            variant="outlined"
            type="password"
          />
        </Grid>
      </Grid>
      {loading ? (
        <Grid
          style={{ minHeight: "10vh" }}
          container
          justify="center"
          alignItems="center"
          xs={5}
        >
          <Grid item>
            <CircularProgress />
          </Grid>
        </Grid>
      ) : (
        <Grid item xs={6}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              submitLoginForm();
            }}
          >
            Submit
          </Button>
        </Grid>
      )}
      <Snackbar
        onClose={() => setAlert({ ...alert, open: false })}
        open={alert.open}
        message={alert.message}
        ContentProps={{
          style: {
            marginTop: "45px",
            backgroundColor: alert.color,
          },
        }}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        // onClose={() => setAlert({ ...alert, open: false })}
        autoHideDuration={2000}
      />
    </Grid>
  );
}

export default Profile;
