import { TrafficVolume } from "../model/TrafficVolume";
import { ITrafficVolumeRepository } from "../repository/interface/ITrafficVolumeRepository";
import { trafficVolumeRepository } from "../repository/repoExporter";

class TrafficVolumeService{
    private tvRepo: ITrafficVolumeRepository
    constructor(tvRepo: ITrafficVolumeRepository){
        this.tvRepo = tvRepo
    }
    async getTrafficVolRange(location: string, timeStampBegin: string,timeStampEnd: string):Promise<TrafficVolume[]>{
        const res = await this.tvRepo.getTrafficVolumeRange(location,timeStampBegin,timeStampEnd)
        return res
    }
}
export const trafficVolumeService = new TrafficVolumeService(trafficVolumeRepository)
