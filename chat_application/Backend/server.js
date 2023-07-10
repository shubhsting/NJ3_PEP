const express = require("express");
const { loginUser, signupUser } = require("./controller/userController");
const cors = require("cors")
const app = express()
const jwt = require("jsonwebtoken");
require("dotenv").config();
app.use(cors())
app.use(express.json())

const server = require('http').createServer(app);
const io = require("socket.io")(server,{
    cors: {
        origin: '*'
    }
});

io.on("connection", (socket)=>{
    const auth_token = socket.handshake.query.token;
    const decoded = jwt.verify(auth_token, process.env.JWT_SECRET_KEY);  
    socket.join(123456789)  
    socket.to(123456789).emit("new_user_joined", {
        message: `${decoded.firstName} ${decoded.lastName} has joined`
    })

    socket.on("user_message", (response)=> {
        console.log(`message received on server ${response.message}`)
        socket.to(123456789).emit("new_message_sent_by_someone", {
            message: response.message,
            owner: jwt.verify(response.auth_token, process.env.JWT_SECRET_KEY)
        })
    })
})


// emit send the event to all the participants except the person who triggered backend.
app.post("/login", loginUser)
app.post("/signup", signupUser)

server.listen(5000, ()=>{
    console.log("server started")
})


// socket.emit(event_name, data)
// socket.on(event_name, (data)=>{
// console.log(data)
// })