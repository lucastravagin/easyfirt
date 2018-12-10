const restful = require('node-restful')
const mongoose = require('mongoose')
const validators_ = require('../../config/validate')

const treino = new mongoose.Schema({
    exercicio: {type: String, required: true},
    serie: {type: Number, required: true},
    carga: {type: String, required: true},
})

const segundaSchema = new mongoose.Schema({
    exercicio: {type: String, required: true},
    serie: {type: Number, min: 0, required: true},
    carga: {type: Number, min: 0, required: true}
})

const tercaSchema = new mongoose.Schema({
    exercicio: {type: String, required: true},
    serie: {type: Number, min: 0, required: true},
    carga: {type: Number, min: 0, required: true}
})
const quartaSchema = new mongoose.Schema({
    exercicio: {type: String, required: true},
    serie: {type: Number, min: 0, required: true},
    carga: {type: Number, min: 0, required: true}
})
const quintaSchema = new mongoose.Schema({
    exercicio: {type: String, required: true},
    serie: {type: Number, min: 0, required: true},
    carga: {type: Number, min: 0, required: true}
})
const sextaSchema = new mongoose.Schema({
    exercicio: {type: String, required: true},
    serie: {type: Number, min: 0, required: true},
    carga: {type: Number, min: 0, required: true}
})
const sabadoSchema = new mongoose.Schema({
    exercicio: {type: String, required: true},
    serie: {type: Number, min: 0, required: true},
    carga: {type: Number, min: 0, required: true}
})


const avalicaoPeriodicaSchema = new mongoose.Schema({
    peso: {type: String, required: true}, 
    altura: {type: String, required: true}, 
    subescapular: {type: Number, required: true}, 
    triceps: {type: Number, required: true}, 
    coxa: {type: Number, required: true}, 
    supra_iliaca: {type: Number, required: true}, 
    dataAvalicao: {type: Date, required: true, default: Date.now},
    abdome: {type: Number, required: true }, 
    peitoral: {type: Number, required: true }, 
    auxiliar_media:{type: Number, required: true },
    percentual:{type: Number, required: true },
    massaGorda: {type: Number, required: true },
    massaMagra: {type: Number, required: true}
})

const studentSchema = new mongoose.Schema({
    nome: {type: String, required: true},
    dataCadastro: {type: Date, required: true, default: Date.now },
    dataNascimento: {type: String, requried: true},
    rg: {type: String, requried: true},
    sexo: {type: String, required: true},
    cpf: { type: String, required: true, validate: {
        validator: validators_.validateCPF,
        message: '{PATH}: CPF Inválido ({VALUE})'
    } },
    objetivo: {type: String, required: true},
    avaliacoesFisicas: [avalicaoPeriodicaSchema],
    segunda: [segundaSchema],
    terca: [tercaSchema],
    quarta: [quartaSchema],
    quinta: [quintaSchema],
    sexta: [sextaSchema],
    sabado: [sabadoSchema]
})

module.exports = restful.model('Student', studentSchema)