const Sales = require('../../model/sales');
const Product = require('../../model/document')('products');
const SalesM = require('../../model/document')('sales');

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

const newQntGenerator = (product, i, arraySales, arraySalesOld) => {
  let quantity;
    if (arraySalesOld[i].quantity < arraySales[i].quantity) {
      quantity = product.quantity - (arraySales[i].quantity - arraySalesOld[i].quantity);
    } else if (arraySalesOld[i].quantity > arraySales[i].quantity) {
      quantity = product.quantity + (arraySalesOld[i].quantity - arraySales[i].quantity);
    } else {
      quantity = product.quantity;
    }
    return quantity;
};

const updateQnt = async (arrayProducts, arraySales, arraySalesOld) => {
  await arrayProducts.forEach(async (product, i) => {
    const quantity = newQntGenerator(product, i, arraySales, arraySalesOld);
    const updatedProduct = { ...product, quantity };
    await Product.update(updatedProduct);
  });
};

module.exports = async (id, sales) => {
  const notValidProduct = (await productsArrayVal(sales)).includes(null);
  const arrayProducts = await productsArrayVal(sales);
  const { itensSold: arraySalesOriginal } = await SalesM.findById(id);
  if (!qntIsOk(sales)) return error.e;
  if (notValidProduct) return error.e;
  if (!checkValicQnt(arrayProducts, sales)) return error.invalidQnt;

  await updateQnt(arrayProducts, sales, arraySalesOriginal);
  return Sales.update(id, sales);
};
