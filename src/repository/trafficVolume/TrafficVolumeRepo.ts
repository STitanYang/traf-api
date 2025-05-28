import { Collection, Db, MongoClient } from "mongodb";
import { TrafficVolume } from "../../model/TrafficVolume";
import { ITrafficVolumeRepository } from "../interface/ITrafficVolumeRepository";
import strftime from "strftime";

const trafficDataSchema = {
  "$jsonSchema": {
    "bsonType": "object",
    "required": [ "congestion_level", "datetime", "location"],
    "properties": {
      "congestion_level": {
        "bsonType": "int"
      },
      "datetime": {
        "bsonType": "string"
      },
      "location": {
        "bsonType": "string"
      },
    }
  }
}
const trafficPredSchema = {
  "$jsonSchema": {
    "bsonType": "object",
    "required": [
      "congestionLevelPredicted",
      "datetime",
      "location",
    ],
    "properties": {
      "congestionLevelPredicted": {
        "bsonType": "int"
      },
      "datetime": {
        "bsonType": "string"
      },
      "location": {
        "bsonType": "string"
      },
    }
  }
}
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
    private async ensureCollection(): Promise<void>{
        this.trafficData = this.db.collection('trafficdata')
        this.trafficPrediction = this.db.collection('prediction')
    }

    async getTrafficVolumeRange(locationId: string, timestampBegin: string, timestampEnd: string): Promise<TrafficVolume[]> {
        let volumeRange: TrafficVolume[] = []

        let datetime = 2025051319
        for (var i = 0; i <= 23; i++) {
            const res = await this.trafficData.findOne({'location':'Tugu Jogja','datetime':'2025051319'})
            console.log(res)
            const td =  new TrafficVolume(res?.datetime, res?.location, res?.congestion_level, false)
            volumeRange.push(td)
        }
        return volumeRange
    }
}

