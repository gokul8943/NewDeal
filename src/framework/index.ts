import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import { dbConnection } from './database/dbconnection';
import { userRouter } from '../adapters/routes/user.routes';
import { listingRouter } from '../adapters/routes/listing.routes';

dotenv.config();

const app: Express = express();
const port: string = process.env.PORT!;

dbConnection();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//routers
app.use(userRouter)
app.use(listingRouter)



app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
