import { v4 as uuidv4 } from "uuid"
export class NewsItem{
    uuid: string
    title: string
    body: string
    imageBase64: string
    dateCreated: string

    constructor(title: string, body: string, image:string, dateCreated:string){
        this.uuid = uuidv4()
        this.title = title
        this.body = body
        this.imageBase64 = image
        this.dateCreated = dateCreated
    }
}
