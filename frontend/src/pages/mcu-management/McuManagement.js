import { Button, Grid, TextField } from "@material-ui/core";
import React from "react";
import axios from "axios";
import McuRegisterDialog from "../../components/dialogs/McuRegisterDialog";
import SimpleConfirmDialog from "../../components/dialogs/SimpleConfirmDialog";
import McuTable from "./McuTable";
import AddToQueueIcon from "@material-ui/icons/AddToQueue";

function McuManagement() {
  const [mcuDialogState, setMcuDialogState] = React.useState(false);

  const [resetServers, setResetServers] = React.useState(false);
  const [serverDeletionCandiate, setServerDeletionCandiate] = React.useState(
    ""
  );

  const [confirmDialogState, setConfirmDialogState] = React.useState({
    open: false,
    title: "Server deletetion",
    description: "Are you sure that you want to delete this server",
    confirm: "Confirm",
    cancel: "Cancel",
  });
  const tableHeaders = [
    { label: "Server name", extractor: "name" },
    { label: "IP", extractor: "ip" },
    { label: "Delete", extractor: "delete" },
  ];
  const [mcuServers, setMcuServers] = React.useState([]);

  React.useEffect(() => {
    async function getData() {
      // const headersObject = {
      //   "Content-Type": "application/json",
      //   authorization: "Bearer " + auth.token,
      // };
      try {
        const responseObj = {
          method: "get",
          url: `http://59.26.51.139:5555/api/v1/servers`,
          // headers: headersObject,
          // cancelToken: source.token,
        };

        const response = await axios(responseObj);

        if (response.data.status === "success") {
          setMcuServers(response.data.servers);

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
  }, [resetServers]);

  function resetUseEffect() {
    setResetServers(!resetServers);
  }

  async function confirmServerDelete() {
    try {
      const response = await axios.delete(
        `http://59.26.51.139:5555/api/v1/servers/${serverDeletionCandiate}`
      );
      setConfirmDialogState({
        ...confirmDialogState,
        open: false,
      });
      console.log(response);

      // const response = await axios({
      //   method: "delete",
      //   url: `http://59.26.51.139:5555/api/v1/patients/updateDay`,
      //   data: requestObject,
      //   headers: headersObject,
      // });
      if (response.status === 204) {
        console.log("success block");
        resetUseEffect();
      }
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <>
      <Grid item container style={{ marginBottom: "30px" }} justify="flex-end">
        <Grid item>
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              setMcuDialogState(true);
            }}
            startIcon={<AddToQueueIcon />}
          >
            register server
          </Button>
        </Grid>
      </Grid>
      <McuRegisterDialog
        open={mcuDialogState}
        resetUseEffect={resetUseEffect}
        handleClose={() => {
          setMcuDialogState(false);
        }}
      />
      <McuTable
        columns={tableHeaders}
        rows={mcuServers}
        setDeletionCandidate={setServerDeletionCandiate}
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
        handleConfirm={confirmServerDelete}
      />
    </>
  );
}

export default McuManagement;
