import express from 'express';
import http from "http";
import { Server } from 'socket.io';
import cors from "cors";
import axios from 'axios';
import {roomList,userList} from "./RoomAndUsers.js";
import SaveData, {getData} from './ChatProjectDB.js';
import { instrument } from '@socket.io/admin-ui';

const app = express();
const port = 3001;
const server = http.createServer(app)

let userFromInfra = "https://infra-jerusalem-2-server.vercel.app/allusersnameimg"
const io = new Server(server, {
    cors: {
        origin: ["https://admin.socket.io","http://localhost:5174","http://localhost:5173","http://localhost:4173","https://communication-jlm-2-9b72.vercel.app","https://communication-jlm-2-9b72.vercel.app/assets/remoteEntry.js"],
        credentials:true,
        methods: ["GET", "POST", "HEAD"],
    }
});

async function getUsersfromInfra (){
    try {
        const respons = await axios.get(userFromInfra)
        return respons
    } catch (error) {
        console.error("ERROR - DATA Infra!!!",error)
    }
}
getUsersfromInfra()

app.use(cors());

instrument(io,{
    auth:false
})


io.on("connection", (socket) => {

    console.log('users:',io.engine.clientsCount,`User Connected: ${socket.id}`);
    
    io.emit("roomList",roomList)
    io.emit("userList",userList)

    socket.on('upLoadOldmessages',(user)=>{
        console.log("het")
        const oldMessages = async () => {
            try {
                const data = await getData(user)
                socket.emit('oldMessages',(data))
            } catch (error) {
                console.error(error)
            }
        }
        oldMessages()
    });


    socket.on("join_room", (data) => {
        socket.join(data);
    });

    socket.on('createRoom',(room, callback)=>{
        if (roomList.map((object)=> object.roomID).includes(room.roomID) || roomList.map((object)=> object.roomName).includes(room.roomName)){
            callback({status:"no Open room"})  
        }else
        {
            roomList.push(room)
            socket.join(room.roomID)
            callback({status:"The room was successfully created"})
            io.emit("roomList",roomList)
        }
    });

    socket.on("send_message", (data) => {
        if (data.typeMessage == "privte"){
            socket.to(data.reciver).emit("privte_message", data)
        }
        else{
            io.to(data.room).emit("receive_message", data)  
        }
        if(data.save){
            try {
                SaveData(data)
            } catch (error) {
            console.error(error)
        }}
    });

    socket.on('disconnect', ()=>{
        console.log(`   User Disonnected: ${socket.id}`);
        console.log(io.engine.clientsCount)
    })
});

server.listen(port, () => {
    console.log(`server is running on port ${port}`);
})