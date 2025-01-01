const express = require('express');
const mongoose = require('mongoose');
const {PORT} = require('./config.js');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const cookieParser = require('cookie-parser');
const authRouter = require('./routes/auth.js');
const userRouter = require('./routes/user.js');
const postRouter = require('./routes/post.js');
const commentRouter = require('./routes/comment.js');

const app = express();


//CORS
const corsOptions = {
    origin: "*",
    credentials: true
}

app.use(cors(corsOptions))

//Middlewares
app.use('/images', express.static(path.join(__dirname, 'images')))

const storage = multer.diskStorage({
    destination: (req, file, fn) => {
        fn(null, 'images')
    },
    filename: (req, file, fn) => {
        fn(null, req.body.img)
    }
})

const upload = multer({storage: storage})

app.post('/api/upload', upload.single("file"), (req, res) => {
    res.status(200).json("Image uploaded successfully!")
})

app.use(cookieParser());
app.use('/api/auth', authRouter);
app.use('/api/user', userRouter);
app.use('/api/post', postRouter);
app.use('/api/comment', commentRouter);


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