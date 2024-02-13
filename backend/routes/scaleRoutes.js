const express = require('express')
const { getScales, setScale,getScaleResult } = require('../controllers/scaleController')
const { protect } = require('../middleware/authMiddleware')
const router = express.Router()

router.route("/:month").get(getScales)
router.route("/result/:month").get(getScaleResult)
router.route("/").post(protect,setScale)

module.exports = router