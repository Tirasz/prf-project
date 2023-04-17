import { environment } from './environment';
import routes from './routes'
import passport from './services/auth/passport-config';

import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import session from 'express-session';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';

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

app.use(routes);

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000')
})