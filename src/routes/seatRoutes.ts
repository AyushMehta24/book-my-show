// routes/seatRoutes.ts

import express, { Router } from 'express'
import { allSeats, createSeat, deleteSeat, updateSeat } from '../controllers/seatController'

const seat: Router = express.Router()

seat.post('/create/:screenId', createSeat)

seat.get('/allseats/:screenId', allSeats)

seat.put('/update/:screenId', updateSeat)

seat.delete('/delete/:screenId', deleteSeat)

export default seat
