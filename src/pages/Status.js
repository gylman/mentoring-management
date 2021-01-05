import { Table } from "@material-ui/core";
import React from "react";
import CustomizedTables from "../components/Table";

function Status() {
  const dummyData = [
    { serverName: "CUOP1", serverID: "592651139", numOfUsers: 1 },
    { serverName: "CUOP2", serverID: "592651138", numOfUsers: 1 },
    { serverName: "CUOP3", serverID: "592651137", numOfUsers: 1 },
    { serverName: "CUOP4", serverID: "592651136", numOfUsers: 1 },
    { serverName: "CUOP5", serverID: "592651135", numOfUsers: 1 },
    { serverName: "CUOP6", serverID: "592651134", numOfUsers: 1 },
  ];
  const tableHeaders = [
    { columnHeader: "MCU name" },
    { columnHeader: "ID" },
    { columnHeader: "Number of users" },
  ];

  return <CustomizedTables data={dummyData} headers={tableHeaders} />;
}

// {data:dummyData, to: '/hhhh'}

export default Status;
