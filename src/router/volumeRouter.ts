import { Router } from "express";
import { getTrafficVolume } from "../controller/trafficVolumeController";

const trafVolRouter = Router()

trafVolRouter.get('/:location', getTrafficVolume)

export default trafVolRouter
