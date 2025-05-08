export enum Role{
    Adminstrator = 'admininstrator',
    User = 'user'
}
export type UserData = Pick<User,'username'|'role'>

export class User{
    username: string
    passwordHash: string
    role: Role
    constructor(username: string, passwordHash: string, role: Role){
        this.username = username
        this.passwordHash = passwordHash
        this.role = role
    }
    getData(): UserData{
        return{
            username: this.username,
            role: this.role
        }
    }
}
