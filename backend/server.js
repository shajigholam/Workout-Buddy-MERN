require('dotenv').config()

// Require the express package
const express = require('express')
const mongoose = require('mongoose')
const workoutRoutes = require('./routes/workouts')

// start the express app
const app = express()

// middleware
app.use(express.json()) //when we handling POST/PATCH request, we are sending data to the server. this will pass and attach the data(body) to the req obj

app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

// routes

// app.get('/', (req, res) => {
//     res.json({mssg: 'Welcome to the app'})
// })
app.use('/api/workouts', workoutRoutes) //this attaches all the routes to the app

//connect to db
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        // listen for requests
        app.listen(process.env.PORT, () => {
        console.log('connecting to db & listening on port ', process.env.PORT)
    })
    })
    .catch((error) => {
        console.log(error)
    })

