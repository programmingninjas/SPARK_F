const express = require('express')
const { getdev,setdev,getdevResult } = require('../controllers/devController')
const { protect } = require('../middleware/authMiddleware')
const router = express.Router()

router.route("/").get(getdev)
router.route("/result").get(getdevResult)
router.route("/").post(protect,setdev)

module.exports = router