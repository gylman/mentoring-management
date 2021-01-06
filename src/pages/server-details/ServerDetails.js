import React from "react";
import ServerDetailsTable from "./ServerDetailsTable";
import cuid from "cuid";

function ServerDetails() {
  const tableHeaders = [
    { columnHeader: "Room ID" },
    { columnHeader: "Start time" },
    { columnHeader: "Number of users" },
  ];

  const [dummyData, setDummyData] = React.useState([
    { roomID: "592", startTime: "592651139", numOfUsers: 1, id: cuid() },
    { roomID: "592", startTime: "592651138", numOfUsers: 1, id: cuid() },
    { roomID: "592", startTime: "592651137", numOfUsers: 1, id: cuid() },
    { roomID: "592", startTime: "592651136", numOfUsers: 1, id: cuid() },
    { roomID: "592", startTime: "592651135", numOfUsers: 1, id: cuid() },
    { roomID: "592", startTime: "592651134", numOfUsers: 1, id: cuid() },
  ]);

  return (
    <>
      <h1>MCU details</h1>
      <ServerDetailsTable data={dummyData} headers={tableHeaders} />;
    </>
  );
}

export default ServerDetails;
