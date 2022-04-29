const statusCode = require('../../helper/statusCode');
const service = require('../../service/sales');

module.exports = async (req, res, next) => {
  try {
    const { id } = req.params;
    const update = await service.update(id, req.body) || {};
    if (update.err) {
      return res.status(statusCode.UNPROCESSABLE_ENTITY).json(update);
    }
    return res.status(statusCode.OK).json(update);
  } catch (err) {
    next(err);
  }
};
