1. Introduction to Publisher Subscriber architecture

Publish subscribe architecture is a message protocol where sender of the messages are called publisher. The publishers do not specify directly to whom the message to be sent which is to the subscribers. Event bus acts as a intermediary that collects all messages from the publisher and forward to subscribers based on their interest. Publishers send messages without any knowledge of the subscribers and subscribers receive messages without any knowledge of the publishers.

1. Introduction to Message Queue

Let’s start by defining message queues; how you can use a message queue and the benefits achieved when using message queues.

A queue is a line of things waiting to be handled — in sequential order starting at the beginning of the line. A message queue is a queue of messages sent between applications. It includes a sequence of work objects that are waiting to be processed.

A message is the data transported between the sender and the receiver application; it’s essentially a byte array with some headers on top. An example of a message could be an event. One application tells another application to start processing a specific task via the queue.

The basic architecture of a message queue is simple; there are client applications called producers that create messages and deliver them to the message queue. Another application, called a consumer, connects to the queue and gets the messages to be processed. Messages placed onto the queue are stored until the consumer retrieves them.
