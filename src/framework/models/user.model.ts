import moment from "moment-timezone";
import mongoose, { Schema } from "mongoose";
import { IUserSchema } from "../../adapters/interfaces/IUserSchema";


// Define the Payment schema
const PaymentSchema = new Schema({
    isPaid: { type: Boolean, default: false },
    paymentDate: { type: Date, required: false },
    paymentDetails: { type: String, required: false },
    endDate: { type: Date, required: false }
});

// Create the User schema
const userSchema = new Schema<IUserSchema>({
    name: {
        type: String,
        required: true,
    },
    phoneNumber: {
        type: Number,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    googleId: {
        type: Boolean,
        
    },
    password: {
        type: String,
        required: true,
    },
    profilePicture: {
        type: String,

        default: 'https://static.vecteezy.com/system/resources/thumbnails/020/765/399/small/default-profile-account-unknown-icon-black-silhouette-free-vector.jpg'
    },
    role: {
        type: String,
        default: 'user'
    },
    isActive: {
        type: Boolean,
        default: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    payment: {
        type: PaymentSchema
    },

}, {
    timestamps: true, // Optional: add createdAt and updatedAt fields
});

// Pre-save hook to calculate endDate based on paymentDate
PaymentSchema.pre('save', function (next) {
    if (this.paymentDate) {
        const paymentDate = moment.tz(this.paymentDate, "Asia/Kolkata");
        this.endDate = paymentDate.clone().add(1, 'month').toDate();
    }
    next();
});

// Create the User model
const User = mongoose.model<IUserSchema>('User', userSchema);

export default User;
