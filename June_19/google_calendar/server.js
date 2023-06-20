const express = require('express')
const { signUp, login, getUser, updateUser, deleteUser } = require('./controller/userController')
const userAuth = require('./middleware/userAuth')
const { createTask, updateTask } = require('./controller/taskController')
const app = express()
const port = 3000

app.use(express.json())


app.post("/signup", signUp)
app.post("/login", login)
app.get("/profile", userAuth, getUser)
app.post("/profile/update", userAuth, updateUser)
app.delete("/profile", userAuth, deleteUser)

app.post("/task/create", userAuth, createTask)
app.post("/task/:taskId/update", userAuth, updateTask)


// 
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})