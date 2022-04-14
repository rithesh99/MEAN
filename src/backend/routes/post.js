const express = require('express');
const router = express.Router();
const Post = require('../models/post')

router.get('', async (req, res) => {
    const posts = await Post.find({});
    res.status(200).json({
        success: true,
        posts: posts,
    })
});

router.get("/:id", (req, res) => {
    Post.findById(req.params.id).then(post => {
        if (post) {
            res.status(200).json(post);
        } else {
            res.status(404).json({ message: "Post not found!" });
        }
    });
});

router.post('', (req, res) => {
    const post = new Post(req.body);
    post.save();
    res.status(200).json({
        success: true,
    })
});

router.put("/:id", (req, res, next) => {
    const post = new Post({
        _id: req.body.id,
        title: req.body.title,
        content: req.body.content
    });
    Post.updateOne({ _id: req.params.id }, post).then(result => {
        res.status(200).json({ message: "Update successful!" });
    });
});

router.delete('/:id', async (req, res) => {
    const postId = req.params.id;
    await Post.deleteOne({ _id: postId })
    res.status(200).json({
        success: true,
    })
});

module.exports = router;