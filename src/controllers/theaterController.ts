import { Request, Response } from 'express'
import generalResponse from '../helper/generalResponse.helper'
import { PrismaClient } from '@prisma/client'
const Prisma = new PrismaClient()

export const createTheater = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, address, owner_id } = req.body

    const validOwner: { id: string } | null = await Prisma.user.findUnique({
      where: {
        id: owner_id,
        is_deleted: false,
        role: 'owner',
      },
      select: {
        id: true,
      },
    })

    if (validOwner === null) {
      return generalResponse(res, '', 'There is no such owner.', 'success', false, 200)
    }

    const theater: { id: string } = await Prisma.theaters.create({
      data: {
        name,
        address,
        owners: {
          connect: {
            id: owner_id,
          },
        },
      },
      select: {
        id: true,
      },
    })
    return generalResponse(res, theater.id, 'Theater inserted successfully', 'success', false, 200)
  } catch (error) {
    return generalResponse(res, error, '', 'error', false, 400)
  }
}

export const getAllTheater = async (req: Request, res: Response): Promise<void> => {
  try {
    const theater = await Prisma.theaters.findMany({
      where: {
        is_deleted: false,
      },
      select: {
        name: true,
        address: true,
      },
    })

    if (theater.length > 0) {
      return generalResponse(res, theater, 'All Theaters', 'success', false, 200)
    } else {
      return generalResponse(res, theater, 'No theater Found', 'success', false, 200)
    }
  } catch (error) {
    return generalResponse(res, error, '', 'error', false, 400)
  }
}

export const updateTheater = async (req: Request, res: Response): Promise<void> => {
  try {
    const theaterData: Partial<{ name: string; address: string }> = req.body

    const validId: { id: string } | null = await Prisma.theaters.findUnique({
      where: {
        id: req.params.id,
        is_deleted: false,
      },
      select: {
        id: true,
      },
    })

    if (validId !== null) {
      const data = await Prisma.theaters.update({
        where: { id: req.params.id },
        data: theaterData,
        select: {
          name: true,
          address: true,
        },
      })
      return generalResponse(res, data, 'Theater Updated Successfully', 'success', false, 200)
    } else {
      return generalResponse(res, '', 'Theater Not Found', 'success', false, 200)
    }
  } catch (error) {
    return generalResponse(res, error, '', 'error', false, 400)
  }
}

export const deleteTheater = async (req: Request, res: Response): Promise<void> => {
  try {
    const id: string = req.params.id

    const validId: { id: string } | null = await Prisma.theaters.findUnique({
      where: {
        id: req.params.id,
      },
      select: {
        id: true,
      },
    })

    if (validId !== null) {
      const data: { id: string } = await Prisma.theaters.update({
        where: {
          id: id,
        },
        data: {
          is_deleted: true,
        },
        select: {
          id: true,
        },
      })
      return generalResponse(res, data, 'Theater Deleted Successfully', 'success', false, 200)
    } else {
      return generalResponse(res, '', 'Theater Not Found', 'success', false, 200)
    }
  } catch (error) {
    return generalResponse(res, error, '', 'error', false, 400)
  }
}

//save

export const createTheaterWithScreen = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, address, owner_id, numScreen } = req.body
    const numScreens = Number(numScreen)

    const screenData = new Array(numScreens).fill({})

    const validOwner: { id: string } | null = await Prisma.user.findUnique({
      where: {
        id: owner_id,
        is_deleted: false,
        role: 'owner',
      },
      select: {
        id: true,
      },
    })

    if (validOwner === null) {
      return generalResponse(res, '', 'There is no such owner.', 'success', false, 200)
    }

    const theater: { id: string } = await Prisma.theaters.create({
      data: {
        name,
        address,
        owners: {
          connect: {
            id: owner_id,
          },
        },
        screens: {
          createMany: {
            data: screenData,
          },
        },
      },
      select: {
        id: true,
      },
    })
    return generalResponse(res, theater.id, 'Theater inserted successfully With Screens', 'success', false, 200)
  } catch (error) {
    return generalResponse(res, error, '', 'error', false, 400)
  }
}

export const createTheaterWithSeat = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, address, owner_id, numSeat, seatTypeId } = req.body
    const numSeats = Number(numSeat)

    const seatData = new Array(numSeats).fill({ seatTypeId: seatTypeId })

    const validOwner: { id: string } | null = await Prisma.user.findUnique({
      where: {
        id: owner_id,
        is_deleted: false,
        role: 'owner',
      },
      select: {
        id: true,
      },
    })

    if (validOwner === null) {
      return generalResponse(res, '', 'There is no such owner.', 'success', false, 200)
    }

    const theater: { id: string } = await Prisma.theaters.create({
      data: {
        name,
        address,
        owners: {
          connect: {
            id: owner_id,
          },
        },
        screens: {
          create: {
            seats: {
              createMany: {
                data: seatData,
              },
            },
          },
        },
      },
      select: {
        id: true,
      },
    })
    return generalResponse(res, theater.id, 'Theater inserted successfully With Seats', 'success', false, 200)
  } catch (error) {
    return generalResponse(res, error, '', 'error', false, 400)
  }
}
