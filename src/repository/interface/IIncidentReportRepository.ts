import { IncidentReport } from "../../model/IncidentReport"

export interface IIncidentReportRepository{
    getByUsername(username: string): Promise<IncidentReport[]>
    getByLocation(locationId: string): Promise<IncidentReport[]>
    getById(uuid: string): Promise<IncidentReport|null>
    create(report: IncidentReport): Promise<IncidentReport|null>
    update(uuid: string, newReport: IncidentReport): Promise<IncidentReport|null>
    delete(uuid: string): Promise<void>
}
