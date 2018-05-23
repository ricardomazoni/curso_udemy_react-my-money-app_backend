const Equipamento = require('./equipamento')
const errorHandler = require('../common/errorHandler')

Equipamento.methods(['get','post','put','delete'])

/**
 * Atualização para retornar o novo objeto
 * por padrao ele volta o obj antigo
 */

Equipamento.updateOptions({new: true, runValidators: true})
Equipamento.after('post', errorHandler).after('put', errorHandler)

module.exports = Equipamento