var express = require('express')
var router = express.Router()
var staticDataController = require('./route-controllers/staticDataController')

router.get('/', (req, res, next) => {
  res.sendStatus(200)
})

router.get('/getregionlist', staticDataController.getRegionList)
router.get('/getsystemlist', staticDataController.getSystemList)
router.get('/getsystemlistnowh', staticDataController.getSystemListNoWH)

module.exports = router
