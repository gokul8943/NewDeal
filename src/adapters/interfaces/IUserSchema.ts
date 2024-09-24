import mongoose, { Document } from "mongoose";

export interface IUserSchema extends Document {
    id: string,
    name: string,
    email: string,
    password: string,
    phoneNumber: number,
    profilePicture: string,
    role: string,
    isVerified: boolean,
    googleId?: string;
    isActive: boolean,
    createdAt: Date,
    isPaid: boolean
    orgId: mongoose.Types.ObjectId,
    payment: {
        isPaid: boolean,
        paymentDte: Date,
        paymentDetails: string,
        endDate: Date
    }
   
}