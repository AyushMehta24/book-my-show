import { NextFunction, Request, Response } from 'express'
import Joi from 'joi'

export const createBookingValidate = (req: Request, res: Response, next: NextFunction) => {
  const result = Joi.object().keys({
    userId: Joi.string().min(36).max(36).required(),
    eventId: Joi.string().min(36).max(36).required(),
    seatId: Joi.string().min(36).max(36),
  })

  const valid = result.validate(req.body)
  if (valid.error != null) {
    return res.json({ message: valid.error.details[0].message })
  }
  next()
}

export const createManyBookingValidate = (req: Request, res: Response, next: NextFunction) => {
    const result = Joi.object().keys({
      userId: Joi.string().min(36).max(36).required(),
      eventId: Joi.string().min(36).max(36).required(),
      seatId1: Joi.string().min(36).max(36),
      seatId2: Joi.string().min(36).max(36),
      seatId3: Joi.string().min(36).max(36),
      seatId4: Joi.string().min(36).max(36),
      seatId5: Joi.string().min(36).max(36),
    })
  
    const valid = result.validate(req.body)
    if (valid.error != null) {
      return res.json({ message: valid.error.details[0].message })
    }
    next()
  }
  