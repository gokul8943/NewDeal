import { Request,Response } from "express";
import bcrypt from 'bcrypt'
import { UserUsecase } from "../../usecase/user.usecase";

export class UserController{
    private readonly userUsecase: UserUsecase;
    constructor(userusecase: UserUsecase) {
        this.userUsecase = userusecase;
    }

    async register(req:Request,res:any):Promise<void>{
        try {
            const userData = req.body
            const { email, password, name, phone } = userData           
            const userDetails = await this.userUsecase.isUserExist(email);
            if (userDetails !== null) {
                res.status(409).json({ message: "User already exists" });
            } else {
                const encrptpassword = await bcrypt.hash(password, 10);
                userData.password = encrptpassword;
                const user = await this.userUsecase.register(userData);
                if (user) {
                    res.status(201).json({ message: "Registered successfully", user });
                } else {
                    console.error('Error registering user:');
                    res.status(500).json({ error: 'Internal Server Error' });
                }
            }
        } catch (error) {
            console.error('Error registering user:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
}