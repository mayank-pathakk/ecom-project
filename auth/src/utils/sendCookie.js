import dotenv from 'dotenv'

dotenv.config({ path: 'src/.env' })

const sendCookie = (user, statusCode, res) => {

    //Generating JWTTOKEN
    const token = user.getJWTToken();
    const options = {
        expires: new Date(
            Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
        ),
        httpOnly: true,
    }
    res.status(statusCode).cookie('token', token, options).json({
        success: true,
        token,
        user,
    })
}
export default sendCookie;