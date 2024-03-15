const Tdi = require('./canil')

Tdi.methods(['get','post', 'put', 'delete'])
Tdi.updateOptions({new:true,runValidators:true})

module.exports = Tdi