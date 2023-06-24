const express = require('express')
var cors = require('cors')
const userRouter = require('./Router/userRouter')

//server
const app = express()


const port = 5000

app.use(express.json())
app.use(cors())

//route
app.use("/api/user", userRouter)
//server start
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})