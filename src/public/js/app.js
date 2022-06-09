const socket = io(); // auto socket.io server
const welcome = document.getElementById("welcome");
const form = welcome.querySelector("form");

function handleRoomSubmit(event){
    event.preventDefault();
    const input = form.querySelector("input");
    //1.event name,2.payload,3.function 
    socket.emit("enter_room",{payload: input.value}, ()=>{
        console.log("server is done!");
    });
    
    
    input.value = "";
}

form.addEventListener("submit",handleRoomSubmit);
