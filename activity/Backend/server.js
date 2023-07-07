const express = require("express")
const cors = require("cors")
const getEntries = require("./Controller/dataController")
const app = express()

app.use(cors())

const PORT = 5000

//route
app.get("/entries", getEntries);




app.listen(PORT, ()=>{
    console.log(`app started at port ${PORT}`)
})