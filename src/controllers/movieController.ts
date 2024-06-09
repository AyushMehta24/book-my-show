import { Request, Response } from 'express'
import generalResponse from '../helper/generalResponse.helper'
import { PrismaClient } from '@prisma/client'
const Prisma = new PrismaClient()

export const createMovieDetail = async (req: Request, res: Response): Promise<void> => {
  try {
    const { screenId, name, description, date, startTime } = req.body

    const formattedDate = new Date(date)

    if (isNaN(formattedDate.getTime())) {
      throw new Error('Invalid date')
    }

    formattedDate.setHours(startTime.split(':')[0], startTime.split(':')[1], 0, 0)

    const formattedDateString = formattedDate.toISOString()

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
        date: new Date(formattedDateString),
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

    const movieData: Partial<{
      name: string
      description: string
      date: string | number | Date
      start_time: string
      screen_id: string
    }> = req.body

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

    const formattedDate = movieData.date ? new Date(movieData.date) : undefined

    if (!formattedDate || isNaN(formattedDate.getTime())) {
      throw new Error('Invalid date')
    }

    if (movieData.start_time) {
      const [hours, minutes] = movieData.start_time.split(':').map(Number)

      formattedDate.setHours(hours, minutes, 0, 0)
    } else {
      throw new Error('Start time is not provided')
    }
    const formattedDateString = formattedDate.toISOString()

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

    const formattedData = { ...movieData, date: formattedDateString }

    const movie = await Prisma.movie_details.update({
      where: {
        id: movieId,
        is_deleted: false,
        screen_id: {
          equals: movieData.screen_id,
        },
      },
      data: formattedData,
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
