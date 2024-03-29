import postsModel from "../models/Posts";
import asyncHandler from "express-async-handler";
import userModel from "../models/Users"
//@desc get posts
//@route Get /posts
// @access Private
export const getPosts = asyncHandler(async (req, res) => {
    const posts = await postsModel.find({ user: req.user.id });
    res.status(200).json(posts);

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
    if (!(req.body.title || req.body.description)) {
        res.status(400);
        throw new Error("please add title and description")
    }
    const post = await postsModel.create({
        title: req.body.title,
        description: req.body.description,
        user: req.user.id
    });

    res.status(200).json(post)



})

//@desc update a post
//@route PUT /posts/:postid
// @access Private


export const updatePost = asyncHandler(async (req, res) => {
    const post = await postsModel.findById(req.params.postId);
    if (!post) {
        res.status(400);
        throw new Error('post not found')
    }
    const user = await userModel.findById(req.user.id);
    //check for user
    if (!user) {
        res.status(401);
        throw new Error('user not found')
    }
    //make sure the logged in user matches the post user
    if (post.user.toString() !== user.id) {
        res.status(401);
        throw new Error('user not authorized')
    }

    const updatedPost = await postsModel.findByIdAndUpdate(req.params.postId, req.body, {
        new: true
    })
    res.status(200).json(updatedPost);

})

//@desc delete a post
//@route DELETE /posts/:postid
// @access Private
export const deletePost = asyncHandler(async (req, res) => {
    const post = await postsModel.findById(req.params.postId);
    if (!post) {
        res.status(400);
        throw new Error('post not found')
    }
    const user = await userModel.findById(req.user.id);
    //check for user
    if (!user) {
        res.status(401);
        throw new Error('user not found')
    }
    //make sure the logged in user matches the post user
    if (post.user.toString() !== user.id) {
        res.status(401);
        throw new Error('user not authorized')
    }
    post.remove();
    res.status(200).json({ id: req.params.postId });



})


