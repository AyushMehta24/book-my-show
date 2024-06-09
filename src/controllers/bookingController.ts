import argon2 from 'argon2'
import { Request, Response } from 'express'
import generalResponse from '../helper/generalResponse.helper'
import { PrismaClient } from '@prisma/client'

const Prisma = new PrismaClient()

export const createBooking = async (req: Request, res: Response) => {
  try {
    const { userId, eventId, seatId } = req.body

    const validUser = await Prisma.user.findUnique({
      where: {
        id: userId,
        is_deleted: false,
      },
      select: {
        id: true,
      },
    })

    if (validUser === null) {
      return generalResponse(res, '', 'There is no such User.', 'error', false, 404)
    }

    const validMovie = await Prisma.movie_details.findUnique({
      where: {
        id: eventId,
        is_deleted: false,
      },
      select: {
        id: true,
      },
    })

    const validEvent = await Prisma.event_details.findUnique({
      where: {
        id: eventId,
        is_deleted: false,
      },
      select: {
        id: true,
      },
    })

    if (validMovie === null && validEvent === null) {
      return generalResponse(res, '', 'There is no such Events.', 'error', false, 404)
    }

    let type = ''
    if (validEvent !== null) {
      type = 'event'
    }
    if (validMovie !== null) {
      type = 'movie'
    }

    if (validMovie) {
      const validSeat = await Prisma.seats.findUnique({
        where: {
          id: seatId,
          is_deleted: false,
        },
        select: {
          id: true,
        },
      })
      if (validSeat === null) {
        return generalResponse(res, '', 'There is no such seat.', 'error', false, 404)
      }
    }

    const booking = await Prisma.bookings.create({
      data: {
        user_id: userId,
        event_id: eventId,
        event_type: type,
      },
      select: {
        id: true,
      },
    })

    if (validMovie !== null) {
      const ticket = await Prisma.tickets.create({
        data: {
          booking_id: booking.id,
          seat_id: seatId,
        },
        select: {
          id: true,
        },
      })
    }
    return generalResponse(res, { booking }, 'Booking created successfully', 'success', false, 200)
  } catch (error: any) {
    return generalResponse(res, error, '', 'error', false, 400)
  }
}

export const createMultiBooking = async (req: Request, res: Response) => {
  try {
    const { userId, eventId, seatId1, seatId2, seatId3, seatId4, seatId5 } = req.body

    const validUser = await Prisma.user.findUnique({
      where: {
        id: userId,
        is_deleted: false,
      },
      select: {
        id: true,
      },
    })

    if (validUser === null) {
      return generalResponse(res, '', 'There is no such User.', 'error', false, 404)
    }

    const validMovie = await Prisma.movie_details.findUnique({
      where: {
        id: eventId,
        is_deleted: false,
      },
      select: {
        id: true,
      },
    })

    const validEvent = await Prisma.event_details.findUnique({
      where: {
        id: eventId,
        is_deleted: false,
      },
      select: {
        id: true,
      },
    })

    if (validMovie === null && validEvent === null) {
      return generalResponse(res, '', 'There is no such Events.', 'error', false, 404)
    }

    let type = ''
    if (validEvent !== null) {
      type = 'event'
    }
    if (validMovie !== null) {
      type = 'movie'
    }

    if (validMovie) {
      const validSeat1 = await Prisma.seats.findUnique({
        where: {
          id: seatId1,
          is_deleted: false,
        },
        select: {
          id: true,
        },
      })
      const validSeat2 = await Prisma.seats.findUnique({
        where: {
          id: seatId2,
          is_deleted: false,
        },
        select: {
          id: true,
        },
      })
      const validSeat3 = await Prisma.seats.findUnique({
        where: {
          id: seatId3,
          is_deleted: false,
        },
        select: {
          id: true,
        },
      })
      const validSeat4 = await Prisma.seats.findUnique({
        where: {
          id: seatId4,
          is_deleted: false,
        },
        select: {
          id: true,
        },
      })
      const validSeat5 = await Prisma.seats.findUnique({
        where: {
          id: seatId5,
          is_deleted: false,
        },
        select: {
          id: true,
        },
      })
      if (validSeat1 === null) {
        return generalResponse(res, '', 'There is no such seat1.', 'error', false, 404)
      }
      if (validSeat2 === null) {
        return generalResponse(res, '', 'There is no such seat2.', 'error', false, 404)
      }
      if (validSeat3 === null) {
        return generalResponse(res, '', 'There is no such seat3.', 'error', false, 404)
      }
      if (validSeat4 === null) {
        return generalResponse(res, '', 'There is no such seat4.', 'error', false, 404)
      }
      if (validSeat5 === null) {
        return generalResponse(res, '', 'There is no such seat5.', 'error', false, 404)
      }
    }

    const booking = await Prisma.bookings.create({
      data: {
        user_id: userId,
        event_id: eventId,
        event_type: type,
      },
    })

    if (validMovie !== null) {
      const ticket = await Prisma.tickets.createMany({
        data: [
          {
            booking_id: booking.id,
            seat_id: seatId1,
          },
          {
            booking_id: booking.id,
            seat_id: seatId2,
          },
          {
            booking_id: booking.id,
            seat_id: seatId3,
          },
          {
            booking_id: booking.id,
            seat_id: seatId4,
          },
          {
            booking_id: booking.id,
            seat_id: seatId5,
          },
        ],
      })
    }
    return generalResponse(res, booking, 'Booking created successfully', 'success', false, 200)
  } catch (error: any) {
    return generalResponse(res, error, '', 'error', false, 400)
  }
}
