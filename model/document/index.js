const find = require('./find');
const create = require('./create');
const update = require('./update');
const remove = require('./remove');
const findById = require('./findById');

module.exports = (collection) => ({
    find: (filters) => find(collection, filters),
    remove: (id) => remove(collection, id),
    create: (entity) => create(collection, entity),
    update: (entity) => update(collection, entity),
    findById: (id) => findById(collection, id),
  });
