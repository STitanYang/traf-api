import { Request, Response } from "express"
import { newsItemService } from "../service/newsItemService"
import { NotFoundError } from "../error/error"

export const getAllNews = async(_req: Request, res: Response) => {
    const foundNews = newsItemService.getAll()
    res.status(200).json(foundNews)
}
export const getNewsItem = async(req: Request, res: Response) => {
    const {uuid} = req.params
    const foundNews = newsItemService.getById(uuid)
    if (foundNews === null){
        throw new NotFoundError(`newsitem: ${uuid}`)
    }
    res.status(200).json(foundNews) 
}
export const createNews = async(req: Request, res: Response) =>{
    const {title, body, image} = req.params
    const news = newsItemService.create(title, body, image)
    res.status(200).json(news)
}
export const updateNews = async(req: Request, res: Response) => {
    const {uuid} = req.params
    const {title, body, image} = req.params
    const newNews = newsItemService.update(uuid, title, body, image)
    if (newNews === null){
        throw new NotFoundError(`newsitem: ${uuid}`)
    }
    res.status(200).json(newNews)
}
export const deleteNews = async(req: Request, res: Response) => {
    const{uuid} = req.params
    newsItemService.delete(uuid)
    res.status(200)
}
