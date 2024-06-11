import { NextFunction, Request, Response } from 'express'
import Joi from 'joi'

export const createUserValidate = (req: Request, res: Response, next: NextFunction) => {
  const roleType = { A: 'owner', B: 'user' }

  const passPattern = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,}$/
  const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/

  const result = Joi.object().keys({
    name: Joi.string()
      .pattern(/^[A-Za-z]+$/)
      .required(),
    email: Joi.string().regex(emailPattern).required(),
    password: Joi.string().regex(passPattern).required(),
    contact: Joi.string()
      .length(10)
      .pattern(/[1-9]{1}[0-9]{9}/)
      .required(),
    role: Joi.string().valid(...Object.values(roleType)),
  })

  const valid = result.validate(req.body)
  if (valid.error != null) {
    return res.json({ message: valid.error.details[0].message })
  }
  next()
}

export const updateUserValidate = (req: Request, res: Response, next: NextFunction) => {
  const roleType = { A: 'owner', B: 'user' }

  const passPattern = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,}$/
  const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/

  const result = Joi.object().keys({
    name: Joi.string().pattern(/^[A-Za-z]+$/),
    email: Joi.string().regex(emailPattern),
    password: Joi.string().regex(passPattern),
    contact: Joi.string()
      .length(10)
      .pattern(/[1-9]{1}[0-9]{9}/),
    role: Joi.string().valid(...Object.values(roleType)),
  })

  const valid = result.validate(req.body)
  if (valid.error != null) {
    return res.json({ message: valid.error.details[0].message })
  }
  next()
}

export const createUserWithTheaterValidate = (req: Request, res: Response, next: NextFunction) => {
  const roleType = { A: 'owner', B: 'user' }

  const passPattern = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,}$/
  const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/

  const result = Joi.object().keys({
    name: Joi.string()
      .pattern(/^[A-Za-z]+$/)
      .required(),
    email: Joi.string().regex(emailPattern).required(),
    password: Joi.string().regex(passPattern).required(),
    contact: Joi.string()
      .length(10)
      .pattern(/[1-9]{1}[0-9]{9}/)
      .required(),
    role: Joi.string().valid(...Object.values(roleType)),
    theaterName: Joi.string()
      .pattern(/^[A-Za-z]+$/)
      .required(),
    theaterAddress: Joi.string().min(20).max(100).required(),
  })

  const valid = result.validate(req.body)
  if (valid.error != null) {
    return res.json({ message: valid.error.details[0].message })
  }
  next()
}

export const createUserWithScreenValidate = (req: Request, res: Response, next: NextFunction) => {
  const roleType = { A: 'owner', B: 'user' }

  const passPattern = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,}$/
  const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/

  const result = Joi.object().keys({
    name: Joi.string()
      .pattern(/^[A-Za-z]+$/)
      .required(),
    email: Joi.string().regex(emailPattern).required(),
    password: Joi.string().regex(passPattern).required(),
    contact: Joi.string()
      .length(10)
      .pattern(/[1-9]{1}[0-9]{9}/)
      .required(),
    role: Joi.string().valid(...Object.values(roleType)),
    theaterName: Joi.string()
      .pattern(/^[A-Za-z]+$/)
      .required(),
    theaterAddress: Joi.string().min(20).max(100).required(),
    numScreen: Joi.number().min(0).max(20).required(),
  })

  const valid = result.validate(req.body)
  if (valid.error != null) {
    return res.json({ message: valid.error.details[0].message })
  }
  next()
}

export const createUserWithSeatValidate = (req: Request, res: Response, next: NextFunction) => {
  const roleType = { A: 'owner', B: 'user' }

  const passPattern = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,}$/
  const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/

  const result = Joi.object().keys({
    name: Joi.string()
      .pattern(/^[A-Za-z]+$/)
      .required(),
    email: Joi.string().regex(emailPattern).required(),
    password: Joi.string().regex(passPattern).required(),
    contact: Joi.string()
      .length(10)
      .pattern(/[1-9]{1}[0-9]{9}/)
      .required(),
    role: Joi.string().valid(...Object.values(roleType)),
    theaterName: Joi.string()
      .pattern(/^[A-Za-z]+$/)
      .required(),
    theaterAddress: Joi.string().min(20).max(100).required(),
    numSeat: Joi.number().min(0).max(100).required(),
    seatTypeId  :Joi.string().min(36).max(36).required()
  })

  const valid = result.validate(req.body)
  if (valid.error != null) {
    return res.json({ message: valid.error.details[0].message })
  }
  next()
}