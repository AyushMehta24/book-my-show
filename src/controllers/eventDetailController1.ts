// controllers/EventDetailController.ts

import { Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const createEventDetail = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, description, date, start_time, address, fair } = req.body
    const eventDetail = await prisma.event_details.create({
      data: {
        name,
        description,
        date,
        start_time,
        address,
        fair,
      },
    })
    res.status(201).json({ eventDetail })
  } catch (error) {
    console.error('Error creating event detail:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
}

export const getEventDetailById = async (req: Request, res: Response): Promise<void> => {
  try {
    const eventDetailId = req.params.id
    const eventDetail = await prisma.event_details.findUnique({
      where: {
        id: eventDetailId,
      },
    })
    if (!eventDetail) {
      res.status(404).json({ error: 'Event detail not found' })
      return
    }
    res.status(200).json({ eventDetail })
  } catch (error) {
    console.error('Error fetching event detail:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
}

export const updateEventDetail = async (req: Request, res: Response): Promise<void> => {
  try {
    const eventDetailId = req.params.id
    const { name, description, date, start_time, address, fair } = req.body
    const updatedEventDetail = await prisma.event_details.update({
      where: {
        id: eventDetailId,
      },
      data: {
        name,
        description,
        date,
        start_time,
        address,
        fair,
      },
    })
    res.status(200).json({ eventDetail: updatedEventDetail })
  } catch (error) {
    console.error('Error updating event detail:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
}

export const deleteEventDetail = async (req: Request, res: Response): Promise<void> => {
  try {
    const eventDetailId = req.params.id
    await prisma.event_details.delete({
      where: {
        id: eventDetailId,
      },
    })
    res.status(204).send()
  } catch (error) {
    console.error('Error deleting event detail:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
}
