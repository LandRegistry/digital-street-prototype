const express = require('express')
const fs = require('fs')
const path = require('path')
const router = express.Router()

router.get('/foo', function(req, res) {
    res.send('Do weird logic here if you want')
})

router.get('/property-record', function(req, res) {
    const lastURL = req.headers.referer
    let notification = ""
    if (lastURL) {
        const lastEndpoint = lastURL.substr(lastURL.lastIndexOf('/') + 1)
        if (lastEndpoint == 'seller-land-registry-checks') {
            notification = 'registered'
            req.session.role = 'owner'
        } else if (lastEndpoint == 'seller-pre-contract-enquiries') {
            req.session.role = 'seller'
            notification = 'information'
        } else if (lastEndpoint == 'seller-estate-agent-adds-valuation') {
            notification = 'valuation'
            req.session.valuation = {
                "price": "£250,000",
                "valuer": "Movr",
                "date": "25 July 2018"
            }
        } else if (lastEndpoint == 'seller-solicitor-drafts-contract') { 
            notification = 'draft_contract'
        } else if (lastEndpoint == 'seller-receives-offer') {
            req.session.offer = "£250,000"
            notification = 'offer'
        } else if (lastEndpoint == 'seller-review-offer') {
            req.session.offer_accepted = new Date().toLocaleDateString('en-GB')
            notification = 'sales_contract'
        } else if (lastEndpoint == 'seller-sale-confirmation') {            
            req.session.role = ''
            req.session.sold = true
        } 
    }
    res.render(path.resolve(__dirname, './property-record.html'), 
        { 
            notification: notification,
            // notification: "offer", 
            offer: req.session.offer,
            // offer: "£250,000",
            offer_accepted: req.session.offer_accepted,
            // offer_accepted: true,
            role: req.session.role,
            // role: "seller",
            surveyor_report: req.session.surveyor_report,
            sold: req.session.sold,
            valuation: req.session.valuation
            // valuation: {
            //     "price": "£250,000",
            //     "valuer": "Movr",
            //     "date": "25 July 2018"
            // }
        })
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
    let selected_type = ""
    const delegate_types = ['other', 'seller_bank', 'seller_solicitor', 'estate_agent']
    for (delegate_type in delegate_types) {
        if (!req.session.data[delegate_types[delegate_type]]) {
            selected_type = delegate_types[delegate_type];
        }
    }
    res.render(path.resolve(__dirname, './seller-delegate-access.html'), { selected_type: selected_type, role: req.session.role })
})

router.post('/delegate-access', function(req, res) {
    req.session.data[req.body['delegate-type']] = {
        'name': req.body['delegate-name'],
        'email': req.body['delegate-email'],
    }
    if (req.body['delegate-type'] == 'estate_agent') {
        res.redirect('/v1/seller-estate-agent-adds-valuation')
    } else if (req.body['delegate-type'] == 'seller_solicitor') {
        res.redirect('/v1/seller-draft-sales-contract')
    } else if (req.body['delegate-type'] == 'seller_bank') {
        res.redirect('/v1/seller-delegate-access')
    } else if (req.body['delegate-type'] == 'other') {
        res.redirect('/v1/seller-surveyor-adds-report')
    } else {
        res.status(404).send('Not found')
    }
})

router.get('/seller-agree-to-sell', function(req, res) {
    const lastURL = req.headers.referer
    if (lastURL) {
        const lastEndpoint = lastURL.substr(lastURL.lastIndexOf('/') + 1)
        if (lastEndpoint == 'seller-final-sales-contract') {
            req.session.seller_sales_contract = true
        } else if (lastEndpoint == 'seller-transfer-ownership') {
            req.session.seller_transfer_ownership = true
        }
    }
    res.render(path.resolve(__dirname, './seller-agree-to-sell.html'), { seller_sales_contract: req.session.seller_sales_contract, seller_transfer_ownership: req.session.seller_transfer_ownership })
})

router.get('/seller-pre-contract-enquiries1', function(req, res) {
    res.render(path.resolve(__dirname, './seller-pre-contract-enquiries1.html'), { role: req.session.role})
})

router.get('/seller-pre-contract-enquiries2', function(req, res) {
    res.render(path.resolve(__dirname, './seller-pre-contract-enquiries2.html'), { role: req.session.role})
})

router.get('/seller-upload-documents', function(req, res) {
    res.render(path.resolve(__dirname, './seller-upload-documents.html'), { role: req.session.role})
})

// Buyer routes below here...

router.get('/buyer-marketplace', function(req, res) {
    var data = fs.readFileSync(__dirname + '/../../data/v1-marketplace.json')
    var parsedData = JSON.parse(data)
    res.render(path.resolve(__dirname, './buyer-marketplace'), {"data": parsedData})
})

module.exports = router
