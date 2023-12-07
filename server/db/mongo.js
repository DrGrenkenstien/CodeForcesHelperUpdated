import mongoose from "mongoose";

mongoose.connect("mongodb+srv://Shub:zUtCyGkYncWPySJL@cluster0.zmwunml.mongodb.net/CodeForcesHelper?retryWrites=true&w=majority").then(() => {console.log("Connected")}).catch((e) => {console.log("Error", e)})
