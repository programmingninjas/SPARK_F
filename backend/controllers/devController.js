const asyncHandler = require("express-async-handler")
const dev = require("../models/devModel")
const devresult = require("../models/devResults")

// @desc  Get dev scale
// @route Get /api/dev
// @access Public

const getdev = asyncHandler( async (req,res) => {
    const scales = await dev.find()
    console.log(scales)
    res.status(200).json(scales[0])
})

// @desc  Set dev result
// @route Post /api/dev
// @access Private
const setdev = asyncHandler( async (req,res) => {
    let results = req.body.results
    if(results.length==0){
        res.status(400)
        throw new Error("Kindly fill the form properly")
    }
    let scale = {user:req.user.id,results}
    const sr = await devresult.insertMany(scale)
    res.status(200).json(sr)
})

// @desc  Get dev result
// @route Get /api/dev/result
// @access Public
const getdevResult = asyncHandler( async (req,res) => {
    const scaleResult = await devresult.findOne({user:req.query.user})
    res.status(200).json(scaleResult)
})

module.exports = {
    getdev,
    setdev,
    getdevResult
}