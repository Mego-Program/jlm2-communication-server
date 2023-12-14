console.log("ChatProjectDB")
import mongoose from 'mongoose'
import chatProjectSchema from "./ChatProjectSchema.js"


export async function getData(user){
    await mongoose.connect(process.env.MONGOURI)
    mongoose.connection.on('connected',()=>{
        console.log('mongodb Connected!')
    })
    try {
        const messagesFromDB = await chatProjectSchema.find({aouter:user})
        return messagesFromDB
    } catch (error) {
        console.error('Error retrieving information', error);
    }
}

export async function getUsers(){
    await mongoose.connect(process.env.MONGOURI)
    mongoose.connection.on('connected',()=>{
        console.log('mongodb Connected!')
    })
    try {
        const messagesFromDB = await chatProjectSchema.find();
        return messagesFromDB
    } catch (error) {
        console.error('Error retrieving information', error);
    }
}

export async function getRooms(){
    await mongoose.connect(process.env.MONGOURI)
    mongoose.connection.on('connected',()=>{
        console.log('mongodb Connected!')
    })
    try {
        const messagesFromDB = await chatProjectSchema.find();
        return messagesFromDB
    } catch (error) {
        console.error('Error retrieving information', error);
    }
}

async function SaveData(data){
    await mongoose.connect(process.env.MONGOURI)

    const to = data.to;
    const type = data.typeMessage;
    const room = data.room;
    const aouter = data.aouter;
    const message = data.message;
    const time = data.time;
    const reply = data.reply;

    mongoose.connection.on('connected',async ()=>{
        console.log('mongodb Connected!')
    })
    try {
        const messageData = await chatProjectSchema.create({ 
            to:to,
            typeMessage:type,
            room:room,
            aouter:aouter,
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