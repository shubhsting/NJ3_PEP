const express = require("express");
const { createNote, getNotes } = require("./controller/noteController");



const server = express();

server.use(express.json())


server.post("/note/create", createNote)
server.get("/notes", getNotes)



server.listen(3000, ()=>{
    console.log(`server running at port 3000`)
})