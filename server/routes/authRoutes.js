const express = require('express');
const authController = require('../controllers/authController');

const router = express.Router();

router.post('/register', authController.register);
router.post('/login', authController.login);
router.get('/google', authController.googleLogin);
router.get('/spotify', authController.spotifyLoginRedirect);
router.get('/spotify/callback', authController.spotifyLoginCallback);

module.exports = router;
