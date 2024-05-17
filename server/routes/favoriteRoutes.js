const express = require('express');
const favoriteController = require('../controllers/favoriteController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/', authMiddleware.defaultAuth, favoriteController.createFavorite);
router.get('/', authMiddleware.defaultAuth, favoriteController.getFavorites);
router.delete('/:id', authMiddleware.defaultAuth, favoriteController.deleteFavorite);

module.exports = router;
