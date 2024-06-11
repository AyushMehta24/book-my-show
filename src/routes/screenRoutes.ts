// routes/screenRoutes.ts

import express, { Router } from 'express'
import { createScreen, createScreenWithMovie, createScreenWithSeats, deleteScreen, getAllScreens } from '../controllers/screenController'
import { createScreenValidate, createScreenWithSeatsValidate } from '../middlewares/screenValidator'

const screen: Router = express.Router()

screen.post('/create/:theaterId',createScreenValidate, createScreen)

screen.post('/createscreenwithseats/:theaterId',createScreenWithSeatsValidate, createScreenWithSeats)

screen.post('/createscreenwithmovie/:theaterId', createScreenWithMovie)


screen.get('/getallscreen/:theaterId', getAllScreens)

screen.delete('/deletescreen', deleteScreen)

export default screen
