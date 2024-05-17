const { OAuth2Client } = require('google-auth-library');
const axios = require('axios');

const { signToken } = require('../helpers/jwt');
const { comparePassword } = require('../helpers/bcrypt');
const { Profile, User, sequelize } = require('../models');

class AuthController {
  static async register(req, res, next) {
    try {
      const { email, password, name, gender, picture, phone } = req.body;

      const user = await sequelize.transaction(async (t) => {
        const user = await User.create({ email, password }, { transaction: t });
        await Profile.create({ name, gender, picture, phone, UserId: user.id }, { transaction: t });

        return user;
      });

      res.status(201).json({ id: user.id, email: user.email });
    } catch (err) {
      next(err);
    }
  }

  static async login(req, res, next) {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return next({ status: 400, message: 'Email and password are required' });
      }

      const user = await User.findOne({ where: { email } });

      if (!user || !(await comparePassword(password, user.password))) {
        return next({ status: 401, message: 'Invalid email or password' });
      }

      const access_token = signToken({ id: user.id, email: user.email });

      res.status(200).json({ access_token });
    } catch (err) {
      next(err);
    }
  }

  static async googleLogin(req, res, next) {
    try {
      const { token } = req.headers;

      if (!token) {
        return next({ status: 400, message: 'Token is required' });
      }

      const client = new OAuth2Client(
        process.env.GOOGLE_CLIENT_ID,
        process.env.GOOGLE_CLIENT_SECRET
      );

      const ticket = await client.verifyIdToken({
        idToken: token,
        audience: process.env.GOOGLE_CLIENT_ID,
      });

      const payload = ticket.getPayload();

      if (!payload.email_verified) {
        return next({ status: 400, message: 'Email is not verified' });
      }

      const user = await sequelize.transaction(async (t) => {
        const [user, created] = await User.findOrCreate({
          where: {
            email: payload.email,
          },
          defaults: {
            email: payload.email,
            password: Math.random().toString(36).substring(7),
          },
          transaction: t,
        });

        if (created) {
          await Profile.create(
            { name: payload.name, picture: payload.picture, UserId: user.id },
            { transaction: t }
          );
        }

        return user;
      });

      const access_token = signToken({ id: user.id, email: user.email });

      res.status(200).json({ access_token });
    } catch (err) {
      next(err);
    }
  }

  static async spotifyLoginRedirect(req, res, next) {
    try {
      const url = new URL('https://accounts.spotify.com/authorize');
      url.searchParams.append('response_type', 'code');
      url.searchParams.append('client_id', process.env.SPOTIFY_CLIENT_ID);
      url.searchParams.append('redirect_uri', process.env.SPOTIFY_REDIRECT_URI);
      url.searchParams.append('scope', 'user-read-private user-read-email user-top-read');
      url.searchParams.append('state', Math.random().toString(36).substring(7));

      res.redirect(url.href);
    } catch (err) {
      next(err);
    }
  }

  static async spotifyLoginCallback(req, res, next) {
    try {
      const { code, state } = req.query;

      if (!code || !state) {
        return next({ status: 400, message: 'Code and state are required' });
      }

      const url = new URL('https://accounts.spotify.com/api/token');
      url.searchParams.append('grant_type', 'authorization_code');
      url.searchParams.append('code', code);
      url.searchParams.append('redirect_uri', process.env.SPOTIFY_REDIRECT_URI);

      const response = await axios.post(url.href, null, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization: `Basic ${Buffer.from(
            `${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`
          ).toString('base64')}`,
        },
      });

      const { access_token, refresh_token } = response.data;

      res.redirect(
        `${process.env.CLIENT_URL}/auth/spotify?access_token=${access_token}&refresh_token=${refresh_token}`
      );
    } catch (err) {
      next(err);
    }
  }

  static async spotifyRefreshToken(req, res, next) {
    try {
      const { refresh_token } = req.body;

      if (!refresh_token) {
        return next({ status: 400, message: 'Refresh token is required' });
      }

      const url = new URL('https://accounts.spotify.com/api/token');
      url.searchParams.append('grant_type', 'refresh_token');
      url.searchParams.append('refresh_token', refresh_token);

      const response = await axios.post(url.href, null, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization: `Basic ${Buffer.from(
            `${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`
          ).toString('base64')}`,
        },
      });

      const { access_token } = response.data;

      res.status(200).json({ access_token });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = AuthController;
