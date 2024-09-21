const express = require('express')
const { getsocial,setsocial,getsocialResult } = require('../controllers/socialController')
const { protect } = require('../middleware/authMiddleware')
const router = express.Router()

router.route("/").get(getsocial)
router.route("/result").get(getsocialResult)
router.route("/").post(protect,setsocial)

module.exports = router