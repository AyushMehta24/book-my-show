import { Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'
import generalResponse from '../helper/generalResponse.helper'

const prisma = new PrismaClient()

export const makePayment = async (req: Request, res: Response): Promise<void> => {
  try {
    const bookingId = req.params.bookingId
    const status = req.body.status

    const validBooking = await prisma.payments.findUnique({
      where: { booking_id: bookingId, status: false },
    })

    if (validBooking === null) {
      return generalResponse(res, '', 'Booking not found or already paid', 'success', false, 404)
    }
    const payment = await prisma.payments.update({
      where: { booking_id: bookingId },
      data: {
        status: Boolean(status),
      },
    })
    return generalResponse(res, payment.id, 'Payment updated successfully', 'success', false, 200)
  } catch (error) {
    return generalResponse(res, error, '', 'error', false, 400)
  }
}

export const getBills = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.params.userId

    const validUser = await prisma.user.findUnique({
      where: { id: userId, is_deleted: false },
    })

    if (validUser === null) {
      return generalResponse(res, '', 'No user found', 'success', false, 404)
    }

    const Bills = await prisma.bookings.findMany({
      where: {
        user_id: userId,
        payment: {
          status: false,
        },
      },
      select: {
        payment: {
          select: {
            booking_id: true,
            fair: true,
          },
        },
      },
    })
    return generalResponse(res, Bills, 'Pending Bills', 'success', false, 200)
  } catch (error) {
    return generalResponse(res, error, '', 'error', false, 400)
  }
}
