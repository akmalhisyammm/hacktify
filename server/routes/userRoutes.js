const express = require('express');
const userController = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

router.get('/me', authMiddleware.defaultAuth, userController.getMe);
router.put('/me', authMiddleware.defaultAuth, userController.updateMe);
router.get('/top/tracks', authMiddleware.spotifyAuth, userController.getTopTracks);
router.get('/top/artists', authMiddleware.spotifyAuth, userController.getTopArtists);
router.get('/moods/detect', authMiddleware.spotifyAuth, userController.detectMoods);

module.exports = router;
