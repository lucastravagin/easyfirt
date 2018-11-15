const restful = require('node-restful')
const mongoose = require('mongoose')


const treino = new mongoose.Schema({
    exercicio: {type: String, required: true},
    serie: {type: Number, required: true},
    carga: {type: String, required: true},
})

const listaDeTreino = new mongoose.Schema({
    segunda: [treino],
    terca: [treino],
    quarta: [treino],
    quinta: [treino],
    sexta: [treino],
    sabado: [treino],
    domingo: [treino],
})
const avalicaoPeriodicaSchema = new mongoose.Schema({
    peso: {type: Number, required: true}, 
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
    cpf: {type: String, requried: true},
    objetivo: {type: String, required: true},
    avaliacoesFisicas: [avalicaoPeriodicaSchema],
    listaDeTreino: [listaDeTreino]
})

module.exports = restful.model('Student', studentSchema)