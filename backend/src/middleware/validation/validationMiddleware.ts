import { NextFunction, Request, Response } from "express"
import {ZodSchema} from "zod"
import { ZodHelper } from "../../utils/zod/helpers"

export function validationMiddleware(zodSchema:ZodSchema){
  return (req: Request, res: Response, next: NextFunction)=>{
    const validationResult = zodSchema.safeParse(req.body)

    if(!validationResult.success){
      const errors = ZodHelper.formatZodError(validationResult.error)
      return res.status(400).json({error: errors[0]})
    }
    
    req.body = validationResult.data

    next()
  }
}