import { Request, Response } from 'express'
import generalResponse from '../helper/generalResponse.helper'
import { PrismaClient } from '@prisma/client'
const Prisma = new PrismaClient()

export const createScreen = async (req: Request, res: Response): Promise<void> => {
  try {


    const {type , fair} = req.body

    
    

    return generalResponse(res, '', 'Screens inserted successfully', 'success', false, 200)
  } catch (error) {
    return generalResponse(res, error, '', 'error', false, 400)
  }
}
