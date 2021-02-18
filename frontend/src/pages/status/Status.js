import React from "react";
import axios from "axios";
import StatusTable from "./StatusTable";
import AddToQueueIcon from "@material-ui/icons/AddToQueue";
import { Button, CircularProgress, Grid } from "@material-ui/core";
import McuRegisterDialog from "../../components/dialogs/McuRegisterDialog";
import SimpleConfirmDialog from "../../components/dialogs/SimpleConfirmDialog";
import { AuthContext } from "../../context/authContext";

function Status() {
  const [mcuDialogState, setMcuDialogState] = React.useState(false);
  const [refreshState, setRefreshState] = React.useState(false);
  const [loading, setLoading] = React.useState(true);
  const [deletionCandidate, setDeletionCandidate] = React.useState("");
  const [deletionCandidateName, setDeletionCandidateName] = React.useState("");
  const [confirmDialogState, setConfirmDialogState] = React.useState({
    open: false,
    title: "Server deletion",
    description: "Are you sure that you want to delete this user",
    confirm: "Confirm",
    cancel: "Cancel",
  });

  function resetUseEffect() {
    setRefreshState(!refreshState);
  }

  const auth = React.useContext(AuthContext);

  const [servers, setServers] = React.useState([]);

  React.useEffect(() => {
    async function getData() {
      const headersObject = {
        "Content-Type": "application/json",
        authorization: "Bearer " + auth.token,
      };
      try {
        const responseObj = {
          method: "get",
          url: `http://59.26.51.139:5555/api/v1/servers`,
          headers: headersObject,
          // cancelToken: source.token,
        };

        const response = await axios(responseObj);

        if (response.data.status === "success") {
          setServers(response.data.servers);
          setLoading(false);
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
  }, [auth.token, refreshState]);

  async function updateServerName(id, newServerName) {
    const headersObject = {
      "Content-Type": "application/json",
      authorization: "Bearer " + auth.token,
    };
    try {
      const response = await axios.post(
        `http://59.26.51.139:5555/api/v1/servers/update-server-name`,
        {
          serverName: newServerName,
          serverId: id,
        },
        { headers: headersObject }
      );

      if (response.data.status === "success") {
        resetUseEffect();
      }
    } catch (error) {
      // setOpenAlert(true);
      console.log(error);
    }
  }
  async function confirmServerDelete() {
    try {
      await axios.delete(
        `http://59.26.51.139:5555/api/v1/servers/${deletionCandidate}`
      );

      setConfirmDialogState({
        ...confirmDialogState,
        open: false,
      });

      resetUseEffect();
    } catch (error) {
      console.log(error);
    }
  }

  let tableHeaders;

  tableHeaders = [
    { label: "Server Name", extractor: "serverName", align: "left" },
    { label: "Server ID", extractor: "serverId", align: "center" },

    { label: "Number of users", extractor: "numOfUsers", align: "center" },
  ];
  if (auth.status === "administrator") {
    tableHeaders = [
      ...tableHeaders,
      { label: "Delete", extractor: "delete", align: "center" },
    ];
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
    <>
      <Grid container justify="space-between" alignItems="center">
        <Grid item>
          <h1>MCU list</h1>
        </Grid>
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

      <StatusTable
        rows={servers}
        columns={tableHeaders}
        updateServerName={updateServerName}
        deleteOption={auth.status === "administrator"}
        setDeletionCandidate={setDeletionCandidate}
        setConfirmDialogState={setConfirmDialogState}
        confirmDialogState={confirmDialogState}
        setDeletionCandidateName={setDeletionCandidateName}
      />
      <McuRegisterDialog
        open={mcuDialogState}
        resetUseEffect={resetUseEffect}
        handleClose={() => {
          setMcuDialogState(false);
        }}
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

export default Status;
