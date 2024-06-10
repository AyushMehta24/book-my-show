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
          seatTypeId: typeId
          },
        },
      )

      allSeats.push(seat.id)
    }

    if (allSeats.length > 0) {
      return generalResponse(res, allSeats, 'Seats inserted successfully', 'success', false, 201)
    } else {
      return generalResponse(res, '', 'No seats inserted', 'error', false, 400)
    }
  } catch (error) {
    return generalResponse(res, error, '', 'error', false, 400)
  }
}

export const updateSeat = async (req: Request, res: Response): Promise<void> => {
  try {
    const { typeId, seatId } = req.body
    const screenId = req.params.screenId

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

    const seat = await prisma.seats.update({
      where: {
        id: seatId,
        is_deleted: false,
      },
      data: {
        screen_id: screenId,
        seatTypeId: typeId
      },
      select: {
        id: true,
      },
    })

    return generalResponse(res, seat, 'Seats updated successfully', 'success', false, 201)
  } catch (error) {
    return generalResponse(res, error, '', 'error', false, 400)
  }
}

export const deleteSeat = async (req: Request, res: Response): Promise<void> => {
  try {
    const { seatId } = req.body
    const screenId = req.params.screenId

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

    const seat = await prisma.seats.update({
      where: {
        id: seatId,
        is_deleted: false,
        screen_id: screenId,
      },
      data: {
        is_deleted: true,
        deleted_at: new Date(),
      },
      select: {
        id: true,
      },
    })

    return generalResponse(res, seat, 'Seats deleted successfully', 'success', false, 200)
  } catch (error) {
    return generalResponse(res, error, '', 'error', false, 400)
  }
}

export const allSeats = async (req: Request, res: Response): Promise<void> => {
  try {
    const screenId = req.params.screenId

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

    const seat = await prisma.seats.findMany({
      where: {
        is_deleted: false,
        screen_id: screenId,
      },
      select: {
        id: true,
        seatType:{
          select:{
            type:true
          }
        }
      },
    })

    if (seat.length > 0) {
      return generalResponse(res, seat, 'All Seats', 'success', false, 200)
    }
    return generalResponse(res, "", 'There is no Seats for Now', 'success', false, 200)


  } catch (error) {
    return generalResponse(res, error, '', 'error', false, 400)
  }
}
