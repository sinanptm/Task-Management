import express from 'express';
import { CLIENT_URL, PORT } from './config';
import connectDb from './config/connectDB';
import routes from './routes';
import cors from 'cors'

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin:CLIENT_URL
}))

app.use(routes);

app.listen(PORT, () => {
    connectDb();
    console.log("Server start running on Port: ", PORT);
});