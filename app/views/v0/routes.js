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
    let notification = ""
    console.log(lastURL)
    if (lastURL) {
        const lastEndpoint = lastURL.substr(lastURL.lastIndexOf('/') + 1)
        if (lastEndpoint == 'seller-land-registry-checks') {
            req.session.role = 'owner'
        } else if (lastEndpoint == 'seller-upload-documents') {
            req.session.role = 'seller'
        } else if (lastEndpoint == 'seller-estate-agent-adds-valuation') {
            notification = 'valuation'
        } else if (lastEndpoint == 'seller-surveyor-adds-report') {
            notification = 'report'
        } 
    }
    res.render(path.resolve(__dirname, './property-logbook.html'), { role: req.session.role, notification: notification })
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

router.get('/seller-delegate-access', function(req, res) {
    // console.log(req.session.data)
    let selected_type = ""
    const delegate_types = ['surveyor', 'buyer_conveyancer', 'seller_conveyancer', 'estate_agent']
    for (delegate_type in delegate_types) {
        if (!req.session.data[delegate_types[delegate_type]]) {
            selected_type = delegate_types[delegate_type];
        }
    }
    res.render(path.resolve(__dirname, './seller-delegate-access.html'), { selected_type: selected_type })
})

router.post('/delegate-access', function(req, res) {
    req.session.data[req.body['delegate-type']] = {
        'name': req.body['delegate-name'],
        'email': req.body['delegate-email'],
    }
    if (req.body['delegate-type'] == 'estate_agent') {
        res.redirect('/v0/seller-estate-agent-adds-valuation')
    } else if (req.body['delegate-type'] == 'seller_conveyancer') {
        res.redirect('/v0/seller-draft-sales-contract')
    } else if (req.body['delegate-type'] == 'buyer_conveyancer') {
        res.redirect('/v0/seller-delegate-access')
    } else if (req.body['delegate-type'] == 'surveyor') {
        res.redirect('/v0/seller-surveyor-adds-report')
    } else {
        res.status(404).send('Not found')
    }
})

module.exports = router
