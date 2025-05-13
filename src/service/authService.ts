import {User,Role,UserData} from '../model/User'
import {IUserRepository} from '../repository/interface/IUserRepository'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import {userRepository} from '../repository/repoExporter'
import {readFileSync} from 'fs'

class AuthService{
    private userRepository: IUserRepository
    private defaultImageBase64: string

    constructor(ur: IUserRepository){
        this.userRepository = ur
        this.defaultImageBase64 = readFileSync(__dirname + '/../../assets/user-default.webp', {encoding: 'base64'})
    }
    async register(username: string, email: string, password: string): Promise<UserData|null>{
        const hash = await bcrypt.hash(password, 10)
        let newUser = new User(
            username,
            email,
            this.defaultImageBase64,
            hash,
            Role.User 
        )
        const res =  await this.userRepository.create(newUser)
        return res?.getData()||null
    }
    async login(username: string, password: string): Promise<string|null>{
        const res = await this.userRepository.getById(username)
        const passwordMatch = bcrypt.compareSync(password, String(res?.passwordHash))
        if (res === null||!passwordMatch){
            return null
        }
        const token = jwt.sign(
            {
                username: res.username,
                role: res.role,
            },
            String(process.env.JWT_SECRET),
            {
                expiresIn: '1d',
            }
        )
        return token
    }
    async authenticate(token: string): Promise<UserData|null>{
        const decodedToken = jwt.verify(token, String(process.env.JWT_SECRET))
        if (decodedToken === null || typeof decodedToken === 'string'){
            return null
        }
        return {
            username: decodedToken.username,
            role: decodedToken.role 
        }
    } 
}
const authService = new AuthService(userRepository)
export default authService
