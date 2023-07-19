import mongoose from "mongoose";
import jwt from 'jsonwebtoken'
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please enter your name'],
        maxLength: [30, 'Name cannot exceed 30 characters'],
        minLength: [4, 'Name should have more than 4 characters']
    },
    phoneNo: {
        type: Number,
        required: [true, 'Please enter your Phone Number'],
        unique: true,
    },
    email:{
        type:String,
        unique:true,
    }
});


//Generating JWT token
userSchema.methods.getJWTToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE,
    });
}




export const User = mongoose.model('User', userSchema);