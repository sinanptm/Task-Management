import express from 'express';
import { PORT } from './config';
import connectDb from './config/connectDB';
import routes from './routes';

const app = express();

app.use(routes)

app.listen(PORT, () => {
    connectDb();
    console.log("Server start running on Port: ", PORT);
});