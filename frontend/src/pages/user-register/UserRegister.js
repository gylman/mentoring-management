import {
  Button,
  Grid,
  IconButton,
  MenuItem,
  Select,
  Snackbar,
  TextField,
  Typography,
} from "@material-ui/core";
import React from "react";
import cuid from "cuid";
import axios from "axios";
import DivisionDialog from "../../components/dialogs/DivisionDialog";
import SettingsIcon from "@material-ui/icons/Settings";

function UserRegister() {
  const [divisionPopUpState, setDivisionPopUpState] = React.useState(false);
  const [divisions, setDivisions] = React.useState([]);
  const [userId, setUserId] = React.useState("");
  const [alert, setAlert] = React.useState({
    message: "",
    open: false,
    color: "",
  });
  const [name, setName] = React.useState("");
  const [type, setType] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [address, setAddress] = React.useState("");
  const [selectedDivision, setSelectedDivision] = React.useState(
    "choose-one-option"
  );

  React.useEffect(() => {
    async function getData() {
      // const headersObject = {
      //   "Content-Type": "application/json",
      //   authorization: "Bearer " + auth.token,
      // };
      try {
        const responseObj = {
          method: "get",
          url: `http://localhost:3006/api/v1/divisions`,
          // headers: headersObject,
          // cancelToken: source.token,
        };

        const response = await axios(responseObj);

        if (response.data.status === "success") {
          setDivisions(response.data.divisions);

          // setLoading(false);
          // setPatients(response.data.patients);
        }
      } catch (error) {
        // if () {
        // // if (axios.isCancel(error)) {
        //   //console.log("axios cancel error");
        // } else {
        console.log(error);
        // }
      }
    }

    getData();
  }, []);

  function updateDivisionsInLocal(divisionName) {
    setDivisions([
      ...divisions,
      {
        id: cuid(),
        name: divisionName,
      },
    ]);
  }
  function deleteDivisionsInLocal(divisionName) {
    const divisionsAfterDelete = divisions.filter(
      (division) => division.name !== divisionName
    );

    setDivisions(divisionsAfterDelete);
  }

  async function registerUser() {
    if (userId.length < 5) {
      return setAlert({
        open: true,
        color: "#f33336",
        message: "User ID is required and should be more than 5 characthers",
      });
    }
    if (type.trim() === "") {
      return setAlert({
        open: true,
        color: "#f33336",
        message: "type field is required ",
      });
    }
    if (email.trim() === "") {
      return setAlert({
        open: true,
        color: "#f33336",
        message: "email field is required ",
      });
    }
    if (selectedDivision === "choose-one-option") {
      return setAlert({
        open: true,
        color: "#f33336",
        message: "division field is required, please choose one",
      });
    }

    try {
      const response = await axios.post(`http://localhost:3006/api/v1/users`, {
        userId: userId.trim(),
        name: name,
        division: selectedDivision,
        type: type,
        phone: phone,
        email: email,
        address: address,
      });
      // console.log(response);

      if (response.data.status === "success") {
        setUserId("");
        setName("");
        setType("");
        setPhone("");
        setEmail("");
        setAddress("");
        setSelectedDivision("choose-one-option");
      }
      
      if (response.data.status === "fail") {
        setAlert({
          open: true,
          color: "#f33336",
          message: response.data.message,
        });
      }
    } catch (error) {
      // setOpenAlert(true);
      console.log(error);
      setAlert({
        open: true,
        color: "#f33336",
        message: error.message,
      });
    }
  }

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h5">User Registration</Typography>
      </Grid>
      <Grid item xs={12} container>
        <Grid item xs={5}>
          <TextField
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            size="small"
            fullWidth
            variant="outlined"
            label="User ID"
            required
          />
        </Grid>
      </Grid>
      <Grid item xs={12} container>
        <Grid item xs={5}>
          <TextField
            value={name}
            onChange={(e) => setName(e.target.value)}
            size="small"
            fullWidth
            label="Name"
            variant="outlined"
          />
        </Grid>
      </Grid>
      <Grid item xs={12} container>
        <Grid item xs={5}>
          {divisions.length === 0 ? (
            <Typography>No division</Typography>
          ) : (
            <Select
              required
              labelId="demo-customized-select-label"
              id="demo-customized-select"
              fullWidth
              value={selectedDivision}
              onChange={(event) => {
                setSelectedDivision(event.target.value);
              }}
              variant="standard"
              style={{
                border: "1px solid rgba(0, 0, 0, 0.23)",
                padding: "3px 14px",
                borderRadius: "4px",
              }}
            >
              <MenuItem key={cuid()} value={"choose-one-option"}>
                Choose one option *
              </MenuItem>
              {/* <option aria-label="None" value="" /> */}
              {divisions.map((item) => {
                return (
                  <MenuItem key={cuid()} value={item.name}>
                    {item.name}
                  </MenuItem>
                );
              })}
            </Select>
          )}
        </Grid>
        <Grid xs={1} item container justify="center" alignItems="center">
          <Grid item>
            <IconButton
              onClick={() => {
                setDivisionPopUpState(true);
              }}
              style={{ padding: 0, marginLeft: "-30px" }}
            >
              <SettingsIcon />
            </IconButton>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12} container>
        <Grid item xs={5}>
          <TextField
            value={type}
            onChange={(e) => setType(e.target.value)}
            size="small"
            fullWidth
            variant="outlined"
            label="Type"
            required
          />
        </Grid>
      </Grid>
      <Grid item xs={12} container>
        <Grid item xs={5}>
          <TextField
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            size="small"
            fullWidth
            variant="outlined"
            placeholder="Phone"
          />
        </Grid>
      </Grid>
      <Grid item xs={12} container>
        <Grid item xs={5}>
          <TextField
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            size="small"
            fullWidth
            variant="outlined"
            label="Email"
            required
          />
        </Grid>
      </Grid>
      <Grid item xs={12} container>
        <Grid item xs={5}>
          <TextField
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            size="small"
            fullWidth
            variant="outlined"
            placeholder="Address"
            multiline
            rows={2}
          />
        </Grid>
      </Grid>

      <Grid item xs={6}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            registerUser();
          }}
        >
          Register
        </Button>
      </Grid>

      <DivisionDialog
        open={divisionPopUpState}
        divisions={divisions}
        updateDivisionsInLocal={updateDivisionsInLocal}
        deleteDivisionsInLocal={deleteDivisionsInLocal}
        handleClose={() => {
          setDivisionPopUpState(false);
        }}
      />
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

export default UserRegister;
