// routes/eventDetailRoutes.ts

import express, { Router } from 'express'
import {
  createEventDetail,
  getEventDetailById,
  updateEventDetail,
  deleteEventDetail,
} from '../controllers/eventDetailController'

const router: Router = express.Router()

// POST /event-detail
router.post('/', createEventDetail)

// GET /event-detail/:id
router.get('/:id', getEventDetailById)

// PUT /event-detail/:id
router.put('/:id', updateEventDetail)

// DELETE /event-detail/:id
router.delete('/:id', deleteEventDetail)

export default router
