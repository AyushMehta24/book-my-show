import { Request, Response } from 'express'
import generalResponse from '../helper/generalResponse.helper'
import { PrismaClient } from '@prisma/client'
const Prisma = new PrismaClient()

export const createEventDetail = async (req: Request, res: Response): Promise<void> => {
  try {
    const { address, fair, name, description, date, startTime, ownerId } = req.body

    const formattedDate = new Date(date)

    if (isNaN(formattedDate.getTime())) {
      throw new Error('Invalid date')
    }

    formattedDate.setHours(startTime.split(':')[0], startTime.split(':')[1], 0, 0)

    const formattedDateString = formattedDate.toISOString()

    const event = await Prisma.event_details.create({
      data: {
        name: name,
        description: description,
        date: new Date(formattedDateString),
        start_time: startTime,
        address: address,
        fair: Number(fair),
        owner: {
          connect: {
            id: ownerId,
          },
        },
      },
    })

    return generalResponse(res, event.id, 'event created successfully', 'success', false, 200)
  } catch (error: any) {
    return generalResponse(res, error, '', 'error', false, 400)
  }
}

export const updateEventDetail = async (req: Request, res: Response): Promise<void> => {
  try {
    const eventId = req.params.eventId
    const { address, fair, name, description, date, start_time, ownerId } = req.body

    const validEvent = await Prisma.event_details.findUnique({
      where: {
        id: eventId,
        is_deleted: false,
      },
      select: {
        id: true,
      },
    })

    if (validEvent === null) {
      return generalResponse(res, '', 'There is no such Event', 'success', false, 200)
    }

    const validOwner = await Prisma.user.findUnique({
      where: {
        id: ownerId,
        is_deleted: false,
      },
      select: {
        id: true,
      },
    })

    if (validOwner === null) {
      return generalResponse(res, '', 'There is no such Owner', 'success', false, 200)
    }

    const validEventOwner = await Prisma.user.findUnique({
      where: {
        id: ownerId,
        is_deleted: false,
        events: {
          some: {
            id: eventId,
          },
        },
      },
      select: {
        id: true,
      },
    })

    if (validEventOwner === null) {
      return generalResponse(res, '', "You don't have access to this Event", 'success', false, 200)
    }

    const formattedDate = new Date(date)

    if (isNaN(formattedDate.getTime())) {
      throw new Error('Invalid date')
    }

    formattedDate.setHours(start_time.split(':')[0], start_time.split(':')[1], 0, 0)

    const formattedDateString = formattedDate.toISOString()

    const event = await Prisma.event_details.update({
      where: { id: eventId, is_deleted: false },
      data: {
        name: name,
        description: description,
        date: new Date(formattedDateString),
        start_time: start_time,
        address: address,
        fair: Number(fair),
        owner: {
          connect: {
            id: ownerId,
          },
        },
      },
    })

    return generalResponse(res, event.id, 'event updated successfully', 'success', false, 200)
  } catch (error: any) {
    return generalResponse(res, error, '', 'error', false, 400)
  }
}

export const deleteEventDetail = async (req: Request, res: Response): Promise<void> => {
  try {
    const ownerId = req.body.ownerId
    const eventId = req.params.eventId

    const validOwner: { id: string } | null = await Prisma.user.findUnique({
      where: {
        id: ownerId,
        is_deleted: false,
        events: {
          some: {
            id: eventId,
          },
        },
      },
      select: {
        id: true,
      },
    })

    if (validOwner === null) {
      return generalResponse(res, '', "Can't delete this event.", 'success', false, 200)
    }

    const validEvent = await Prisma.event_details.findUnique({
      where: {
        id: eventId,
        is_deleted: false,
      },
      select: {
        id: true,
      },
    })

    if (validEvent === null) {
      return generalResponse(res, '', 'There is no such Event.', 'success', false, 200)
    }

    const event = await Prisma.event_details.update({
      where: {
        id: eventId,
        is_deleted: false,
      },
      data: {
        is_deleted: true,
        deleted_at: new Date(),
      },
    })

    return generalResponse(res, event.id, 'Event deleted successfully', 'success', false, 200)
  } catch (error: any) {
    return generalResponse(res, error, '', 'error', false, 400)
  }
}

export const allEventsDetail = async (req: Request, res: Response): Promise<void> => {
  try {
    const ownerId = req.params.ownerId

    const validOwner: { id: string } | null = await Prisma.user.findUnique({
      where: {
        id: ownerId,
        is_deleted: false,
        role: 'owner',
      },
      select: {
        id: true,
      },
    })

    if (validOwner === null) {
      return generalResponse(res, '', 'There is no such Owner.', 'success', false, 200)
    }

    const events = await Prisma.event_details.findMany({
      where: {
        owner_id: ownerId,
        is_deleted: false,
      },
      select: {
        name: true,
        description: true,
        start_time: true,
        date: true,
        address: true,
        fair: true,
      },
    })

    return generalResponse(res, events, 'Events Details', 'success', false, 200)
  } catch (error: any) {
    return generalResponse(res, error, '', 'error', false, 400)
  }
}
