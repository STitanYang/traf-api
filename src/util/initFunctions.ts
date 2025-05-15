import { Role, User } from "../model/User"
import bcrypt from 'bcrypt'
import userService from "../service/userService"
import { userRepository } from "../repository/repoExporter"
import {readFileSync} from 'fs'

export const generateAdminAccount = async(username: string, password: string): Promise<void> => {
    const hash = await bcrypt.hash(password, 10)
    const adminAccount = await userService.getById(username)
    if(adminAccount !== null){
        console.log('admin account exists')
        return
    }
    const defaultProfileImage = readFileSync(__dirname + '/../../assets/user-default.webp', {encoding: 'base64'})
    const newAdminAccount = new User(username, 'admin@email.com',`data:image/webp;base64,${defaultProfileImage}`,hash, Role.Administrator)
    if (await userRepository.create(newAdminAccount) !== null){
        throw new Error('failed creating admin account')
    }
    console.log('created admin account')
    return
}
