const socket = io(); //get socket.io client
let interval; //for setInterval

//when send button is clicked
document
  .querySelector(".message-form-button")
  .addEventListener("click", (e) => {
    e.preventDefault();

    //create an object with user's input
    let msgObj = {
      msgValue: document.querySelector(".message-input").value,
      timestamp: Date.now(),
      priority: document.querySelector("#priority").value,
    };

    //trigger event to pass to the server with message
    socket.emit("publish-message", JSON.stringify(msgObj));

    //rest the input and select fields
    document.querySelector(".message-input").value = "";
    document.querySelector("#priority").value = "1";
  });

//when send random messages button is clicked
document
  .querySelector(".message-random-button")
  .addEventListener("click", (e) => {
    e.preventDefault();
    //run every 1 second
    interval = setInterval(emitEvent, 1000);

    //disable send random messages button
    document.querySelector(".message-random-button").disabled = true;
  });

//when stop sending random messages button is clicked
document
  .querySelector(".stop-message-button")
  .addEventListener("click", (e) => {
    e.preventDefault();

    //check if setInterval is active
    if (interval) {
      clearInterval(interval);

      //enable send random messages button
      document.querySelector(".message-random-button").disabled = false;
    }
  });

//trigger server with event
function emitEvent() {
  socket.emit("publish-large-message", "message-sent");
}
