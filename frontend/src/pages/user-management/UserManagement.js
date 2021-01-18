import React from "react";
import cuid from "cuid";
import UsersTable from "./UsersTable";
import { Button, Grid } from "@material-ui/core";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import RegisterUserDialog from "../../components/RegisterUserDialog";

function UserManagement() {
  const [isOpenRegisterDialog, setIsOpenRegisterDialog] = React.useState(false);
  const [dummyData, setDummyData] = React.useState([
    {
      personalId: "59ad5139sa",
      name: "John Park",
      type: "teacher",
      subjectName: "English",
      contactInfo: "010-1234-5678",
    },
    {
      personalId: "59as5152sa",
      name: "July Park",
      type: "business-manager",
      subjectName: "Math",
      contactInfo: "010-1234-5678",
    },
    {
      personalId: "5ass5152sa",
      name: "Jonas Kim",
      type: "business-manager",
      subjectName: "Math",
      contactInfo: "010-1234-5678",
    },
  ]);

  const tableHeaders = [
    { columnHeader: "Personal ID" },
    { columnHeader: "Name" },
    { columnHeader: "Type" },
    { columnHeader: "Subject Name" },
    { columnHeader: "Contact Info" },
    { columnHeader: "Delete" },
  ];

  function handeRegisterDialogClose() {
    setIsOpenRegisterDialog(false);
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
              setIsOpenRegisterDialog(true);
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
      <UsersTable headers={tableHeaders} data={dummyData} />
    </div>
  );
}

export default UserManagement;
