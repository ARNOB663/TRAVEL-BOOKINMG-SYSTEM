import express from 'express';
import { verifyAdmin } from '../utils/verifyToken.js';
import {
    createTour,
    deleteTour,
    getAllTour,
    getFeaturedTour,
    getSingleTour,
    getTourBySearch,
    getTourCount,
    updateTour
} from '../controllers/tourController.js';

const router = express.Router();

// Create a new tour
router.post('/', verifyAdmin, createTour);

// Update a tour
router.put('/:id',verifyAdmin, updateTour);

// Delete a tour
router.delete('/:id',verifyAdmin, deleteTour);

// Get a single tour
router.get('/:id', getSingleTour);

// Get all tours
router.get('/', getAllTour);

// Get tours by search
router.get('/search/getTourBySearch', getTourBySearch);

router.get('/search/getFeaturedTours', getFeaturedTour);

router.get('/search/getTourCount', getTourCount);

export default router;
