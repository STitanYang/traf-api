import { Request, Response } from "express";
import { InvalidReqError } from "../error/error";
import { trafficLocationService } from "../service/trafficLocationsService";

export const getLocationById = async (req: Request, res: Response) =>{
    let {id} = req.params
    if (id == undefined){
        throw new InvalidReqError()
    }
    const loc = trafficLocationService.getById(id)
    res.status(200).json(loc)
    return
}
export const getAllLocation = async (_req: Request, res: Response)=>{
    const locs = await trafficLocationService.getAll()
    res.status(200).json(locs)
    return
}
