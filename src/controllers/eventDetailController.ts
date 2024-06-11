import { Request, Response } from 'express'
import generalResponse from '../helper/generalResponse.helper'
import { PrismaClient } from '@prisma/client'
import { deleteTheater } from './theaterController'
const Prisma = new PrismaClient()

export const createEventDetail = async (req: Request, res: Response): Promise<void> => {
  try {
    const { address, fair, name, description, date, startTime, ownerId } = req.body

    const formattedDate = new Date(date)

    const event = await Prisma.event_details.create({
      data: {
        name: name,
        description: description,
        date: formattedDate,
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

    let eventData = req.body

    for (let key in eventData) {
      if (eventData[key] === undefined) {
        delete eventData[key]
      }
    }

    if (eventData.date) {
      eventData.date = new Date(eventData.date)
    }

    if (eventData.fair) {
      eventData.fair = parseFloat(eventData.fair)
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
      return generalResponse(res, '', 'There is no such Event', 'success', false, 200)
    }

    const validOwner = await Prisma.user.findUnique({
      where: {
        id: eventData.owner_id,
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
        id: eventData.owner_id,
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

    console.log(eventData)

    const event = await Prisma.event_details.update({
      where: { id: eventId, is_deleted: false },
      data: eventData,
      select: {
        id: true,
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

export const createEventAndBooking = async (req: Request, res: Response): Promise<void> => {
  try {
    const { address, fair, name, description, date, startTime, ownerId } = req.body

    const formattedDate = new Date(date)

    const data = await Prisma.$transaction(async (transaction) => {
      const event = await transaction.event_details.create({
        data: {
          name: name,
          description: description,
          date: formattedDate,
          start_time: startTime,
          address: address,
          fair: Number(fair),
          owner: {
            connect: {
              id: ownerId,
            },
          },
        },
        select: {
          id: true,
        },
      })
      const booking = await transaction.bookings.create({
        data: {
          event_type: 'event',
          event_id: event.id,
          user_id: ownerId,
        },
      })
      return event
    })

    return generalResponse(res, data.id, 'event created successfully with booking', 'success', false, 200)
  } catch (error: any) {
    return generalResponse(res, error, '', 'error', false, 400)
  }
}
