const asyncHandler = require("express-async-handler")
const User = require("../models/userModel")
const jwt = require('jsonwebtoken')
const bcrypt = require("bcryptjs")


// @desc  Register new user
// @route POST /api/user
// @access Public
const registerUser = asyncHandler( async (req,res)=>{
    const {name,email,password,dob,role} = req.body
    if (!name || !email || !password || !dob || !role){
        res.status(400)
        throw new Error('Please add all fields')
    }
    const userExists = await User.findOne({email})
    if (userExists){
        res.status(400)
        throw new Error('User already Exists')
    }
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password,salt)
    const user = await User.create({
        name,
        email,
        dob,
        role,
        password:hashedPassword
    })
    if (user){
        res.status(201).json({
            _id:user.id,
            name:user.name,
            email:user.email,
            dob:user.dob,
            role:user.role,
            token:generateToken(user._id)
        })
    }
    else{
        res.status(400)
        throw new Error("Invalid user data")
    }
})

// @desc  Authenticate a user
// @route POST /api/user/login
// @access Public
const loginUser = asyncHandler( async (req,res)=>{
    const {email,password} = req.body
    const user = await User.findOne({email})
    if(user && (await bcrypt.compare(password,user.password))){
        res.status(201).json({
            _id:user.id,
            name:user.name,
            email:user.email,
            role:user.role,
            token:generateToken(user._id)
        })
    }
    else{
        res.status(400)
        throw new Error("Invalid credentials")
    }
})

// @desc  Get user 
// @route GET /api/user/me
// @access Private
const getUser = asyncHandler( async (req,res)=>{
    res.status(200).json(req.user)
})

const generateToken = (id)=>{
    return jwt.sign({id},process.env.JWT_SECRET,{
        expiresIn: '30d'
    })
}

module.exports = {
    registerUser,
    loginUser,
    getUser
}