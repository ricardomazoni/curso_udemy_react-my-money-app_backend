const BillingCycle = require('./billingCycle')

BillingCycle.methods(['get','post','put','delete'])

/**
 * Atualização para retornar o novo objeto
 * por padrao ele volta o obj antigo
 */

 BillingCycle.updateOptions({new: true, runValidators: true})

 module.exports = BillingCycle