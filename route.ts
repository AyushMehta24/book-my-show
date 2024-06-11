import { Router, Request, Response } from 'express'
import passport from 'passport'
import jwt from 'jsonwebtoken'
import { PrismaClient } from '@prisma/client'
import argon2 from 'argon2'

const router = Router()
const prisma = new PrismaClient()

router.post('/register', async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body
    const existingUser = await prisma.user.findUnique({ where: { email } })
    if (existingUser) {
      return res.status(400).json({ message: 'Username already exists' })
    }
    const hashedPassword = await argon2.hash(password)
    const newUser = await prisma.user.create({
      data: { email: email, password: hashedPassword, name: 'sdj', contact: '6545445454', role: 'owner' },
    })
    return res.status(201).json({ message: 'User registered successfully' })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: 'Internal Server Error' })
  }
})

router.post('/login', async (req: Request, res: Response) => {
  const { email, password } = req.body
  const user = await prisma.user.findUnique({ where: { email } })
  if (!user) {
    return res.status(404).json({ message: 'User not found' })
  }
  const isMatch = await argon2.verify(user.password, password)
  if (!isMatch) {
    return res.status(400).json({ message: 'Incorrect password' })
  }
  const payload = { id: user.id, username: user.email }
  const token = jwt.sign(payload, process.env.SECRET_KEY || 'secret', { expiresIn: '1h' })
  return res.json({ success: true, token: `Bearer ${token}` })
})

router.get('/protected', passport.authenticate('jwt', { session: false }), (req: Request, res: Response) => {
  res.json({ message: 'Protected route accessed successfully' })
})

export default router
