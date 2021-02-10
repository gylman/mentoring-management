import React from "react";
import ServerDetailsTable from "./ServerDetailsTable";
import axios from "axios";
import { AuthContext } from "../../context/authContext";
import { useParams } from "react-router-dom";
import { CircularProgress, Grid } from "@material-ui/core";

function ServerDetails() {
  const auth = React.useContext(AuthContext);
  const tableHeaders = [
    { label: "Room ID", extractor: "roomId", align: "left" },
    { label: "Start time", extractor: "startTime", align: "center" },
    { label: "Number of users", extractor: "status", align: "center" },
  ];
  const params = useParams();
  const [loading, setLoading] = React.useState(true);
  const [rooms, setRooms] = React.useState([]);

  React.useEffect(() => {
    async function getData() {
      const headersObject = {
        "Content-Type": "application/json",
        authorization: "Bearer " + auth.token,
      };
      try {
        const axiosObj = {
          method: "get",
          url: `http://59.26.51.139:5555/api/v1/rooms/${params.serverId}`,
          headers: headersObject,
          // cancelToken: source.token,
        };

        const response = await axios(axiosObj);

        if (response.data.status === "success") {
          setRooms(response.data.rooms);

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
  }, [auth.token]);

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
      <h1>MCU details</h1>
      <ServerDetailsTable rows={rooms} columns={tableHeaders} />
    </>
  );
}

export default ServerDetails;
