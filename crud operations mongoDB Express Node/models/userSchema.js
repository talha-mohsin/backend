import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name:{
        type: String,
    },
    gender:{
        type: String,
    },
    age:{
        type: Number,
    },
    email:{
        type: String,
    }
})

const UserModal = mongoose.model("User", userSchema)

export default UserModal