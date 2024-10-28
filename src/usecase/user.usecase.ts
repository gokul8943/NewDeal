import { userRepository } from "../adapters/repositories/user.repo"
import { UserEntity } from "../entity/user.entity"


export class UserUsecase {
    constructor(private UserRepository: userRepository) { }

    async register(user: UserEntity): Promise<any> {
        return this.UserRepository.register(user)
    }
    async isUserExist(email: string): Promise<any> {
        return this.UserRepository.isUserExist(email)
    }
    async login(user: UserEntity): Promise<any> {
        return this.UserRepository.login(user)
    }
    async sendOtp(email: string): Promise<void> {
        return this.UserRepository.sendOtp(email)
    }
    async findOtp(otp: string) {
        return this.UserRepository.findOtp(otp)
    }
    async saveOtp(data: { email: string, otp: string }) {
        return this.UserRepository.saveOtp(data)
    }
    async otpVerify(email:string){
        return this.UserRepository.otpVerify(email)
    }
    async access(uid:string,active:boolean){
        return this.UserRepository.access(uid,active)
    }
    async editProfile(uid:string,data:any){
        return this.UserRepository.editProfile(uid,data)
    }
}