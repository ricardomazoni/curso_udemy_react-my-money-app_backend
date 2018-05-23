const CadEqp = require('./cadEquipamento')
const errorHandler = require('../common/errorHandler')

CadEqp.methods(['get','post','put','delete'])

/**
 * Atualização para retornar o novo objeto
 * por padrao ele volta o obj antigo
 */

CadEqp.updateOptions({new: true, runValidators: true})
CadEqp.after('post', errorHandler).after('put', errorHandler)

module.exports = CadEqp