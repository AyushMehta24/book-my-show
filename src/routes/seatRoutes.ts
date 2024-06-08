// routes/seatRoutes.ts

import express, { Router } from 'express'
import { createSeat } from '../controllers/seatController'
// import { createSeat, getSeatById, updateSeat, deleteSeat } from '../controllers/seatController1'

const seat: Router = express.Router()

// POST /seat
seat.post('/create/:screenId', createSeat)

// // GET /seat/:id
// seat.get('/:id', getSeatById)

// // PUT /seat/:id
// seat.put('/:id', updateSeat)

// // DELETE /seat/:id
// seat.delete('/:id', deleteSeat)

export default seat
