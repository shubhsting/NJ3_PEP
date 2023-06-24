const express = require('express')
var cors = require('cors')
const userRouter = require('./Router/userRouter')
const restaurantRouter = require('./Router/restaurantRouter')
const menuItemRouter = require('./Router/menuItemRouter')
const reviewsRouter = require('./Router/reviewsRouter')

//server
const app = express()


const port = 5000

app.use(express.json())
app.use(cors())

//route
app.use("/api/user", userRouter)
app.use("/api/restaurant", restaurantRouter)
app.use("/api/menu-item", menuItemRouter)
app.use("/api/review", reviewsRouter)
//server start
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})