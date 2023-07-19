import { User } from '../models/userModel.js';
import sendCookie from '../utils/sendCookie.js';
import sendOtp from '../utils/sendOtp.js';
import crypto from 'crypto'

// This function will be called before both login and signUp
export const sendOtpHash = async (req, res) => {

  const { phoneNo } = req.body;
  const otp = Math.floor(100000 + Math.random() * 900000);

  const data = `${phoneNo}.${otp}.${Date.now() + 10 * 60 * 1000}`;

  //Creating hash from the data
  const hash = crypto.createHmac('sha256', process.env.SMS).update(data).digest('hex');
  const fullHash = `${hash}.${Date.now() + 10 * 60 * 1000}`;

  sendOtp(phoneNo, otp);

  const user = await User.findOne({ phoneNo });
  res.status(200).json({
    phoneNo,
    hash: fullHash,
    isUser: user ? true : false,
  })
}

export const register = async (req, res) => {

  //phoneNo and hash is given from frontEnd when fetched from sendOtpHash
  const { name, email, otp, phoneNo, hash } = req.body;

  //The hashValue have the OTP which in generated
  let [hashValue, expires] = hash.split('.');
  
  //Checks if OTP is expired
  if (Date.now() > parseInt(expires)) {
    return res.status(504).json({
      success: false,
      msg: 'OTP has been expired!'
    })
  }

  const data = `${phoneNo}.${otp}.${expires}`;

  //Creating new hash in which OTP is given by user
  const newCalculatedHash = crypto.createHmac('sha256', process.env.SMS).update(data).digest('hex');
  
   //Comparing both Hash 
  if (newCalculatedHash !== hashValue) {
    return res.status(400).json({
      success: false,
      msg: 'Incorrect OTP!'
    })
  }

  //Creating user in DB
  const user = await User.create({
    phoneNo, email, name
  })
  sendCookie(user, 201, res);
};


export const login = async (req, res) => {

  //phoneNo and hash is given from frontEnd when fetched from sendOtpHash
  const { phoneNo, hash, otp } = req.body;
  const user = await User.findOne({ phoneNo });

  //The hashValue have the OTP which in generated
  let [hashValue, expires] = hash.split('.');

  //Checks if OTP is expired
  if (Date.now() > parseInt(expires)) {
    return res.status(504).json({
      success: false,
      msg: 'OTP has been expired!'
    })
  }

  const data = `${phoneNo}.${otp}.${expires}`;

  //Creating new hash in which OTP is given by user
  const newCalculatedHash = crypto.createHmac('sha256', process.env.SMS).update(data).digest('hex');
  
  //Comparing both Hash 
  if (newCalculatedHash !== hashValue) {
    return res.status(400).json({
      success: false,
      msg: 'Incorrect OTP!'
    })
  }

  sendCookie(user, 200, res);
}



//logout user
export const logout = async (req, res) => {
  res.cookie('token', null, {
    expires: new Date(Date.now()),
    httpOnly: true
  })
  res.status(200).json({
    success: true,
    message: 'Logged out'
  })
}


