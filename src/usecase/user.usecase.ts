import { userRepository } from "../adapters/repositories/user.repo"
import { UserEntity } from "../entity/user.entity"


export class UserUsecase{
    constructor(private UserRepository: userRepository){}

    async register(user: UserEntity): Promise<any> {
        return this.UserRepository.register(user)
    }
    async isUserExist(email: string): Promise<any> {
        return this.UserRepository.isUserExist(email)
    }
    async login(user: UserEntity): Promise<any> {
        return this.UserRepository.login(user)
    }
}