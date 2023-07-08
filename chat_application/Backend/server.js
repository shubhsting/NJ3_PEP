const express = require("express");
const { loginUser, signupUser } = require("./controller/userController");
const cors = require("cors")
const app = express()

app.use(cors())
app.use(express.json())

const server = require('http').createServer(app);
// const io = require("socket.io")(server,{
//     cors: {
//         origin: '*'
//     }
// });

// io.on("connection", (socket)=>{
//     console.log(`hello ${socket.id}! you have successfully connected to backend via socket`)
//     socket.emit("message_received", {
//         mesaage: "hello you are connected!!!"
//     })

//     socket.on("send_message_to_server", (data)=>{
//         console.log(data)
//     }) 
// })



app.post("/login", loginUser)
app.post("/signup", signupUser)

server.listen(5000, ()=>{
    console.log("server started")
})


// socket.emit(event_name, data)
// socket.on(event_name, (data)=>{
// console.log(data)
// })