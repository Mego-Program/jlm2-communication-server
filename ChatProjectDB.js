console.log("ChatProjectDB")
import mongoose from 'mongoose'
import {messageSchema,usersSchema,roomsSchema} from "./ChatProjectSchema.js"
import dotenv from "dotenv"

dotenv.config()


const chatProjectSchema = messageSchema
const chatUsers = usersSchema
const chatRooms = roomsSchema

mongoose.set('strictQuery',true);

mongoose.connect(process.env.MONGOURI)
mongoose.connection.on('connected',()=>{
    console.log('mongodb Connected!')
})

export async function getData(userID){

    try {
        const messagesFromDB = await chatProjectSchema.find({$or:[{to:userID},{aouterID:userID},{typeMessage:"public"}]})
        return messagesFromDB
    } catch (error) {
        console.error('Error retrieving information', error);
    }
}

export async function getUsers(){
 
    try {
        const messagesFromDB = await chatProjectSchema.find();
        return messagesFromDB
    } catch (error) {
        console.error('Error retrieving information', error);
    }
}

export async function getRooms(){

    try {
        const messagesFromDB = await chatProjectSchema.find();
        return messagesFromDB
    } catch (error) {
        console.error('Error retrieving information', error);
    }
}

async function SaveData(data){
     const to = data.to;
    const type = data.typeMessage;
    const room = data.room;
    const aouter = data.aouter;
    const aouterID = data.aouterID;
    const message = data.message;
    const time = data.time;
    const reply = data.reply;

    try {
        const messageData = await chatProjectSchema.create({ 
            to:to,
            typeMessage:type,
            room:room,
            aouter:aouter,
            aouterID:aouterID,
            message:message,
            time:time,
            reply:reply,
        })
        messageData.save
    } catch (error) {
        console.log("ERROR: " + error.message)        
    }
}
export default SaveData