const express = require('express')
const fs = require('fs')
const path = require('path')
const moment = require('moment')
const router = express.Router()

// Seller's conveyancer login page
router.get('/conveyit4u/login-1', function(req, res) {
    const appStyle = 'conveyit4u'
    const nextURL = '/v3/conveyit4u/case-list-1'
    res.render(path.resolve(__dirname, './conveyancer/conveyit4u/login.html'), { appStyle: appStyle, nextURL: nextURL })
})

// Initial case list page with action 'Waiting for title information'
router.get('/conveyit4u/case-list-1', function(req, res) {
    const nextURL = '/v3/gov/seller-login'
    const userName = 'Natasha Powell'
    res.render(path.resolve(__dirname, './conveyancer/conveyit4u/case_list_1.html'),
               { nextURL: nextURL, userName: userName })
})

// Seller's login page on GOV
router.get('/gov/seller-login', function(req, res) {
    const nextURL = '/v3/gov/instruct-start'
    res.render(path.resolve(__dirname, './gov/login.html'),
               { nextURL: nextURL })
})

// Start page for share property details
router.get('/gov/instruct-start', function(req, res) {
    const nextURL = '/v3/gov/select-title'
    res.render(path.resolve(__dirname, './gov/start_page.html'),
               { nextURL: nextURL })
})

// Select land or property page
router.get('/gov/select-title', function(req, res) {
    const nextURL = '/v3/gov/select-conveyancer'
    res.render(path.resolve(__dirname, './gov/select_title.html'),
               { nextURL: nextURL })
})

// Select conveyancer page
router.get('/gov/select-conveyancer', function(req, res) {
    const nextURL = '/v3/gov/select-case-ref'
    res.render(path.resolve(__dirname, './gov/select_conveyancer.html'),
               { nextURL: nextURL })
})

// Enter case reference page
router.get('/gov/select-case-ref', function(req, res) {
    const nextURL = '/v3/gov/instruct-confirm'
    res.render(path.resolve(__dirname, './gov/select_case_ref.html'),
               { nextURL: nextURL })
})

// Confirm instruction details page
router.get('/gov/instruct-confirm', function(req, res) {
    const nextURL = '/v3/gov/instruct-completed'
    res.render(path.resolve(__dirname, './gov/instruct_confirm.html'),
               { nextURL: nextURL })
})

// Instruction completed page
router.get('/gov/instruct-completed', function(req, res) {
    const nextURL = '/v3/conveyit4u/case-list-2'
    res.render(path.resolve(__dirname, './gov/instruct_completed.html'),
               { nextURL: nextURL })
})

// Case list with action 'View full title information'
router.get('/conveyit4u/case-list-2', function(req, res) {
    const nextURL = '/v3/conveyit4u/case-list-3'
    const userName = 'Natasha Powell'
    res.render(path.resolve(__dirname, './conveyancer/conveyit4u/case_list_2.html'),
               { nextURL: nextURL, userName: userName })
})

// Case list with action 'Draft contract'
router.get('/conveyit4u/case-list-3', function(req, res) {
    const nextURL = '/v3/conveyit4u/draft-contract'
    const userName = 'Natasha Powell'
    res.render(path.resolve(__dirname, './conveyancer/conveyit4u/case_list_3.html'),
               { nextURL: nextURL, userName: userName })
})

// Case list with action 'Draft contract'
router.get('/conveyit4u/draft-contract', function(req, res) {
    const nextURL = '/v3/conveyit4u/case-list-4'
    const userName = 'Natasha Powell'
    res.render(path.resolve(__dirname, './conveyancer/conveyit4u/draft_contract.html'),
               { nextURL: nextURL, userName: userName })
})

// Case list with action 'Waiting for agreement'
router.get('/conveyit4u/case-list-4', function(req, res) {
    const nextURL = '/v3/propertylaw/login-1'
    const userName = 'Natasha Powell'
    res.render(path.resolve(__dirname, './conveyancer/conveyit4u/case_list_4.html'),
               { nextURL: nextURL, userName: userName })
})

// Buyer's conveyancer login page
router.get('/propertylaw/login-1', function(req, res) {
    const nextURL = '/v3/propertylaw/case-list-1'
    res.render(path.resolve(__dirname, './conveyancer/propertylaw/login.html'),
               { nextURL: nextURL })
})

// Buyer's conveyancer's case list with action 'Review contract'
router.get('/propertylaw/case-list-1', function(req, res) {
    const nextURL = '/v3/propertylaw/review-contract'
    const userName = 'Samuel Barnes'
    res.render(path.resolve(__dirname, './conveyancer/propertylaw/case_list_1.html'),
               { nextURL: nextURL, userName: userName })
})

// Review contract page
router.get('/propertylaw/review-contract', function(req, res) {
    // Set completion date 3 weeks in the future
    const completionDate = moment().add(21, 'days').format('Do MMMM YYYY')
    const contractDate = moment().format('DD/MM/YYYY HH:mm:ss')
    const nextURL = '/v3/conveyit4u/notification-sign-agreements'
    const userName = 'Samuel Barnes'
    res.render(path.resolve(__dirname, './conveyancer/propertylaw/review_contract.html'),
               { nextURL: nextURL, completionDate: completionDate, contractDate: contractDate, userName: userName })
})

// Seller's notification to sign the sales and transfer agreements
router.get('/conveyit4u/notification-sign-agreements', function(req, res) {
    const nextURL = '/v3/conveyit4u/login-2'
    res.render(path.resolve(__dirname, './conveyancer/notifications/notification_sign_agreements.html'),
               { nextURL: nextURL })
})

// Login page for seller on their conveyancer's portal
router.get('/conveyit4u/login-2', function(req, res) {
    const nextURL = '/v3/conveyit4u/agreement-context'
    res.render(path.resolve(__dirname, './conveyancer/conveyit4u/login.html'),
               { nextURL: nextURL })
})

// Context page for seller prior to agreement
router.get('/conveyit4u/agreement-context', function(req, res) {
    const nextURL = '/v3/conveyit4u/accept-agreement'
    const userName = "Lisa White"
    res.render(path.resolve(__dirname, './conveyancer/conveyit4u/agreement_context.html'),
               { nextURL: nextURL, userName: userName })
})

// Seller accept agreement page
router.get('/conveyit4u/accept-agreement', function(req, res) {
    const nextURL = '/v3/conveyit4u/confirm-agreement'
    const userName = "Lisa White"
    res.render(path.resolve(__dirname, './conveyancer/conveyit4u/accept_agreement.html'),
               { nextURL: nextURL, userName: userName })
})

// Seller confirm agreement page
router.get('/conveyit4u/confirm-agreement', function(req, res) {
    const nextURL = '/v3/conveyit4u/agreement-signed'
    const userName = "Lisa White"
    res.render(path.resolve(__dirname, './conveyancer/conveyit4u/confirm_agreement.html'),
               { nextURL: nextURL, userName: userName })
})

// Seller agreement signed page
router.get('/conveyit4u/agreement-signed', function(req, res) {
    // Set completion date 3 weeks in the future
    const completionDate = moment().add(21, 'days').format('Do MMMM YYYY')
    const nextURL = '/v3/propertylaw/notification-sign-agreements'
    const userName = "Lisa White"
    res.render(path.resolve(__dirname, './conveyancer/conveyit4u/agreement_signed.html'),
               { nextURL: nextURL, userName: userName, completionDate: completionDate })
})

// Buyer's notification to sign the sales and transfer agreements
router.get('/propertylaw/notification-sign-agreements', function(req, res) {    
    const nextURL = '/v3/propertylaw/login-2'
    res.render(path.resolve(__dirname, './conveyancer/notifications/notification_sign_agreements.html'),
               { nextURL: nextURL })
})

// Login page for the buyer on their conveyancer's portal
router.get('/propertylaw/login-2', function(req, res) {    
    const nextURL = '/v3/propertylaw/agreement-context'
    res.render(path.resolve(__dirname, './conveyancer/propertylaw/login.html'),
               { nextURL: nextURL })
})

// Context page for buyer prior to agreement
router.get('/propertylaw/agreement-context', function(req, res) {    
    const nextURL = '/v3/propertylaw/accept-agreement'
    const userName = "David Jones"
    res.render(path.resolve(__dirname, './conveyancer/propertylaw/agreement_context.html'),
               { nextURL: nextURL, userName: userName })
})

// Buyer accept agreement page
router.get('/propertylaw/accept-agreement', function(req, res) {    
    const nextURL = '/v3/propertylaw/confirm-agreement'
    const userName = "David Jones"
    res.render(path.resolve(__dirname, './conveyancer/propertylaw/accept_agreement.html'),
               { nextURL: nextURL, userName: userName })
})

// Buyer confirm agreement page
router.get('/propertylaw/confirm-agreement', function(req, res) {    
    const nextURL = '/v3/propertylaw/agreement-signed'
    const userName = "David Jones"
    res.render(path.resolve(__dirname, './conveyancer/propertylaw/confirm_agreement.html'),
               { nextURL: nextURL, userName: userName })
})

// Buyer agreement signed page
router.get('/propertylaw/agreement-signed', function(req, res) {
    // Set completion date 3 weeks in the future
    const completionDate = moment().add(21, 'days').format('Do MMMM YYYY')
    const nextURL = '/v3/conveyit4u/notification-transfer-complete'    
    res.render(path.resolve(__dirname, './conveyancer/propertylaw/agreement_signed.html'),
               { nextURL: nextURL, completionDate: completionDate })
})

// Seller notification for completion day
router.get('/conveyit4u/notification-transfer-complete', function(req, res) {
    const nextURL = '/v3/conveyit4u/login-3'    
    res.render(path.resolve(__dirname, './conveyancer/notifications/notification_completion_day.html'),
               { nextURL: nextURL })
})

// Seller login page on their conveyancer's portal on completion day
router.get('/conveyit4u/login-3', function(req, res) {
    const nextURL = '/v3/conveyit4u/transfer-complete'
    res.render(path.resolve(__dirname, './conveyancer/conveyit4u/login.html'),
               { nextURL: nextURL })
})

// Transfer complete confirmation page for seller
router.get('/conveyit4u/transfer-complete', function(req, res) {
    const nextURL = '/v3/propertylaw/notification-transfer-complete'    
    const userName = "Lisa White"
    res.render(path.resolve(__dirname, './conveyancer/conveyit4u/transfer_complete.html'),
               { nextURL: nextURL, userName: userName })
})

// Transfer complete confirmation page for seller
router.get('/propertylaw/notification-transfer-complete', function(req, res) {
    const nextURL = '/v3/propertylaw/login-3'        
    res.render(path.resolve(__dirname, './conveyancer/notifications/notification_completion_day.html'),
               { nextURL: nextURL })
})

// Buyer login page on their conveyancer's portal on completion day
router.get('/propertylaw/login-3', function(req, res) {
    const nextURL = '/v3/propertylaw/transfer-complete'        
    res.render(path.resolve(__dirname, './conveyancer/propertylaw/login.html'),
               { nextURL: nextURL })
})

// Transfer complete confirmation page for buyer
router.get('/propertylaw/transfer-complete', function(req, res) {
    const nextURL = '/'        
    res.render(path.resolve(__dirname, './conveyancer/propertylaw/transfer_complete.html'),
               { nextURL: nextURL })
})

/******** 
 * Login route to enable end to end flow without seller instructing conveyancer
********/
router.get('/conveyit4u/alternate-login', function(req, res) {
    const nextURL = '/v3/conveyit4u/case-list-3'        
    res.render(path.resolve(__dirname, './conveyancer/conveyit4u/login.html'),
               { nextURL: nextURL })
})



module.exports = router