const express = require("express");
const userRouter = require("./Router/userRouter");
const cors =  require("cors")
const port = 5000


app.use(cors())

app.use("/api/user", userRouter);


const app =express()


app.listen(port, ()=>{
    console.log(`server started at port ${port}`)
})
