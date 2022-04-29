const Sales = require('../../model/document')('sales');
const Product = require('../../model/document')('products');

const error = {
  e: { err: { code: 'invalid_data',
  message: 'Wrong sale ID format' },
  },
};

const productsArrayVal = async ({ itensSold }) => {
  const resp = await itensSold.map(({ productId }) => Product.findById(productId));
  return Promise.all(resp);
};

const updateQnt = async (arrayProducts, arraySales) => {
  await arrayProducts.forEach(async (product, i) => {
    const quantity = product.quantity + arraySales[i].quantity;
    const updatedProduct = { ...product, quantity };
    await Product.update(updatedProduct);
  });
};

module.exports = async (id) => {
  const sale = await Sales.findById(id);
  if (!sale) return error.e;

  const saleRemoved = await Sales.remove(id);

  if (saleRemoved.deletedCount === 0) return error.e;
  const arrayProducts = await productsArrayVal(sale);
  await updateQnt(arrayProducts, sale.itensSold);

  return sale;
};
