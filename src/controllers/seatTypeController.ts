import { Request, Response } from 'express'
import generalResponse from '../helper/generalResponse.helper'
import { PrismaClient } from '@prisma/client'
const Prisma = new PrismaClient()

export const createSeatType = async (req: Request, res: Response): Promise<void> => {
  try {
    let { type, fair } = req.body
    fair = Number(fair)

    const data: { id: string } = await Prisma.seat_types.create({
      data: {
        type: type,
        fair: fair,
      },
      select: {
        id: true,
      },
    })

    return generalResponse(res, data.id, 'Seat Type inserted successfully', 'success', false, 200)
  } catch (error) {
    return generalResponse(res, error, '', 'error', false, 400)
  }
}

export const updateSeatType = async (req: Request, res: Response): Promise<void> => {
  try {
    let seatData = req.body

    for (let key in seatData) {
      if (seatData[key] === undefined) {
        delete seatData[key]
      }
    }

    if (seatData.fair) {
      seatData = { ...seatData, fair: parseFloat(seatData.fair) }
    }

    const seatTypeId: string = req.params.id

    const validType = await Prisma.seat_types.findUnique({
      where: {
        id: seatTypeId,
      },
      select: {
        id: true,
      },
    })

    if (validType === null) {
      return generalResponse(res, '', 'There is no such Seat Type', 'success', false, 200)
    }

    const data: { id: string } = await Prisma.seat_types.update({
      where: {
        id: seatTypeId,
        is_deleted: false,
      },
      data: seatData,
      select: {
        id: true,
      },
    })

    return generalResponse(res, data.id, 'Seat Type updated successfully', 'success', false, 200)
  } catch (error) {
    return generalResponse(res, error, '', 'error', false, 400)
  }
}
