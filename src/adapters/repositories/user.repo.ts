import { Model } from "mongoose"
import { IUserSchema } from "../interfaces/IUserSchema"
import { UserEntity } from "../../entity/user.entity"
import userModel from "../../framework/models/user.model"
import { IOTPSchema } from "../interfaces/IOTPSchema"



export class userRepository{
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
}