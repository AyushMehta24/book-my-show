import { Request, Response } from 'express'
import generalResponse from '../helper/generalResponse.helper'
import { PrismaClient } from '@prisma/client'
const Prisma = new PrismaClient()

export const createScreen = async (req: Request, res: Response): Promise<void> => {
  try {
    const theaterId: string = req.params.theaterId

    const validTheater: { id: string } | null = await Prisma.theaters.findUnique({
      where: {
        id: theaterId,
        is_deleted: false,
      },
      select: {
        id: true,
      },
    })

    if (validTheater === null) {
      return generalResponse(res, '', 'There is no such Theater.', 'success', false, 200)
    }

    const numScreen: number = Number(req.body.screen)

    let allScreens: string[] = []

    for (let i: number = 0; i < numScreen; i++) {
      const screen: { id: string } = await Prisma.screens.create({
        data: {
          theater: {
            connect: { id: theaterId },
          },
        },
        select: {
          id: true,
        },
      })
      allScreens.push(screen.id)
    }

    if (allScreens.length > 0) {
      return generalResponse(res, allScreens, 'Screens inserted successfully', 'success', false, 200)
    } else {
      return generalResponse(res, allScreens, 'No screens inserted', 'success', false, 200)
    }
  } catch (error) {
    return generalResponse(res, error, '', 'error', false, 400)
  }
}

export const getAllScreens = async (req: Request, res: Response): Promise<void> => {
  try {
    const theaterId: string = req.params.theaterId

    const validTheater: { id: string } | null = await Prisma.theaters.findUnique({
      where: {
        id: theaterId,
        is_deleted: false,
      },
      select: {
        id: true,
      },
    })

    if (validTheater === null) {
      return generalResponse(res, '', 'There is no such Theater.', 'success', false, 200)
    }

    const screens: { id: string }[] = await Prisma.screens.findMany({
      where: {
        is_deleted: false,
        theater: {
          id: theaterId,
        },
      },
      select: {
        id: true,
      },
    })

    if (screens) {
      return generalResponse(res, screens, 'All Screens in Thaeter', 'success', false, 200)
    } else {
      return generalResponse(res, screens, 'No Screens Found', 'success', false, 200)
    }
  } catch (error) {
    return generalResponse(res, error, '', 'error', false, 400)
  }
}

export const deleteScreen = async (req: Request, res: Response): Promise<void> => {
  try {
    const { ownerId, theaterId, screenId } = req.body

    const validOwner: { id: string } | null = await Prisma.user.findUnique({
      where: {
        id: ownerId,
        is_deleted: false,
        role: 'owner',
        theaters: {
          some: {
            id: theaterId,
            is_deleted: false,
            screens: {
              some: {
                id: screenId,
                is_deleted: false,
              },
            },
          },
        },
      },
      select: {
        id: true,
      },
    })

    if (validOwner === null) {
      return generalResponse(res, '', 'You have no access to remove this screen.', 'success', false, 200)
    }

    const validTheater: { id: string } | null = await Prisma.theaters.findUnique({
      where: {
        id: theaterId,
        is_deleted: false,
        screens: {
          some: {
            id: screenId,
          },
        },
      },
      select: {
        id: true,
      },
    })

    if (validTheater === null) {
      return generalResponse(res, '', "this Theater don't have this screen.", 'success', false, 200)
    }

    const validScreen: { id: string } | null = await Prisma.screens.findUnique({
      where: {
        id: screenId,
      },
      select: {
        id: true,
      },
    })

    if (validScreen !== null) {
      const deletedScreen: { id: string } = await Prisma.screens.update({
        where: {
          id: screenId,
        },
        data: {
          is_deleted: true,
        },
        select: {
          id: true,
        },
      })
      return generalResponse(res, deletedScreen, 'Screen Deleted Successfully', 'success', false, 200)
    } else {
      return generalResponse(res, '', 'Screen Not Found', 'success', false, 200)
    }
  } catch (error) {
    return generalResponse(res, error, '', 'error', false, 400)
  }
}
