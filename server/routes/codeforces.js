import express from "express"
import "../db/mongo.js"
import dotenv from 'dotenv';
import axios from "axios";
import crypto from 'crypto'

dotenv.config();

const routes = express.Router()

const CODEFORCES_KEY = process.env.CODEFORCES_KEY
const CODEFORCES_SECRET = process.env.CODEFORCES_SECRET

const apiKey = CODEFORCES_KEY

function generateSHA512Hash(message) {
    const hash = crypto.createHash('sha512');
    hash.update(message);
    return hash.digest('hex');
}

function generateRandomSixDigitCode() {
    const min = 100000; 
    const max = 999999;
    const randomSixDigitCode = Math.floor(Math.random() * (max - min + 1)) + min;
    return String(randomSixDigitCode);
}

function getCurrentUnixTime() {
    const currentTimeInMilliseconds = new Date().getTime();
    const currentUnixTimeInSeconds = Math.floor(currentTimeInMilliseconds / 1000);
    return currentUnixTimeInSeconds;
}

const customSerializer = (key, value) => {
    if (typeof value === 'object' && value !== null) {
      if (value instanceof Set) {
        return [...value];
      }
      if (value instanceof Map) {
        return [...value.entries()];
      }
    }
    return value;
  };

routes.post("/userinfo", async (req, res) =>{
    try {
        const rand = generateRandomSixDigitCode()
        const time = getCurrentUnixTime()
        const cfUserName = req.body["cfUsername"]

        const hash_string = `${rand}/user.info?apiKey=${apiKey}&handles=${cfUserName}&time=${time}#${CODEFORCES_SECRET}`
        const apiSig = generateSHA512Hash(hash_string)

        const URL = `https://codeforces.com/api/user.info?handles=${cfUserName}&apiKey=${apiKey}&time=${time}&apiSig=${rand}${apiSig}`

        const userInfo = await axios.get(URL)
        res.send(userInfo.data)
    } catch (error) {
        console.log("Error in user info fetch", error)
    }
    
})

export default routes