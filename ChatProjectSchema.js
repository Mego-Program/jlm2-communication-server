import mongoose from 'mongoose';

const chatProjectSchema = new mongoose.Schema({
    to:String,
    typeMessage:String,
    room:String,
    aouter:String,
    message:String,
    time:String,
    reply:Object,
})

export default mongoose.model("chatProjectSchema",chatProjectSchema)