// routes/screenRoutes.ts

import express, { Router } from 'express'
import { createScreen, getScreenById, updateScreen, deleteScreen } from '../controllers/screenController'

const router: Router = express.Router()

// POST /screen
router.post('/', createScreen)

// GET /screen/:id
router.get('/:id', getScreenById)

// PUT /screen/:id
router.put('/:id', updateScreen)

// DELETE /screen/:id
router.delete('/:id', deleteScreen)

export default router
