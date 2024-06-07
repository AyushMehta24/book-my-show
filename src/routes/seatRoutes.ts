// routes/seatRoutes.ts

import express, { Router } from 'express'
import { createSeat, getSeatById, updateSeat, deleteSeat } from '../controllers/seatController'

const router: Router = express.Router()

// POST /seat
router.post('/', createSeat)

// GET /seat/:id
router.get('/:id', getSeatById)

// PUT /seat/:id
router.put('/:id', updateSeat)

// DELETE /seat/:id
router.delete('/:id', deleteSeat)

export default router
