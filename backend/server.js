const dotenv = require("dotenv");
const mongoose = require("mongoose");
const app = require("./app");

dotenv.config({ path: "./config.env" });

const DB = process.env.DB_CONNECTION_LOCAL;

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log("connected to DB");
  });

const port = process.env.PORT || 3000;

app.listen(port, (req, res) => {
  console.log(req);
  console.log("Student manager app running");
});
