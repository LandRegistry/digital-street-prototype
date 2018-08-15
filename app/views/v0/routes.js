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
    let role = 'anonymous'
    if (lastURL) {
        const lastEndpoint = lastURL.substr(lastURL.lastIndexOf('/') + 1)
        if (lastEndpoint == 'seller-land-registry-checks') {
            role = 'owner'
        } else if (lastEndpoint == 'seller-upload-documents') {
            role = 'seller'
        }
    }
    res.render(path.resolve(__dirname, './property-logbook.html'), { role: role })
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
    console.log(req.body)
    if (['estate_agent', 'surveyor'].includes(req.body['delegate-type'])) {
        res.render(path.resolve(__dirname, './property-logbook.html'), { role: 'seller' })
    } else if (req.body['delegate-type'] == 'conveyancer') {
        res.render(path.resolve(__dirname, './seller-draft-sales-contract.html'))
    }
})

module.exports = router
