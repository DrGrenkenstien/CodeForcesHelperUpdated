import express from "express"
import "../db/mongo.js"

const routes = express.Router()

routes.get("/")