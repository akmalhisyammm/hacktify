const { afterAll, beforeAll, describe, expect, it } = require('@jest/globals');
const request = require('supertest');

const { signToken } = require('../helpers/jwt');
const { Profile, User } = require('../models');
const app = require('../app');
const users = require('../mocks/users.json');
const profiles = require('../mocks/profiles.json');

let token;

/* ========== SEED DATA ========== */
beforeAll(async () => {
  try {
    const user = await User.create(users[0]);
    await Profile.create(profiles[0]);

    token = signToken({
      id: user.id,
      email: user.email,
    });
  } catch (err) {
    console.log(err);
  }
});

/* ========== UPDATE USER (PUT) ========== */
describe('PUT /api/v1/users/me/:id', () => {
  it('Gagal menjalankan fitur karena belum login', async () => {
    const response = await request(app)
      .put('/api/v1/users/me')
      .send({ ...users[1], ...profiles[1] });

    expect(response.status).toBe(401);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty('message', 'You are not logged in');
  });

  it('Gagal menjalankan fitur karena token yang diberikan tidak valid', async () => {
    const response = await request(app)
      .put('/api/v1/users/me')
      .set('Authorization', 'Bearer invalid')
      .send({ ...users[1], ...profiles[1] });

    expect(response.status).toBe(401);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty('message', 'Invalid token');
  });

  it('Gagal ketika request body tidak sesuai', async () => {
    const response = await request(app)
      .put('/api/v1/users/me')
      .set('Authorization', `Bearer ${token}`)
      .send({ name: '', artist: '' });

    expect(response.status).toBe(400);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty('message', 'Full name is required');
  });

  it('Berhasil mengupdate data user berdasarkan params id yang diberikan', async () => {
    const response = await request(app)
      .put('/api/v1/users/me')
      .set('Authorization', `Bearer ${token}`)
      .send({ ...users[1], ...profiles[1] });

    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty('id', 1);
    expect(response.body).toHaveProperty('name', profiles[1].name);
    expect(response.body).toHaveProperty('gender', profiles[1].gender);
    expect(response.body).toHaveProperty('phone', profiles[1].phone);
    expect(response.body).toHaveProperty('picture', profiles[1].picture);
  });
});

/* ========== CLEAN UP DATA ========== */
afterAll(async () => {
  try {
    await User.destroy({ truncate: true, cascade: true, restartIdentity: true });
    await Profile.destroy({ truncate: true, cascade: true, restartIdentity: true });
  } catch (err) {
    console.log(err);
  }
});
