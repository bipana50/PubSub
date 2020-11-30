module.exports = function publishMessage(msg) {
  const amqp = require("amqplib/callback_api");
  const CONN_URL = require("../config.json").rabbitConnectUrl;
  const queue = require("../config.json").queueName;

  //connect to rabbit messaging queue
  amqp.connect(CONN_URL, function (error, connection) {
    if (error) {
      throw error;
    }

    connection.createChannel(function (error1, channel) {
      if (error1) {
        throw error1;
      }

      channel.assertQueue(queue, {
        durable: true,
        maxPriority: 10, //priority cannot be greater than 10
      });

      channel.sendToQueue(queue, Buffer.from(msg), {
        persistent: true,
        priority: parseInt(JSON.parse(msg).priority), //set priority property
      });

      //close the connection regularly
      setTimeout(function () {
        connection.close();
      }, 1000);
    });
  });
};
