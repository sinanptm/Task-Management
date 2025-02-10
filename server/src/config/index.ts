import dotenv from 'dotenv';
dotenv.config();

const {
    PORT,
    MONGO_URI
} = process.env;


export {
    PORT,
    MONGO_URI
}