// routes/movieDetailRoutes.ts

import express, { Router } from 'express'
import {
  allMovieDetail,
  createMovieDetail,
  createMovieWithBooking,
  deleteMovieDetail,
  updateMovieDetail,
} from '../controllers/movieController'
import { createMovieValidate, updateMovieValidate } from '../middlewares/movieValidator'

const movie: Router = express.Router()

movie.post('/create', createMovieValidate, createMovieDetail)
movie.post('/createmoviewithbooking', createMovieWithBooking)

movie.get('/getmovies/:screenId', allMovieDetail)

movie.put('/update/:movieId', updateMovieValidate, updateMovieDetail)

movie.delete('/delete/:movieId', deleteMovieDetail)

export default movie
