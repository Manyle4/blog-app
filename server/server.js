import express from 'express'
import mongoose from 'mongoose'
import { MONGOURL, PORT } from './config.js'

const app = express();

//Connecting database
mongoose.connect("mongodb+srv://yawah:admin@cluster0.qc28s.mongodb.net/")
    .then(() => {
        console.log("Database connected successfully!");
        app.listen(PORT, () => {
            console.log(`Server is running on port ${8000}`);
        })
    })
    .catch((error) => {
        console.log(error);
    })