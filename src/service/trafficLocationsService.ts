import { trafficLocationRepository } from "../repository/repoExporter"
import { ITrafficLocationRepository } from '../repository/interface/ITrafficLocationRepository'

class TrafficLocationService{
    private tlRepo: ITrafficLocationRepository
    constructor(tlr: ITrafficLocationRepository){
        this.tlRepo = tlr
    }
    async getById(id: string):Promise<TrafficLocation|null>{
        return await this.tlRepo.getById(id)
    }
    async getAll():Promise<TrafficLocation[]>{
        return await this.tlRepo.getAll()
    }
}
export const trafficLocationService = new TrafficLocationService(trafficLocationRepository)
