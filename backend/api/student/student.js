const restful = require('node-restful')
const mongoose = require('mongoose')

const avalicaoPeriodicaSchema = new mongoose.Schema({
    nome: {type: String, required: true},
    cpf: {type: String, required: true},
    peso: {type: Number, required: true},
    altura: {type: Number, required: true},
    subescapular: {type: Number, required: true},
    triceps: {type: Number, required: true},
    coxa: {type: Number, required: true},
    supra_iliaca: {type: Number, required: true},
    dataAvalicao: {type: Date, required: true},
    abdome: {type: Number, required: true },
    peitoral: {type: Number, required: true },
    auxiliar_media:{type: Number, required: true },
    triceps:{type: Number, required: true }
})

const studentSchema = new mongoose.Schema({
    nome: {type: String, required: true},
    dataCadastro: {type: Date, required: true, default: Date.now },
    dataNascimento: {type: String, requried: true},
    rg: {type: String, requried: true},
    sexo: {type: String, required: true},
    cpf: {type: String, requried: true},
    objetivo: {type: String, required: true},
    avaliacoesFisicas: [avalicaoPeriodicaSchema]
})

module.exports = restful.model('Student', studentSchema)