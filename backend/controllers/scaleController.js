const asyncHandler = require("express-async-handler")
const Scale = require("../models/scaleModel")
const ScaleResults = require("../models/scaleResults")

// @desc  Get scale
// @route Get /api/scale/:month
// @access Public

const getScales = asyncHandler( async (req,res) => {
    const scales = await Scale.find()
    res.status(200).json(scales[0][req.params['month']])
})
// @desc  Set scale
// @route Post /api/scale
// @access Private
const setScale = asyncHandler( async (req,res) => {
    let results = req.body.results
    if(results.length==0){
        res.status(400)
        throw new Error("Kindly fill the form properly")
    }
    let scale = {user:req.user.id}
    scale[req.body.months] = results
    const sr = await ScaleResults.create(scale)
    res.status(200).json(sr)
})

// @desc  Get scale result
// @route Get /api/scale/result/:month
// @access Public
const getScaleResult = asyncHandler( async (req,res) => {
    const scaleResult = await ScaleResults.findOne({user:req.query.user})
    if (scaleResult != null){
        res.status(200).json(scaleResult[req.params['month']])
    }
})

module.exports = {
    getScales,
    setScale,
    getScaleResult
}