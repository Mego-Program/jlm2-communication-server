import mongoose from 'mongoose';

const chatProjectSchema = new mongoose.Schema({
    to:String,
    typeMessage:String,
    room:String,
    aouter:String,
    aouterID:String,
    message:String,
    time:String,
    reply:Object,
    
})



const usersChatSchema = new mongoose.Schema({
    nameID:{
        type:String,
        required:true,
        unique:true},
    userName:{
        type:String,
        required:true},
    team:String,
    role:String,
    status:String,
    socket:String,
})

const roomsChatSchema = new mongoose.Schema({
    room:{
        type:String,
        required:true,
        unique:true},
    roomName:String,
    owner:String,
    team:String,
    status:String,
    role:String,
    members:Object
})

const usersSchema = mongoose.model('usersChatSchema',usersChatSchema)
const messageSchema = mongoose.model("chatProjectSchema",chatProjectSchema)
const roomsSchema = mongoose.model("roomsChatSchema",roomsChatSchema) 

export {usersSchema,messageSchema,roomsSchema}