import {User} from '../entities/User'

export interface IUserRepository {
    create(user: User): Promise <User>;
    findById(id: string): Promise <User | null>;
}