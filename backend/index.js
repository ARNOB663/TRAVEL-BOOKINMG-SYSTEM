import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import tourRoute from './routes/tours.js'
import userRoute from './routes/users.js'
import authRoute from './routes/auth.js'
import reviewRoute from './routes/reviews.js'
import bookingRoute from './routes/bookings.js'

dotenv.config();
const app = express();
const port = process.env.PORT || 8000;
const corsOptions = {
    origin : true ,
    credentials: true
}

// Database connection
mongoose.set("strictQuery",false);
const connection = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('MongoDB database connected');
    } catch (err) {
        console.error('MongoDB database connection failed:', err.message);
    }
};

// Middleware
app.use(express.json());
app.use(cors(corsOptions)); // Use cors correctly
app.use(cookieParser()); // Use cookie-parser correctly
app.use('/api/v1/auth',authRoute)
app.use('/api/v1/tours',tourRoute)
app.use('/api/v1/users',userRoute)
app.use('/api/v1/review',reviewRoute)
app.use('/api/v1/booking',bookingRoute)


// Start the server
app.listen(port, async () => {
    await connection(); // Ensure the database connection is established before proceeding
    console.log('Server listening on port', port);
});
