import {User} from '../entities/User'

export interface IUserRepository {
    createUser(user: User): Promise <User>;
    findById(id: string): Promise <User | null>;
}