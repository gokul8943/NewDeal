import { Router,Request,Response } from "express";
import { UserController } from "../controllers/user.controller";
import { UserUsecase } from "../../usecase/user.usecase";
import { userRepository } from "../repositories/user.repo";
import userModel from "../../framework/models/user.model";
import otpModel from "../../framework/models/otp.model";


export class UserRouter {
    router = Router()
    userRepository = new userRepository(userModel, otpModel);
    userUsecase = new UserUsecase(this.userRepository);
    userController = new UserController(this.userUsecase);

    constructor(){

        this.router.post("/user/register",(req:Request,res:Response)=>{
           this.userController.register(req, res)
        })
    }
}

export const userRouter = new UserRouter().router;