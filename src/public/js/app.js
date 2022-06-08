/*Frontend */
const messageList = document.querySelector("ul");
const nickForm = document.querySelector("#nick");
const messageForm = document.querySelector("#message");
const socket = new WebSocket(`ws://${window.location.host}`);

//Before send String make an Object
function makeMessage(type,payload){
    const msg = {type,payload}
    return JSON.stringify(msg);
}
function handleOpen() {
    console.log("Connected to Server ✅");
}

socket.addEventListener("open", () => {
    console.log("Connected to Server ✅");
  });
  
  socket.addEventListener("message", (message) => {
     const li = document.createElement("li");
     li.innerText = message.data;
     messageList.append(li);
    
  });
  
  socket.addEventListener("close", () => {
    console.log("Disconnected from Server ❌");
  });
  
  function handleSubmit(event){
      event.preventDefault();
      const input = messageForm.querySelector("input");
      socket.send(makeMessage("new_message",input.value));
      input.value = "";
  }
  function handleNickSubmit(event){
      event.preventDefault();
      const input = nickForm.querySelector("input");
      socket.send(makeMessage("nickname",input.value));
      input.value ="";
  }
  messageForm.addEventListener("submit",handleSubmit);
  nickForm.addEventListener("submit",handleNickSubmit);
// 내가 어디 있는지 정보를 담음 

{
    type:"message",
    payload="hello everyone!"

}

{
    type:"nickname",
    payload="nico!"

}
