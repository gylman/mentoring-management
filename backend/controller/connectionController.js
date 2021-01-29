const crypto = require("crypto");

exports.createConnection = async function (req, res) {
  console.log("====================================");
  console.log(req);
  console.log(req.params);
  console.log(req.query);
  console.log("====================================");

  res.status(200).end();
};
