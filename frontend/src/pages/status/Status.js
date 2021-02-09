import React from "react";
import cuid from "cuid";
import axios from "axios";
import StatusTable from "./StatusTable";
import AddToQueueIcon from "@material-ui/icons/AddToQueue";
import { Button, CircularProgress, Grid } from "@material-ui/core";
import McuRegisterDialog from "../../components/dialogs/McuRegisterDialog";
import { AuthContext } from "../../context/authContext";

function Status() {
  const [mcuDialogState, setMcuDialogState] = React.useState(false);
  const [refreshState, setRefreshState] = React.useState(false);
  const [loading, setLoading] = React.useState(true);

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

  function updateServerName(id, newServerName) {
    // const updatedDummyData = dummyData.map((item) => {
    //   if (item.id === id) {
    //     return {
    //       ...item,
    //       serverName: newServerName,
    //     };
    //   } else {
    //     return item;
    //   }
    // });
    // setDummyData(updatedDummyData);
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
      />
      <McuRegisterDialog
        open={mcuDialogState}
        resetUseEffect={resetUseEffect}
        handleClose={() => {
          setMcuDialogState(false);
        }}
      />
    </>
  );
}

export default Status;
