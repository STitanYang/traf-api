export class TrafficVolume{
    datetime: string //format YYYYMMDDHH; Ex: 197010113 -> January 01, 1970, 13:00 (UTC)
    location: string
    congestionLevel: number

    constructor(timestamp: string,locationId: string, volume: number){
        this.datetime = timestamp
        this.location= locationId
        this.congestionLevel = volume
    }
}
