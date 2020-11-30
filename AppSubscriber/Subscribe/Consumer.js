module.exports = function consumeMessage(io) {
  const amqp = require("amqplib/callback_api");
  const CONN_URL = require("../config.json").rabbitConnectUrl;
  const queue = require("../config.json").queueName;

  //connect to rabbit messaging queue
  amqp.connect(CONN_URL, function (error, connection) {
    if (error) {
      throw error0;
    }

    connection.createChannel(function (error1, channel) {
      if (error1) {
        throw error1;
      }

      channel.assertQueue(queue, {
        durable: true,
        maxPriority: 10, //priority cannot be greater than 10
      });

      channel.prefetch(1);

      channel.consume(queue, function (msg) {
        const { msgValue } = JSON.parse(msg.content.toString()); //get message
        const priority = msg.properties.priority; //get priority property

        //check priority
        if (priority >= 7) {
          //send event to client with message to display
          io.emit("send-message", msgValue);
        }

        setTimeout(function () {
          channel.ack(msg); //acknowledgement
        }, 1000);
      });
    });
  });
};
