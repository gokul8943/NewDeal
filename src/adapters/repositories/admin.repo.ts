import { Model } from "mongoose";
import otpModel from "../../framework/models/otp.model";
import { AdminUsecase } from "../../usecase/admin.usecase";
import { IOTPSchema } from "../interfaces/IOTPSchema";
import { IUserSchema } from "../interfaces/IUserSchema";
import userModel from "../../framework/models/user.model";


export class adminRepository{
    private readonly UserModel: Model<IUserSchema>
    private readonly OTPModel: Model<IOTPSchema>
    constructor(adminModel: Model<IUserSchema>, otpModel:Model<IOTPSchema>){
        this.OTPModel = otpModel
        this.UserModel = userModel
    }
}

