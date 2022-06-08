import express from "express";
import http from "http";
import WebSocket,{WebSocketServer} from "ws";
import path from 'path';
const __dirname = path.resolve();

/* Backend  */
const app = express();


app.set("view engine","pug");
app.use("/public", express.static(__dirname + "/src/public"));
app.set("views", __dirname + "/src/views");

app.get("/", (req, res) => res.render("home"));
app.get("/*", (req, res) => res.redirect("/")) // user의 접근 방지 

const handleListen = () => console.log(`Listening on http://localhost:3000`);

//http server access 
const server = http.createServer(app); // server 생성
const wss = new WebSocketServer({server}) //http+wss

//Connection event
function onSocketClose(){

    console.log("Disconnected from the Browser ❌")
}
function onSocketMessage(message){
    console.log(message.toString());
}
// browser를 담는 임시 DB
const sockets = [];

wss.on("connection",(socket) => {
  sockets.push(socket);
  socket["nickname"] = "Anonymous";
  console.log("Connected to Browser ✅");
  socket.on("close",onSocketClose);
  // Back to front
  socket.on("message", (msg) =>{
      //String to object
      const message = JSON.parse(msg);
      switch (message.type){
        case "new_message":
            sockets.forEach((aSocket) => aSocket.send(`${socket.nickname}: ${message.payload}`));
            break;
        case "nickname":
            socket["nickname"] = message.payload;
            break;
        
      }
  });
   
});
    
server.listen(3000,handleListen);
{

}