const express = require('express');
const controller = require('../controllers/category');
const router = express.Router();

router.get('/list', controller.getAll);
router.post('/', controller.create);

module.exports = router;