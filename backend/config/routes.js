const express = require('express')

module.exports = function(server) {
    //API Routes
    const router = express.Router()
    server.use('/api', router)

    // rota da api
    const billingCycleService = require('../api/billingCycle/billingCycleService')
    billingCycleService.register(router, '/billingCycle')

    const billingSumaryService = require('../api/billingSumary/billingSumaryService')
    router.route('/billingSumary').get(billingSumaryService.getSummary)

}