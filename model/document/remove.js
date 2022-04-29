const { ObjectId } = require('mongodb');
const conn = require('../connection');

module.exports = async (collection, id) =>
  (await conn()).collection(collection).deleteOne({ _id: ObjectId(id) });
