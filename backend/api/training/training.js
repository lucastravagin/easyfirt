const restful = require('node-restful')
const mongoose = require('mongoose')




const trainingSchema = new mongoose.Schema({
    descricao: {type: String, required: true},
    membro: {type: String, required: false}
})

module.exports = restful.model('Training', trainingSchema)