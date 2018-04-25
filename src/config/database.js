/**
 * para startar o mongo
 * sudo systemctl start mongodb
 * mongod
 */
const mongoose = require('mongoose')
mongoose.Promise = global.Promise
module.exports = mongoose.connect('mongodb://localhost/mymoney')

mongoose.Error.messages.general.required = "O atributo '{PATH}' é obrigatório."
mongoose.Error.messages.Number.min =
    "O '{VALUE}' informado é menor  que o limite minimo de '{MIN}'."
