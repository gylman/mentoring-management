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

export default function CustomizedTables({ data, headers, updateServerName }) {
  // {data:dummyData, to: '/hhhh'}
  //const { data } = props;
  //const data = props.data;
  const classes = useStyles();
  const [editCellID, setEditCellID] = React.useState("");
  const [cellInput, setCellInput] = React.useState("");

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="customized table">
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
            <StyledTableRow key={item.id}>
              {editCellID === item.id ? (
                <StyledTableCell align="left" scope="row">
                  <form
                    onSubmit={(event) => {
                      event.preventDefault();
                      updateServerName(editCellID, cellInput);
                      setEditCellID("");
                    }}
                  >
                    <Input
                      id="rename-input"
                      // type={values.showPassword ? "text" : "password"}
                      value={cellInput}
                      onChange={(event) => setCellInput(event.target.value)}
                      autoFocus
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={() => {
                              updateServerName(editCellID, cellInput);
                              setEditCellID("");
                            }}
                            // onMouseDown={handleMouseDownPassword}
                          >
                            <CheckIcon />
                          </IconButton>
                        </InputAdornment>
                      }
                    />
                  </form>
                </StyledTableCell>
              ) : (
                <StyledTableCell
                  onDoubleClick={() => {
                    setEditCellID(item.id);
                    setCellInput(item.serverName);
                  }}
                  component="th"
                  align="left"
                  scope="row"
                >
                  <Tooltip title="Double click to update" placement="right">
                    <span>{item.serverName}</span>
                  </Tooltip>
                </StyledTableCell>
              )}

              <StyledTableCell align="left">
                <Link to={`server-details/${item.serverID}`}>
                  {item.serverID}
                </Link>
              </StyledTableCell>
              <StyledTableCell align="left">{item.numOfUsers}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
