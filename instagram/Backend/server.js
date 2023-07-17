const express = require("express");
const cors = require("cors")
const userRouter = require("./router/userRouter");
const postsRouter = require("./router/postsRouter");
require('dotenv').config()

const server = express();


const PORT = process.env.PORT || 5000;

server.use(express.json())
server.use(cors());

server.use("/api/user", userRouter)
server.use("/api/post", postsRouter)

// "api/user/login"
server.listen(PORT, ()=>{
    console.log(`server started at port ${PORT}`)
})