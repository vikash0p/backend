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
const corsOptions = {
    origin: function (origin, callback) {
        if (!origin) { // Allow requests with no origin (like mobile apps, curl requests)
            callback(null, true);
        } else {
            // You could also check against a whitelist of allowed domains
            callback(null, origin);
        }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept']
};

app.use(cors(corsOptions));

app.use(cookieParser());

app.use('/auth', UserRoute);



app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})