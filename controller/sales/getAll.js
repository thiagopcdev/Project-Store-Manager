const statusCode = require('../../helper/statusCode');
const service = require('../../service/sales');

module.exports = async (_req, res, next) => {
  try {
    const filters = {};
    const sales = await service.getAll(filters);
    if (!sales) {
      return res.status(statusCode.NOT_FOUND);
    }
    return res.status(statusCode.OK).json({ sales });
  } catch (err) {
    next(err);
  }
};
