const express = require('express');
const router = express.Router();
const authController = require('../controller/auth.controller');
const bookController = require('../controller/book.controller');
const genreController = require('../controller/genre.controller');

router.post('/auth/register', authController.register);
router.post('/auth/login', authController.login);

router.get('/book', bookController.getAllBooks);
router.get('/book/:id', bookController.getBookById)

router.use('/admin/books', require('./admin/book.admin.router'));

router.get('/genre', genreController.getAllGenres);
router.get('/genre/:id', genreController.getGenreById);

router.use('/admin/genre', require('./admin/genre.admin.router'));

module.exports = router;