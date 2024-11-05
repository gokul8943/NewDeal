import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors'
import { dbConnection } from './database/dbconnection';
import { userRouter } from '../adapters/routes/user.routes';
import { listingRouter } from '../adapters/routes/listing.routes';


dotenv.config();

const app: Express = express();
const port: string = process.env.PORT || '5000';

dbConnection();

const corsOptions = {
  origin: ['http://localhost:5173'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
};

app.use(express.json({ limit: '20mb' }));
app.use(express.urlencoded({ limit: '20mb', extended: true }));
app.use(cors(corsOptions))


//routers
app.use(userRouter)
app.use(listingRouter)


app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
