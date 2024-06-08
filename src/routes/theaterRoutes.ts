// routes/theaterRoutes.ts

import express, { Router } from 'express'
import { createTheater, deleteTheater, getAllTheater, updateTheater } from '../controllers/theaterController'

const theater: Router = express.Router()

// POST /theater
theater.post('/create', createTheater)

// // GET /theater/:id
theater.get('/getalltheater', getAllTheater)

// // PUT /theater/:id
theater.put('/update/:id', updateTheater)

// // DELETE /theater/:id
theater.delete('/delete/:id', deleteTheater)

export default theater
