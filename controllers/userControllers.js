import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import asyncHandler from "express-async-handler";
import userModel from "../models/Users";

//@desc register new user
//@route POST /users
// @access Public

export const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        res.status(400);
        throw new Error('please add all fileds')
    }
    //check if user exits
    const userExits = await userModel.findOne({ email });
    if (userExits) {
        res.status(400);
        throw new Error('user already exits')
    }
    //hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    //create user
    const user = await userModel.create({
        name,
        email,
        password: hashedPassword

    })
    if (user) {
        res.status(201).json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id)
        })

    } else {
        res.status(400);
        throw new Error('invalid user data')

    }
})
//@desc Authenticate a user
//@route POST /users/login
// @access Public

export const LoginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    //check for user email
    const user = await userModel.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
        res.json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id)
        })

    } else {
        res.status(400);
        throw new Error('invalid credentials')
    }

})

//@desc get user data
//@route GET /users/me
// @access Private

export const getMe = asyncHandler(async (req, res) => {
    const { _id, name, email } = await userModel.findById(req.user.id);

    res.status(200).json({
        _id,
        name,
        email,
    })
})


// generate JWT
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d'
    })
}


