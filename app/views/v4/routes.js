const express = require('express')
const fs = require('fs')
const path = require('path')
const moment = require('moment')
const router = express.Router()

// Seller's conveyancer login page
router.get('/conveyit4u/login-1', function(req, res) {
    const appStyle = 'conveyit4u'
    const nextURL = '/v4/conveyit4u/case-list-waiting-for-title'
    res.render(path.resolve(__dirname, './conveyancer/conveyit4u/login.html'), { appStyle: appStyle, nextURL: nextURL })
})

// Initial case list page with action 'Waiting for title information'
router.get('/conveyit4u/case-list-waiting-for-title', function(req, res) {
    const nextURL = '/v4/gov/seller-login'
    const userName = 'Natasha Powell'
    res.render(path.resolve(__dirname, './conveyancer/conveyit4u/case_list_waiting_for_title.html'),
               { nextURL: nextURL, userName: userName })
})

// Seller's login page on GOV
router.get('/gov/seller-login', function(req, res) {
    const nextURL = '/v4/gov/instruct-start'
    res.render(path.resolve(__dirname, './gov/login.html'),
               { nextURL: nextURL })
})

// Start page for share property details
router.get('/gov/instruct-start', function(req, res) {
    const nextURL = '/v4/gov/select-title'
    res.render(path.resolve(__dirname, './gov/start_page.html'),
               { nextURL: nextURL })
})

// Select land or property page
router.get('/gov/select-title', function(req, res) {
    const nextURL = '/v4/gov/select-conveyancer'
    res.render(path.resolve(__dirname, './gov/select_title.html'),
               { nextURL: nextURL })
})

// Select conveyancer page
router.get('/gov/select-conveyancer', function(req, res) {
    const nextURL = '/v4/gov/select-case-ref'
    res.render(path.resolve(__dirname, './gov/select_conveyancer.html'),
               { nextURL: nextURL })
})

// Enter case reference page
router.get('/gov/select-case-ref', function(req, res) {
    const nextURL = '/v4/gov/instruct-confirm'
    res.render(path.resolve(__dirname, './gov/select_case_ref.html'),
               { nextURL: nextURL })
})

// Confirm instruction details page
router.get('/gov/instruct-confirm', function(req, res) {
    const nextURL = '/v4/gov/instruct-completed'
    res.render(path.resolve(__dirname, './gov/instruct_confirm.html'),
               { nextURL: nextURL })
})

// Instruction completed page
router.get('/gov/instruct-completed', function(req, res) {
    const nextURL = '/v4/conveyit4u/case-list-view-title'
    res.render(path.resolve(__dirname, './gov/instruct_completed.html'),
               { nextURL: nextURL })
})

// Case list with action 'View full title information'
router.get('/conveyit4u/case-list-view-title', function(req, res) {
    const nextURL = '/v4/conveyit4u/case-list-request-discharge'
    const userName = 'Natasha Powell'
    res.render(path.resolve(__dirname, './conveyancer/conveyit4u/case_list_view_title.html'),
               { nextURL: nextURL, userName: userName })
})

// Case list with action 'Request discharge of current mortgage'
router.get('/conveyit4u/case-list-request-discharge', function(req, res) {
    const nextURL = '/v4/loans4homes/login'
    const userName = 'Natasha Powell'
    res.render(path.resolve(__dirname, './conveyancer/conveyit4u/case_list_request_discharge.html'),
               { nextURL: nextURL, userName: userName })
})

// Lender login
router.get('/loans4homes/login', function(req, res) {
    const nextURL = '/v4/loans4homes/charge-list-agree-to-discharge'
    res.render(path.resolve(__dirname, './lender/loans4homes/login.html'),
               { nextURL: nextURL })
})

// Lender charge list with action 'Agree to discharge'
router.get('/loans4homes/charge-list-agree-to-discharge', function(req, res) {    
    const nextURL = '/v4/loans4homes/agree-to-discharge'
    const userName = 'Terry Jenkins'
    res.render(path.resolve(__dirname, './lender/loans4homes/charge_list_agree_to_discharge.html'),
               { nextURL: nextURL, userName: userName })
})

// Lender 'agree to discharge
router.get('/loans4homes/agree-to-discharge', function(req, res) {
    const nextURL = '/v4/loans4homes/charge-list-discharge-approved'
    const userName = 'Terry Jenkins'
    res.render(path.resolve(__dirname, './lender/loans4homes/agree_to_discharge.html'),
    { nextURL: nextURL, userName: userName })
})

// Lender charge list with action 'Discharge approved'
router.get('/loans4homes/charge-list-discharge-approved', function(req, res) {    
    const nextURL = '/v4/conveyit4u/case-list-draft-sales'
    const userName = 'Terry Jenkins'
    res.render(path.resolve(__dirname, './lender/loans4homes/charge_list_discharge_approved.html'),
               { nextURL: nextURL, userName: userName })
})


// Case list with action 'Draft sales agreement'
router.get('/conveyit4u/case-list-draft-sales', function(req, res) {
    const nextURL = '/v4/conveyit4u/draft-sales-agreement'
    const userName = 'Natasha Powell'
    res.render(path.resolve(__dirname, './conveyancer/conveyit4u/case_list_draft_sales.html'),
               { nextURL: nextURL, userName: userName })
})

// Case list with action 'Draft sales agreement'
router.get('/conveyit4u/draft-sales-agreement', function(req, res) {
    const nextURL = '/v4/conveyit4u/case-list-waiting-for-agreement'
    const userName = 'Natasha Powell'
    res.render(path.resolve(__dirname, './conveyancer/conveyit4u/draft_contract.html'),
               { nextURL: nextURL, userName: userName })
})

// Case list with action 'Waiting for agreement'
router.get('/conveyit4u/case-list-waiting-for-agreement', function(req, res) {
    const nextURL = '/v4/propertylaw/login-1'
    const userName = 'Natasha Powell'
    res.render(path.resolve(__dirname, './conveyancer/conveyit4u/case_list_waiting_for_agreement.html'),
               { nextURL: nextURL, userName: userName })
})

// Buyer's conveyancer login page
router.get('/propertylaw/login-1', function(req, res) {
    const nextURL = '/v4/propertylaw/case-list-review-sales-agreement'
    res.render(path.resolve(__dirname, './conveyancer/propertylaw/login.html'),
               { nextURL: nextURL })
})

// Buyer's conveyancer's case list with action 'Review sales agreement'
router.get('/propertylaw/case-list-review-sales-agreement', function(req, res) {
    const nextURL = '/v4/propertylaw/review-sales-agreement'
    const userName = 'Samuel Barnes'
    res.render(path.resolve(__dirname, './conveyancer/propertylaw/case_list_review_sales_agreement.html'),
               { nextURL: nextURL, userName: userName })
})

// Review sales agreement
router.get('/propertylaw/review-sales-agreement', function(req, res) {
    // Set completion date 3 weeks in the future
    const completionDate = moment().add(21, 'days').format('Do MMMM YYYY')
    const contractDate = moment().format('DD/MM/YYYY HH:mm:ss')
    const nextURL = '/v4/conveyit4u/notification-sign-agreements'
    const userName = 'Samuel Barnes'
    res.render(path.resolve(__dirname, './conveyancer/propertylaw/review_contract.html'),
               { nextURL: nextURL, completionDate: completionDate, contractDate: contractDate, userName: userName })
})

// Seller's notification to sign the sales and transfer agreements
router.get('/conveyit4u/notification-sign-agreements', function(req, res) {
    const nextURL = '/v4/conveyit4u/login-2'
    res.render(path.resolve(__dirname, './conveyancer/notifications/notification_sign_agreements.html'),
               { nextURL: nextURL })
})

// Login page for seller on their conveyancer's portal
router.get('/conveyit4u/login-2', function(req, res) {
    const nextURL = '/v4/conveyit4u/agreement-context'
    res.render(path.resolve(__dirname, './conveyancer/conveyit4u/login.html'),
               { nextURL: nextURL })
})

// Context page for seller prior to agreement
router.get('/conveyit4u/agreement-context', function(req, res) {
    const nextURL = '/v4/conveyit4u/accept-agreement'
    const userName = "Lisa White"
    res.render(path.resolve(__dirname, './conveyancer/conveyit4u/agreement_context.html'),
               { nextURL: nextURL, userName: userName })
})

// Seller accept agreement page
router.get('/conveyit4u/accept-agreement', function(req, res) {
    const nextURL = '/v4/conveyit4u/confirm-agreement'
    const userName = "Lisa White"
    res.render(path.resolve(__dirname, './conveyancer/conveyit4u/accept_agreement.html'),
               { nextURL: nextURL, userName: userName })
})

// Seller confirm agreement page
router.get('/conveyit4u/confirm-agreement', function(req, res) {
    const nextURL = '/v4/conveyit4u/agreement-signed'
    const userName = "Lisa White"
    res.render(path.resolve(__dirname, './conveyancer/conveyit4u/confirm_agreement.html'),
               { nextURL: nextURL, userName: userName })
})

// Seller agreement signed page
router.get('/conveyit4u/agreement-signed', function(req, res) {
    // Set completion date 3 weeks in the future
    const completionDate = moment().add(21, 'days').format('Do MMMM YYYY')
    const nextURL = '/v4/propertylaw/notification-sign-agreements'
    const userName = "Lisa White"
    res.render(path.resolve(__dirname, './conveyancer/conveyit4u/agreement_signed.html'),
               { nextURL: nextURL, userName: userName, completionDate: completionDate })
})

// Buyer's notification to sign the sales and transfer agreements
router.get('/propertylaw/notification-sign-agreements', function(req, res) {
    const nextURL = '/v4/propertylaw/login-2'
    res.render(path.resolve(__dirname, './conveyancer/notifications/notification_sign_agreements_buyer.html'),
               { nextURL: nextURL })
})

// Login page for the buyer on their conveyancer's portal
router.get('/propertylaw/login-2', function(req, res) {
    const nextURL = '/v4/propertylaw/agreement-context'
    res.render(path.resolve(__dirname, './conveyancer/propertylaw/login.html'),
               { nextURL: nextURL })
})

// Context page for buyer prior to agreement
router.get('/propertylaw/agreement-context', function(req, res) {
    const nextURL = '/v4/propertylaw/accept-agreement'
    const userName = "David Jones"
    res.render(path.resolve(__dirname, './conveyancer/propertylaw/agreement_context.html'),
               { nextURL: nextURL, userName: userName })
})

// Buyer accept agreement page
router.get('/propertylaw/accept-agreement', function(req, res) {
    const nextURL = '/v4/propertylaw/confirm-agreement'
    const userName = "David Jones"
    res.render(path.resolve(__dirname, './conveyancer/propertylaw/accept_agreement.html'),
               { nextURL: nextURL, userName: userName })
})

// Buyer confirm agreement page
router.get('/propertylaw/confirm-agreement', function(req, res) {
    const nextURL = '/v4/propertylaw/agreement-signed'
    const userName = "David Jones"
    res.render(path.resolve(__dirname, './conveyancer/propertylaw/confirm_agreement.html'),
               { nextURL: nextURL, userName: userName })
})

// Buyer agreement signed page
router.get('/propertylaw/agreement-signed', function(req, res) {
    // Set completion date 3 weeks in the future
    const completionDate = moment().add(21, 'days').format('Do MMMM YYYY')
    const userName = "David Jones"
    const nextURL = '/v4/conveyit4u/notification-transfer-complete'
    res.render(path.resolve(__dirname, './conveyancer/propertylaw/agreement_signed.html'),
               { nextURL: nextURL, completionDate: completionDate, userName: userName })
})

// Seller notification for completion day
router.get('/conveyit4u/notification-transfer-complete', function(req, res) {
    const nextURL = '/v4/conveyit4u/login-3'
    res.render(path.resolve(__dirname, './conveyancer/notifications/notification_completion_day.html'),
               { nextURL: nextURL })
})

// Seller login page on their conveyancer's portal on completion day
router.get('/conveyit4u/login-3', function(req, res) {
    const nextURL = '/v4/conveyit4u/transfer-complete'
    res.render(path.resolve(__dirname, './conveyancer/conveyit4u/login.html'),
               { nextURL: nextURL })
})

// Transfer complete confirmation page for seller
router.get('/conveyit4u/transfer-complete', function(req, res) {
    const nextURL = '/v4/propertylaw/notification-transfer-complete'
    const userName = "Lisa White"
    res.render(path.resolve(__dirname, './conveyancer/conveyit4u/transfer_complete.html'),
               { nextURL: nextURL, userName: userName })
})

// Transfer complete confirmation page for seller
router.get('/propertylaw/notification-transfer-complete', function(req, res) {
    const nextURL = '/v4/propertylaw/login-3'
    res.render(path.resolve(__dirname, './conveyancer/notifications/notification_completion_day.html'),
               { nextURL: nextURL })
})

// Buyer login page on their conveyancer's portal on completion day
router.get('/propertylaw/login-3', function(req, res) {
    const nextURL = '/v4/propertylaw/transfer-complete'
    res.render(path.resolve(__dirname, './conveyancer/propertylaw/login.html'),
               { nextURL: nextURL })
})

// Transfer complete confirmation page for buyer
router.get('/propertylaw/transfer-complete', function(req, res) {
    const nextURL = '/'
    const userName = "David Jones"
    res.render(path.resolve(__dirname, './conveyancer/propertylaw/transfer_complete.html'),
               { nextURL: nextURL, userName: userName })
})

/********
 * Login route to enable end to end flow without seller instructing conveyancer
********/
router.get('/conveyit4u/alternate-login', function(req, res) {
    const nextURL = '/v4/conveyit4u/case-list-view-title'
    res.render(path.resolve(__dirname, './conveyancer/conveyit4u/login.html'),
               { nextURL: nextURL })
})

module.exports = router
