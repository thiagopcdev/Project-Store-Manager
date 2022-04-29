const Sales = require('../../model/document')('sales');

module.exports = (id) => Sales.findById(id);
