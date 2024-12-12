import express from 'express'
import mongoose from 'mongoose'
import { MONGOURL, PORT } from '../config.js'

const app = express()

//Connecting database
mongoose.connect(MONGOURL)
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server is running on port ${8000}`)
        })
        console.log("Database connected successfully!")
    })
    .catch(err) {
        console.log(err.message)
    }