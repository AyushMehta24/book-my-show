// routes/theaterRoutes.ts

import express, { Router } from 'express'
import { createTheater, deleteTheater, getAllTheater, updateTheater } from '../controllers/theaterController'
import { createTheaterValidate, updateTheaterValidate } from '../middlewares/theatervalidator'

const theater: Router = express.Router()

theater.post('/create',createTheaterValidate, createTheater)

theater.get('/getalltheater', getAllTheater)

theater.put('/update/:id',updateTheaterValidate, updateTheater)

theater.delete('/delete/:id', deleteTheater)

export default theater
