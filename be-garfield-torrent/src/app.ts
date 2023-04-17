import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import { environment } from './environment';
import { UserRoutes } from './routes/User';


const app = express();

mongoose.connect(environment.CONNECTION_STRING);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', function () {
  console.log('Connected to MongoDB successfully!');
});

app.use('/users', new UserRoutes().router);

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000')
})