// routes/userRoutes.ts

import express, { Router } from 'express'
import { createUser, getUserById, updateUser, deleteUser } from '../controllers/usercontroller1'

const router: Router = express.Router()

// POST /user
router.post('/', createUser)

// GET /user/:id
router.get('/:id', getUserById)

// PUT /user/:id
router.put('/:id', updateUser)

// DELETE /user/:id
router.delete('/:id', deleteUser)

export default router
