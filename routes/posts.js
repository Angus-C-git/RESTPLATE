const router = require('express').Router();
const verify = require('./validateJWT');  // Authenticated route
const Post = require('../models/Post');   // Post model


/**
 * Fetch all shared posts ...
 * */
router.get('/', verify, async (req, res) => {
    try {
        const posts = await Post.find();
        res.status(200).json(posts);
    } catch (err) {
        res.status(503).json({error: err});
    }
});


/**
 * Share a post ...
 * */
router.post('/', verify, async (req, res) => {
    const post = new Post({
        author: req.body.author,
        postContents: req.body.postContents
    });

    try {
        const savedPost = await post.save();
        res.status(200).json(savedPost);
    } catch (err) {
        res.status(503).json({error: err});
    }
});

module.exports = router;