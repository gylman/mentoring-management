import React from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import cuid from "cuid";
import { IconButton, Input, InputAdornment, Tooltip } from "@material-ui/core";
import CheckIcon from "@material-ui/icons/Check";
import { Link } from "react-router-dom";
import DeleteIcon from "@material-ui/icons/Delete";

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});

export default function UsersTable({ data, headers, updateServerName }) {
  // {data:dummyData, to: '/hhhh'}
  //const { data } = props;
  //const data = props.data;

  const classes = useStyles();
  const [editCellID, setEditCellID] = React.useState("");
  const [cellInput, setCellInput] = React.useState("");

  return (
    <TableContainer component={Paper}>
      <Table
        className={classes.table}
        aria-label="customized table"
        size="small"
      >
        <TableHead>
          <TableRow>
            {headers.map((item) => {
              return (
                <StyledTableCell align="left" key={cuid()}>
                  {item.columnHeader}
                </StyledTableCell>
              );
            })}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((item) => (
            <StyledTableRow key={cuid()}>
              <StyledTableCell align="left">{item.personalId}</StyledTableCell>
              <StyledTableCell align="left">{item.name}</StyledTableCell>
              <StyledTableCell align="left">{item.type}</StyledTableCell>
              <StyledTableCell align="left">{item.subjectName}</StyledTableCell>
              <StyledTableCell align="left">{item.contactInfo}</StyledTableCell>
              <StyledTableCell align="left">
                <IconButton aria-label="delete">
                  <DeleteIcon />
                </IconButton>
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
