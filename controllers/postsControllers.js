import postsModel from "../models/Posts";
import asyncHandler from "express-async-handler"//@desc get posts
//@route Get /posts
// @access Private
export const getPosts = asyncHandler(async (req, res) => {
    try {
        const posts = await postsModel.find();
        res.json(posts);
    } catch (err) {
        res.json({ message: err })
    }
})

//@desc get a specific
//@route Get /posts/:postId
// @access Private
export const getPost = asyncHandler(async (req, res) => {
    try {
        const specificPost = await postsModel.findById(req.params.postId);
        res.json(specificPost);
    } catch (err) {
        res.json({ message: err })
    }
})


//@desc set a post
//@route Post /posts
// @access Private
export const setPost = asyncHandler(async (req, res, next) => {
    if (!(req.body.title && req.body.description)) {
        res.status(400);
        throw new Error("please add title and description")
    } else {
        const post = new postsModel({
            title: req.body.title,
            description: req.body.description
        });
        try {
            const savedPost = await post.save();
            res.status(200).json(savedPost)
        } catch (err) {
            res.json({ message: err })
        }
    }


})

//@desc update a post
//@route PATCH /posts/:postid
// @access Private
export const updatePost = asyncHandler(async (req, res) => {
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

//@desc delete a post
//@route DELETE /posts/:postid
// @access Private
export const deletePost = asyncHandler(async (req, res) => {
    try {
        const removedPost = await postsModel.remove({ _id: req.params.postId });
        res.json(removedPost);

    } catch (err) {
        res.json({ message: err });
    }

})


