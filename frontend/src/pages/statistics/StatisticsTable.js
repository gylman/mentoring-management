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

export default function StatisticsTable({ columns, rows }) {
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
                <TableCell key={cuid()} align="left">
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
                        <TableCell key={cuid()}>
                          <Link
                            to={`/daily-statistics/${row["userId"]}`}
                            className={classes.link}
                          >
                            Daily Statistics
                          </Link>
                        </TableCell>
                      ) : column.extractor === "monthly-statistics" ? (
                        <TableCell key={cuid()}>
                          <Link
                            to={`/monthly-statistics/${row["userId"]}`}
                            className={classes.link}
                          >
                            Monthly Statistics
                          </Link>
                        </TableCell>
                      ) : (
                        <TableCell align="left" key={cuid()}>
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
