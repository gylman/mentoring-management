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

export default function McuRegisterDialog({
  handleClose,
  open,
  resetUseEffect,
}) {
  const [name, setName] = React.useState("");
  const [ip, setIp] = React.useState("");

  function resetInputs() {
    setName("");
    setIp("");
  }

  async function submitCreateUser() {
    try {
      const response = await axios.post(
        `http://59.26.51.139:5555/api/v1/servers/register-server`,
        {
          serverName: name,
          serverIp: ip,
        }
      );

      if (response.data.status === "success") {
        resetUseEffect();
        resetInputs();
      } else {
      }
    } catch (error) {
      console.log(error);
    }
  }

  function closeDialogAndReset() {
    handleClose();
    resetInputs();
  }

  return (
    <Dialog
      onClose={closeDialogAndReset}
      aria-labelledby="customized-dialog-title"
      open={open}
    >
      <DialogTitle id="customized-dialog-title" onClose={closeDialogAndReset}>
        MCU Register
      </DialogTitle>
      <DialogContent dividers>
        <Grid
          container
          style={{ minWidth: "500px" }}
          justify="center"
          spacing={2}
        >
          <Grid item xs={12}>
            <TextField
              size="small"
              fullWidth
              variant="outlined"
              required
              id="server-name"
              label="Server name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              size="small"
              fullWidth
              variant="outlined"
              required
              id="ip"
              label="IP"
              type="text"
              value={ip}
              onChange={(e) => setIp(e.target.value)}
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button
          autoFocus
          onClick={() => {
            submitCreateUser();
            handleClose();
          }}
          color="primary"
          variant="contained"
        >
          Register
        </Button>
      </DialogActions>
    </Dialog>
  );
}
