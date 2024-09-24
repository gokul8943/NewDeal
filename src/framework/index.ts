import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import { dbConnection } from './database/dbconnection';

dotenv.config();

const app: Express = express();
const port: string = process.env.PORT!;

dbConnection();

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
