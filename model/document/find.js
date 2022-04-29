const conn = require('../connection');

module.exports = async (collection, filters) =>
  (await conn()).collection(collection).find(filters).toArray();
