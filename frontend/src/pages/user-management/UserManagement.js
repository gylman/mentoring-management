import React, { useContext } from "react";
import axios from "axios";
import UsersTable from "./UsersTable";
import { Button, CircularProgress, Grid } from "@material-ui/core";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import RegisterUserDialog from "../../components/RegisterUserDialog";
import { useHistory } from "react-router-dom";
import SimpleConfirmDialog from "../../components/dialogs/SimpleConfirmDialog";
import { AuthContext } from "../../context/authContext";
// [
//   {
//     personalId: "59ad5139sa",
//     name: "John Park",
//     type: "teacher",
//     subjectName: "English",
//     contactInfo: "010-1234-5678",
//     email: "jonasjonasjonas@hi.com",
//   },
//   {
//     personalId: "59as5152sa",
//     name: "July Park",
//     type: "business-manager",
//     subjectName: "Mathematics",
//     contactInfo: "010-1234-5678",
//     email: "jonasjonasjonas@hi.com",
//   },
//   {
//     personalId: "5ass5152sa",
//     name: "Jonas Kim",
//     type: "business-manager",
//     subjectName: "Mathematics",
//     contactInfo: "010-1234-5678",
//     email: "jonasjonasjonas@hi.com",
//   },
// ]

function UserManagement() {
  const [isOpenRegisterDialog, setIsOpenRegisterDialog] = React.useState(false);
  const [users, setUsers] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [deletionCandidate, setDeletionCandidate] = React.useState("");
  const [confirmDialogState, setConfirmDialogState] = React.useState({
    open: false,
    title: "User deletetion",
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
          params: {
            status: auth.status,
          },
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
      const response = await axios.delete(
        `http://59.26.51.139:5555/api/v1/users/${deletionCandidate}`
      );
      setConfirmDialogState({
        ...confirmDialogState,
        open: false,
      });

      // const response = await axios({
      //   method: "delete",
      //   url: `http://59.26.51.139:5555/api/v1/patients/updateDay`,
      //   data: requestObject,
      //   headers: headersObject,
      // });
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
      <Grid item container style={{ marginBottom: "30px" }} justify="flex-end">
        <Grid item>
          <Button
            variant="contained"
            color="primary"
            // className={classes.button}
            onClick={() => {
              // setIsOpenRegisterDialog(true);
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
