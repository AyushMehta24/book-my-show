// controllers/TheaterController.ts

import { Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const createTheater = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, address } = req.body
    const theater = await prisma.theaters.create({
      data: {
        name,
        address,
      },
    })
    res.status(201).json({ theater })
  } catch (error) {
    console.error('Error creating theater:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
}

export const getTheaterById = async (req: Request, res: Response): Promise<void> => {
  try {
    const theaterId = req.params.id
    const theater = await prisma.theaters.findUnique({
      where: {
        id: theaterId,
      },
    })
    if (!theater) {
      res.status(404).json({ error: 'Theater not found' })
      return
    }
    res.status(200).json({ theater })
  } catch (error) {
    console.error('Error fetching theater:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
}

export const updateTheater = async (req: Request, res: Response): Promise<void> => {
  try {
    const theaterId = req.params.id
    const { name, address } = req.body
    const updatedTheater = await prisma.theaters.update({
      where: {
        id: theaterId,
      },
      data: {
        name,
        address,
      },
    })
    res.status(200).json({ theater: updatedTheater })
  } catch (error) {
    console.error('Error updating theater:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
}

export const deleteTheater = async (req: Request, res: Response): Promise<void> => {
  try {
    const theaterId = req.params.id
    await prisma.theaters.delete({
      where: {
        id: theaterId,
      },
    })
    res.status(204).send()
  } catch (error) {
    console.error('Error deleting theater:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
}
