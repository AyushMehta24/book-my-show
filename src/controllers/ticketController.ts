// controllers/TicketController.ts

import { Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const createTicket = async (req: Request, res: Response): Promise<void> => {
  try {
    const { bookingId, seatId } = req.body
    const ticket = await prisma.tickets.create({
      data: {
        bookings: {
          connect: { id: bookingId },
        },
        seats: {
          connect: { id: seatId },
        },
      },
    })
    res.status(201).json({ ticket })
  } catch (error) {
    console.error('Error creating ticket:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
}

export const getTicketById = async (req: Request, res: Response): Promise<void> => {
  try {
    const ticketId = req.params.id
    const ticket = await prisma.tickets.findUnique({
      where: {
        id: ticketId,
      },
    })
    if (!ticket) {
      res.status(404).json({ error: 'Ticket not found' })
      return
    }
    res.status(200).json({ ticket })
  } catch (error) {
    console.error('Error fetching ticket:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
}

export const updateTicket = async (req: Request, res: Response): Promise<void> => {
  try {
    const ticketId = req.params.id
    const { bookingId, seatId } = req.body
    const updatedTicket = await prisma.tickets.update({
      where: {
        id: ticketId,
      },
      data: {
        bookings: {
          connect: { id: bookingId },
        },
        seats: {
          connect: { id: seatId },
        },
      },
    })
    res.status(200).json({ ticket: updatedTicket })
  } catch (error) {
    console.error('Error updating ticket:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
}

export const deleteTicket = async (req: Request, res: Response): Promise<void> => {
  try {
    const ticketId = req.params.id
    await prisma.tickets.delete({
      where: {
        id: ticketId,
      },
    })
    res.status(204).send()
  } catch (error) {
    console.error('Error deleting ticket:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
}
