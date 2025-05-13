export class NewsItem{
    uuid: string
    title: string
    body: string
    imageBase64: string
    dateCreated: string

    constructor(uuid:string, title: string, body: string, image:string, dateCreated:string){
        this.uuid = uuid
        this.title = title
        this.body = body
        this.imageBase64 = image
        this.dateCreated = dateCreated
    }
}
