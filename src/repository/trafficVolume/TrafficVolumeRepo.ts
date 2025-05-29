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
        let volumeRange: TrafficVolume[] = [];

// 1. Ambil data historis lalu lintas
        const historicalRes = await this.trafficData.find({ 
            'location': locationId, 
            'datetime': { $gte: timestampBegin, $lte: timestampEnd } 
        }).toArray();

        for (const data of historicalRes) {
            const tv = new TrafficVolume(data.datetime, data.location, data.congestion_level, false);
            volumeRange.push(tv);
        }

        // 2. Tentukan apakah data prediksi diperlukan dan dari kapan harus diambil
        let shouldFetchPredictions = false;
        let predictionQueryStartTime; // Waktu mulai untuk query data prediksi

        if (volumeRange.length > 0) {
            // Data historis ditemukan
            const lastHistoricalDatetime = volumeRange[volumeRange.length - 1].datetime;
            // Periksa apakah data historis terakhir kurang dari timestampEnd
            if (Number(lastHistoricalDatetime) < Number(timestampEnd)) {
                shouldFetchPredictions = true;
                // Mulai prediksi dari waktu data historis terakhir
                predictionQueryStartTime = lastHistoricalDatetime; 
            }
        } else {
            // Tidak ada data historis ditemukan.
            // Maka, kita perlu mengambil data prediksi dari awal rentang waktu yang diminta (timestampBegin).
            shouldFetchPredictions = true;
            predictionQueryStartTime = timestampBegin;
        }

        // 3. Jika data prediksi diperlukan, ambil datanya
        if (shouldFetchPredictions) {
            const predictionRes = await this.trafficPrediction.find({ 
                'location': locationId, 
                'datetime': { $gte: predictionQueryStartTime, $lte: timestampEnd } 
            }).toArray();

            for (const data of predictionRes) {
                const tv = new TrafficVolume(data.datetime, data.location, data.congestionLevelPredicted, true);
                volumeRange.push(tv);
            }
        }
        return volumeRange
    }
}

