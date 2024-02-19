const express = require('express')
const { getPhysicaltime,setPhysicaltime } = require('../controllers/physicalController')
const { protect } = require('../middleware/authMiddleware')
const router = express.Router()

router.route("/").get(getPhysicaltime)
router.route("/").post(protect,setPhysicaltime)

module.exports = router