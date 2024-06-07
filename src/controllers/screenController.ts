// controllers/ScreenController.ts

import { Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const createScreen = async (req: Request, res: Response): Promise<void> => {
  try {
    const { theaterId } = req.params
    const screen = await prisma.screens.create({
      data: {
        theater: {
          connect: { id: theaterId },
        },
      },
    })
    res.status(201).json({ screen })
  } catch (error) {
    console.error('Error creating screen:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
}

export const getScreenById = async (req: Request, res: Response): Promise<void> => {
  try {
    const screenId = req.params.id
    const screen = await prisma.screens.findUnique({
      where: {
        id: screenId,
      },
    })
    if (!screen) {
      res.status(404).json({ error: 'Screen not found' })
      return
    }
    res.status(200).json({ screen })
  } catch (error) {
    console.error('Error fetching screen:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
}

export const updateScreen = async (req: Request, res: Response): Promise<void> => {
  // try {
  //   const screenId = req.params.id
  //   const updatedScreen = await prisma.screens.update({
  //     where: {
  //       id: screenId,
  //     },
  //   })
  //   res.status(200).json({ screen: updatedScreen })
  // } catch (error) {
  //   console.error('Error updating screen:', error)
  //   res.status(500).json({ error: 'Internal server error' })
  // }
}

export const deleteScreen = async (req: Request, res: Response): Promise<void> => {
  try {
    const screenId = req.params.id
    await prisma.screens.delete({
      where: {
        id: screenId,
      },
    })
    res.status(204).send()
  } catch (error) {
    console.error('Error deleting screen:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
}
