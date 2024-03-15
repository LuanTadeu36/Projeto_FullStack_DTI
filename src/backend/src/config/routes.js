const express = require('express')

module.exports = function(server){
    const router = express.Router()
    server.use('/api',router)

    const canilService = require('../api/canil/canilService')
    canilService.register(router, '/canils')

}