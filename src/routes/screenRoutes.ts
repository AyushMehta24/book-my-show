// routes/screenRoutes.ts

import express, { Router } from 'express'
import { createScreen, deleteScreen, getAllScreens } from '../controllers/screenController'

const screen: Router = express.Router()

// POST /screen
screen.post('/create/:theaterId', createScreen)

// GET /screen/:id
screen.get('/getallscreen/:theaterId', getAllScreens)

// // PUT /screen/:id
// screen.put('/:id', updateScreen)

// // DELETE /screen/:id
screen.delete('/deletescreen', deleteScreen)

export default screen
