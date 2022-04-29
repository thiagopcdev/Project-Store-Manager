const statusCode = require('../../helper/statusCode');
const service = require('../../service/products');

module.exports = async (req, res, next) => {
  try {
    const { id } = req.params;
    const resp = await service.findById(id);
    const { result } = await service.remove(id);
    if (result.ok) {
      return res.status(statusCode.OK).json(resp);
    }
  } catch (err) {
    next(err);
  }
};
