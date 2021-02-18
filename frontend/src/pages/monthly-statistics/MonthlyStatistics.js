import moment from "moment";
import React from "react";
import axios from "axios";
import MonthlyStatisticsTable from "./MonthlyStatisticsTable";
import DateFnsUtils from "@date-io/date-fns";
import { CircularProgress, Grid, Typography } from "@material-ui/core";
import { useParams } from "react-router-dom";
import { AuthContext } from "../../context/authContext";
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";

function MonthlyStatistics() {
  const params = useParams();
  const auth = React.useContext(AuthContext);
  const [loading, setLoading] = React.useState(true);
  const [sumOfUsedTime, setSumOfUsedTime] = React.useState("");
  const [days, setDays] = React.useState([]);
  const [date, setDate] = React.useState(new Date());
  const tableHeaders = [
    { label: "Date", extractor: "day" },
    { label: "Usage in mins", extractor: "spentTime" },
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
          url: `http://59.26.51.139:5555/api/v1/entrances/monthly/${params.userId}`,
          headers: headersObject,
          params: {
            date: moment(new Date(date)).format("YYYY-MM-DD"),
          },
          // cancelToken: source.token,
        };

        const response = await axios(responseObj);
        if (response.data.status === "success") {
          const dayObj = {};
          response.data.entrances.forEach((entrance) => {
            if (!dayObj[`${moment(entrance.startTime).format("L")}`]) {
              dayObj[`${moment(entrance.startTime).format("L")}`] =
                new Date(entrance.startTime) - new Date(entrance.endTime);
            } else {
              dayObj[`${moment(entrance.startTime).format("L")}`] =
                dayObj[`${moment(entrance.startTime).format("L")}`] +
                (new Date(entrance.startTime) - new Date(entrance.endTime));
            }
          });

          setLoading(false);
          const days = [];

          Object.keys(dayObj).forEach((key) => {
            days.push({ day: key, spentTime: dayObj[key] });
          });
          setDays(days);

          const tempTime = moment.duration(
            -1 *
              days.reduce((total, day) => {
                return day.spentTime + total;
              }, 0),
            "milliseconds"
          );
          let hours = Math.floor(tempTime.asHours());
          let mins = Math.floor(tempTime.asMinutes()) - hours * 60;

          setSumOfUsedTime(hours + " h " + mins + " m");
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
        <Typography variant="h5">Monthly Statistics</Typography>
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
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <DatePicker
              variant="inline"
              openTo="year"
              views={["year", "month"]}
              value={date}
              onChange={setDate}
              autoOk={true}
            />
          </MuiPickersUtilsProvider>
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
      <MonthlyStatisticsTable
        rows={days}
        columns={tableHeaders}
        userId={params.userId}
      />
    </Grid>
  );
}

export default MonthlyStatistics;
