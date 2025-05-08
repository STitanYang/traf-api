export interface ITrafficLocationRepository{
    getById(id: string): Promise<TrafficLocation|null>
    getAll(): Promise<TrafficLocation[]>
}
