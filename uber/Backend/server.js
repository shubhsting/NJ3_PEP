const express = require("express");
const userRouter = require("./Router/userRouter");
const cors =  require("cors");
const commonRouter = require("./Router/commonRouter");
const port = 5000


const app =express()
app.use(cors())
app.use(express.json())

app.use("/api/user", userRouter);
app.use("/api/common", commonRouter);




app.listen(port, ()=>{
    console.log(`server started at port ${port}`)
})
