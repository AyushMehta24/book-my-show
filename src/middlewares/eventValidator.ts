import { NextFunction, Request, Response } from 'express'
import Joi from 'joi'

export const createEventValidate = (req: Request, res: Response, next: NextFunction) => {
  const result = Joi.object().keys({
    name: Joi.string()
      .pattern(/^[A-Za-z]+$/)
      .required(),
    description: Joi.string().min(0).max(150).required(),
    date: Joi.string()
      .pattern(/^\d{4}\-(0?[1-9]|1[012])\-(0?[1-9]|[12][0-9]|3[01])$/)
      .required(),
    startTime: Joi.string()
      .pattern(/\b([01][0-9]|2[0-3]):([0-5][0-9])\b/)
      .required(),
    address: Joi.string().min(20).max(100).required(),
    fair: Joi.string()
      .min(0)
      .max(1000000)
      .pattern(/^[0-9]*$/)
      .required(),
    ownerId: Joi.string().min(36).max(36).required(),
  })

  const valid = result.validate(req.body)
  if (valid.error != null) {
    return res.json({ message: valid.error.details[0].message })
  }
  next()
}

export const updateEventValidate = (req: Request, res: Response, next: NextFunction) => {
  const result = Joi.object().keys({
    name: Joi.string().pattern(/^[A-Za-z]+$/),
    description: Joi.string().min(0).max(150),
    date: Joi.string().pattern(/^\d{4}\-(0?[1-9]|1[012])\-(0?[1-9]|[12][0-9]|3[01])$/),
    start_time: Joi.string().pattern(/\b([01][0-9]|2[0-3]):([0-5][0-9])\b/),
    address: Joi.string().min(20).max(100),
    fair: Joi.string()
      .min(0)
      .max(1000000)
      .pattern(/^[0-9]*$/),
    owner_id: Joi.string().min(36).max(36).required(),
  })

  const valid = result.validate(req.body)
  if (valid.error != null) {
    return res.json({ message: valid.error.details[0].message })
  }
  next()
}
