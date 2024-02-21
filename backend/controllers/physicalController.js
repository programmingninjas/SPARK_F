const asyncHandler = require("express-async-handler")
const physicalModel = require("../models/physicalModel")
const physicalresult = require("../models/physicalModel")


// @desc  Set isaa result
// @route Post /api/isaa
// @access Private
const setPhysicaltime = asyncHandler( async (req,res) => {
    let results = req.body
    if(results.length==0){
        res.status(400)
        throw new Error("Kindly fill the form properly")
    }
    let scale = {user:req.user.id,results}
    const sr = await physicalresult.insertMany(scale)
    res.status(200).json(sr)
})
// @desc  set Physical Reaction Time
// @route set /api/physicaltime
// @access Protected
const getPhysicaltime = asyncHandler( async (req,res) => {
    const result = await physicalModel.findOne({user:req.query.user})
    res.status(200).json(result)
})

module.exports = {
    getPhysicaltime,
    setPhysicaltime,
}