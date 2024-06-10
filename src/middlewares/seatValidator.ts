import { NextFunction, Request, Response } from 'express'
import Joi from 'joi'

export const createSeatValidate = (req: Request, res: Response, next: NextFunction) => {
  const result = Joi.object().keys({
    seat: Joi.number().min(0).max(100).required(),
    typeId: Joi.string().min(36).max(36).required(),
  })

  const valid = result.validate(req.body)
  if (valid.error != null) {
    return res.json({ message: valid.error.details[0].message })
  }
  next()
}

export const deleteSeatValidate = (req: Request, res: Response, next: NextFunction) => {
    const result = Joi.object().keys({
      seatId: Joi.string().min(36).max(36).required(),
    })
  
    const valid = result.validate(req.body)
    if (valid.error != null) {
      return res.json({ message: valid.error.details[0].message })
    }
    next()
  }