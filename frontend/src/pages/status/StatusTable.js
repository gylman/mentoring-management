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
import DeleteIcon from "@material-ui/icons/Delete";
import { Link } from "react-router-dom";

const useStyles = makeStyles({
  root: {
    width: "100%",
  },
  container: {
    maxHeight: 440,
  },
  link: {
    color: "rgb(0, 0, 238)",
    "&:hover": {
      color: "rgb(0, 0, 238)",
    },
    "&:visited": {
      color: "rgb(0, 0, 238)",
    },
  },
});

export default function McuTable({
  columns,
  rows,
  deleteOption,
  updateServerName,
  setDeletionCandidate,
  setConfirmDialogState,
  confirmDialogState,
  setDeletionCandidateName,
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
                <TableCell key={cuid()} align={column.align}>
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
                  <TableRow hover role="checkbox" tabIndex={-1} key={cuid()}>
                    {editCellID === row._id ? (
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
                          setEditCellID(row._id);
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

                    <TableCell align="center">
                      <Link
                        to={`server-details/${row.serverId}`}
                        className={classes.link}
                      >
                        {row.serverId}
                      </Link>
                    </TableCell>

                    <TableCell align="center">{row.numOfUsers}</TableCell>
                    {deleteOption && (
                      <TableCell align="center">
                        <IconButton
                          aria-label="delete"
                          style={{ width: "20px", height: "20px" }}
                          onClick={() => {
                            setDeletionCandidate(row["_id"]);
                            setDeletionCandidateName(row["serverName"]);
                            setConfirmDialogState({
                              ...confirmDialogState,
                              open: true,
                              description: `Are you sure that you want to delete the server named "${row["serverName"]}"?`,
                            });
                          }}
                        >
                          <DeleteIcon
                            style={{ width: "20px", height: "20px" }}
                          />
                        </IconButton>
                      </TableCell>
                    )}
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
