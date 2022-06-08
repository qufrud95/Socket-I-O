import express from "express";
import http from "http";
import { Server } from 'socket.io';
// import WebSocket,{WebSocketServer} from "ws";
import path from 'path';
const __dirname = path.resolve();

/* Backend  */
const app = express();


app.set("view engine","pug");
app.use("/public", express.static(__dirname + "/src/public"));
app.set("views", __dirname + "/src/views");

app.get("/", (req, res) => res.render("home"));
app.get("/*", (req, res) => res.redirect("/")) // user의 접근 방지 


//http server access 
const httpServer = http.createServer(app); // server 생성
const wsServer = new Server(httpServer);
//Connection event

// browser를 담는 임시 DB
/*
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
*/ 
const handleListen = () => console.log(`Listening on http://localhost:3000`);
httpServer.listen(3000,handleListen);
