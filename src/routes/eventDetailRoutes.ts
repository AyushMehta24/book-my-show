// routes/eventDetailRoutes.ts

import express, { Router } from 'express'
import {
  allEventsDetail,
  createEventDetail,
  deleteEventDetail,
  updateEventDetail,
} from '../controllers/eventDetailController'

const event: Router = express.Router()

event.post('/create', createEventDetail)

event.get('/allevents/:ownerId', allEventsDetail)

event.put('/update/:eventId', updateEventDetail)

event.delete('/delete/:eventId', deleteEventDetail)

export default event
