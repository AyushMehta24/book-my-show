// routes/ticketRoutes.ts

import express, { Router } from 'express'
import { createTicket, getTicketById, updateTicket, deleteTicket } from '../controllers/ticketController'

const router: Router = express.Router()

// POST /ticket
router.post('/', createTicket)

// GET /ticket/:id
router.get('/:id', getTicketById)

// PUT /ticket/:id
router.put('/:id', updateTicket)

// DELETE /ticket/:id
router.delete('/:id', deleteTicket)

export default router
