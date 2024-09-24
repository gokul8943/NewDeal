import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';

dotenv.config();

const app: Express = express();
const port: string = process.env.PORT!;

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
