import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import {v2 as cloudinary} from 'cloudinary';

// Routes Import
import userRoutes from './routes/userRoutes.js'; 
import restaurantRoute from './routes/restaurantRoute.js'; 
import menuItemRoute from './routes/menuItemRoute.js';
import bucketRoute from './routes/bucketRoute.js';
import paymentRoute from './routes/paymentRoute.js';
import orderRoute from './routes/orderRoute.js';
import reviewRoutes from './routes/reviewRoutes.js';

// Database
import connectDB from './db/connectDB.js';

dotenv.config();

const app = express();
const allowedOrigins = ['http://localhost:5173', 'http://localhost:5174', 'http://localhost:5175'];

// Database Connection
connectDB();

// cloudinary config
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
})

// Middleware
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));
app.use(cors({
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true
}));
app.use(cookieParser());


// Routes
app.use('/api/users', userRoutes);
app.use('/api/restaurant', restaurantRoute);
app.use('/api/menu-items', menuItemRoute);
app.use('/api/buckets', bucketRoute);
app.use('/api/payments', paymentRoute);
app.use('/api/orders', orderRoute);
app.use('/api/reviews', reviewRoutes);


// Server Listen
const PORT = process.env.PORT || 4000;
app.listen(PORT, ()=> {
    console.log(`Server listen on port : ${PORT}`);
});