const express = require('express')
const { createNote, updateNote, deleteNote, getNote } = require('./controller/notesController')
const { testMiddleware } = require('./middleware/tm')
//server
const app = express()


const port = 3000

app.use(express.json())
//route

//if i trigger post request with this /notes/create route, the logic written in createNote should be implemented
app.post('/notes/create', testMiddleware, createNote)

app.post("/notes/update", updateNote)

app.delete("/note", deleteNote)

app.get("/note", getNote)



//server start
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})