import express from "express";
import cors from 'cors'
import mongoose from "mongoose";
import UserModel from "./Schema/Users.js"
mongoose.connect("mongodb+srv://Shub:zUtCyGkYncWPySJL@cluster0.zmwunml.mongodb.net/CodeForcesHelper?retryWrites=true&w=majority").then(() => {console.log("Connected")}).catch((e) => {console.log("Error", e)})

// console.log(conn.readyState)

const app = express()
const port = 3000

const person = await UserModel.findOne({});
console.log(person.email)
console.log(person)

app.use(cors())

app.get('/api/totalstats', (req, res) => {
    res.send('Hello, this is a GET request!')
})

const Save = async (newUser) => {
    await  newUser.save()
    res.send("User added succesfully")
}

app.post("/user/profile", (req, res) => {
    // const newUser = new UserModel({"email" : res["email"], "codeforces_username" : res["username"]})
    const ans = UserModel.countDocuments({})
    console.log(ans)
    // UserModel.find({}, (err, doc) => {
    //     if (err) {
    //         console.error(err);
    //       } else {
    //         console.log('All documents in the collection:', documents);
    //       }
    // })
    // console.log(res)
    
    // Save(newUser)
})

app.listen(port, () => {
    console.log(`Server listening on http://localhost:${port}`)
})