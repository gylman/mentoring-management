import {
  Button,
  CircularProgress,
  Grid,
  IconButton,
  MenuItem,
  Select,
  Snackbar,
  TextField,
  Typography,
} from "@material-ui/core";
import React, { useContext } from "react";
import cuid from "cuid";
import axios from "axios";
import DivisionDialog from "../../components/dialogs/DivisionDialog";
import SettingsIcon from "@material-ui/icons/Settings";
import { AuthContext } from "../../context/authContext";

function UserRegister() {
  const auth = useContext(AuthContext);
  const [divisionPopUpState, setDivisionPopUpState] = React.useState(false);
  const [divisions, setDivisions] = React.useState([]);
  const [userId, setUserId] = React.useState("");
  const [alert, setAlert] = React.useState({
    message: "",
    open: false,
    color: "",
  });
  const [loading, setLoading] = React.useState(false);
  const [name, setName] = React.useState("");
  const [type, setType] = React.useState(
    auth.status === "instructor" ? "student" : "choose-one-option"
  );
  const [phone, setPhone] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [address, setAddress] = React.useState("");
  const [selectedDivision, setSelectedDivision] = React.useState(
    auth.status === "manager" || auth.status === "instructor"
      ? auth.division
      : "choose-one-option"
  );

  let userTypes;

  if (auth.status === "administrator") {
    userTypes = ["student", "instructor", "administrator", "manager"];
  } else if (auth.status === "manager") {
    userTypes = ["student", "instructor"];
  } else if (auth.status === "instructor") {
    userTypes = ["student"];
  }

  React.useEffect(() => {
    async function getData() {
      const headersObject = {
        "Content-Type": "application/json",
        authorization: "Bearer " + auth.token,
      };
      try {
        const responseObj = {
          method: "get",
          url: `http://59.26.51.139:5555/api/v1/divisions`,
          headers: headersObject,
          // cancelToken: source.token,
        };

        const response = await axios(responseObj);

        if (response.data.status === "success") {
          setDivisions(response.data.divisions);
        }
      } catch (error) {
        console.log(error);
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
    // if (auth.status === "manager" || auth.status === "instructor") {
    //   setSelectedDivision(auth.division);
    // }
    if (auth.status === "instructor") {
      setType("student");
    }
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
    const requestObject = {
      userId: userId.trim(),
      name: name,
      division: selectedDivision,
      status: type,
      phone: phone,
      email: email,
      address: address,
      createdBy: auth.userId,
    };
    const headersObject = {
      "Content-Type": "application/json",
      authorization: "Bearer " + auth.token,
    };

    try {
      setLoading(true);
      const response = await axios.post(
        `http://59.26.51.139:5555/api/v1/users`,
        requestObject,
        { headers: headersObject }
      );

      if (response.data.status === "success") {
        setUserId("");
        setName("");
        setType(auth.status === "instructor" ? "student" : "choose-one-option");
        setPhone("");
        setEmail("");
        setAddress("");
        setSelectedDivision(
          auth.status === "manager" || auth.status === "instructor"
            ? auth.division
            : "choose-one-option"
        );
        setLoading(false);
        setAlert({
          message: "User created successfully",
          open: true,
          color: "#00C851",
        });
      }
      if (response.data.status === "fail") {
        setLoading(false);
        setAlert({
          open: true,
          color: "#f33336",
          message: response.data.message,
        });
      }
    } catch (error) {
      setLoading(false);
      setAlert({
        open: true,
        color: "#f33336",
        message: error.response.data.message,
      });
    }
  }

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h5">
          {auth.status === "instructor"
            ? "Student Registration"
            : "User Registration"}
        </Typography>
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
      {auth.status === "administrator" ? (
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
                  Choose one option as a division*
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
      ) : null}
      {auth.status === "student" || auth.status === "instructor" ? null : (
        <Grid item xs={12} container>
          <Grid item xs={5}>
            <Select
              required
              labelId="demo-customized-select-label"
              id="demo-customized-select"
              fullWidth
              value={type}
              onChange={(e) => setType(e.target.value)}
              variant="standard"
              style={{
                border: "1px solid rgba(0, 0, 0, 0.23)",
                padding: "3px 14px",
                borderRadius: "4px",
              }}
            >
              <MenuItem key={cuid()} value={"choose-one-option"}>
                Choose one option as a type *
              </MenuItem>
              {userTypes.map((item) => {
                return (
                  <MenuItem key={cuid()} value={item}>
                    {item}
                  </MenuItem>
                );
              })}
            </Select>
          </Grid>
        </Grid>
      )}

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
              registerUser();
            }}
          >
            Register
          </Button>
        </Grid>
      )}

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
        autoHideDuration={2000}
      />
    </Grid>
  );
}

export default React.memo(UserRegister);
