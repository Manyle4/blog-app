const express = require('express');
const User = require('./models/UserModel.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const router = express.Router();

//Register
router.post('/register', async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hashSync(password, salt);

        const newUser = new User({
            username: username,
            email: email,
            password: hashedPassword
        })

        const savedUser = await newUser.save();

        return res.status(200).json("User added successfully!");
    } catch (error) {
        return res.status(500).json(error)
    }
})

//Login
router.post('/login', async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email })
        if (!user) {
            return res.status(404).json("Invalid credentials!")
        }

        const match = await bcrypt.compare(req.body.password, user.password);
        if (!match) {
            return res.status(404).json("Invalid credentials!")
        }

        const token = jwt.sign({ _id, username: user.username, email: user.email }, SECRET_KEY, { expiresIn: "3d" })
        const { password, ...info } = user._doc;
        res.cookies(token, "token",
            {
                httpOnly: true,
                secure: true,
                samesite: 'None'
            }).status(200).json(info);
    } catch (error) {
        return res.status(500).json(error);
    }
})

//Logout
router.get('/logout', async (req, res) => {
    try {
        res.clearCookie("token", {sameSite: 'none', secure: true}).status(200).json("User loggedout successfully!");
    } catch (error) {
        return res.status(500).json(error);
    }
})

//Refetch
router.get('/refetch', async (req, res) => {
    try{
        const token = req.cookies.token;

        jwt.verify(token, SECRET_KEY, {}, async (err, data) => {
            if(err){
                return res.status(500).json(err);
            }
            res.status(200).json(data)
        })
    }catch(error){
        return res.status(500).json(error);
    }
})

module.exports = router;