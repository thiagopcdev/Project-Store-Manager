const statusCode = require('../../helper/statusCode');
const service = require('../../service/sales');

module.exports = async (req, res, next) => {
  try {
    const { id } = req.params;
    const remove = await service.remove(id);

    if (remove.err) {
      return res.status(statusCode.UNPROCESSABLE_ENTITY).json(remove);
    }

    return res.status(statusCode.OK).json(remove);
  } catch (err) {
    next(err);
  }
};
