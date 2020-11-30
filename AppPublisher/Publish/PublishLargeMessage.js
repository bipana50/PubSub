module.exports = function publishLargeMessage() {
  const amqp = require("amqplib/callback_api");
  const CONN_URL = require("../config.json").rabbitConnectUrl;
  const queue = require("../config.json").queueName;

  const phrases = [
    "Welcome to the Random Phrase and Idiom Generator. There will be times when you may need more than a random word for what you want to accomplish, and this free online tool can help. The use of this tool is quite simple. All you need to do is indicate the number of random phrases you'd like to be displayed and then hit the Generate Random Phrases button. Once done, your chosen number of idioms will be displayed along with the meaning of the idiom.",
    "Idioms are a wonderful part of the English language that gives it a lot of flavor. They force people to know more than the literal meaning of words. Idioms are commonly used phrases that have a meaning completely different than their literal meaning. This can be quite confusing to those who aren't familiar with the idiom and those who are studying English.",
    "Using this tool can be excellent practice for students studying English as a second language because it gives the literal meaning of each phrase. This allows you to see the phrase and its meaning at the same time. While there are long idiom lists available online, trying to navigate through them on a single page can be daunting.",
    "Being able to create the exact number of random idioms which best suits your learning needs is a advantage this tool has over standard phrase list. In this way, this tool provides an excellent way for those learning English to practice their knowledge of English idioms and to learn new ones in the process.",
    "Some people may want to use this tool much like they do a new random daily word. Each day you generate a random idiom and the goal is to use it in a conversation at some point during the day. This can be a bit more difficult than using a daily random word, but the benefit is this challenge can greatly expand the vocabulary and the understanding of idioms. It's an especially useful challenge for those learning English.",
    "The above are a few ways the Random Phrase Generator can be used. However you decide to use this tool, it's always our goal to make the tools we create as useful as possible for those who use them. If you have ideas on how we could make this tool more beneficial to all who use it, please contact us with your idea(s). We'd love to hear them.",
    "A phrase is a short selection of words which when put together create a concept. There are eight types of phrases. These include noun phrases, verb phrases, gerund phrases, infinitive phrases, appositive phrases, participial phrases, prepositional phrases, and absolute phrases.",
  ];

  //function to generate random messages to be published
  function randomMessageGenerator() {
    let randomNum = Math.floor(Math.random() * phrases.length);
    let phrase = phrases[randomNum];
    let msgObj = {
      msgValue: phrase,
      timestamp: Date.now(),
      priority: Math.floor(Math.random() * 10) + 1,
    };
    return JSON.stringify(msgObj);
  }

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

      //send 20 random messages
      for (let i = 0; i < 20; i++) {
        let msg = randomMessageGenerator();

        channel.sendToQueue(queue, Buffer.from(msg), {
          persistent: true,
          priority: parseInt(JSON.parse(msg).priority), //set priority property
        });
      }

      //close the connection regularly
      setTimeout(function () {
        connection.close();
      }, 1000);
    });
  });
};
