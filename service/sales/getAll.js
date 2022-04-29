const Sales = require('../../model/document')('sales');

module.exports = (filters) => Sales.find(filters);
