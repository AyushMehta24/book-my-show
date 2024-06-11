import { NextFunction, Request, Response } from 'express'
import Joi from 'joi'

export const createTheaterValidate = (req: Request, res: Response, next: NextFunction) => {
  const result = Joi.object().keys({
    name: Joi.string()
      .pattern(/^[A-Za-z]+$/)
      .required(),
    address: Joi.string().min(20).max(100).required(),
    owner_id: Joi.string().min(36).max(36).required(),
  })

  const valid = result.validate(req.body)
  if (valid.error != null) {
    return res.json({ message: valid.error.details[0].message })
  }
  next()
}

export const updateTheaterValidate = (req: Request, res: Response, next: NextFunction) => {
  const result = Joi.object().keys({
    name: Joi.string().pattern(/^[A-Za-z]+$/),
    address: Joi.string().min(20).max(100),
  })

  const valid = result.validate(req.body)
  if (valid.error != null) {
    return res.json({ message: valid.error.details[0].message })
  }
  next()
}

export const createTheaterWithScreenValidate = (req: Request, res: Response, next: NextFunction) => {
  const result = Joi.object().keys({
    name: Joi.string()
      .pattern(/^[A-Za-z]+$/)
      .required(),
    address: Joi.string().min(20).max(100).required(),
    owner_id: Joi.string().min(36).max(36).required(),
    numScreen: Joi.number().min(0).max(20).required(),
  })

  const valid = result.validate(req.body)
  if (valid.error != null) {
    return res.json({ message: valid.error.details[0].message })
  }
  next()
}

export const createTheaterWithSeatValidate = (req: Request, res: Response, next: NextFunction) => {
  const result = Joi.object().keys({
    name: Joi.string()
      .pattern(/^[A-Za-z]+$/)
      .required(),
    address: Joi.string().min(20).max(100).required(),
    owner_id: Joi.string().min(36).max(36).required(),
    numSeat: Joi.number().min(0).max(100).required(),
    seatTypeId: Joi.string().min(36).max(36).required(),
  })

  const valid = result.validate(req.body)
  if (valid.error != null) {
    return res.json({ message: valid.error.details[0].message })
  }
  next()
}
