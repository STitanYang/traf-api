import { body } from "express-validator";

export const validateTitle = body('title').notEmpty()
export const validateBody = body('body').notEmpty()
