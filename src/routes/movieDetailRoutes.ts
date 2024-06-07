// routes/movieDetailRoutes.ts

import express, { Router } from 'express'
import {
  createMovieDetail,
  getMovieDetailById,
  updateMovieDetail,
  deleteMovieDetail,
} from '../controllers/movieDetailController'

const router: Router = express.Router()

// POST /movie-detail
router.post('/', createMovieDetail)

// GET /movie-detail/:id
router.get('/:id', getMovieDetailById)

// PUT /movie-detail/:id
router.put('/:id', updateMovieDetail)

// DELETE /movie-detail/:id
router.delete('/:id', deleteMovieDetail)

export default router
