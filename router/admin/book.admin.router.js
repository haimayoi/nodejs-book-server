const express = require('express');
const router = express.Router();
const bookController = require('../../controller/book.controller');
const authMiddleware = require('../../middleware/auth.middleware');
const adminMiddleware = require('../../middleware/admin.middleware');

router.use(authMiddleware);
router.use(adminMiddleware);

router.post('/', bookController.createBook);
router.put('/:id', bookController.updateBook);
router.delete('/:id', bookController.deleteBook);

module.exports = router;