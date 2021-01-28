const crypto = require("crypto");
const Server = require("../models/ServerModel");

exports.getServers = async function (req, res) {
  const servers = await Server.find({});

  res.status(200).json({
    status: "success",
    servers: servers,
  });
};

exports.createServer = async function (req, res) {
  const server = await Server.create({ ip: req.body.ip, name: req.body.name });

  res.status(200).json({
    status: "success",
    server: server,
  });
};

exports.deleteServer = async function (req, res) {
  try {
    await Server.findByIdAndDelete(req.params.serverDbId);
  } catch (error) {
    console.log(error);
  }

  res.status(204).json({
    status: "success",
    server: null,
  });
};
