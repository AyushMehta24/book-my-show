// routes/ticketRoutes.ts

import express, { Router } from 'express'
import { getBills, makePayment } from '../controllers/paymentController'

const payment: Router = express.Router()

// POST /ticket
payment.put('/pay/:bookingId', makePayment)

// // GET /ticket/:id
payment.get('/getbills/:userId', getBills)

// // PUT /ticket/:id
// payment.put('/:id', updateTicket)

// // DELETE /ticket/:id
// payment.delete('/:id', deleteTicket)

export default payment
