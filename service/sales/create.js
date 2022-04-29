const Sales = require('../../model/sales');
const Product = require('../../model/document')('products');

const error = {
  e: { err: { code: 'invalid_data',
  message: 'Wrong product ID or invalid quantity' },
  },
  invalidQnt: { err: { code: 'stock_problem',
  message: 'Such amount is not permitted to sell' },
  },
};

const qntIsOk = (arraySales) => arraySales.every(({ quantity }) => quantity > 0);

const productsArrayVal = async (sales) => {
  const resp = await sales.map(({ productId }) => Product.findById(productId));
  return Promise.all(resp);
};

const checkValicQnt = (arrayProducts, arraySales) =>
  arraySales.every((product, i) => (product.quantity <= arrayProducts[i].quantity));

const updateQnt = async (arrayProducts, arraySales) => {
  await arrayProducts.forEach(async (product, i) => {
    const quantity = product.quantity - arraySales[i].quantity;
    const updatedProduct = { ...product, quantity };
    await Product.update(updatedProduct);
  });
};

module.exports = async (sales) => {
  const notValidProduct = (await productsArrayVal(sales)).includes(null);
  const arrayProducts = await productsArrayVal(sales);

  if (!qntIsOk(sales)) return error.e;
  if (notValidProduct) return error.e;
  if (!checkValicQnt(arrayProducts, sales)) return error.invalidQnt;
  await updateQnt(arrayProducts, sales);
  return Sales.create(sales);
};
