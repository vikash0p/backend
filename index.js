import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import cookieParser from 'cookie-parser';
import mongooseConnection from './utils/mongooseConnection.js';
import UserRoute from './mvc/routes/UserRoute.js'
dotenv.config();
mongooseConnection();
const app = express()
const port = process.env.PORT || 5500

//*MIDDLEWARE
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: 'http://localhost:3000', methods: ['GET', 'POST', 'PUT', 'DELETE'], credentials: true, }));
app.use(cookieParser());

app.use('/auth', UserRoute);



app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})