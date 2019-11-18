const express = require('express');
const controller = require('../controllers/video');
const router = express.Router();

router.get('/list', controller.getAll);
router.post('/', controller.create);
router.patch('/:id', controller.update);
router.get('/download/:id', controller.download);

module.exports = router;