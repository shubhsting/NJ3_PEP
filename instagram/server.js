const express = require("express")
require('dotenv').config()

const server = express();


const PORT = process.env.PORT || 5000;

server.listen(PORT, ()=>{
    console.log(`server started at port ${PORT}`)
})