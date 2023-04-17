import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import { environment } from './environment';
import routes from './routes'

const app = express();

mongoose.connect(environment.CONNECTION_STRING, {})
  .then(() => console.log('MongoDB connected'))
  .catch((error) => console.log(`MongoDB connection error: ${error}`));

app.use(routes);

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000')
})