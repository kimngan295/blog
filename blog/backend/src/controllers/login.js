import { NOT_FOUND, OK, INTERNAL_SERVER_ERROR, CONFLICT, UNAUTHORIZED } from 'http-status-codes';
import { encryptWithRSA, decryptWithRSA } from '../utils/rsaCrypt.js';
import { compare } from 'bcrypt';
import jsonwebtoken from 'jsonwebtoken';
import { findUserByEmail } from '../models/user.js';

const { sign, decode, verify } = jsonwebtoken;

export const getPublicKey = async (req, res) => {
    try {
        const { email } = req.body
        const user = await findUserByEmail(email)

        if (!user) {
            return res.status(NOT_FOUND).json({ message: 'User not found', success: false })
        }

        return res.status(OK).json({ publicKey: `${user.rsaPublicKey}`, success: true })
    } catch (error) {
        return res.status(INTERNAL_SERVER_ERROR).json({ error: 'Internal Server Error' })
    }
}

export const getPasswordLogin = (req, res) => {
    try {
        const { email, text } = req.body
        const user = findUserByEmail(email)

        if (!user) {
            return res.status(NOT_FOUND).json({ message: 'User not found', success: false })
        }
        const encryptedPassword = encryptWithRSA(user.rsaPublicKey, text)
        return res.status(OK).json({ password: `${encryptedPassword}`, success: true })
    } catch (error) {
        return res.status(INTERNAL_SERVER_ERROR).json({ error: 'Internal Server Error' })
    }
}

export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body

        const user = await findUserByEmail(email)

        if (!user) {
            return res.status(NOT_FOUND).json({ message: 'User not found', success: false })
        }
        console.log(`User ${user.email}`, `User ${user.password}`)

        // console.log('user.rsapublickey: ' + user.rsa_public_key)
        const encryptedPassword = encryptWithRSA(user.rsa_public_key, password)

        // console.log(user.rsa_private_key)
        const decryptedPassword = decryptWithRSA(user.rsa_private_key, encryptedPassword)

        const result = compare(decryptedPassword, user.password)

        if (!result) {
            return res.status(CONFLICT).json({ message: 'Wrong password', success: false })
        }

        // console.log(process.env.JWT_SECRET_KEY)
        // const token = sign({ userId: user.id }, process.env.JWT_SECRET_KEY, { expiresIn: '30m' })
        // decode()
        // const tokenExpiration = decode(token).exp

        // const refreshToken = sign({ userId: user.id }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '1d' })
        // const refreshTokenExpiration = decode(refreshToken).exp

        // const csrfToken = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
        // res.cookie('csrfToken', csrfToken)

        // res.cookie('JWT', refreshToken, {
        //     httpOnly: true,
        //     samSite: 'None', secure: true,
        //     maxAge: 24 * 60 * 60 * 1000
        // })

        const userDisplay = { ...user, rsaPrivateKey: user.rsaPrivateKey, rsaPublicKey: user.rsaPublicKey }

        return res.status(OK).json({
            message: 'Login successful',
            success: true,
            // token,
            // expired_at_token: tokenExpiration,
            // refreshToken,
            // refresh_token_expired_at: refreshTokenExpiration,
            // xsrf_token: csrfToken,
            user: userDisplay
        })
    } catch (error) {
        console.error(error);
        return res.status(INTERNAL_SERVER_ERROR).json({ error: 'Internal Server Error' })
    }
}

export const refreshToken = (req, res) => {
    try {
        if (req.cookies?.JWT) {
            const refreshToken = req.cookies.JWT

            verify(refreshToken, process.env.REFRESH_TOKEN_SECRET,
                (err, decoded) => {
                    if (err) {
                        return res.status(UNAUTHORIZED).json({ message: 'Unauthorized', success: false })
                    } else {
                        const userId = decoded.userId
                        const token = sign({
                            userId: userId
                        }, process.env.JWT_SECRET_KEY, { expiresIn: '30m' })

                        return res.json({ token: token, success: true })
                    }
                })
        } else {
            return res.status(UNAUTHORIZED).json({ message: 'Unauthorized', success: false })
        }
    } catch (error) {
        return res.status(INTERNAL_SERVER_ERROR).json({ error_code: 'Internal Server Error', success: false })
    }
}