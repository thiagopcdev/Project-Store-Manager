const statusCodes = require('../../helper/statusCode');

const checkExists = (productId, quantity) => {
  if (!productId || (!quantity && quantity !== 0)) {
    return false;
  }
  return true;
};

const checkSales = (arraySales) => {
  let ok = true;
  arraySales.forEach((sale) => {
    if (!checkExists(sale.productId, sale.quantity)) ok = false;
    if (!Number.isInteger(sale.quantity)) ok = false;
  });
  return ok;
};

module.exports = (req, res, next) => {
  try {
    if (!checkSales(req.body)) {
      return res.status(statusCodes.UNPROCESSABLE_ENTITY)
        .json({ err: { code: 'invalid_data',
        message: 'Wrong product ID or invalid quantity' } });
    }
    next();
  } catch (err) {
    next(err);
  }
};
