const express = require('express')
const { signUp, login, getUser } = require('./controller/userController')
const userAuth = require('./middleware/userAuth')
const { createTask } = require('./controller/taskController')
const app = express()
const port = 3000

app.use(express.json())


app.post("/signup", signUp)
app.post("/login", login)
app.get("/profile", userAuth, getUser)

app.post("/task/create", userAuth, createTask)


// 
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})