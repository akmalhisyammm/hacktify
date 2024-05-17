const axios = require('axios');

const { verifyToken } = require('../helpers/jwt');
const { User } = require('../models');

const defaultAuth = async (req, res, next) => {
  try {
    const { authorization } = req.headers;

    let token;

    if (authorization?.startsWith('Bearer')) {
      token = authorization.split(' ')[1];
    }

    if (!token) next({ status: 401, message: 'You are not logged in' });

    const payload = verifyToken(token);
    const user = await User.findOne({ where: { email: payload.email } });

    if (!user) next({ status: 401, message: 'User no longer exists' });

    req.user = { id: user.id, email: user.email };

    next();
  } catch (err) {
    next(err);
  }
};

const spotifyAuth = async (req, res, next) => {
  try {
    const { authorization } = req.headers;

    await axios.get('https://api.spotify.com/v1/me', {
      headers: {
        Authorization: authorization,
      },
    });

    next();
  } catch (err) {
    next(err);
  }
};

module.exports = { defaultAuth, spotifyAuth };
