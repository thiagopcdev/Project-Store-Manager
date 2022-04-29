const express = require('express');

const router = express.Router({ mergeParams: true });
const isValid = require('../../middleware/sales/isValid');

router.post('/', isValid, require('./create'));
router.get('/', require('./getAll'));
router.get('/:id', require('./findById'));
router.put('/:id', require('./update'));
router.delete('/:id', require('./remove'));

module.exports = router;
