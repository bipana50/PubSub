const express = require("express");
const socket = require("socket.io");
const publishMessage = require("./Publish/Publisher");
const publishLargeMessage = require("./Publish/PublishLargeMessage");

// App setup
const PORT = 3000;
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
  //receive single message publish event from client
  socket.on("publish-message", (data) => {
    publishMessage(data);
  });

  //receive multiple message publish event from client
  socket.on("publish-large-message", (data) => {
    publishLargeMessage();
  });
});
