import { Table } from "@material-ui/core";
import React from "react";
import cuid from "cuid";
import CustomizedTables from "../components/Table";

function Status() {
  const [dummyData, setDummyData] = React.useState([
    { serverName: "CUOP1", serverID: "592651139", numOfUsers: 1, id: cuid() },
    { serverName: "CUOP2", serverID: "592651138", numOfUsers: 1, id: cuid() },
    { serverName: "CUOP3", serverID: "592651137", numOfUsers: 1, id: cuid() },
    { serverName: "CUOP4", serverID: "592651136", numOfUsers: 1, id: cuid() },
    { serverName: "CUOP5", serverID: "592651135", numOfUsers: 1, id: cuid() },
    { serverName: "CUOP6", serverID: "592651134", numOfUsers: 1, id: cuid() },
  ]);

  function updateServerName(id, newServerName) {
    const updatedDummyData = dummyData.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          serverName: newServerName,
        };
      } else {
        return item;
      }
    });

    setDummyData(updatedDummyData);
  }
  const tableHeaders = [
    { columnHeader: "MCU name" },
    { columnHeader: "ID" },
    { columnHeader: "Number of users" },
  ];

  return (
    <CustomizedTables
      data={dummyData}
      headers={tableHeaders}
      updateServerName={updateServerName}
    />
  );
}

// {data:dummyData, to: '/hhhh'}

export default Status;
