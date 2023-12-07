import express from "express";
import cors from 'cors'
import mongoose from "mongoose";
import routes from "./routes/user.js";
import "./db/mongo.js"

const app = express()
const port = 3000

app.use(cors())
app.use(express.json());
app.use("/user", routes)

app.listen(port, () => {
    console.log(`Server listening on http://localhost:${port}`)
})