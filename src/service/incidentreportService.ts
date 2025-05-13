import { IncidentReport, IncidentReportData, IncidentType } from "../model/IncidentReport";
import { IIncidentReportRepository } from "../repository/interface/IIncidentReportRepository";
import { IUserRepository } from "../repository/interface/IUserRepository";
import { incidentReportRepository, userRepository } from "../repository/repoExporter";
import {v4 as uuidv4} from 'uuid'

class IncidentReportService{
    incidentReportRepository: IIncidentReportRepository
    userRepository: IUserRepository
    constructor(iir: IIncidentReportRepository, ur: IUserRepository){
        this.incidentReportRepository = iir
        this.userRepository = ur
    }
    async getByUsername(username: string): Promise<IncidentReportData[]>{
        const result = await this.incidentReportRepository.getByUsername(username)
        return result.map(ir => ir.getData())
    }
    async getByLocation(locationId: string): Promise<IncidentReportData[]>{
        const result = await this.incidentReportRepository.getByLocation(locationId) 
        console.log(result[0])
        return result.map(ir => ir.getData())
    }
    async add(username: string, locationId: string, type: IncidentType, desc: string): Promise<IncidentReportData|null>{
        const datetime = Date.now()
        const uuid = uuidv4()
        const newReport = new IncidentReport(uuid, username, locationId, type, String(datetime),desc)
        const res = await this.incidentReportRepository.create(newReport)
        return res!.getData()
    }
    async vote(voterName: string, uuid: string):Promise<boolean|null>{//return false if duplicate, null if report uuid does not exists
        const report = await this.incidentReportRepository.getById(uuid)
        if (report === null){
            return null
        }
        let isDuplicateVoter = !report.addVoter(voterName)
        if (isDuplicateVoter){
            return false
        }
        await this.incidentReportRepository.update(report.uuid, report)
        return true
    }
    async approve(uuid: string): Promise<void|null>{
        const report = await this.incidentReportRepository.getById(uuid)
        if (report === null){
            return null
        }
        report.isApproved = true
        await this.incidentReportRepository.update(report.uuid, report)
        return
    }
    async delete(uuid: string): Promise<void>{
        await this.incidentReportRepository.delete(uuid)
        return
    }
}
const incidentReportService = new IncidentReportService(incidentReportRepository, userRepository)
export { incidentReportService }
