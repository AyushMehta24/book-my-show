// routes/seatRoutes.ts

import express, { Router } from 'express'
import { allSeats, createSeat, deleteSeat, updateSeat } from '../controllers/seatController'
import { createSeatValidate, deleteSeatValidate } from '../middlewares/seatValidator'

const seat: Router = express.Router()

seat.post('/create/:screenId',createSeatValidate, createSeat)

seat.get('/allseats/:screenId', allSeats)

seat.put('/update/:screenId',createSeatValidate, updateSeat)

seat.delete('/delete/:screenId',deleteSeatValidate, deleteSeat)

export default seat
