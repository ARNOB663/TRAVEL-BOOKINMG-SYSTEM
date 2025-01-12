import express from 'express';
import { verifyAdmin, verifyUser } from '../utils/verifyToken.js';
import { createBooking, getAllBooking, getBooking } from '../controllers/bookingController.js';

const router = express.Router();

// Create a new booking
router.post('/', verifyUser, createBooking);

// Get a single booking by ID (should use GET)
router.get('/:id', verifyUser, getBooking);

// Get all bookings (should use GET)
router.get('/', verifyAdmin, getAllBooking);

export default router;
