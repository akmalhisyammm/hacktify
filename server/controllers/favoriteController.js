const { Favorite } = require('../models');

class FavoriteController {
  static async createFavorite(req, res, next) {
    try {
      const { name, artist } = req.body;
      const { id: UserId } = req.user;

      const isExists = await Favorite.findOne({ where: { name, artist, UserId } });

      if (isExists) {
        return next({ status: 400, message: 'Favorite already exists' });
      }

      const favorite = await Favorite.create({ name, artist, UserId });

      res.status(201).json(favorite);
    } catch (err) {
      next(err);
    }
  }

  static async getFavorites(req, res, next) {
    try {
      const { id: UserId } = req.user;

      const favorites = await Favorite.findAll({ where: { UserId } });

      res.status(200).json(favorites);
    } catch (err) {
      next(err);
    }
  }

  static async deleteFavorite(req, res, next) {
    try {
      const { id } = req.params;

      const favorite = await Favorite.findByPk(id);

      if (!favorite) {
        return next({ status: 404, message: 'Favorite not found' });
      }

      await favorite.destroy();

      res.status(200).json({ message: 'Favorite has been deleted' });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = FavoriteController;
