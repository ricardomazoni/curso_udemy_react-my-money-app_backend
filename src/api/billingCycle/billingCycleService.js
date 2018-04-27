const BillingCycle = require('./billingCycle')
const errorHandler = require('../common/errorHandler')

BillingCycle.methods(['get','post','put','delete'])

/**
 * Atualização para retornar o novo objeto
 * por padrao ele volta o obj antigo
 */

 BillingCycle.updateOptions({new: true, runValidators: true})
 BillingCycle.after('post', errorHandler).after('put', errorHandler)

 /***
  * Criando rota para conta os registros
  */

  BillingCycle.route('count', (req, res, next) => {
      BillingCycle.count((error, value) => {
          if(error) {
            res.status(500).json({errors: [error]})
          } else {
              res.json({value})
          }
      })
  })

  /**
   * Criando Sumario para 
   * agrupar os dados de Credito e debito
   * pipeline de agregação
   * o 2º credit não é igual o primeiro o mesmo 
   * so recebe a contabilização
   */

//   BillingCycle.route('summary', (req, res, next) => {
//     BillingCycle.aggregate([{
//         $project: {credit: {$sum: "$credits.value"}, debt: {$sum: "$debts.value"}}
//     }, {
//         $group: {_id: null, credit: {$sum: "$credit"}, debt: {$sum: "$debt"}}
//     }, {
//         $project: {_id: 0, credit: 1, debt: 1}
//     }]).exec((error, result) => {
//         if(error) {
//             res.status(500).json({errors: [error]})
//         } else {
//             res.json(result[0] || { credit: 0, debt: 0 })
//         }
//     })
// })   


Array.prototype.concatAll = function () {
    let result = []
    this.forEach(items =>
      result = result.concat(items))
    return result
}
Array.prototype.concatMap = function (modifierFunction) {
    return this.map(modifierFunction).concatAll();
}

BillingCycle.route('summary', (req, res) => {
    BillingCycle.aggregate([{ 
        $project: { credit: '$credits.value', debt: '$debts.value' } },
    ], (error, result) => {
        if (error) {
            res.status(500).json({ errors: [error] });
        } else {
            const finalResult = result.concatMap((b) => {
                    const credit = b.credit.reduce((cred, cur) => cred + cur);
                    const debt = b.debt.reduce((deb, cur) => deb + cur);
                    return { credit, debt };
            }).reduce((obj, cur) => {
                const d = obj.debt + cur.debt;
                const c = obj.credit + cur.credit;
                return { credit: c, debt: d };
            }); 
            res.json(finalResult || { credit: 0, debt: 0 });
        }
    })
})

module.exports = BillingCycle

 