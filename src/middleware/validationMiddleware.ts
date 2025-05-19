import { NextFunction, Request, Response } from "express"
import { validationResult } from "express-validator"
import { InvalidReqError } from "../error/error"

export const validateRequest = async (req: Request, _res: Response, next: NextFunction) => {
    const validationError = validationResult(req)
    if (!validationError.isEmpty()) {
        throw new InvalidReqError(...validationError.array().map(v => `${v.msg}`))
    }
    next()
}
