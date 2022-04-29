const Product = require('../../model/document')('products');

module.exports = async (id) => Product.remove(id);
