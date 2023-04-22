import environment from './environment';
import apiRoutes from './routes'
import passport from './passport-config';

import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import session from 'express-session';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import bootstrapDatabase from './utils/bootstrapper';

const ANGULAR_DIST_PATH = '../fe-garfield-torrent/dist/fe-garfield-torrent/';
const shouldServeAngular = !process.argv.includes('--noAngular');

const app = express();

mongoose.connect(environment.CONNECTION_STRING, {})
  .then(() => console.log('MongoDB connected'))
  .catch((error) => console.log(`MongoDB connection error: ${error}`));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(session({ secret: 'randomSecretForNow', resave: true, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());

if (shouldServeAngular) {
  console.log('Serving angular app')
  app.use(express.static(ANGULAR_DIST_PATH))
  app.get(/^((?!\/api\/).)*$/, (req, res) => {
    res.sendFile('index.html', { root: ANGULAR_DIST_PATH });
  });
}
app.use('/api', apiRoutes);

bootstrapDatabase();

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000')
})