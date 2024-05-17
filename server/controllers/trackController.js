const axios = require('axios');

const { chatCompletion } = require('../helpers/openai');

class TrackController {
  static async generateTracks(req, res, next) {
    try {
      const { q } = req.query;

      const { tracks } = await chatCompletion([
        {
          role: 'system',
          content:
            'You are a helpful assistant that helps users find 6 tracks that available in Spotify based on keywords. Provide your answer in JSON structure like this { "tracks": [{ "name": "<track_name>", "artist": "<artist_name>" }] }.',
        },
        {
          role: 'user',
          content: `Provide 6 tracks related to "Best 4th gen k-pop songs"`,
        },
        {
          role: 'assistant',
          content: '{ "tracks": [{ "name": "I AM", "artist": "IVE" }] }',
        },
        {
          role: 'user',
          content: `Provide 6 tracks related to "${q}"`,
        },
      ]);

      res.status(200).json({ tracks });
    } catch (err) {
      next(err);
    }
  }

  static async searchTrack(req, res, next) {
    try {
      const { authorization } = req.headers;
      const { q } = req.query;

      const response = await axios.get('https://api.spotify.com/v1/search', {
        headers: {
          Authorization: authorization,
        },
        params: {
          q,
          type: 'track',
          limit: 1,
        },
      });

      res.status(200).json(response.data.tracks.items[0]);
    } catch (err) {
      next(err);
    }
  }
}

module.exports = TrackController;
