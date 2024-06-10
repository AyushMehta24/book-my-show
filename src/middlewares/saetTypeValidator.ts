import { NextFunction, Request, Response } from 'express'
import Joi from 'joi'

export const createSeatTypeValidate = (req: Request, res: Response, next: NextFunction) => {
  const result = Joi.object().keys({
    type: Joi.string()
      .pattern(/^[A-Za-z]+$/)
      .required(),
    fair: Joi.number().min(0).required(),
  })

  const valid = result.validate(req.body)
  if (valid.error != null) {
    return res.json({ message: valid.error.details[0].message })
  }
  next()
}

export const updateSeatTypeValidate = (req: Request, res: Response, next: NextFunction) => {
  const result = Joi.object().keys({
    type: Joi.string().pattern(/^[A-Za-z]+$/),
    fair: Joi.number().min(0),
  })

  const valid = result.validate(req.body)
  if (valid.error != null) {
    return res.json({ message: valid.error.details[0].message })
  }
  next()
}
