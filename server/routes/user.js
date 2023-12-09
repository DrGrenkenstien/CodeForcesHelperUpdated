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

routes.post("/cfusername", async (req, res) => {
    try {
        const email = req.body["email"]
        const userInfo = await UserModel.findOne({"email" : email})
        // res.cookie('cfUserName', userInfo["codeforces_username"], { maxAge: 900000, httpOnly: false });
        res.send(userInfo["codeforces_username"])

    } catch (error) {
        console.log("Error occurred while fetching user infod", error)
        res.send(error)
    }
})

export default routes