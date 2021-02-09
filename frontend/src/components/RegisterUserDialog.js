import React from "react";
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



export default function RegisterUserDialog({ handleClose, open }) {

  

  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="customized-dialog-title"
      open={open}
    >
      <DialogTitle id="customized-dialog-title" onClose={handleClose}>
        User registration
      </DialogTitle>
      <DialogContent dividers>
        <Grid
          container
          style={{ minWidth: "570px" }}
          justify="center"
          spacing={2}
          // flexDirection="column"
        >
          <Grid item xs={6}>
            <TextField fullWidth variant="outlined" placeholder="Personal id" />
          </Grid>
          <Grid item xs={6}>
            <TextField fullWidth variant="outlined" placeholder="Name" />
          </Grid>
          <Grid item xs={6}>
            <TextField fullWidth variant="outlined" placeholder="Division" />
          </Grid>
          <Grid item xs={6}>
            <TextField fullWidth variant="outlined" placeholder="Subject" />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Contact information"
            />
          </Grid>
          <Grid item xs={6}>
            <TextField fullWidth variant="outlined" placeholder="Email" />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Affiliation business"
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button
          autoFocus
          onClick={handleClose}
          color="primary"
          variant="contained"
        >
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
}
