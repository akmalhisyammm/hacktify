if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const express = require('express');
const cors = require('cors');
const authRouter = require('./routes/authRoutes');
const favoriteRouter = require('./routes/favoriteRoutes');
const trackRouter = require('./routes/trackRoutes');
const userRouter = require('./routes/userRoutes');
const errorMiddleware = require('./middlewares/errorMiddleware');

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/favorites', favoriteRouter);
app.use('/api/v1/tracks', trackRouter);
app.use('/api/v1/users', userRouter);

app.use(errorMiddleware);

module.exports = app;
