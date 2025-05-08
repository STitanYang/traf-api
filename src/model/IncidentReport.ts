import {v4 as uuidv4} from 'uuid'
export enum IncidentType{
    Kecelakaan = 'kecelakaan',
    Macet = 'macet',
    Perbaikan = 'perbaikan',
    Lain = 'lain'
}
export type IncidentReportData = {
   uuid: string
   username: string
   locationId: string
   time: string
   type: IncidentType
   desc: string
   isApproved: boolean
   voters: number
}
export class IncidentReport{
    uuid: string
    username: string  
    locationId: string
    time: string
    type: IncidentType
    desc: string
    isApproved: boolean
    _voters: string[]

    constructor(username: string, locationId: string, type: IncidentType, time: string, desc: string){
        this.uuid = uuidv4()
        this.username = username
        this.locationId = locationId
        this.type = type
        this.time = time 
        this.desc = desc
        this.isApproved = false
        this._voters = []
    }

    addVoter(username: string): boolean{
        let voterAlreadyExists = this._voters.includes(username)
        if (voterAlreadyExists){
            return false
        }
        this._voters.push(username)
        return true
    }
    getData(): IncidentReportData{
        return {
            uuid: this.uuid,
            username: this.username,
            locationId: this.locationId,
            time: this.time,
            type: this.type,
            desc: this.desc,
            isApproved: this.isApproved,
            voters: this._voters.length,
        }
    }
}
