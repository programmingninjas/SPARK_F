const asyncHandler = require("express-async-handler")
const ISAA = require("../models/isaaModel")
const isaaresult = require("../models/isaaResults")

// @desc  Get scale
// @route Get /api/isaa
// @access Public

const getISAA = asyncHandler( async (req,res) => {
    const scales = await ISAA.find()
    res.status(200).json(scales[0])
})

// @desc  Set isaa result
// @route Post /api/isaa
// @access Private
const setISAA = asyncHandler( async (req,res) => {
    let results = req.body.results
    if(results.length==0){
        res.status(400)
        throw new Error("Kindly fill the form properly")
    }
    let scale = {user:req.user.id,results}
    const sr = await isaaresult.insertMany(scale)
    res.status(200).json(sr)
})

// @desc  Get scale result
// @route Get /api/isaa/result
// @access Public
const getIsaaResult = asyncHandler( async (req,res) => {
    const scaleResult = await isaaresult.findOne({user:req.query.user})
    res.status(200).json(scaleResult)
})

module.exports = {
    getISAA,
    setISAA,
    getIsaaResult
}