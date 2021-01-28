import React from "react";
import cuid from "cuid";
import axios from "axios";
import UsersTable from "./UsersTable";
import { Button, Grid } from "@material-ui/core";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import RegisterUserDialog from "../../components/RegisterUserDialog";
import { useHistory } from "react-router-dom";
import SimpleConfirmDialog from "../../components/dialogs/SimpleConfirmDialog";
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
  const [deletionCandidate, setDeletionCandidate] = React.useState("");
  const [confirmDialogState, setConfirmDialogState] = React.useState({
    open: false,
    title: "User deletetion",
    description: "Are you sure that you want to delete this user",
    confirm: "Confirm",
    cancel: "Cancel",
  });

  React.useEffect(() => {
    async function getData() {
      // const headersObject = {
      //   "Content-Type": "application/json",
      //   authorization: "Bearer " + auth.token,
      // };
      try {
        const responseObj = {
          method: "get",
          url: `http://59.26.51.139:5555/api/v1/users`,
          // headers: headersObject,
          // cancelToken: source.token,
        };

        const response = await axios(responseObj);

        if (response.data.status === "success") {
          setUsers(response.data.users);

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
  }, [confirmDialogState]);

  const tableHeaders = [
    { label: "User ID", extractor: "userId" },
    { label: "Name", extractor: "name" },
    { label: "Type", extractor: "type" },
    // { label: "Subject Name", extractor: "subjectName" },
    { label: "Contact Info", extractor: "phone" },
    { label: "Email", extractor: "email" },
    { label: "Delete", extractor: "delete" },
  ];

  const columns = [
    { id: "name", label: "Name", minWidth: 170 },
    { id: "code", label: "ISO\u00a0Code", minWidth: 100 },
    {
      id: "population",
      label: "Population",
      minWidth: 170,
      align: "right",
      format: (value) => value.toLocaleString("en-US"),
    },
    {
      id: "size",
      label: "Size\u00a0(km\u00b2)",
      minWidth: 170,
      align: "right",
      format: (value) => value.toLocaleString("en-US"),
    },
    {
      id: "density",
      label: "Density",
      minWidth: 170,
      align: "right",
      format: (value) => value.toFixed(2),
    },
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

  return (
    <div container>
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
