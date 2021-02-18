import React from "react";
import axios from "axios";
import StatisticsTable from "./StatisticsTable";
import { CircularProgress, Grid } from "@material-ui/core";
import { AuthContext } from "../../context/authContext";

function Statistics() {
  const auth = React.useContext(AuthContext);
  const [users, setUsers] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  const tableHeaders = [
    { label: "User ID", extractor: "userId" },
    { label: "Daily Statistics", extractor: "daily-statistics" },
    { label: "Monthly Statistics", extractor: "monthly-statistics" },
  ];

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
    <div>
      <Grid item>
        <h1>Statistics</h1>
      </Grid>
      <StatisticsTable rows={users} columns={tableHeaders} />
    </div>
  );
}

export default Statistics;
