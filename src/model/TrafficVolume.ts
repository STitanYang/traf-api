export class TrafficVolume{
    datetime: string //format YYYYMMDDHH; Ex: 197010113 -> January 01, 1970, 13:00 (UTC)
    location: string
    congestionLevel: number
    isPrediction: boolean

    constructor(timestamp: string,locationId: string, volume: number, isPrediction: boolean){
        this.datetime = timestamp
        this.location= locationId
        this.congestionLevel = volume
        this.isPrediction = isPrediction
    }
}
