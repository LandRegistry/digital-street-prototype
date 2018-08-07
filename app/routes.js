const express = require('express')
const router = express.Router()

// Add your routes here - above the module.exports line
router.get('/about', function(req, res) {
    res.render('about')
})

router.get('/example', function(req, res) {
    res.render('generic-example', { title: "movr" })
})

module.exports = router
