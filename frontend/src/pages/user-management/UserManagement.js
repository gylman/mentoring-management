import React from "react";
import cuid from "cuid";
import UsersTable from "./UsersTable";
import { Button, Grid } from "@material-ui/core";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import RegisterUserDialog from "../../components/RegisterUserDialog";
import { useHistory } from "react-router-dom";

function UserManagement() {
  const [isOpenRegisterDialog, setIsOpenRegisterDialog] = React.useState(false);
  const [dummyData, setDummyData] = React.useState([
    {
      personalId: "59ad5139sa",
      name: "John Park",
      type: "teacher",
      subjectName: "English",
      contactInfo: "010-1234-5678",
      email: "jonasjonasjonas@hi.com",
    },
    {
      personalId: "59as5152sa",
      name: "July Park",
      type: "business-manager",
      subjectName: "Mathematics",
      contactInfo: "010-1234-5678",
      email: "jonasjonasjonas@hi.com",
    },
    {
      personalId: "5ass5152sa",
      name: "Jonas Kim",
      type: "business-manager",
      subjectName: "Mathematics",
      contactInfo: "010-1234-5678",
      email: "jonasjonasjonas@hi.com",
    },
  ]);

  const tableHeaders = [
    { label: "Personal ID", extractor: "personalId" },
    { label: "Name", extractor: "name" },
    { label: "Type", extractor: "type" },
    { label: "Subject Name", extractor: "subjectName" },
    { label: "Contact Info", extractor: "contactInfo" },
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
      <UsersTable columns={tableHeaders} rows={dummyData} />
    </div>
  );
}

export default UserManagement;
