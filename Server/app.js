import express from "express";
let app = express()
/* const http = require('http')

const app = http.createServer((req, resp) => {
    resp.end("Hello http Server")
}) */
import mongoose from "mongoose";
import dotenv from 'dotenv'
//import authRoute from "./routers/authRoute.js";
import productRoute from "./routes/productRoute.js"
import morgan from 'morgan'
import cors from 'cors'

// Middleware setup
app.use(cors({ origin: '*' })); // CORS
app.use(morgan('tiny')); // Logging
app.use(express.json()); // JSON body parsing
app.use(express.urlencoded({ extended: false })); // Form data parsing

app.use('/uploads', express.static('uploads'));


//app.use(bodyParser.json());

// Use the "authRoute" router for handling user-related routes
//app.use("/user", authRoute);
app.use("/api",productRoute)

app.get("/", (req, resp) => {
    resp.send("Express App - Root APi.......")
})

dotenv.config({ path: './config/config.env' })
let port = process.env.PORT
let host = process.env.HOST
let mongodb_url = process.env.MONGODB_URL

mongoose.connect(mongodb_url/* , {
    useNewUrlParser: true,
    useUnifiedTopology: true,
} */)
    .then(() => {
        console.log(`Mongo db conection Succesfull`)
    })
    .catch((err) => {
        console.log(`Mongo db Conection failed`)
    })
app.listen(port, host, (err) => {
    if (err) throw err
    console.log(`Server Running on http://${host}:${port}`)
})