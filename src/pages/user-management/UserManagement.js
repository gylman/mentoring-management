import React from "react";
import cuid from "cuid";
import UsersTable from "./UsersTable";

function UserManagement() {
  const [dummyData, setDummyData] = React.useState([
    {
      personalId: "59ad5139sa",
      name: "John Park",
      type: "teacher",
      subjectName: "English",
      contactInfo: "010-1234-5678",
    },
    {
      personalId: "59as5152sa",
      name: "July Park",
      type: "business-manager",
      subjectName: "Math",
      contactInfo: "010-1234-5678",
    },
    {
      personalId: "5ass5152sa",
      name: "Jonas Kim",
      type: "business-manager",
      subjectName: "Math",
      contactInfo: "010-1234-5678",
    },
  ]);

  const tableHeaders = [
    { columnHeader: "Personal ID" },
    { columnHeader: "Name" },
    { columnHeader: "Type" },
    { columnHeader: "Subject Name" },
    { columnHeader: "Contact Info" },
    { columnHeader: "Delete" },
  ];
  return (
    <div>
      <UsersTable headers={tableHeaders} data={dummyData} />
    </div>
  );
}

export default UserManagement;
