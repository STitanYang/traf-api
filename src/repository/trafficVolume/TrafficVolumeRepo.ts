import { Collection, Db, MongoClient } from "mongodb";
import { TrafficVolume } from "../../model/TrafficVolume";
import { ITrafficVolumeRepository } from "../interface/ITrafficVolumeRepository";

export class TrafficVolumeRepository implements ITrafficVolumeRepository {
    private db: Db
    private trafficData!: Collection
    private trafficPrediction!: Collection
    constructor() {
        const url = process.env.AI_MONGO_URL
        const dbName = 'traffuturedb'
        if (url === undefined) {
            throw new Error('AI_MONGO_URL enviroment not set')
        }
        this.db = new MongoClient(url).db(dbName)
        this.ensureCollection()
    }
    private async ensureCollection(): Promise<void> {
        this.trafficData = this.db.collection('trafficdata')
        this.trafficPrediction = this.db.collection('prediction')
    }

    async getTrafficVolumeRange(locationId: string, timestampBegin: string, timestampEnd: string): Promise<TrafficVolume[]> {
        let volumeRange: TrafficVolume[] = []

        const res = await this.trafficData.find({ 'location': locationId, 'datetime': { $gt: timestampBegin, $lt: timestampEnd } }).toArray()
        for (var data of res) {
            const tv = new TrafficVolume(data.datetime, data.location, data.congestion_level, false)
            volumeRange.push(tv)
        }
        if (Number(volumeRange[volumeRange.length - 1].datetime) < Number(timestampEnd)) {
            const res = await this.trafficPrediction.find({ 'location': locationId, 'datetime': { $gt: volumeRange[volumeRange.length - 1].datetime, $lt: timestampEnd } }).toArray()
            for (var data of res) {
                const tv = new TrafficVolume(data.datetime, data.location, data.congestionLevelPredicted, true)
                volumeRange.push(tv)
            }
        }
        return volumeRange
    }
}

