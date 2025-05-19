import { body } from "express-validator";

export const validateBase64Image = body('image')
    .notEmpty().custom((value) => {
        const base64ImageRegex = /^data:image\/(png|jpeg|jpg);base64,([a-zA-Z0-9+/]+={0,2})$/;
        if (!base64ImageRegex.test(value)) {
            throw new Error(`image must be a valid base64 string with MIME type: ${base64ImageRegex}`);
        }
        return true;
    });

