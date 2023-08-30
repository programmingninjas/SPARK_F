const express = require('express')
const { getScales, setScale } = require('../controllers/scaleController')
const { protect } = require('../middleware/authMiddleware')
const router = express.Router()

router.route("/").get(getScales).post(protect,setScale)

module.exports = router