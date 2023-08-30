const asyncHandler = require("express-async-handler")
const Scale = require("../models/scaleModel")
const ScaleResults = require("../models/scaleResults")

// @desc  Get scale
// @route Get /api/scale
// @access Public

const getScales = asyncHandler( async (req,res) => {
    const scales = await Scale.find()
    res.status(200).json(scales[0][req.body.months])
})
// @desc  Set scale
// @route Post /api/scale
// @access Private
const setScale = asyncHandler( async (req,res) => {
    let results = JSON.parse(req.body.results)
    if(results.length==0){
        res.status(400)
        throw new Error("Kindly fill the form properly")
    }
    let scale = {user:req.user.id}
    scale[req.body.months] = results
    const sr = await ScaleResults.create(scale)
    res.status(200).json(sr)
})

module.exports = {
    getScales,
    setScale
}