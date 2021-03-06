const restful = require('node-restful')
const mongoose = restful.mongoose

const equipamentoSchema = new mongoose.Schema({
    nr_equip: {type: String, required: true},
    descricao: {type: String, required: true},
    observacao: {type: String, required: false}
})

module.exports = restful.model('Equipamento', equipamentoSchema)