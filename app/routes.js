const express = require('express')
const router = express.Router()
const glob = require('glob')
const path = require('path')

// Mount version specific routes
glob(path.join(__dirname, 'views/**/routes.js'), function(err, files) {
    if(err) {
        throw err
    }
    
    files.forEach(function(file) {
        const prototypeVersion = path.dirname(path.relative(path.join(__dirname, 'views/'), file));
        
        // Mount all routes exposed onto a path reflecting the prototype version
        router.use('/' + prototypeVersion, require(file))
    })
})

module.exports = router
