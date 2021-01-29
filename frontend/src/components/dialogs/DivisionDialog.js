import React from "react";
import cuid from "cuid";
import axios from "axios";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import AddIcon from "@material-ui/icons/Add";
import Typography from "@material-ui/core/Typography";

import DeleteIcon from "@material-ui/icons/Delete";
import {
  Grid,
  Input,
  InputAdornment,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  TextField,
} from "@material-ui/core";

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

export default function DivisionDialog({
  handleClose,
  open,
  divisions,
  updateDivisionsInLocal,
  deleteDivisionsInLocal,
}) {
  const [newDivsion, setNewDivision] = React.useState("");

  async function submitSaveDivisions() {
    try {
      const response = await axios.post(
        `http://59.26.51.139:5555/api/v1/divisions/save`,
        {
          divisions: divisions.map((item) => item.name),
          // userId: userId,
          // password: password,
          // userId: "12345678",
          // password: "ee591301",
        }
      );

      if (response.data.status === "success") {
      } else {
      }
    } catch (error) {
      // setOpenAlert(true);
      console.log(error);
    }
  }

  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="customized-dialog-title"
      open={open}
    >
      <DialogTitle id="customized-dialog-title" onClose={handleClose}>
        Division management
      </DialogTitle>
      <DialogContent dividers>
        <Grid
          container
          style={{ minWidth: "500px" }}
          justify="center"
          spacing={2}
          // flexDirection="column"
        >
          <Grid item xs={12}>
            {/* <TextField fullWidth variant="outlined" placeholder="Personal id" /> */}
            <Input
              id="rename-input"
              // type={values.showPassword ? "text" : "password"}
              value={newDivsion}
              onChange={(event) => setNewDivision(event.target.value)}
              fullWidth
              autoFocus
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => {
                      if (newDivsion.trim() === "") {
                        return;
                      } else {
                        updateDivisionsInLocal(newDivsion);
                        setNewDivision("");
                      }
                    }}
                    // onMouseDown={handleMouseDownPassword}
                  >
                    <AddIcon />
                  </IconButton>
                </InputAdornment>
              }
            />
          </Grid>
        </Grid>
        <List style={{ marginTop: "10px", padding: 0 }}>
          {divisions.map((division) => {
            return (
              <ListItem key={cuid()} style={{ padding: 0 }}>
                <ListItemText primary={division.name} />
                <ListItemSecondaryAction>
                  <IconButton
                    style={{ padding: 0, marginRight: "-3px" }}
                    onClick={() => {
                      deleteDivisionsInLocal(division.name);
                    }}
                  >
                    <DeleteIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            );
          })}
        </List>
      </DialogContent>
      <DialogActions>
        <Button
          autoFocus
          onClick={() => {
            submitSaveDivisions();
            handleClose();
          }}
          color="primary"
          variant="contained"
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}
