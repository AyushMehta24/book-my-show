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
    let { type, fair } = req.body
    const seatTypeId:string = req.params.id
    fair = Number(fair)

    const data: { id: string } = await Prisma.seat_types.update({
      where:{
        id:seatTypeId,
        is_deleted:false
      },
      data: {
        type: type,
        fair: fair,
      },
      select: {
        id: true,
      },
    })

    return generalResponse(res, data.id, 'Seat Type updated successfully', 'success', false, 200)
  } catch (error) {
    return generalResponse(res, error, '', 'error', false, 400)
  }
}