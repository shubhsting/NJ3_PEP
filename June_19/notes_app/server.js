const express = require('express')
const { createNote, updateNote, deleteNote, getNote, geAllNotes } = require('./controller/notesController')
const { testMiddleware } = require('./middleware/tm')
var cors = require('cors')

//server
const app = express()


const port = 5000

app.use(express.json())
app.use(cors())
//route

//if i trigger post request with this /notes/create route, the logic written in createNote should be implemented
app.post('/notes/create', createNote)

app.post("/notes/update", updateNote)

app.delete("/note", deleteNote)

app.get("/note", getNote)

app.get("/fetch/all-notes", geAllNotes)



//server start
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})