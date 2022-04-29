const Product = require('../../model/document')('products');

const validName = (name) => {
  if (name.length <= 5) return false;
  return true;
};

const validQnt = (qnt) => {
  if (qnt < 1) return false;
  return true;
};

const error = {
  name: { err: { code: 'invalid_data',
    message: '"name" length must be at least 5 characters long' },
  },
  exists: { err: { code: 'invalid_data', message: 'Product already exists' } },
  qnt: { err: { code: 'invalid_data',
  message: '"quantity" must be larger than or equal to 1' },
  },
};

module.exports = async (product) => {
  const { name, quantity } = product;
  const isValidName = validName(name);
  const isValidQnt = validQnt(quantity);
  if (!isValidName) return error.name;
  if (!isValidQnt) return error.qnt;

  return Product.update(product);
};
