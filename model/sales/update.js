const { ObjectId } = require('mongodb');
const coon = require('../connection');

module.exports = async (id, entityArray) => (
  await coon()).collection('sales').updateOne(
      { _id: ObjectId(id) },
      { $set: { itensSold: entityArray } },
    ).then(() => ({ _id: id, itensSold: entityArray }));
