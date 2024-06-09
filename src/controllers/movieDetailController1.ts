// controllers/MovieDetailController.ts

import { Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const createMovieDetail = async (req: Request, res: Response): Promise<void> => {
  try {
    const { screenId } = req.params
    const { name, description, date, start_time } = req.body
    const movieDetail = await prisma.movie_details.create({
      data: {
        name,
        description,
        date,
        start_time,
        screen: {
          connect: { id: screenId },
        },
      },
    })
    res.status(201).json({ movieDetail })
  } catch (error) {
    console.error('Error creating movie detail:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
}

export const getMovieDetailById = async (req: Request, res: Response): Promise<void> => {
  try {
    const movieDetailId = req.params.id
    const movieDetail = await prisma.movie_details.findUnique({
      where: {
        id: movieDetailId,
      },
    })
    if (!movieDetail) {
      res.status(404).json({ error: 'Movie detail not found' })
      return
    }
    res.status(200).json({ movieDetail })
  } catch (error) {
    console.error('Error fetching movie detail:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
}

export const updateMovieDetail = async (req: Request, res: Response): Promise<void> => {
  try {
    const movieDetailId = req.params.id
    const { name, description, date, start_time } = req.body
    const updatedMovieDetail = await prisma.movie_details.update({
      where: {
        id: movieDetailId,
      },
      data: {
        name,
        description,
        date,
        start_time,
      },
    })
    res.status(200).json({ movieDetail: updatedMovieDetail })
  } catch (error) {
    console.error('Error updating movie detail:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
}

export const deleteMovieDetail = async (req: Request, res: Response): Promise<void> => {
  try {
    const movieDetailId = req.params.id
    await prisma.movie_details.delete({
      where: {
        id: movieDetailId,
      },
    })
    res.status(204).send()
  } catch (error) {
    console.error('Error deleting movie detail:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
}
