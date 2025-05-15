import bcrypt from 'bcrypt'
import { IUserRepository } from '../repository/interface/IUserRepository'
import {Role, User, UserData} from '../model/User'
import {userRepository} from '../repository/repoExporter'
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
    async updateUser(username: string, email: string, image: string, password: string): Promise<UserData|null>{
        const hash = await bcrypt.hash(password, 10)
        const newUser = new User(username, email, image, hash, Role.User)
        const res = await userRepository.update(username, newUser)
        if (res === null){
            return null
        }
        return newUser.getData()
    }
}
const userService = new UserService(userRepository)
export default userService
