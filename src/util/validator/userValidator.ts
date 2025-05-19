import { body } from "express-validator";

export const validateUsername = body('username').notEmpty().withMessage('username field not set')
export const validatePassword = body('password').isLength({min: 8}).withMessage('password must be at least 8 characters length')
export const validateEmail = body('email').notEmpty().isEmail().withMessage('email field unset or invalid')
export const validateNewPassword = body('newPassword').isLength({min: 8}).withMessage('password must be at least 8 characters length')
