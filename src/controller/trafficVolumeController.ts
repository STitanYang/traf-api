import { Request, Response } from "express"
import { trafficVolumeService } from "../service/trafficVolumeService"
import { InvalidReqError } from "../error/error"

export const getTrafficVolume = async(req: Request, res: Response) => {
    const {location} = req.params
    const time_start = req.query.time_start as string
    const time_end = req.query.time_end as string
    if (time_start === undefined|| time_end === undefined){
        throw new InvalidReqError()
    }
    const result = await trafficVolumeService.getTrafficVolRange(location, time_start, time_end)
    res.status(200).json(result)
}
