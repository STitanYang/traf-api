import bcrypt from 'bcrypt'
import { IUserRepository } from '../repository/interface/IUserRepository'
import {Role, User, UserData} from '../model/User'
import {userRepository} from '../repository/repoExporter'
import { use } from '../router/newsItemRouter';
//TODO: result type?
class UserService{
    private userRepository: IUserRepository;

    constructor(ur: IUserRepository){
        this.userRepository = ur
    }
    async getById(username: string): Promise<UserData|null>{
        const res = await this.userRepository.getById(username)
        if (res === null){
            return null
        }
        return {
            username: res.username,
            email: res.email,
            profileImageBase64: res.profileImageBase64,
            role: res.role
        }
    }
    async getAllUsers(): Promise<UserData[]>{
        const res = await this.userRepository.getAll()
        return res.map((user) => user.getData() )
    }
    async updateUser(username: string, email: string, image: string): Promise<UserData|null>{
        let changedUser = await userRepository.getById(username)
        if (changedUser === null){
            return null
        }
        changedUser.username = username
        changedUser.email = email
        changedUser.profileImageBase64 = image
        await userRepository.update(username, changedUser)
        return changedUser.getData()
    }
}
const userService = new UserService(userRepository)
export default userService
