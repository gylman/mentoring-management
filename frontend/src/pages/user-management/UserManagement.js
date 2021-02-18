import React, { useContext } from "react";
import axios from "axios";
import UsersTable from "./UsersTable";
import { Button, CircularProgress, Grid } from "@material-ui/core";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import RegisterUserDialog from "../../components/RegisterUserDialog";
import { useHistory } from "react-router-dom";
import SimpleConfirmDialog from "../../components/dialogs/SimpleConfirmDialog";
import { AuthContext } from "../../context/authContext";

function UserManagement() {
  const [isOpenRegisterDialog, setIsOpenRegisterDialog] = React.useState(false);
  const [users, setUsers] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [deletionCandidate, setDeletionCandidate] = React.useState("");
  const [confirmDialogState, setConfirmDialogState] = React.useState({
    open: false,
    title: "User deletion",
    description: "Are you sure that you want to delete this user",
    confirm: "Confirm",
    cancel: "Cancel",
  });
  const auth = useContext(AuthContext);

  React.useEffect(() => {
    async function getData() {
      const headersObject = {
        "Content-Type": "application/json",
        authorization: "Bearer " + auth.token,
      };
      try {
        const responseObj = {
          method: "get",
          url: `http://59.26.51.139:5555/api/v1/users`,
          headers: headersObject,
          // cancelToken: source.token,
        };

        const response = await axios(responseObj);

        if (response.data.status === "success") {
          setUsers(response.data.users);

          setLoading(false);
          // setPatients(response.data.patients);
        }
      } catch (error) {
        // if () {
        // // if (axios.isCancel(error)) {
        //   //console.log("axios cancel error");
        // } else {

        setLoading(false);
        console.log(error);
        // }
      }
    }

    getData();
  }, [confirmDialogState, auth.token]);

  const tableHeaders = [
    { label: "User ID", extractor: "userId" },
    { label: "Name", extractor: "name" },
    { label: "Type", extractor: "status" },
    // { label: "Subject Name", extractor: "subjectName" },
    { label: "Contact Info", extractor: "phone" },
    { label: "Email", extractor: "email" },
    { label: "Delete", extractor: "delete" },
  ];

  function handeRegisterDialogClose() {
    setIsOpenRegisterDialog(false);
  }
  const history = useHistory();

  async function confirmUserDelete() {
    try {
      await axios.delete(
        `http://59.26.51.139:5555/api/v1/users/${deletionCandidate}`
      );
      setConfirmDialogState({
        ...confirmDialogState,
        open: false,
      });
    } catch (error) {
      console.log(error);
    }
  }

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
    <div>
      <Grid container justify="space-between" alignItems="center">
        <Grid item>
          <h1>User management</h1>
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              history.push("/add-user");
            }}
            startIcon={<PersonAddIcon />}
          >
            register user
          </Button>
        </Grid>
      </Grid>
      <RegisterUserDialog
        open={isOpenRegisterDialog}
        handleClose={handeRegisterDialogClose}
      />
      <UsersTable
        columns={tableHeaders}
        rows={users}
        setDeletionCandidate={setDeletionCandidate}
        handleDeleteDialog={() => {
          setConfirmDialogState({
            ...confirmDialogState,
            open: true,
          });
        }}
        setConfirmDialogState={setConfirmDialogState}
        confirmDialogState={confirmDialogState}
      />
      <SimpleConfirmDialog
        elements={confirmDialogState}
        open={confirmDialogState.open}
        handleClose={() => {
          setConfirmDialogState({
            ...confirmDialogState,
            open: false,
          });
        }}
        handleConfirm={confirmUserDelete}
      />
    </div>
  );
}

export default UserManagement;
