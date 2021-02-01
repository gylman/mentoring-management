import cuid from "cuid";
import React from "react";
import MonthlyStatisticsTable from "./MonthlyStatisticsTable";
import { Grid, TextField, Typography } from "@material-ui/core";
import { useParams } from "react-router-dom";

function MonthlyStatistics() {
  const params = useParams();

  const [dummyData, setDummyData] = React.useState([
    {
      date: "10-06-2020 16:00",
      usage: "34",
      id: cuid(),
    },
    {
      date: "10-06-2020 16:00",
      usage: "34",
      id: cuid(),
    },
  ]);

  const tableHeaders = [
    { label: "Date", extractor: "date" },
    { label: "Usage in mins", extractor: "usage" },
  ];

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
          <TextField
            id="datetime-local"
            type="datetime-local"
            defaultValue="2017-05-24T10:30"
            //   className={classes.textField}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Grid>
      </Grid>
      <Grid item container style={{ margin: "10px" }} alignItems="center">
        <Grid style={{ marginRight: "10px" }} item>
          <Typography variant="p">Sum:</Typography>
        </Grid>
        <Grid>
          <TextField id="datetime-local" defaultValue="34 hours" />
        </Grid>
      </Grid>
      <MonthlyStatisticsTable rows={dummyData} columns={tableHeaders} />
    </Grid>
  );
}

export default MonthlyStatistics;
