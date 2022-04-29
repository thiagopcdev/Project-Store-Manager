const express = require('express');

const router = express.Router({ mergeParams: true });
const isValidCreate = require('../../middleware/products/create/isValid');
const checkId = require('../../middleware/products/update/checkId');

router.post('/', isValidCreate, require('./create'));
router.get('/', require('./getAll'));
router.get('/:id', require('./findById'));
router.put('/:id', isValidCreate, checkId, require('./update'));
router.delete('/:id', checkId, require('./remove'));

module.exports = router;
