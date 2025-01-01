const express = require('express');
const User = require('../models/User.js');
const Post = require('../models/Post.js');
const Comment = require('../models/Comment.js');
const router = express.Router();
const verifyToken = require('../jsonWebToken.js');

//Create
router.post('/create', verifyToken, async(req, res) => {
    try{
        const newPost = new Post(req.body);
        const savedPost = await newPost.save();
        res.status(200).json("Post added successfully!")
    }catch(err){
        res.status(500).json(err);
    }
})
//Update
router.put('/:id', verifyToken, async(req, res) => {
    try{
        const updatedPost = await Post.findByIdAndUpdate(req.params.id, {$set: req.body}, {new: true});
        res.status(200).json(updatedPost);
    }catch(err){
        res.status(500).json(err);
    }
})
//Delete
router.delete('/:id', async(req, res) => {
    try{
        await Post.findByIdAndDelete(req.params.id);
        await Comment.deleteMany({PostId: req.params.id});
        res.status(200).json("Post deleted successfully!");
    }catch(err){
        res.status(500).json(err);
    }
})

//Get Post Dtails
router.get('/:id', async(req, res) => {
    try{
        const posts = await Post.findById(req.params.id);
        res.status(200).json(posts);
    }catch(err){
        res.status(500).json(err);
    }
})

//Get posts by filter
router.get('/', async(req, res) => {
    try{
        const searchFilter = {
            title: { $regex: express.query.search, $option: 'i' }
        }
        const posts = await Post.find(express.query.search ? searchFilter : null);
        res.status(200).json(posts);
    }catch(err){
        res.status(500).json(err);
    }
})

//Get user specific posts
router.get('/user/:userId', async(req, res) => {
    try{
        const posts = await Post.find({userId: req.params.userId});
        res.status(200).json(posts);
    }catch(err){
        res.status(500).json(err);
    }
})

module.exports = router;