// routes/eventDetailRoutes.ts

import express, { Router } from 'express'
import {
  allEventsDetail,
  createEventAndBooking,
  createEventDetail,
  deleteEventDetail,
  updateEventDetail,
} from '../controllers/eventDetailController'
import { createEventValidate, updateEventValidate } from '../middlewares/eventValidator'

const event: Router = express.Router()

event.post('/create',createEventValidate, createEventDetail)
event.post('/createeventwithbooking',createEventValidate, createEventAndBooking)

event.get('/allevents/:ownerId', allEventsDetail)

event.put('/update/:eventId', updateEventValidate,updateEventDetail)

event.delete('/delete/:eventId', deleteEventDetail)

export default event
