const { ObjectId } = require('mongodb');
const conn = require('../connection');

module.exports = async (collection, id) => (ObjectId.isValid(id)
    ? (await conn()).collection(collection).findOne(ObjectId(id))
    : null);
