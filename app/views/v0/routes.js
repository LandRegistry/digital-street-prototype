const express = require('express')
const router = express.Router()

router.get('/foo', function(req, res) {
    res.send('Do weird logic here if you want')
})

module.exports = router
