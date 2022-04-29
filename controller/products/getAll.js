const statusCode = require('../../helper/statusCode');
const service = require('../../service/products');

module.exports = async (_req, res, next) => {
  try {
    const filters = {};
    const products = await service.getAll(filters);
    // if (products.length === 0) {
    //   return res.status(statusCode.NOT_FOUND).json({ message: 'No data' });
    // }
    const resp = { products };
    return res.status(statusCode.OK).json(resp);
  } catch (err) {
    next(err);
  }
};
