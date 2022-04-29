const Product = require('../../model/document')('products');

module.exports = async (filters) => Product.find(filters);
