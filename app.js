const express = require('express')
const app = express()
require('dotenv').config()

//middleware
app.use(express.json())

// router
const userRouter = require('./routes/users')
const dataRouter = require('./routes/books')
app.use('/api/v1/auth', userRouter)
app.use('/api/v1/data', dataRouter)

// mongo connect and server start
const connectDB = require('./db/connectDB')
const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI)
        app.listen(3000, console.log('listening on port 3000...'))
    } catch (error) {
        console.log(error);
    }
}

start()