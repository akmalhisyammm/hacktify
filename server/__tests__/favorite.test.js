const { afterAll, beforeAll, describe, expect, it } = require('@jest/globals');
const request = require('supertest');

const { signToken, verifyToken } = require('../helpers/jwt');
const { Favorite, User } = require('../models');
const app = require('../app');
const favorites = require('../mocks/favorites.json');
const users = require('../mocks/users.json');

let token;

/* ========== SEED DATA ========== */
beforeAll(async () => {
  try {
    const createdUsers = await User.bulkCreate(users, { individualHooks: true });

    token = signToken({
      id: createdUsers[0].id,
      email: createdUsers[0].email,
    });
  } catch (err) {
    console.log(err);
  }
});

/* ========== CREATE FAVORITE (POST) ========== */
describe('POST /api/v1/favorites', () => {
  it('Gagal menjalankan fitur karena belum login', async () => {
    const response = await request(app)
      .post('/api/v1/favorites')
      .send({ ...favorites[0], UserId: null });

    expect(response.status).toBe(401);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty('message', 'You are not logged in');
  });

  it('Gagal menjalankan fitur karena token yang diberikan tidak valid', async () => {
    const response = await request(app)
      .post('/api/v1/favorites')
      .set('Authorization', 'Bearer invalid')
      .send({ ...favorites[0], UserId: null });

    expect(response.status).toBe(401);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty('message', 'Invalid token');
  });

  it('Gagal ketika request body tidak sesuai', async () => {
    const response = await request(app)
      .post('/api/v1/favorites')
      .set('Authorization', `Bearer ${token}`)
      .send({ name: '', artist: '' });

    expect(response.status).toBe(400);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty('message', 'Name is required, Artist is required');
  });

  it('Berhasil membuat favorit', async () => {
    const { id: UserId } = verifyToken(token);

    const response = await request(app)
      .post('/api/v1/favorites')
      .set('Authorization', `Bearer ${token}`)
      .send({ ...favorites[0], UserId });

    expect(response.status).toBe(201);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty('id', 1);
    expect(response.body).toHaveProperty('name', favorites[0].name);
    expect(response.body).toHaveProperty('artist', favorites[0].artist);
    expect(response.body).toHaveProperty('UserId', UserId);
  });
});

/* ========== READ ALL FAVORITES (GET) ========== */
describe('GET /api/v1/favorites', () => {
  it('Gagal menjalankan fitur karena belum login', async () => {
    const response = await request(app).get('/api/v1/favorites');

    expect(response.status).toBe(401);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty('message', 'You are not logged in');
  });

  it('Gagal menjalankan fitur karena token yang diberikan tidak valid', async () => {
    const response = await request(app)
      .get('/api/v1/favorites')
      .set('Authorization', 'Bearer invalid');

    expect(response.status).toBe(401);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty('message', 'Invalid token');
  });

  it('Berhasil mendapatkan data favorit', async () => {
    const response = await request(app)
      .get('/api/v1/favorites')
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
    expect(response.body[0]).toBeInstanceOf(Object);
    expect(response.body[0]).toHaveProperty('id', 1);
    expect(response.body[0]).toHaveProperty('name', favorites[0].name);
    expect(response.body[0]).toHaveProperty('artist', favorites[0].artist);
    expect(response.body[0]).toHaveProperty('UserId', favorites[0].UserId);
    expect(response.body[0]).toHaveProperty('createdAt', expect.any(String));
    expect(response.body[0]).toHaveProperty('updatedAt', expect.any(String));
  });
});

/* ========== DELETE FAVORITE (DELETE) ========== */
describe('DELETE /api/v1/favorites/:id', () => {
  it('Gagal menjalankan fitur karena belum login', async () => {
    const response = await request(app).delete('/api/v1/favorites/1');

    expect(response.status).toBe(401);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty('message', 'You are not logged in');
  });

  it('Gagal menjalankan fitur karena token yang diberikan tidak valid', async () => {
    const response = await request(app)
      .delete('/api/v1/favorites/1')
      .set('Authorization', 'Bearer invalid');

    expect(response.status).toBe(401);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty('message', 'Invalid token');
  });

  it('Gagal karena id favorit yang dikirim tidak terdapat di database', async () => {
    const response = await request(app)
      .delete('/api/v1/favorites/100')
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(404);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty('message', 'Favorite not found');
  });

  it('Berhasil menghapus data favorit berdasarkan params id yang diberikan', async () => {
    const response = await request(app)
      .delete('/api/v1/favorites/1')
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty('message', 'Favorite has been deleted');
  });
});

/* ========== CLEAN UP DATA ========== */
afterAll(async () => {
  try {
    await User.destroy({ truncate: true, cascade: true, restartIdentity: true });
    await Favorite.destroy({ truncate: true, cascade: true, restartIdentity: true });
  } catch (err) {
    console.log(err);
  }
});
