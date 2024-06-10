// routes/bookingRoutes.ts

import express, { Router } from 'express'
import { createBooking, createMultiBooking, getBookingDetailsByBookingId } from '../controllers/bookingController'
import { createBookingValidate, createManyBookingValidate } from '../middlewares/bookingValidator'

const booking: Router = express.Router()

// POST /booking
booking.post('/create',createBookingValidate, createBooking)
booking.post('/createmany',createManyBookingValidate, createMultiBooking)

// // GET /booking/:id
booking.get('/getbookings/:bookingId', getBookingDetailsByBookingId)

// // PUT /booking/:id
// booking.put('/:id', updateBooking)

// // DELETE /booking/:id
// booking.delete('/:id', deleteBooking)

export default booking
