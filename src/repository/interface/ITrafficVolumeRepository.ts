import { TrafficVolume } from "../../model/TrafficVolume";

export interface ITrafficVolumeRepository{
    // get location traffic volume from specified time frame 
    // implementation: return existing traffic data + predicted data for timestamp where data is unavailable(Ex: future value)
    getTrafficVolumeRange(locationId: string, timestampBegin: string, timestampEnd: string): Promise<TrafficVolume[]>
}
