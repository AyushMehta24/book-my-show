// controllers/SeatController.ts

import { Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// export const createSeat = async (req: Request, res: Response): Promise<void> => {
//   try {
//     const { screenId } = req.params
//     const { type, fair } = req.body
//     const seat = await prisma.seats.create({
//       data: {
//         type,
//         fair,
//         screen: {
//           connect: { id: screenId },
//         },
//       },
//     })
//     res.status(201).json({ seat })
//   } catch (error) {
//     console.error('Error creating seat:', error)
//     res.status(500).json({ error: 'Internal server error' })
//   }
// }

export const getSeatById = async (req: Request, res: Response): Promise<void> => {
  try {
    const seatId = req.params.id
    const seat = await prisma.seats.findUnique({
      where: {
        id: seatId,
      },
    })
    if (!seat) {
      res.status(404).json({ error: 'Seat not found' })
      return
    }
    res.status(200).json({ seat })
  } catch (error) {
    console.error('Error fetching seat:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
}

export const updateSeat = async (req: Request, res: Response): Promise<void> => {
  try {
    const seatId = req.params.id
    const { type, fair } = req.body
    const updatedSeat = await prisma.seats.update({
      where: {
        id: seatId,
      },
      data: {
        type,
        fair,
      },
    })
    res.status(200).json({ seat: updatedSeat })
  } catch (error) {
    console.error('Error updating seat:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
}

export const deleteSeat = async (req: Request, res: Response): Promise<void> => {
  try {
    const seatId = req.params.id
    await prisma.seats.delete({
      where: {
        id: seatId,
      },
    })
    res.status(204).send()
  } catch (error) {
    console.error('Error deleting seat:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
}
