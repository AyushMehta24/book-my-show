// routes/theaterRoutes.ts

import express, { Router } from 'express'
import { createTheater, getTheaterById, updateTheater, deleteTheater } from '../controllers/theaterController'

const router: Router = express.Router()

// POST /theater
router.post('/', createTheater)

// GET /theater/:id
router.get('/:id', getTheaterById)

// PUT /theater/:id
router.put('/:id', updateTheater)

// DELETE /theater/:id
router.delete('/:id', deleteTheater)

export default router
