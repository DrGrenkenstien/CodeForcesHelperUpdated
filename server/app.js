import express from "express";
import cors from 'cors'
import mongoose from "mongoose";
import UserModel from "./Schema/Users.js"

const conn = await mongoose.createConnection("mongodb+srv://Shub:zUtCyGkYncWPySJL@cluster0.zmwunml.mongodb.net/CodeForcesHelper?retryWrites=true&w=majority", {
    serverSelectionTimeoutMS: 30000, // Increase server selection timeout
    socketTimeoutMS: 45000, // Increase socket timeout
  }).asPromise()

console.log(conn.readyState == 1 ? "Connected successfully to MongoDB server" : "Failed to connect to MongoDB server")

const app = express()
const port = 3000

app.use(cors())

app.get('/api/totalstats', (req, res) => {
    res.send('Hello, this is a GET request!')
})

const Save = async (newUser) => {
    await  newUser.save()
    res.send("User added succesfully")
}

app.post("/user/profile", (req, res) => {
    const newUser = new UserModel({"email" : res["email"], "codeforces_username" : res["username"]})
    Save(newUser)
})

app.listen(port, () => {
    console.log(`Server listening on http://localhost:${port}`)
})