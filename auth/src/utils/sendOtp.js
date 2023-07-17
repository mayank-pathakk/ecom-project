import twilio from 'twilio';
import dotenv from 'dotenv'

dotenv.config({ path: 'src/.env' })
const accountSid = process.env.ACCOUNT_SID;
const authToken = process.env.AUTH_TOKEN;
const client = twilio(accountSid, authToken);

const sendOtp = (phoneNo, otp) => {
    client.messages.create({
        body: `Your OTP to Login is:${otp}`,
        from: process.env.SERVICENUMBER,
        to: phoneNo
    }).then((message) => console.log(message)).catch((e) => {
        console.log(e);
    })
}

export default sendOtp;
