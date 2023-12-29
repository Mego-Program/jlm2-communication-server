console.log("ChatProjectDB")
import mongoose from 'mongoose'
import { messageSchema, usersSchema, roomsSchema } from "./ChatProjectSchema.js"
import dotenv from "dotenv"

dotenv.config()

const chatProjectSchema = messageSchema
const chatUsers = usersSchema
const chatRooms = roomsSchema

mongoose.set('strictQuery', true);
mongoose.connect(process.env.MONGO_URI)

mongoose.connection.on('connected', () => {
    console.log('mongodb Connected!')
})

export async function getData(userName) {
    try {
        const messagesFromDB = await chatProjectSchema.find({ $or: [{ to: userName }, { aouterID: userName }, { typeMessage: "public" }] })
        return messagesFromDB
    } catch (error) {
        console.error('Error retrieving information', error);
    }
}


export async function getUsers() {
    try {
        const usersFromDB = await chatUsers.find();
        return usersFromDB
    } catch (error) {
        console.error('Error retrieving information', error);
    }
}

export async function getRooms() {
    try {
        const roomsFromDB = await chatRooms.find();
        return roomsFromDB
    } catch (error) {
        console.error('Error retrieving information', error);
    }
}

export async function lockRoom(roomName){
    try {
        await chatRooms.findOneAndUpdate({roomName:roomName,$set:{status:"lock"}});
    } catch (error) {
        console.error('Error retrieving information', error);
    }
}
export async function unLockRoom(roomName){
    try {
        await chatRooms.findOneAndUpdate({roomName:roomName,$set:{status:"open"}});
    } catch (error) {
        console.error('Error retrieving information', error);
    }
}

export async function createRooms(room) {
    try {
        const roomsFromDB = await chatRooms.findOne({ roomName: room.roomName });
        if (roomsFromDB == null) {
            try {
                const dataRoom = await chatRooms.create({
                    status: room.status,
                    team: room.team,
                    roomName: room.roomName,
                    owner: room.owner,
                })
                dataRoom.save
            } catch (error) {
                console.error(error)
            }
        }
        else{
            return "the room find"
        }
    } catch (error) {
        console.error('Error retrieving information', error);
    }
}

export async function createUser(user) {
    try {
        const usersFromDB = await chatUsers.findOne({ userName: user.userName });
        if (usersFromDB === null) {
            try {
                const dataUser = await chatUsers.create({
                    userName: user.userName,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email,
                    img: user.img,
                    team: "",
                    role: "",
                    status: user.status,
                    socket: user.socket,
                })
                dataUser.save
            } catch (error) {
                console.error(error)
            }
        }
    } catch (error) {
        console.error(error)
    }
}

async function SaveData(data) {
    try {
        const messageData = await chatProjectSchema.create({
            to: data.to,
            typeMessage: data.typeMessage,
            room: data.room,
            aouter: data.aouter,
            aouterID: data.aouterID,
            message: data.message,
            time: data.time,
            reply: data.reply,
        })
        messageData.save
    } catch (error) {
        console.log("ERROR: " + error.message)  
    }
}
export default SaveData 