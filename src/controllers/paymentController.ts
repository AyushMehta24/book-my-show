// controllers/PaymentController.ts

import { Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const createPayment = async (req: Request, res: Response): Promise<void> => {
  try {
    const { bookingId, fair, status } = req.body
    const payment = await prisma.payments.create({
      data: {
        bookings: {
          connect: { id: bookingId },
        },
        fair,
        status,
      },
    })
    res.status(201).json({ payment })
  } catch (error) {
    console.error('Error creating payment:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
}

export const getPaymentById = async (req: Request, res: Response): Promise<void> => {
  try {
    const paymentId = req.params.id
    const payment = await prisma.payments.findUnique({
      where: {
        id: paymentId,
      },
    })
    if (!payment) {
      res.status(404).json({ error: 'Payment not found' })
      return
    }
    res.status(200).json({ payment })
  } catch (error) {
    console.error('Error fetching payment:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
}

export const updatePayment = async (req: Request, res: Response): Promise<void> => {
  try {
    const paymentId = req.params.id
    const { bookingId, fair, status } = req.body
    const updatedPayment = await prisma.payments.update({
      where: {
        id: paymentId,
      },
      data: {
        bookings: {
          connect: { id: bookingId },
        },
        fair,
        status,
      },
    })
    res.status(200).json({ payment: updatedPayment })
  } catch (error) {
    console.error('Error updating payment:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
}

export const deletePayment = async (req: Request, res: Response): Promise<void> => {
  try {
    const paymentId = req.params.id
    await prisma.payments.delete({
      where: {
        id: paymentId,
      },
    })
    res.status(204).send()
  } catch (error) {
    console.error('Error deleting payment:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
}
