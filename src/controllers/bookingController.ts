// controllers/BookingController.ts

import { Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const createBooking = async (req: Request, res: Response): Promise<void> => {
  try {
    const { userId, eventId, eventType } = req.body
    const booking = await prisma.bookings.create({
      data: {
        user: {
          connect: { id: userId },
        },
        event_id: eventId,
        event_type: eventType,
      },
    })
    res.status(201).json({ booking })
  } catch (error) {
    console.error('Error creating booking:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
}

export const getBookingById = async (req: Request, res: Response): Promise<void> => {
  try {
    const bookingId = req.params.id
    const booking = await prisma.bookings.findUnique({
      where: {
        id: bookingId,
      },
    })
    if (!booking) {
      res.status(404).json({ error: 'Booking not found' })
      return
    }
    res.status(200).json({ booking })
  } catch (error) {
    console.error('Error fetching booking:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
}

export const updateBooking = async (req: Request, res: Response): Promise<void> => {
  try {
    const bookingId = req.params.id
    const { userId, eventId, eventType } = req.body
    const updatedBooking = await prisma.bookings.update({
      where: {
        id: bookingId,
      },
      data: {
        user: {
          connect: { id: userId },
        },
        event_id: eventId,
        event_type: eventType,
      },
    })
    res.status(200).json({ booking: updatedBooking })
  } catch (error) {
    console.error('Error updating booking:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
}

export const deleteBooking = async (req: Request, res: Response): Promise<void> => {
  try {
    const bookingId = req.params.id
    await prisma.bookings.delete({
      where: {
        id: bookingId,
      },
    })
    res.status(204).send()
  } catch (error) {
    console.error('Error deleting booking:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
}
