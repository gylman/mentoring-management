import React from "react";
import cuid from "cuid";
import axios from "axios";
import StatisticsTable from "./StatisticsTable";
import { Grid, Typography } from "@material-ui/core";
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
          params: {
            status:
              auth.status === "instructor"
                ? "student"
                : "student and instructor",
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
  }, [auth.token]);

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
