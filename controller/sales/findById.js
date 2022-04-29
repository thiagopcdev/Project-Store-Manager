const statusCode = require('../../helper/statusCode');
const service = require('../../service/sales');

const error = {
  err: {
    code: 'not_found',
    message: 'Sale not found',
  },
};

module.exports = async (req, res, next) => {
  try {
    const { id } = req.params;
    const sale = await service.findById(id);
    if (!sale) {
      return res.status(statusCode.NOT_FOUND).json(error);
    }
    return res.status(statusCode.OK).json(sale);
  } catch (err) {
    next(err);
  }
};
