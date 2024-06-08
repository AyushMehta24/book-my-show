import { Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'
import generalResponse from '../helper/generalResponse.helper'

const prisma = new PrismaClient()

export const createSeat = async (req: Request, res: Response): Promise<void> => {
  try {
    const { seat, typeId } = req.body
    const screenId = req.params.screenId

    const numSeat = Number(seat)
    if (isNaN(numSeat) || numSeat <= 0) {
      return generalResponse(res, '', 'Invalid seat number provided.', 'error', false, 400)
    }

    const validScreen = await prisma.screens.findUnique({
      where: {
        id: screenId,
        is_deleted: false,
      },
      select: {
        id: true,
      },
    })

    if (validScreen === null) {
      return generalResponse(res, '', 'There is no such screen.', 'error', false, 404)
    }

    let allSeats: string[] = []
    for (let i = 0; i < numSeat; i++) {
      const seat = await prisma.seats.create({
        data: {
          screen_id: screenId,
          seatTypeId: typeId,
        },
        select: {
          id: true,
        },
      })

      allSeats.push(seat.id)
    }

    if (allSeats.length > 0) {
      return generalResponse(res, allSeats, 'Seats inserted successfully', 'success', false, 201)
    } else {
      return generalResponse(res, '', 'No seats inserted', 'error', false, 400)
    }
  } catch (error) {
    return generalResponse(res, '', 'An error occurred while creating seats', 'error', false, 500)
  }
}
