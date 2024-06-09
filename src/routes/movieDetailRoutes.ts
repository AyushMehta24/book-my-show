// routes/movieDetailRoutes.ts

import express, { Router } from 'express'
import { allMovieDetail, createMovieDetail, deleteMovieDetail, updateMovieDetail } from '../controllers/movieController'

const movie: Router = express.Router()

movie.post('/create', createMovieDetail)

movie.get('/getmovies/:screenId', allMovieDetail)

movie.put('/update/:movieId', updateMovieDetail)

movie.delete('/delete/:movieId', deleteMovieDetail)

export default movie
