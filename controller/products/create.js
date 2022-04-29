const statusCodes = require('../../helper/statusCode');
const service = require('../../service/products');

module.exports = async (req, res, next) => {
  try {
    const { name, quantity } = req.body;
    const newProduct = { name, quantity };
    const create = await service.create(newProduct);
    if (create.err) {
      return res.status(statusCodes.UNPROCESSABLE_ENTITY)
        .json(create);
    }
    const { _id, ...rest } = newProduct;
    const getNewProduct = { _id, ...rest };
    return res.status(statusCodes.CREATED).json(getNewProduct);
  } catch (err) {
    next(err);
  }
};
