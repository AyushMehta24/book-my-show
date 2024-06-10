// routes/eventDetailRoutes.ts

import express, { Router } from 'express'
import {
  allEventsDetail,
  createEventDetail,
  deleteEventDetail,
  updateEventDetail,
} from '../controllers/eventDetailController'
import { createEventValidate, updateEventValidate } from '../middlewares/eventValidator'

const event: Router = express.Router()

event.post('/create',createEventValidate, createEventDetail)

event.get('/allevents/:ownerId', allEventsDetail)

event.put('/update/:eventId', updateEventValidate,updateEventDetail)

event.delete('/delete/:eventId', deleteEventDetail)

export default event
