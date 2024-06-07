// controllers/UserController.ts

import { Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const createUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email, contact, role, password } = req.body
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password, // Ensure you hash the password before saving to the database
        contact,
        role,
      },
    })
    res.status(201).json({ user })
  } catch (error) {
    console.error('Error creating user:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
}

export const getUserById = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.params.id
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    })
    if (!user) {
      res.status(404).json({ error: 'User not found' })
      return
    }
    res.status(200).json({ user })
  } catch (error) {
    console.error('Error fetching user:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
}

export const updateUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.params.id
    const { name, email, contact, role } = req.body
    const updatedUser = await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        name,
        email,
        contact,
        role,
      },
    })
    res.status(200).json({ user: updatedUser })
  } catch (error) {
    console.error('Error updating user:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
}

export const deleteUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.params.id
    await prisma.user.delete({
      where: {
        id: userId,
      },
    })
    res.status(204).send()
  } catch (error) {
    console.error('Error deleting user:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
}
