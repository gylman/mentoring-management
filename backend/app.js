const express = require("express");
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/userRoutes");
const studentsRoutes = require("./routes/studentsRoutes");
const app = express();

app.use(express.json({ limit: "10kb" }));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept,authorization "
  );
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE");
  next();
});

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/students", studentsRoutes);

module.exports = app;
