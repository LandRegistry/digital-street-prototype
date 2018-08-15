const express = require('express')
const fs = require('fs')
const path = require('path')
const router = express.Router()

router.get('/foo', function(req, res) {
    res.send('Do weird logic here if you want')
})

router.get('/property-logbook', function(req, res) {
    // const propertyJSON = JSON.parse(fs.readFileSync('../../../data/v0-property.json'))
    const lastURL = req.headers.referer
    console.log(lastURL)
    if (lastURL) {
        const lastEndpoint = lastURL.substr(lastURL.lastIndexOf('/') + 1)
        if (lastEndpoint == 'seller-land-registry-checks') {
            req.session.role = 'owner'
        } else if (lastEndpoint == 'seller-upload-documents') {
            req.session.role = 'seller'
        }
    }
    res.render(path.resolve(__dirname, './property-logbook.html'), { role: req.session.role })
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

router.post('/delegate-access', function(req, res) {
    req.session.data[req.body['delegate-type']] = {
        'name': req.body['delegate-name'],
        'email': req.body['delegate-email'],
    }
    if (req.body['delegate-type'] == 'estate_agent') {
        req.session.notification = 'valuation'
        res.redirect('/v0/seller-estate-agent-adds-valuation')
    } else if (req.body['delegate-type'] == 'conveyancer') {
        res.redirect('/v0/seller-draft-sales-contract')
    }
})

module.exports = router
