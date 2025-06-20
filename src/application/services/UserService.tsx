import { IUserRepository } from "../../domain/interfaces/IUserRepository";
import { User } from "../../domain/entities/User";

interface RegisterUserDTO {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    passwordHash: string;
    termsAgreed: boolean;
    receiveEmails: boolean;
}

export class UserService {
    constructor(private readonly userRepo: IUserRepository) {}
  
    async registerUser(userData: RegisterUserDTO): Promise<User> {
      const {
        id,
        firstName,
        lastName,
        email,
        phone,
        passwordHash,
        termsAgreed,
        receiveEmails,
      } = userData;
  
      const user = new User(
        id,
        firstName,
        lastName,
        passwordHash,
        email,
        phone,
        termsAgreed,
        receiveEmails
      );
  
      return this.userRepo.create(user);
    }
  
    async getUser(id: string): Promise<User | null> {
      return this.userRepo.findById(id);
    }
  }