import { React, useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

function createData(id, calories, fat, carbs, protein) {
  return { id, calories, fat, carbs, protein };
}

export default function DataTable({ facts }) {
  const [rows, setRows] = useState([]);
  const parse_data = (facts) => {
    var rows_dict = {};
    var in_rows = [];
    for (var i = 0; i < facts.length; i++) {
      rows_dict[facts[i].soldier_serial_id] = [0, 0, 0, 0];
    }
    for (var j = 0; j < facts.length; j++) {
      rows_dict[facts[j].soldier_serial_id][facts[j].question_id - 1] = 1;
    }

    for (const [key, value] of Object.entries(rows_dict)) {
      in_rows.push(createData(key, value[0], value[1], value[2], value[3]));
    }
    return in_rows;
  };
  return (
    <TableContainer component={Paper}>
      {setRows(parse_data(facts))}
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>id</TableCell>
            <TableCell align="right">one</TableCell>
            <TableCell align="right">two</TableCell>
            <TableCell align="right">three</TableCell>
            <TableCell align="right">four</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.id}
              </TableCell>
              <TableCell align="right">{row.one}</TableCell>
              <TableCell align="right">{row.two}</TableCell>
              <TableCell align="right">{row.three}</TableCell>
              <TableCell align="right">{row.four}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
