const express = require('express')
const userAuth = require('./middleware/userAuth')
const userRoutes = require('./routes/userRoutes')
const taskRoutes = require('./routes/taskRoutes')
const eventRouter = require('./routes/eventRoutes')
const app = express()
const port = 3000

app.use(express.json())


app.use("/api/user", userRoutes)
app.use("/api/task", taskRoutes)
app.use("/api/event", eventRouter)

// 
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})