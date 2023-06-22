const express = require('express')
var cors = require('cors')

//server
const app = express()


const port = 5000

app.use(express.json())
app.use(cors())
//route

//server start
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})