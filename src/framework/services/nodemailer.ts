import nodemailer from 'nodemailer'
import dotenv from 'dotenv'
dotenv.config()

const EMAIL = process.env.Email;
const EMAIL_PASSWORD = process.env.Email_password;


const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: EMAIL,
        pass: EMAIL_PASSWORD
    }
})

export default transporter;