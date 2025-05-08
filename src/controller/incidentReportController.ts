import { Request, Response } from "express"
import { incidentReportService } from "../service/mock_incidentreportService"
import { InvalidReqError, NotFoundError, ResourceConflictError } from "../error/error"

export const getReportByUsername = async(req: Request, res: Response)=> {
    const {username} = req.params
    if (username == undefined) {
        throw new InvalidReqError()
    }
    const result = await incidentReportService.getByUsername(username)
    res.status(200).json(result)
    
}
export const getReportByLocation = async(req: Request, res: Response)=> {
    const {locationId} = req.params
    if (locationId == undefined) {
        throw new InvalidReqError()
    }
    let result = await incidentReportService.getByLocation(locationId)
    res.status(200).json(result)
    
}
export const createReport = async(req: Request, res: Response) => {
    const{locationId, type, desc} = req.body
    const username = res.locals.username
    //validate
    let newReport = await incidentReportService.add(username, locationId, type, desc)
    if(newReport === null){
        throw new InvalidReqError()
    }
    res.status(200).json(newReport)
    
}
export const vote = async(req: Request, res: Response) => {
    const {uuid} = req.params
    const votername = res.locals.username
    let result = await incidentReportService.vote(votername, uuid)
    if (result === null){
        throw new NotFoundError(uuid)
    }
    if (result === false){
        throw new ResourceConflictError(votername)
    }
    res.status(200)
    
}
export const approve = async (req: Request, res: Response) => {
    const {uuid} = req.params
    const result = await incidentReportService.approve(uuid)
    if (result === null){
        throw new NotFoundError(uuid)
    }
    res.status(200).json()
}
export const remove = async (req: Request, res: Response) => {
    const {uuid} = req.params
    await incidentReportService.delete(uuid)
    res.status(200).json()
}
