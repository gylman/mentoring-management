import React from "react";
import axios from "axios";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";
import { Grid, TextField } from "@material-ui/core";

const styles = (theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    margin: "auto",
    width: "fit-content",
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

export default function ForgetPassword({ handleClose, open, setAlert }) {
  const [email, setEmail] = React.useState("");
  async function submitForgetPassword() {
    try {
      const response = await axios.post(
        `http://59.26.51.139:5555/api/v1/auth/forgetpassword`,
        {
          email: email.trim(),
        }
      );
      console.log("====================================");
      console.log(response);
      console.log("====================================");
      if (response.data.status === "success") {
        setAlert({
          color: "#00B848",
          open: true,
          message:
            "We successfully emailed you your details, please check your email.",
        });
      } else {
      }
    } catch (error) {
      setAlert({
        color: "#f33336",
        open: true,
        message: error.response.data.message,
      });
    }
  }
  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="customized-dialog-title"
      open={open}
    >
      <DialogTitle id="customized-dialog-title" onClose={handleClose}>
        Reset your password
      </DialogTitle>
      <DialogContent dividers>
        <Grid
          container
          style={{ minWidth: "570px" }}
          justify="center"
          spacing={2}
          // flexDirection="column"
        >
          <Grid item xs={8}>
            <TextField
              size="small"
              fullWidth
              variant="outlined"
              label="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button
          autoFocus
          onClick={() => {
            submitForgetPassword();
            handleClose();
          }}
          color="primary"
          variant="contained"
        >
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
}
