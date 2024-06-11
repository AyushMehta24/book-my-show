// routes/theaterRoutes.ts

import express, { Router } from 'express'
import { createTheater, createTheaterWithScreen, createTheaterWithSeat, deleteTheater, getAllTheater, updateTheater } from '../controllers/theaterController'
import { createTheaterValidate, createTheaterWithScreenValidate, createTheaterWithSeatValidate, updateTheaterValidate } from '../middlewares/theatervalidator'

const theater: Router = express.Router()

theater.post('/create',createTheaterValidate, createTheater)

theater.get('/getalltheater', getAllTheater)

theater.put('/update/:id',updateTheaterValidate, updateTheater)

theater.delete('/delete/:id', deleteTheater)

theater.post('/createtheaterwithscreen',createTheaterWithScreenValidate, createTheaterWithScreen)

theater.post('/createtheaterwithseat', createTheaterWithSeatValidate,createTheaterWithSeat)

export default theater
