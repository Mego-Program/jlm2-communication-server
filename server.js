const express = require('express');
const app = express();
const http = require("http");
const { Server } = require('socket.io');
const cors = require("cors");
const { types } = require('util');
const { type } = require('os');

const port = process.env.PORT || 3001;
const server = http.createServer(app)

app.use(cors());
const io = new Server(server, {
    cors: {
        origin: ["http://localhost:5174","http://localhost:5173","http://localhost:4173","https://communication-jlm-2-9b72.vercel.app","https://communication-jlm-2-9b72.vercel.app/assets/remoteEntry.js","https://infra-jerusalem-2.vercel.app"],
        methods: ["GET", "POST", "HEAD"],
    }
});
let userList = []
let rooms = ['100','200','300']

// rooms.map((object) =>io.join(object))


io.on("connection", (socket) => {
    console.log(`User Connected: ${socket.id}`);
    userList.push(socket.id)
    console.log(userList, userList.length)

    socket.on("join_room", (data) => {
        socket.join(data);
        console.log(data)
    });



    socket.on("send_message", (data) => {
        console.log(data)
        if (data.typeData == "privte_message"){
            socket.to(data.reciver).emit("privte_message",data)
        }
        else{
            socket.to(data.room).emit("receive_message", data)
        }  
    });
    socket.on('disconnect', ()=>{
        console.log(`   User Disonnected: ${socket.id}`);
        userList = userList.filter((socketID) => socketID != socket.id)
        console.log(userList,userList.length)
    })
});


server.listen(port, () => {
    console.log(`server is running on port ${port}`);
})