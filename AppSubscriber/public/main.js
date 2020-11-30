const socket = io(); //establish socket.io client

//on recieving event from server
socket.on("send-message", (message) => {
  //select ul element
  let ulElem = document.querySelector("div.show-message ul");
  //create "li" element node
  let item = ulElem.appendChild(document.createElement("li"));
  //append message
  item.textContent = message;
});
