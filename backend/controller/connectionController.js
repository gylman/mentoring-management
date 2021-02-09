const crypto = require("crypto");
const Server = require("../models/ServerModel");
const Entrance = require("../models/EntranceModel");
const Room = require("../models/RoomModel");
const User = require("../models/UserModel");

exports.createConnection = async function (req, res) {
  const server = await Server.findOne({ serverId: req.body.mcuid });
  const room = await Room.findOne({ roomId: req.body.roomid });
  const user = await User.findOne({ userId: req.body.userid });

  let newServer;
  let newRoom;
  let newEntrance;

  if (!room) {
    console.log("====================================");
    console.log("room in if");
    console.log("====================================");
    newRoom = await Room.create({
      roomId: req.body.roomid,
      users: [req.body.userid],
      mcuId: req.body.mcuid,
      startTime: new Date(req.body.time),
    });

    newEntrance = await Entrance.create({
      roomId: req.body.roomid,
      mcuId: req.body.mcuid,
      startTime: new Date(req.body.time),
      endTime: null,
      userId: req.body.userid,
    });
  }

  if (!server) {
    newServer = await Server.create({
      serverId: req.body.mcuid,
      serverName: `server-${Math.floor(Math.random() * 10000)}`,
      numOfUsers: 1,
    });
  }

  if (Number(req.body.type) === 1) {
    if (newServer) {
      newServer.rooms.push({ roomId: req.body.roomid });
      await newServer.save();
    }

    if (!newServer) {
      server.numOfUsers = server.numOfUsers + 1;
      const serverIds = server.rooms.map((room) => room.roomId);
      if (!serverIds.includes(req.body.roomid)) {
        server.rooms.push({ roomId: req.body.roomid });
      }
      await server.save();
    }

    if (room) {
      room.users.push(req.body.userid);
      await room.save();

      newEntrance = await Entrance.create({
        roomId: req.body.roomid,
        mcuId: req.body.mcuid,
        startTime: new Date(req.body.time),
        endTime: null,
        userId: req.body.userid,
      });
    }
  }

  if (Number(req.body.type) === 0) {
    // room.users.push(req.body.userid);
    if (room.users.length > 1) {
      console.log("====================================");
      console.log("if");
      console.log("====================================");
      const newUsers = room.users.filter(
        (userid) => userid !== req.body.userid
      );
      room.users = newUsers;
      await room.save();

      server.numOfUsers = server.numOfUsers - 1;
      await server.save();

      const userEntrance = await Entrance.findOne({
        userId: req.body.userid,
        endTime: null,
      });

      userEntrance.endTime = new Date(req.body.time);

      await userEntrance.save();
    } else {
      console.log("====================================");
      console.log("else");
      console.log("====================================");
      await Room.deleteOne({ roomId: req.body.roomid });
      const newRooms = server.rooms.filter(
        (roomObj) => roomObj.roomid !== req.body.roomId
      );
      server.rooms = newRooms;
      server.numOfUsers = server.numOfUsers - 1;
      await server.save();

      const userEntrance = await Entrance.findOne({
        userId: req.body.userid,
        endTime: null,
      });

      userEntrance.endTime = new Date(req.body.time);

      await userEntrance.save();
    }
  }

  res.status(200).json({
    status: "success",
  });
};
