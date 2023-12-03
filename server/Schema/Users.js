import mongoose from "mongoose";
import { Schema } from "mongoose";

const UserSchema = new Schema({
    email: String,
    codeforces_username: String,
})

const UserModel = mongoose.model("UserModel", UserSchema, "Users")

export default UserModel