const express = require('express')
const { createNote, updateNote } = require('./controller')
//server
const app = express()


const port = 3000

app.use(express.json())
//route

//if i trigger post request with this /notes/create route, the logic written in createNote should be implemented
app.post('/notes/create', createNote)

app.post("/notes/update", updateNote)

//server start
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})