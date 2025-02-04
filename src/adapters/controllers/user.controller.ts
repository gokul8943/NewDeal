import { Request, Response } from "express";
import bcrypt from 'bcrypt'
import jwt, { JwtPayload, Secret } from 'jsonwebtoken';
import otpGenerator from 'otp-generator';
import { UserUsecase } from "../../usecase/user.usecase";
import transporter from "../../framework/services/nodemailer";
import Handlebars from "handlebars";
import fs from "fs"

export class UserController {
    private readonly userUsecase: UserUsecase;
    constructor(userusecase: UserUsecase) {
        this.userUsecase = userusecase;
    }

    async register(req: Request, res: any): Promise<void> {
        try {
            const userData = req.body            
            const { email, password, name, phone } = userData
            console.log('o-00-00',userData);
            
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
            const accessToken = jwt.sign({userId:user._id},process.env.JWT_SECRET as string, { expiresIn:'30m'});
            const refreshToken = jwt.sign({userId:user._id},process.env.JWT_SECRET as string,{expiresIn:"30d"});
            const { password, ...userWithoutPassword } = user.toObject();
            res.status(200).json({ message: "login success",accessToken, refreshToken, user: userWithoutPassword })
        } else {
            res.status(406).json({
                message: 'Wrong password'
            });
        }
    }

    async sentOtp(req: Request, res: Response) {
        try {
            const { email } = req.body;
            console.log(req.body.email);

            if (!email) {
                return
            }

            const checkUserPresent = await this.userUsecase.isUserExist(email)
            console.log(checkUserPresent);

            if (checkUserPresent) {
                return res.status(401).json({
                    success: false,
                    message: 'User already exists',
                });
            }
            let otp = otpGenerator.generate(6, {
                upperCaseAlphabets: false,
                lowerCaseAlphabets: false,
                specialChars: false,
            });
            var mailOptions = {
                from: process.env.EMAIL,
                to: email,
                subject: 'OTP for Email Verification',
                text: `Your OTP for Verification is ${otp}`
            };
            transporter.sendMail(mailOptions, function (error: Error | null, info: any) {
                if (error) {
                    console.log(error);
                } else {
                    console.log('Email sent: ' + info.response);
                    console.log('otp ', otp);
                }
            });
            let result = await this.userUsecase.findOtp(otp)
            while (result) {
                otp = otpGenerator.generate(6, {
                    upperCaseAlphabets: false,
                });
                result = await this.userUsecase.findOtp(otp)
            }
            const otpPayload = { email, otp };
            const otpBody = await this.userUsecase.saveOtp(otpPayload)
            res.status(200).json({
                success: true,
                message: 'OTP sent successfully',
            });
        } catch (error: any) {
            console.log(error.message);
            return res.status(500).json({ success: false, error: error.message });
        }
    }

    async otpVerify(req:Request,res:Response){
        const email = req.body.email
        const otp = req.body.otp
        const response = await this.userUsecase.otpVerify(email)
        if (response.length === 0 || otp !== response[0].otp) {
            return res.status(400).json({
                success: false,
                message: 'The OTP is not valid',
            });
        }
        res.status(200).json({ message: 'verification successful' })
    }
    renderTemplate(data: { otp: string }) {
        const templatePath = '../../utils/email-template.hbs';
        const templateContent = fs.readFileSync(templatePath, 'utf8');
        const template = Handlebars.compile(templateContent);
        return template(data);
    }
    async access(req:Request,res:Response):Promise<any>{
        try {
            const uid = req.params.uid;
            const active = req.body.active
            const response = await this.userUsecase.access(uid,active)
            if(response){
             return res.status(200).json({message:"success"})
            }else{
                return res.status(400).json({message:"failed"})
            }
        } catch (error) {
           console.log("Controller error:",error);
            return res.status(500).json({message:"Internal server error"})
        }
    }
    async editProfile(req:Request,res:Response):Promise<any>{
        try {
            const uid = req.params.uid;
            const data = req.body
            const response = await this.userUsecase.editProfile(uid,data)
            if(response){
                return res.status(200).json({messsage:"Profile edit succesfully"})
            }else{
                return res.status(400).json({message:"The profile not found"})
            }
        } catch (error) {
            console.log(error)
            return res.status(500).json({message:"Internal server error"})
        }
    }
}