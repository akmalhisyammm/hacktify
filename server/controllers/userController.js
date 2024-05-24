const axios = require('axios');

const { Profile, User } = require('../models');
const { chatCompletion } = require('../helpers/openai');

class UserController {
  static async getMe(req, res, next) {
    try {
      const { id } = req.user;

      const user = await User.findByPk(id, { include: Profile });

      if (!user) {
        next({ status: 404, message: 'User not found' });
      }

      delete user.dataValues.password;

      res.status(200).json(user);
    } catch (err) {
      next(err);
    }
  }

  static async getTopTracks(req, res, next) {
    try {
      const { authorization } = req.headers;

      const response = await axios.get('https://api.spotify.com/v1/me/top/tracks', {
        headers: {
          Authorization: authorization,
        },
        params: {
          limit: 10,
        },
      });

      res.status(200).json(response.data);
    } catch (err) {
      next(err);
    }
  }

  static async getTopArtists(req, res, next) {
    try {
      const { authorization } = req.headers;

      const response = await axios.get('https://api.spotify.com/v1/me/top/artists', {
        headers: {
          Authorization: authorization,
        },
        params: {
          limit: 10,
        },
      });

      res.status(200).json(response.data);
    } catch (err) {
      next(err);
    }
  }

  static async updateMe(req, res, next) {
    try {
      const { name, gender, picture, phone } = req.body;
      const { id: UserId } = req.user;

      const profile = await Profile.findOne({ where: { UserId } });

      if (!profile) {
        next({ status: 404, message: 'Profile not found' });
      }

      await profile.update({ name, gender, picture, phone, UserId });

      const user = await User.findByPk(UserId, { include: Profile });

      delete user.dataValues.password;

      res.status(200).json(user);
    } catch (err) {
      next(err);
    }
  }

  static async detectMoods(req, res, next) {
    try {
      const { authorization } = req.headers;

      const response = await axios.get('https://api.spotify.com/v1/me/top/tracks', {
        headers: {
          Authorization: authorization,
        },
      });

      const { moods } = await chatCompletion([
        {
          role: 'system',
          content:
            'You are a helpful assistant that helps users find 3 moods based on their top tracks. Provide your answer in JSON structure like this { "moods": ["<mood>"] }.',
        },
        {
          role: 'user',
          content:
            'Provide 3 moods based on my top tracks: "I AM - IVE", "LOCO - ITZY", "DUMDi DUMDi - (G)I-DLE"',
        },
        {
          role: 'assistant',
          content: '{ "moods": ["happy", "sad"] }',
        },
        {
          role: 'user',
          content: `Provide 3 moods based on my top tracks: ${response.data.items
            .map((track) => `"${track.name} - ${track.artists[0].name}"`)
            .join(', ')}`,
        },
      ]);

      res.status(200).json({ moods });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = UserController;
