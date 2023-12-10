import express from "express";
import cors from 'cors'
import routes from "./routes/user.js";
import cookieParser from "cookie-parser";
import "./db/mongo.js"

const app = express()
const port = 3000

app.use(cors())
app.use(express.json());
// app.use(cookieParser)

app.use("/user", routes)
app.listen(port, () => {
    console.log(`Server listening on http://localhost:${port}`)
})