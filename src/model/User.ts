export enum Role{
    Adminstrator = 'admininstrator',
    User = 'user'
}
export type UserData = {
    username: string
    email?: string
    profileImageBase64?: string
    role: Role
}

export class User{
    username: string
    email: string
    profileImageBase64: string
    passwordHash: string
    role: Role
    constructor(username: string, email: string, image: string, passwordHash: string, role: Role){
        this.username = username
        this.passwordHash = passwordHash
        this.email = email
        this.profileImageBase64 = image
        this.role = role
    }
    getData(): UserData{
        return{
            username: this.username,
            email: this.email,
            profileImageBase64:this.profileImageBase64,
            role: this.role,
        }
    }
}
