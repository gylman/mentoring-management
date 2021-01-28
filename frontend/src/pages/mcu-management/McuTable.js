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
import IconButton from "@material-ui/core/IconButton";

import DeleteIcon from "@material-ui/icons/Delete";

function createData(name, code, population, size) {
  const density = population / size;
  return { name, code, population, size, density };
}

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
  setConfirmDialogState,
  confirmDialogState,
}) {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

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
                    {columns.map((column) => {
                      const value = row[column.extractor];
                      return column.extractor === "delete" ? (
                        <TableCell>
                          <IconButton
                            aria-label="delete"
                            style={{ width: "20px", height: "20px" }}
                            onClick={() => {
                              setDeletionCandidate(row["_id"]);
                              // setServerDeletionCandiateName(row["name"]);
                              setConfirmDialogState({
                                ...confirmDialogState,
                                open: true,
                                description: `Are you sure that you want to delete the server named "${row["name"]}"?`,
                              });
                            }}
                          >
                            <DeleteIcon
                              style={{ width: "20px", height: "20px" }}
                            />
                          </IconButton>
                        </TableCell>
                      ) : (
                        <TableCell key={column.id} align="left">
                          {value}
                        </TableCell>
                      );
                    })}
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
