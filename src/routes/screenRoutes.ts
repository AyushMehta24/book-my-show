// routes/screenRoutes.ts

import express, { Router } from 'express'
import { createScreen, deleteScreen, getAllScreens } from '../controllers/screenController'
import { createScreenValidate } from '../middlewares/screenValidator'

const screen: Router = express.Router()

// POST /screen
screen.post('/create/:theaterId',createScreenValidate, createScreen)

// GET /screen/:id
screen.get('/getallscreen/:theaterId', getAllScreens)

// // PUT /screen/:id
// screen.put('/:id', updateScreen)

// // DELETE /screen/:id
screen.delete('/deletescreen', deleteScreen)

export default screen
