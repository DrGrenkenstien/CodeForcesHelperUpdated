import express from "express"
import "../db/mongo.js"
import UserModel from "../Schema/Users.js"

const routes = express.Router()

routes.post("/", async (req, res) => {
    try {
        const email = req.body["email"]
        const codeforces_username = req.body["codeforcesUsername"]
        const newUser = new UserModel({"email" : email, "codeforces_username" : codeforces_username})

        await newUser.save()

        res.send("User created successfully")
    } catch (error) {
        console.log(error)
        res.send(error)
    }
})

export default routes