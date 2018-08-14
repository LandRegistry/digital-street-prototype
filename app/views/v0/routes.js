const express = require('express')
const fs = require('fs')
const path = require('path')
const router = express.Router()

router.get('/foo', function(req, res) {
    res.send('Do weird logic here if you want')
})

router.get('/property-logbook', function(req, res) {
    const propertyJSON = JSON.parse(fs.readFileSync('../../../data/v0-property.json'))
    const lastURL = req.headers.referer
    let role = 'anonymous'
    if (lastURL) {
        const lastEndpoint = lastURL.substr(lastURL.lastIndexOf('/') + 1)
        console.log(lastEndpoint)
        if (lastEndpoint == 'seller-land-registry-checks') {
            role = 'owner'
        }
    }
    res.render(path.resolve(__dirname, './property-logbook.html'), { role: role, property: propertyJSON })
})

router.get('/identify-sign-in', function(req, res) {
    const lastURL = req.headers.referer
    const nextURL = 'seller-land-registry-checks'
    if (lastURL) {
        const lastEndpoint = lastURL.substr(lastURL.lastIndexOf('/') + 1)
        if (lastEndpoint == 'buyer-make-an-offer') {
            nextURL = 'buyer-verify-agreement-in-principle'
        } 
    }
    res.render(path.resolve(__dirname, './identify-sign-in.html'), { nextURL: nextURL })
})

module.exports = router
