import express from "express";
import cors from 'cors'
import userRoutes from "./routes/user.js";
import codeforcesRoutes from "./routes/codeforces.js";
import cookieParser from "cookie-parser";
import "./db/mongo.js"

const app = express()
const port = 3000

// app.use(cookieParser)
app.use(cors())
app.use(express.json());


app.use("/user", userRoutes)
app.use("/codeforces",codeforcesRoutes)
app.listen(port, () => {
    console.log(`Server listening on http://localhost:${port}`)
})