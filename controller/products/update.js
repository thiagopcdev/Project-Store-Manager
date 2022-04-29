const statusCode = require('../../helper/statusCode');
const service = require('../../service/products');

module.exports = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, quantity } = req.body;

    const productSchema = {
      _id: id,
      name,
      quantity,
    };

    const update = await service.update(productSchema);
    if (update.err) {
      return res.status(statusCode.UNPROCESSABLE_ENTITY)
        .json(update);
    }

    return res.status(statusCode.OK).json(productSchema);
  } catch (err) {
    next(err);
  }
};
