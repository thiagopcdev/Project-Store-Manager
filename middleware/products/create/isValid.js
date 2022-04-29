const statusCodes = require('../../../helper/statusCode');

const checkExists = (name, quantity) => {
  if (!name || (!quantity && quantity !== 0)) {
    return false;
  }
  return true;
};

module.exports = (req, res, next) => {
  try {
    const { name, quantity } = req.body;

    if (!checkExists(name, quantity)) {
      return res.status(statusCodes.BAD_REQUEST)
        .json({ message: 'Required name and quantity' });
    }
    if (!Number.isInteger(quantity)) {
      return res.status(statusCodes.UNPROCESSABLE_ENTITY)
        .json({ err: { code: 'invalid_data',
        message: '"quantity" must be a number' } });
    }
    next();
  } catch (err) {
    next(err);
  }
};
