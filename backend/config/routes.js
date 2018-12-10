const express = require('express') 
const auth = require('./../api/user/auth')

module.exports = function(server) {
    /*      * Rotas abertas      */
    const openApi = express.Router() 
    server.use('/oapi', openApi)
    const AuthService = require('../api/user/authService') 
    openApi.post('/login', AuthService.login) 
    openApi.post('/signup', AuthService.signup) 
    openApi.post('/validateToken', AuthService.validateToken)
    /*      * Rotas protegidas por Token JWT      */

    const protectedApi = express.Router() 
    server.use('/api', protectedApi)


    protectedApi.use(auth)

    const billingCycleService = require('../api/billingCycle/billingCycleService') 
    billingCycleService.register(protectedApi, '/billingCycle')

    const studentService = require('../api/student/studentService')
    studentService.register(protectedApi, '/students')

    const billingSummaryService = require('../api/billingSumary/billingSumaryService') 
    protectedApi.route('/billingSummary').get(billingSummaryService.getSummary)

    const trainingService = require('../api/training/trainingService') 
    trainingService.register(protectedApi, '/training')
    
}