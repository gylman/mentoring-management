const express = require("express");
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/userRoutes");
const studentsRoutes = require("./routes/studentsRoutes");
const divisionRoutes = require("./routes/divisionRoutes");
const serverRoutes = require("./routes/serverRoutes");
const entrancesRoutes = require("./routes/entrancesRoutes");
const roomRoutes = require("./routes/roomRoutes");
const connectionsRoutes = require("./routes/connectionsRoutes");
const errorHandler = require("./controller/errorHandlerController");
const AppError = require("./utils/appError");
const bodyParser = require("body-parser");

const app = express();

app.use(express.json({ limit: "10kb" }));
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept,authorization "
  );
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE");
  next();
});
app.use("/", connectionsRoutes);
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/students", studentsRoutes);
app.use("/api/v1/divisions", divisionRoutes);
app.use("/api/v1/servers", serverRoutes);
app.use("/api/v1/rooms", roomRoutes);
app.use("/api/v1/entrances", entrancesRoutes);

app.all("*", (req, res, next) => {
  next(new AppError(`can not find ${req.originalUrl} route`, 404));
});

app.use(errorHandler);

module.exports = app;
