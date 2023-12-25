import express from 'express';
import http from "http";
import { Server } from 'socket.io';
import cors from "cors";
import axios from 'axios';
import SaveData, { getData, createUser, getUsers, createRooms, getRooms, lockRoom, unLockRoom } from './ChatProjectDB.js';
import { instrument } from '@socket.io/admin-ui';

const app = express();
const port = 3001;
const server = http.createServer(app)
const userList = []
const roomList = []

userList.map((object) => { object.socket = '', object.status = 'disconncet' })

let userFromInfraURL = "https://infra-jerusalem-2-server.vercel.app/allusersnameimg"
const io = new Server(server, {
    cors: {
        origin: ["https://admin.socket.io", "http://localhost:5174", "http://localhost:5173", "http://localhost:4173", "https://communication-jlm-2-9b72.vercel.app", "https://communication-jlm-2-9b72.vercel.app/assets/remoteEntry.js","https://infra-jerusalem-2.vercel.app"],
        credentials: true,
        methods: ["GET", "POST", "HEAD"],
    }
});

async function startServer() {
    const mainRoom = {
        status: "open",
        team: "all",
        roomName: "main room",
        owner: "admin"
    }
    await createRooms(mainRoom)
    const getUsersfromInfra = await axios.get(userFromInfraURL)
    await getUsersfromInfra.data.map((object) => { object.status = "disconncet", object.socket = "", createUser(object) })
    await getUsersfromDB()
    await getRoomsFromDB()
}
startServer()

async function getUsersfromDB() {
    try {
        const tempUsers = await getUsers()
        tempUsers.map((object) => userList.push(object))
    } catch (error) {
        console.error("ERROR - DATA Infra!!!", error)
    }
}

async function getRoomsFromDB() {
    try {
        const tempRoomsList = await getRooms();
        tempRoomsList.map((object) => roomList.push(object))
    } catch (error) {
        console.log(error)
    }
}

app.use(cors());

instrument(io, {
    auth: false
})

io.on("connection", (socket) => {
    console.log('users:', io.engine.clientsCount, `User Connected: ${socket.id}`);
    io.emit("roomList", roomList)
    io.emit("userList", userList)
    let user = ""
    socket.on('upLoadOldmessages', (localStorageForMe) => {
        user = localStorageForMe.userName;
        try {
            createUser(localStorageForMe)
        } catch (error) {
            console.log("you in DB")
        }
        try {
            userList.filter((object) => object.userName == user)[0].socket = socket.id
            userList.filter((object) => object.userName == user)[0].status = 'connect'
            io.emit("userList", userList)
        } catch (error) {
            console.error(error)
            console.log('not found user!')
            userList.push({
                userName: user,
                status: 'connect',
                socket: socket.id
            })
            io.emit("userList", userList)
        }

        const userName = userList.filter((object) => object.userName == user)[0].userName
        const oldMessages = async () => {
            try {
                const data = await getData(userName)
                socket.emit('oldMessages', (data))
            } catch (error) {
                console.error(error)
            }
        }
        oldMessages()
    });

    socket.on("join_room", (data) => {
        socket.join(data);
    });

    socket.on("lockRoom", (roomName) => {
        lockRoom(roomName)
        roomList.filter((object)=> object.roomName == roomName)[0].status = "lock"
        io.emit("roomList", roomList)
        console.log(roomList)
    })
    socket.on("unLockRoom", (roomName) => {
        unLockRoom(roomName)
        roomList.filter((object)=> object.roomName == roomName)[0].status = "open"

        io.emit("roomList", roomList)
        console.log(roomList)
    })

    socket.on('createRoom', (room, callback) => {
        if (roomList.map((object) => object.roomName).includes(room.roomName)) {
            callback({ status: "no Open room" })
        } else {
            roomList.push(room)
            socket.join(room.roomName)
            console.log(room)
            createRooms(room)
            callback({ status: "The room was successfully created" })
            io.emit("roomList", roomList)
        }
    });

    socket.on("send_message", (data) => {
        data.aouterID = userList.filter((object) => object.userName == data.aouter)[0].userName
        console.log(data.aouterID)
        if (data.typeMessage == "privte") {
            socket.emit("receive_message", data)
            const socketTo = userList.filter((object) => object.userName === data.to)[0].socket
            console.log(socketTo)
            if (socketTo !== "") {
                socket.to(socketTo).emit("receive_message", data)
            }
        }
        else {
            io.to(data.room).emit("receive_message", data)
        }

        try {
            SaveData(data)
        } catch (error) {
            console.error(error)
        }
    });

    socket.on('disconnect', () => {
        console.log(`   User Disonnected: ${socket.id}`);
        console.log('users:', io.engine.clientsCount)

        try {
            userList.filter((object) => object.socket == socket.id)[0].status = 'disconncet'
            userList.filter((object) => object.socket == socket.id)[0].socket = ''
        } catch (error) {
            console.error(162, error)
        }
        io.emit("userList", userList)
    })
});

server.listen(port, () => {
    console.log(`server is running on port ${port}`);
})
