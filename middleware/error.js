const statusCode = require('../helper/statusCode');

module.exports = (err, _req, res) => {
    console.log(err.message);
    return res.status(statusCode.INTERNAL_SERVER_ERROR).end();
};
