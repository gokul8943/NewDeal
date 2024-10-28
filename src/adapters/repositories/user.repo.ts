import { Model } from "mongoose"
import { IUserSchema } from "../interfaces/IUserSchema"
import { UserEntity } from "../../entity/user.entity"
import userModel from "../../framework/models/user.model"
import { IOTPSchema } from "../interfaces/IOTPSchema"



export class userRepository {
    private readonly UserModel: Model<IUserSchema>
    private readonly OTPModel: Model<IOTPSchema>
    constructor(userModel: Model<IUserSchema>, otpModel: Model<IOTPSchema>) {
        this.OTPModel = otpModel
        this.UserModel = userModel
    }
    async register(userData: UserEntity): Promise<any> {
        try {
            const user = await userModel.create(userData)
            return user;
        } catch (error) {
            console.error("An error occoured", error)
        }
    }
    async isUserExist(email: string): Promise<any> {
        try {
            const userData = await this.UserModel.findOne({ email: email });
            return userData;
        } catch (error) {
            console.error("An error occurred on auth repo", error);
            return false;
        }
    }
    async login(user: UserEntity): Promise<void> {

    }
    async sendOtp(email: string) {

    }
    async findOtp(otp: string) {
        let result = await this.OTPModel.findOne({ otp: otp });
        return result
    }
    async saveOtp(data: { email: string, otp: string }) {
        let newOtp = await this.OTPModel.create(data)
    }
    async otpVerify(email: string) {
        let response = await this.OTPModel.find({ email }).sort({ createdAt: -1 }).limit(1);
        return response
    }
    async access(uid:string,access:boolean){
        try {
            const response = await this.UserModel.findByIdAndUpdate(uid,{isActive:access})
            return response
        } catch (error) {
            console.log(error);
            throw error
        }
    }
    async editProfile(uid:string,data:any){
        try {
            const response = await this.UserModel.findByIdAndUpdate(uid,{$set:data})
            return response
        } catch (error) {
            console.log(error);
            throw  error
        }
    }
}