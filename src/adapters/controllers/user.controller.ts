import { Request, Response } from "express";
import bcrypt from 'bcrypt'
import { UserUsecase } from "../../usecase/user.usecase";

export class UserController {
    private readonly userUsecase: UserUsecase;
    constructor(userusecase: UserUsecase) {
        this.userUsecase = userusecase;
    }

    async register(req: Request, res: any): Promise<void> {
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
    async login(req: Request, res: Response): Promise<any> {
        const { email, password } = req.body
        const user = await this.userUsecase.isUserExist(email)
        if (user === null) {
            res.status(400).json({
                message: `No user with email ${email}`
            });
            return
        }
        if (user && (await bcrypt.compare(password, user.password))) {
            const { password, ...userWithoutPassword } = user.toObject();
            res.status(200).json({ message: "login success", user: userWithoutPassword })
        } else {
            res.status(406).json({
                message: 'Wrong password'
            });
        }
    }
}