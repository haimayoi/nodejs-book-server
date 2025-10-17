const express = require('express');
const router = express.Router();
const genreController = require('../../controller/genre.controller');
const authMiddleware = require('../../middleware/auth.middleware');
const adminMiddleware = require('../../middleware/admin.middleware');

router.use(authMiddleware);
router.use(adminMiddleware);

router.post('/', genreController.createGenre);
router.put('/:id', genreController.updateGenre);
router.delete('/:id', genreController.deletaGenre);

module.exports = router;