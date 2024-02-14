const express = require('express')
const { getISAA, setISAA,getIsaaResult } = require('../controllers/isaaController')
const { protect } = require('../middleware/authMiddleware')
const router = express.Router()

router.route("/").get(getISAA)
router.route("/result").get(getIsaaResult)
router.route("/").post(protect,setISAA)

module.exports = router