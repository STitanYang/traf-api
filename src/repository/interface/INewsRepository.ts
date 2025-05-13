import { NewsItem } from "../../model/NewsItem"

export interface INewsRepository{
    getAll(): Promise<NewsItem[]>
    getById(uuid: string): Promise<NewsItem|null>
    create(report: NewsItem): Promise<NewsItem>
    update(uuid: string, newReport: NewsItem): Promise<NewsItem|null>
    delete(uuid: string): Promise<void>
}
