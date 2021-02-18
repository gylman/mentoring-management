import moment from "moment";
import axios from "axios";
import React from "react";
import DailyStatisticsTable from "./DailyStatisticsTable";
import {
  CircularProgress,
  Grid,
  TextField,
  Typography,
} from "@material-ui/core";
import { useParams } from "react-router-dom";
import { AuthContext } from "../../context/authContext";

function DailyStatistics() {
  const params = useParams();
  const auth = React.useContext(AuthContext);

  const [entrances, setEntrances] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [sumOfUsedTime, setSumOfUsedTime] = React.useState("");
  const [date, setDate] = React.useState(
    params.dateForStatistics
      ? moment(new Date(params.dateForStatistics)).format("YYYY-MM-DD")
      : moment(new Date(Date.now() - 86400000)).format("YYYY-MM-DD")
  );

  const tableHeaders = [
    { label: "Start Time", extractor: "startTime" },
    { label: "End Time", extractor: "endTime" },
    { label: "MCU ID", extractor: "mcuId" },
    { label: "Room ID", extractor: "roomId" },
  ];
  console.log("====================================");
  console.log(sumOfUsedTime);
  console.log("====================================");

  React.useEffect(() => {
    async function getData() {
      const headersObject = {
        "Content-Type": "application/json",
        authorization: "Bearer " + auth.token,
      };
      try {
        const responseObj = {
          method: "get",
          url: `http://59.26.51.139:5555/api/v1/entrances/${params.userId}`,
          headers: headersObject,
          params: {
            date,
          },
          // cancelToken: source.token,
        };

        const response = await axios(responseObj);

        if (response.data.status === "success") {
          setEntrances(response.data.entrances);

          setLoading(false);

          const tempTime = moment.duration(
            -1 *
              response.data.entrances
                .map((day) => {
                  return new Date(day.startTime) - new Date(day.endTime);
                })
                .reduce((all, time) => {
                  return all + time;
                }, 0),
            "milliseconds"
          );
          let hours = Math.floor(tempTime.asHours());
          let mins = Math.floor(tempTime.asMinutes()) - hours * 60;

          setSumOfUsedTime(hours + " h " + mins + " m");
        }
      } catch (error) {
        setLoading(false);
        console.log(error);
      }
    }

    getData();
  }, [auth.token, date, params.userId]);

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
    <Grid container>
      <Grid item container style={{ margin: "10px" }}>
        <Typography variant="h5">DailyStatistics</Typography>
      </Grid>
      <Grid item container style={{ margin: "10px" }}>
        <Typography style={{ marginRight: "10px" }} variant="p">
          User ID:
        </Typography>
        <Typography variant="p">{params.userId}</Typography>
      </Grid>
      <Grid item container style={{ margin: "10px" }} alignItems="center">
        <Grid style={{ marginRight: "10px" }} item>
          <Typography variant="p">Date:</Typography>
        </Grid>

        <Grid>
          <TextField
            id="datetime-local"
            type="date"
            InputLabelProps={{
              shrink: true,
            }}
            value={date}
            onChange={(event) => setDate(event.target.value)}
          />
        </Grid>
      </Grid>
      <Grid item container style={{ margin: "10px" }} alignItems="center">
        <Grid style={{ marginRight: "10px" }} item>
          <Typography variant="p">Sum:</Typography>
        </Grid>

        <Grid>
          <Typography variant="p">{sumOfUsedTime}</Typography>
        </Grid>
      </Grid>
      <DailyStatisticsTable rows={entrances} columns={tableHeaders} />
    </Grid>
  );
}

export default DailyStatistics;
