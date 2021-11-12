const express = require('express')
const router = express.Router()
const path = require('path')


router.post('/simu/send', (req, res) => {
  const file = path.join(__dirname, '../file', 'send.json')
  res.send(require(file))
})

router.post('/model/tree', (req, res) => {
  const file = path.join(__dirname, '../file', 'tree.json')
  res.send(require(file))
})


router.post('/model/baseparam/getPointBasicData', (req, res) => {
  let index = req.body.index
  const file = path.join(__dirname, '../file/basicData', 'response' + (index + 1) + '.json')
  res.send(require(file))
})

module.exports = router
