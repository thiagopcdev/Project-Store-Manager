const conn = require('../connection');

module.exports = async (collection, entity) =>
  (await conn()).collection(collection).insertOne(entity);
