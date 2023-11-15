const express = require('express');
const app = express();
const http = require("http");
const { Server } = require('socket.io');
const cors = require("cors");

app.use(cors());

const server = http.createServer(app)

const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173",
        methods: ["GET", "POST"],
    },
});
let userList = []
io.on("connection", (socket) => {
    console.log(`User Connected: ${socket.id}`);
    userList.push(socket.id)
    console.log(userList)
    socket.on("join_room", (data) => {
        socket.join(data);
    });

    socket.on("send_message", (data) => {
        console.log("room:",data.room,"message:",data.message)
        socket.to(data.room).emit("receive_message", data.message);
    });
});


server.listen(3001, () => {
    console.log("server is running");
})