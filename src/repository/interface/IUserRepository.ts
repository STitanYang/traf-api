import {User} from '../../model/User';

export interface IUserRepository {
    getById(username: string): Promise<User|null>
    getAll(): Promise<User[]>
    create(user: User): Promise<User|null>
    update(username: string, user: User): Promise<User|null>
}
