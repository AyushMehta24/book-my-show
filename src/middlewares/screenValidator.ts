import { NextFunction, Request, Response } from 'express'
import Joi from 'joi'

export const createScreenValidate = (req: Request, res: Response, next: NextFunction) => {
  const result = Joi.object().keys({
    screen: Joi.number().min(0).max(50).required(),
  })

  const valid = result.validate(req.body)
  if (valid.error != null) {
    return res.json({ message: valid.error.details[0].message })
  }
  next()
}
