import React from "react";
import cuid from "cuid";
import StatisticsTable from "./StatisticsTable";
import { Typography } from "@material-ui/core";

function Statistics() {
  const [dummyData, setDummyData] = React.useState([
    { userId: "2g45fwer2", id: cuid() },
  ]);

  const tableHeaders = [
    { label: "User ID", extractor: "userId" },
    { label: "Daily Statistics", extractor: "daily-statistics" },
    { label: "Monthly Statistics", extractor: "monthly-statistics" },
  ];

  return (
    <div>
      <Typography>Statistics</Typography>
      <StatisticsTable rows={dummyData} columns={tableHeaders} />
    </div>
  );
}

export default Statistics;
