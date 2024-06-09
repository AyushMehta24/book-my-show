// routes/bookingRoutes.ts

import express, { Router } from 'express'
import { createBooking } from '../controllers/bookingController'

const booking: Router = express.Router()

// POST /booking
booking.post('/create', createBooking)

// // GET /booking/:id
// booking.get('/:id', getBookingById)

// // PUT /booking/:id
// booking.put('/:id', updateBooking)

// // DELETE /booking/:id
// booking.delete('/:id', deleteBooking)

export default booking
