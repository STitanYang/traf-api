export class BaseError extends Error{
    statusCode: number
    responseMessage: string
    constructor(statusCode: number, responseMessage: string){
        super()

        Object.setPrototypeOf(this, new.target.prototype)
        this.name = Error.name
        this.statusCode = statusCode
        this.responseMessage = responseMessage
        Error.captureStackTrace(this)
    }
}

export class NotFoundError extends BaseError{
    propertyName: string

    constructor(propertyName: string){
        super(404, `${propertyName} not found`)
        this.propertyName = propertyName
    }
}

export class ResourceConflictError extends BaseError{
    propertyName: string

    constructor(propertyName: string){
        super(409, `${propertyName} conflicts with existing resource`)
        this.propertyName = propertyName
    }
}
export class InvalidAuthError extends BaseError{
    constructor(){
        super(401, 'authentication failed')
    }
}
export class UnauthError extends BaseError{
    constructor(){
        super(403, 'you are not authorized to access this resource')
    }
}
export class InvalidReqError extends BaseError{
    invalidReqMessage?: string
    constructor(...message: string[]){
        const invalidReqMessage = message.join('\n')
        super(400,'invalid request body' + '\n' + invalidReqMessage)
        this.invalidReqMessage = invalidReqMessage
    }
}
