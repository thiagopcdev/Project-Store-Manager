const statusCode = require('../../helper/statusCode');
const service = require('../../service/products');

const error = {
  wrongId: {
    err: {
      code: 'invalid_data',
      message: 'Wrong id format',
    },
  },
};

module.exports = async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await service.findById(id);
    if (!product) {
      return res.status(statusCode.UNPROCESSABLE_ENTITY).json(error.wrongId);
    }
    return res.status(statusCode.OK).json(product);
  } catch (err) {
    next(err);
  }
};
