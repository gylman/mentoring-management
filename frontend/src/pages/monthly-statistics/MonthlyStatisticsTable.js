import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import cuid from "cuid";
import moment from "moment";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";

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

export default function MonthlyStatisticsTable({ columns, rows, userId }) {
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
                  <TableRow hover role="checkbox" tabIndex={-1} key={cuid()}>
                    {columns.map((column) => {
                      const value = row[column.extractor];
                      return column.extractor === "daily-statistics" ? (
                        <TableCell>
                          <Link to={`/daily-statistics//${row["id"]}`}>
                            Daily Statistics
                          </Link>
                        </TableCell>
                      ) : column.extractor === "day" ? (
                        <TableCell>
                          <Link
                            to={`/daily-statistics/${userId}/${moment(
                              value
                            ).format("LL")}`}
                            className={classes.link}
                          >
                            {value}
                          </Link>
                        </TableCell>
                      ) : (
                        <TableCell key={column.id} align="left">
                          {`${Math.floor(
                            moment.duration(-1 * value).asHours()
                          )} hours ${
                            Math.floor(
                              moment.duration(-1 * value).asMinutes()
                            ) -
                            Math.floor(moment.duration(-1 * value).asHours()) *
                              60
                          } mins`}
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
