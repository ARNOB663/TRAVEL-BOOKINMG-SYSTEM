import express from 'express'
import { verifyUser } from '../utils/verifyToken.js'
import { createReview } from '../controllers/reviewController.js'
const router = express.Router()
router.post('/:tourId',verifyUser, createReview)

export default router