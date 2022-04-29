const coon = require('../connection');

module.exports = async (entityArray) => (
  await coon()).collection('sales').insertOne({ itensSold: entityArray }).then((res) =>
  ({ _id: res.insertedId, itensSold: entityArray }));
