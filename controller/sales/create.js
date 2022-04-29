const statusCode = require('../../helper/statusCode');
const service = require('../../service/sales');

module.exports = async (req, res, next) => {
  try {
    const create = await service.create(req.body) || {};
    if (create.err) {
      if (create.err.code === 'stock_problem') {
        return res.status(statusCode.NOT_FOUND).json(create);
      }
      return res.status(statusCode.UNPROCESSABLE_ENTITY).json(create);
    }
    return res.status(statusCode.OK).json(create);
  } catch (err) {
    next(err);
  }
};
