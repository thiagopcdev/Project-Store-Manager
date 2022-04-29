const { ObjectId } = require('mongodb');
const conn = require('../connection');

module.exports = async (collection, entity) => {
  const { _id: id, ...entityWithoutId } = entity;

  await (await conn()).collection(collection).updateOne(
    { _id: ObjectId(id) },
    {
      $set: entityWithoutId,
    },
  );

  return entity;
};
