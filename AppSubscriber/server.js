const express = require("express");
const socket = require("socket.io");
const consumeMessage = require("./Subscribe/Consumer");

// App setup
const PORT = 5000;
const app = express();
const server = app.listen(PORT, function () {
  console.log(`Listening on port ${PORT}`);
});

// Static files
app.use(express.static("public"));

// Socket setup
const io = socket(server);

//when socket.io is connected
io.on("connection", function (socket) {
  console.log("Made socket connection");
});

//subscribe message
consumeMessage(io);
