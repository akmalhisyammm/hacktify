const express = require('express');
const trackController = require('../controllers/trackController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

router.get('/generate', authMiddleware.defaultAuth, trackController.generateTracks);
router.get('/search', authMiddleware.spotifyAuth, trackController.searchTrack);

module.exports = router;
