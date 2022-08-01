import express from "express";
const router = express.Router();


import postsModel from "../models/Posts";

// get back all the posts
router.get('/', async (req, res) => {
    try {
        const posts = await postsModel.find();
        res.json(posts);
    } catch (err) {
        res.json({ message: err })
    }
})

//specific post
router.get('/:postId', async (req, res) => {
    try {
        const specificPost = await postsModel.findById(req.params.postId);
        res.json(specificPost);
    } catch (err) {
        res.json({ message: err })
    }
})

//delete a specific post
router.delete('/:postId', async (req, res) => {
    try {
        const removedPost = await postsModel.remove({ _id: req.params.postId });
        res.json(removedPost);

    } catch (err) {
        res.json({ message: err });
    }
})

//update a specific post
router.patch('/:postId', async (req, res) => {
    try {
        const updatedPost = await postsModel.updateOne(
            { _id: req.params.postId }
            , { $set: { title: req.body.title } }
        );
        res.json(updatedPost);

    } catch (err) {
        res.json({ message: err });
    }
})
//submit a post
router.post('/', async (req, res) => {
    const post = new postsModel({
        title: req.body.title,
        description: req.body.description
    });
    try {
        const savedPost = await post.save();
        res.json(savedPost)
    } catch (err) {
        res.json({ message: err })
    }

})


export default router;