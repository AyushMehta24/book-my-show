// routes/movieDetailRoutes.ts

import express, { Router } from 'express'
import { createMovieDetail, updateMovieDetail } from '../controllers/movieController'

const movie: Router = express.Router()

// POST /movie-detail
movie.post('/create', createMovieDetail)

// // GET /movie-detail/:id
// movie.get('/:id', getMovieDetailById)

// // PUT /movie-detail/:id
movie.put('/update/:movieId', updateMovieDetail)

// // DELETE /movie-detail/:id
// movie.delete('/:id', deleteMovieDetail)

export default movie
