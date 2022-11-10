import React, { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";

const columns = [
  { field: "username", headerName: "Player", width: 200 },
  { field: "score", headerName: "Score", width: 120 }
];

export default function Scores() {
  const [data, setData] = useState([
    {
      id: 1,
      username: "Admin",
      score: "Win"
    },
    {
      id: 2,
      username: "Admin",
      score: "Lose"
    },
    {
      id: 1,
      username: "Admin",
      score: "Win"
    },
    {
      id: 1,
      username: "Admin",
      score: "Win"
    }
  ]);

  return (
    <div style={{ height: "500px", width: "100%" }}>
      <DataGrid rows={data} columns={columns} />
    </div>
  );
}
