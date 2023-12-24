import mongoose from 'mongoose';

const chatProjectSchema = new mongoose.Schema({
    to: String,
    typeMessage: String,
    room: String,
    aouter: String,
    aouterID: String,
    message: String,
    time: String,
    reply: Object,

})

const usersChatSchema = new mongoose.Schema({
    userName: { type: String, required: true, unique: true },

    firstName: String,
    lastName: String,
    email: String,
    img: String,
    team: { type: String, default: "general" },
    role: { type: String, default: "general" },
    status: { type: String, default: "disconnect" },
    socket: { type: String, default: "" }
})

const roomsChatSchema = new mongoose.Schema({
    status: {
        type: String,
        default: "open",
    },
    team: { type: String, default: "general" },
    roomName: { type: String, unique: true, required: true},
    owner: { type: String, required: true },
})

const usersSchema = mongoose.model('usersChatSchema', usersChatSchema)
const messageSchema = mongoose.model("chatProjectSchema", chatProjectSchema)
const roomsSchema = mongoose.model("roomsChatSchema", roomsChatSchema)

export { usersSchema, messageSchema, roomsSchema }
