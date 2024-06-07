// routes/bookingRoutes.ts

import express, { Router } from 'express'
import { createBooking, getBookingById, updateBooking, deleteBooking } from '../controllers/bookingController'

const router: Router = express.Router()

// POST /booking
router.post('/', createBooking)

// GET /booking/:id
router.get('/:id', getBookingById)

// PUT /booking/:id
router.put('/:id', updateBooking)

// DELETE /booking/:id
router.delete('/:id', deleteBooking)

export default router
