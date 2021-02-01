import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import cuid from "cuid";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";

import { IconButton, Input, InputAdornment, Tooltip } from "@material-ui/core";
import CheckIcon from "@material-ui/icons/Check";
import { Link } from "react-router-dom";

const useStyles = makeStyles({
  root: {
    width: "100%",
  },
  container: {
    maxHeight: 440,
  },
});

export default function McuTable({
  columns,
  rows,
  setDeletionCandidate,
  handleDeleteDialog,
  setServerDeletionCandiateName,
  updateServerName,
  setConfirmDialogState,
  confirmDialogState,
}) {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [editCellID, setEditCellID] = React.useState("");
  const [cellInput, setCellInput] = React.useState("");

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper className={classes.root}>
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={cuid()}
                  align="left"
                  // style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                    {editCellID === row.id ? (
                      <TableCell align="left" scope="row">
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
                            onChange={(event) =>
                              setCellInput(event.target.value)
                            }
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
                      </TableCell>
                    ) : (
                      <TableCell
                        onDoubleClick={() => {
                          setEditCellID(row.id);
                          setCellInput(row.serverName);
                        }}
                        component="th"
                        align="left"
                        scope="row"
                      >
                        <Tooltip
                          title="Double click to update"
                          placement="right"
                        >
                          <span>{row.serverName}</span>
                        </Tooltip>
                      </TableCell>
                    )}

                    <TableCell align="left">
                      <Link to={`server-details/${row.serverID}`}>
                        {row.serverID}
                      </Link>
                    </TableCell>
                    <TableCell align="left">{row.numOfUsers}</TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
