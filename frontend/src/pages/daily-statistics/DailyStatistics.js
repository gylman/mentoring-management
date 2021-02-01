import cuid from "cuid";
import React from "react";
import DailyStatisticsTable from "./DailyStatisticsTable";
import { Grid, TextField, Typography } from "@material-ui/core";
import { useParams } from "react-router-dom";

function DailyStatistics() {
  const params = useParams();

  const [dummyData, setDummyData] = React.useState([
    {
      startTime: "10-06-2020 16:00",
      endTime: "10-06-2020 16:00",
      mcuId: "2g45fwer2",
      roomId: "2g45fwer2",
      id: cuid(),
    },
    {
      startTime: "10-06-2020 16:00",
      endTime: "10-06-2020 16:00",
      mcuId: "2gsgwer2",
      roomId: "2gf5fwer2",
      id: cuid(),
    },
  ]);

  const tableHeaders = [
    { label: "Start Time", extractor: "startTime" },
    { label: "End Time", extractor: "endTime" },
    { label: "MCU ID", extractor: "mcuId" },
    { label: "Room ID", extractor: "roomId" },
  ];

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
          {" "}
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
      <DailyStatisticsTable rows={dummyData} columns={tableHeaders} />
    </Grid>
  );
}

export default DailyStatistics;
