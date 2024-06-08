import argon2 from 'argon2'
import { Request, Response } from 'express'
import generalResponse from '../helper/generalResponse.helper'
import { PrismaClient } from '@prisma/client'

const Prisma = new PrismaClient()

export const createUser = async (req: Request, res: Response) => {
  try {
    const { name, email, contact, role, password } = req.body
    const data: { id: string } = await Prisma.user.create({
      data: {
        name: name,
        email: email,
        password: await argon2.hash(password),
        contact: contact,
        role: role,
      },
      select: {
        id: true,
      },
    })
    return generalResponse(res, data.id, 'User inserted successfully', 'success', false, 200)
  } catch (error: any) {
    return generalResponse(res, error, '', 'error', false, 400)
  }
}

export const getAllUser = async (req: Request, res: Response) => {
  try {
    const data = await Prisma.user.findMany({
      where: {
        is_deleted: false,
      },
      select: {
        name: true,
        email: true,
        contact: true,
        role: true,
      },
    })
    if (data) {
      return generalResponse(res, data, 'All Users', 'success', false, 200)
    } else {
      return generalResponse(res, data, 'No User Found', 'success', false, 200)
    }
  } catch (error) {
    return generalResponse(res, error, '', 'error', false, 400)
  }
}

export const updateUser = async (req: Request, res: Response) => {
  try {
    const userData: Partial<{ name: string; password: string; email: string; contact: string; role: string }> = req.body

    const validId: { id: string } | null = await Prisma.user.findUnique({
      where: {
        id: req.params.id,
      },
      select: {
        id: true,
      },
    })

    if (validId !== null) {
      const data = await Prisma.user.update({
        where: { id: req.params.id },
        data: userData,
        select: {
          name: true,
          email: true,
          contact: true,
          role: true,
        },
      })
      return generalResponse(res, data, 'User Updated Successfully', 'success', false, 200)
    } else {
      return generalResponse(res, '', 'User Not Found', 'success', false, 200)
    }
  } catch (error) {
    return generalResponse(res, error, '', 'error', false, 400)
  }
}

export const deleteUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const id: string = req.params.id

    const validId: { id: string } | null = await Prisma.user.findUnique({
      where: {
        id: req.params.id,
      },
      select: {
        id: true,
      },
    })

    if (validId !== null) {
      const data: { id: string } = await Prisma.user.update({
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
      return generalResponse(res, data, 'User Deleted Successfully', 'success', false, 200)
    } else {
      return generalResponse(res, '', 'User Not Found', 'success', false, 200)
    }
  } catch (error) {
    console.error('Error deleting user:', error)
    return generalResponse(res, error, '', 'error', false, 400)
  }
}
