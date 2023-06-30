const express = require('express')
var cors = require('cors')
const userRouter = require('./Router/userRouter')
const restaurantRouter = require('./Router/restaurantRouter')
const menuItemRouter = require('./Router/menuItemRouter')
const reviewsRouter = require('./Router/reviewsRouter')
const commonRouter = require('./Router/commonRouter')

//server
const app = express()


const port = 5000

app.use(express.json())
app.use(express.static(__dirname + "/public"))
app.use(cors())


app.use("/public", express.static(__dirname + "/public"))
//route
app.use("/api/user", userRouter)
app.use("/api/restaurant", restaurantRouter)
app.use("/api/menu-item", menuItemRouter)
app.use("/api/review", reviewsRouter)
app.use("/api/common", commonRouter)
//server start
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})