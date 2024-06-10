import { Request, Response } from 'express'
import generalResponse from '../helper/generalResponse.helper'
import { PrismaClient } from '@prisma/client'
import { deleteSeatValidate } from '../middlewares/seatValidator';
import { deleteSeat } from './seatController';
const Prisma = new PrismaClient()

export const createMovieDetail = async (req: Request, res: Response): Promise<void> => {
  try {
    const { screenId, name, description, date, startTime } = req.body

    const formattedDate = new Date(date)

   

    const validScreen: { id: string } | null = await Prisma.screens.findUnique({
      where: {
        id: screenId,
        is_deleted: false,
      },
      select: {
        id: true,
      },
    })

    if (validScreen === null) {
      return generalResponse(res, '', 'There is no such screen.', 'success', false, 200)
    }

    const movie = await Prisma.movie_details.create({
      data: {
        name: name,
        description: description,
        date: new Date(formattedDate),
        start_time: startTime,
        screen_id: screenId,
      },
    })

    return generalResponse(res, movie.id, 'Movie created successfully', 'success', false, 200)
  } catch (error: any) {
    return generalResponse(res, error, '', 'error', false, 400)
  }
}

export const updateMovieDetail = async (req: Request, res: Response): Promise<void> => {
  try {
    const movieId = req.params.movieId

    let movieData = req.body

    for (let key in movieData) {
      if (movieData[key] === undefined) {
        delete movieData[key]
      }
    }

    const validMovie: { id: string } | null = await Prisma.movie_details.findUnique({
      where: {
        id: movieId,
        is_deleted: false,
      },
      select: {
        id: true,
      },
    })

    if (validMovie === null) {
      return generalResponse(res, '', 'There is no such Movie.', 'success', false, 200)
    }

    if(movieData.date){
      movieData.date = new Date(movieData.date)
    }

    const validScreen: { id: string } | null = await Prisma.screens.findUnique({
      where: {
        id: movieData.screen_id,
        is_deleted: false,
      },
      select: {
        id: true,
      },
    })

    if (validScreen === null) {
      return generalResponse(res, '', 'There is no such screen.', 'success', false, 200)
    }

    const movie = await Prisma.movie_details.update({
      where: {
        id: movieId,
        is_deleted: false,
        screen_id: {
          equals: movieData.screen_id,
        },
      },
      data: movieData,
    })

    return generalResponse(res, movie.id, 'Movie updated successfully', 'success', false, 200)
  } catch (error: any) {
    return generalResponse(res, error, '', 'error', false, 400)
  }
}

export const deleteMovieDetail = async (req: Request, res: Response): Promise<void> => {
  try {
    const movieId = req.params.movieId

    const validMovie: { id: string } | null = await Prisma.movie_details.findUnique({
      where: {
        id: movieId,
        is_deleted: false,
      },
      select: {
        id: true,
      },
    })

    if (validMovie === null) {
      return generalResponse(res, '', 'There is no such Movie.', 'success', false, 200)
    }

    const movie = await Prisma.movie_details.update({
      where: {
        id: movieId,
        is_deleted: false,
      },
      data: {
        is_deleted: true,
        deleted_at: new Date(),
      },
    })

    return generalResponse(res, movie.id, 'Movie deleted successfully', 'success', false, 200)
  } catch (error: any) {
    return generalResponse(res, error, '', 'error', false, 400)
  }
}

export const allMovieDetail = async (req: Request, res: Response): Promise<void> => {
  try {
    const screenId = req.params.screenId

    const validScreen: { id: string } | null = await Prisma.screens.findUnique({
      where: {
        id: screenId,
        is_deleted: false,
      },
      select: {
        id: true,
      },
    })

    if (validScreen === null) {
      return generalResponse(res, '', 'There is no such Screen.', 'success', false, 200)
    }

    const movie = await Prisma.movie_details.findMany({
      where: {
        screen_id: screenId,
        is_deleted: false,
      },
      select: {
        name: true,
        description: true,
        start_time: true,
        date: true,
      },
    })

    return generalResponse(res, movie, 'Movie Details', 'success', false, 200)
  } catch (error: any) {
    return generalResponse(res, error, '', 'error', false, 400)
  }
}
