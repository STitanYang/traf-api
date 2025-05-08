import { IUserRepository } from '../repository/interface/IUserRepository'
import {UserData} from '../model/User'
import {userRepository} from '../repository/repoExporter'
//TODO: result type?
class UserService{
    private userRepository: IUserRepository;

    constructor(ur: IUserRepository){
        this.userRepository = ur
    }
    async getById(username: string): Promise<UserData|null>{
        const res = await this.userRepository.getById(username)
        return res?.getData()||null
    }
    async getAllUsers(): Promise<UserData[]>{
        const res = await this.userRepository.getAll()
        return res.map((user) => user.getData() )
    }
}
const userService = new UserService(userRepository)
export default userService
