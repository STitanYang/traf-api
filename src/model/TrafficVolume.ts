export class TrafficVolume{
    timestamp: string //format YYYYMMDDHH; Ex: 197010113 -> January 01, 1970, 13:00 (UTC)
    locationId: string
    volume: number

    constructor(timestamp: string,locationId: string, volume: number){
        this.timestamp = timestamp
        this.locationId = locationId
        this.volume = volume
    }
}
