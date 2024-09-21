const asyncHandler = require("express-async-handler")
const social = require("../models/socialModel")
const socialresult = require("../models/socialResults")

// @desc  Get social scale
// @route Get /api/social
// @access Public

const getsocial = asyncHandler( async (req,res) => {
    const scales = await social.find()
    res.status(200).json(scales[0])
})

// @desc  Set social result
// @route Post /api/social
// @access Private
const setsocial = asyncHandler( async (req,res) => {
    let results = req.body.results
    if(results.length==0){
        res.status(400)
        throw new Error("Kindly fill the form properly")
    }
    let scale = {user:req.user.id,results}
    const sr = await socialresult.insertMany(scale)
    res.status(200).json(sr)
})

// @desc  Get scale result
// @route Get /api/social/result
// @access Public
const getsocialResult = asyncHandler( async (req,res) => {
    const scaleResult = await socialresult.findOne({user:req.query.user})
    res.status(200).json(scaleResult)
})

module.exports = {
    getsocial,
    setsocial,
    getsocialResult
}