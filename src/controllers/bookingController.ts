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
        screen: {
          select: {
            seats: {
              where: {
                id: seatId,
              },
              select: {
                seatTypeId: true,
              },
            },
          },
        },
      },
    })

    const validEvent = await Prisma.event_details.findUnique({
      where: {
        id: eventId,
        is_deleted: false,
      },
      select: {
        id: true,
        fair: true,
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

    if (validMovie! == null) {
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
        seats: 1,
      },
      select: {
        id: true,
      },
    })

    // console.log(validMovie?.screen.seats[0].seatTypeId[0].fair)

    if (validEvent !== null) {
      const amount = Number(validEvent?.fair)

      const payment = await Prisma.payments.create({
        data: {
          booking_id: booking.id,
          fair: amount,
          status: false,
        },
      })
    }

    if (validMovie !== null) {
      const amount = Number(validMovie?.screen.seats[0].seatTypeId[0].fair)

      const payment = await Prisma.payments.create({
        data: {
          booking_id: booking.id,
          fair: amount,
          status: false,
        },
      })
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
        fair: true,
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

    const booking = await Prisma.bookings.create({
      data: {
        user_id: userId,
        event_id: eventId,
        event_type: type,
        seats: 5,
      },
      select: {
        id: true,
      },
    })

    if (validMovie !== null) {
      const validSeat1 = await Prisma.seats.findUnique({
        where: {
          id: seatId1,
          is_deleted: false,
        },
        select: {
          id: true,
          seatTypeId: {
            select: {
              fair: true,
            },
          },
        },
      })
      console.log(validSeat1?.seatTypeId[0].fair)
      const validSeat2 = await Prisma.seats.findUnique({
        where: {
          id: seatId2,
          is_deleted: false,
        },
        select: {
          id: true,
          seatTypeId: {
            select: {
              fair: true,
            },
          },
        },
      })
      const validSeat3 = await Prisma.seats.findUnique({
        where: {
          id: seatId3,
          is_deleted: false,
        },
        select: {
          id: true,
          seatTypeId: {
            select: {
              fair: true,
            },
          },
        },
      })
      const validSeat4 = await Prisma.seats.findUnique({
        where: {
          id: seatId4,
          is_deleted: false,
        },
        select: {
          id: true,
          seatTypeId: {
            select: {
              fair: true,
            },
          },
        },
      })
      const validSeat5 = await Prisma.seats.findUnique({
        where: {
          id: seatId5,
          is_deleted: false,
        },
        select: {
          id: true,
          seatTypeId: {
            select: {
              fair: true,
            },
          },
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
      const amount =
        Number(validSeat1?.seatTypeId[0].fair) +
        Number(validSeat2?.seatTypeId[0].fair) +
        Number(validSeat3?.seatTypeId[0].fair) +
        Number(validSeat4?.seatTypeId[0].fair) +
        Number(validSeat5?.seatTypeId[0].fair)

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

      const payment = await Prisma.payments.create({
        data: {
          booking_id: booking.id,
          fair: amount,
          status: false,
        },
      })
    }

    if (validEvent !== null) {
      const amount = Number(validEvent.fair)
      const payment = await Prisma.payments.create({
        data: {
          booking_id: booking.id,
          fair: 5 * amount,
          status: false,
        },
      })
    }

    if (validMovie !== null) {
    }
    return generalResponse(res, booking, 'Booking created successfully for 5', 'success', false, 200)
  } catch (error: any) {
    return generalResponse(res, error, '', 'error', false, 400)
  }
}

export const getBookingDetailsByBookingId = async (req: Request, res: Response) => {
  try {
    const bookingId = req.params.bookingId

    const validBooking = await Prisma.bookings.findUnique({
      where: {
        id: bookingId,
        is_deleted: false,
      },
      select: {
        id: true,
      },
    })

    if (validBooking === null) {
      return generalResponse(res, '', 'There is no such Booking.', 'error', false, 404)
    }

    const booking = await Prisma.bookings.findUnique({
      where: {
        id: bookingId,
        is_deleted: false,
      },
      select: {
        id: true,
        event_id: true,
        seats: true,
      },
    })

    if (booking === null) {
      return generalResponse(res, '', 'There is no such Booking.', 'error', false, 404)
    }

    const isMovie = await Prisma.movie_details.findUnique({
      where: {
        id: booking.event_id,
      },
      select: {
        name: true,
        description: true,
        date: true,
        start_time: true,
      },
    })

    const isEvent = await Prisma.event_details.findUnique({
      where: {
        id: booking.event_id,
        is_deleted: false,
      },
      select: {
        name: true,
        description: true,
        date: true,
        start_time: true,
        address: true,
      },
    })

    if (isMovie) {
      const movieBooking = await Prisma.bookings.findUnique({
        where: {
          id: bookingId,
        },
        select: {
          tickets: {
            select: {
              seat_id: true,
            },
          },
        },
      })
      return generalResponse(res, { booking, movieBooking }, 'Movie Booking Details', 'success', false, 200)
    }

    return generalResponse(res, booking, 'Event Booking Details', 'success', false, 200)
  } catch (error: any) {
    return generalResponse(res, error, '', 'error', false, 400)
  }
}
