const { User } = require("../models/user")
const { findUserByEmail } = require('../models/user')
const HttpStatus = require('http-status-codes')
const { encryptWithRSA, decryptWithRSA } = require("../utils/rsaCrypt")
const bcrypt = require('bcrypt');
const JWT = require('jsonwebtoken');

const loginPage = (req, res) => {
    res.render('login', { data: {} })
}

const getPublicKey = async (req, res) => {
    try {
        const { email } = req.body
        const user = await findUserByEmail(email)

        if (!user) {
            return res.status(HttpStatus.NOT_FOUND).json({ message: 'User not found', success: false })
        }

        return res.status(HttpStatus.OK).json({ publicKey: `${user.rsaPublicKey}`, success: true })
    } catch (error) {
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: 'Internal Server Error' })
    }
}

const getPasswordLogin = (req, res) => {
    try {
        const { email, text } = req.body
        const user = findUserByEmail(email)

        if (!user) {
            return res.status(HttpStatus.NOT_FOUND).json({ message: 'User not found', success: false })
        }
        const encryptedPassword = encryptWithRSA(user.rsaPublicKey, text)
        return res.status(HttpStatus.OK).json({ password: `${encryptedPassword}`, success: true })
    } catch (error) {
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: 'Internal Server Error' })
    }
}

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body

        const user = await findUserByEmail(email)

        if (!user) {
            return res.status(HttpStatus.NOT_FOUND).json({ message: 'User not found', success: false })
        }

        // console.log('user.rsapublickey: ' + user.rsa_public_key)
        const encryptedPassword = encryptWithRSA(user.rsa_public_key, password)

        // console.log(user.rsa_private_key)
        const decryptedPassword = decryptWithRSA(user.rsa_private_key, encryptedPassword)

        const result = bcrypt.compare(decryptedPassword, user.password)

        if (!result) {
            return res.status(HttpStatus.CONFLICT).json({ message: 'Wrong password', success: false })
        }

        console.log(process.env.JWT_SECRET_KEY)
        const token = JWT.sign({ userId: user.id }, process.env.JWT_SECRET_KEY, { expiresIn: '30m' })
        JWT.decode()
        const tokenExpiration = JWT.decode(token).exp

        const refreshToken = JWT.sign({ userId: user.id }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '1d' })
        const refreshTokenExpiration = JWT.decode(refreshToken).exp

        const csrfToken = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
        res.cookie('csrfToken', csrfToken)

        res.cookie('JWT', refreshToken, {
            httpOnly: true,
            samSite: 'None', secure: true,
            maxAge: 24 * 60 * 60 * 1000
        })

        const userDisplay = { ...user, rsaPrivateKey: user.rsaPrivateKey, rsaPublicKey: user.rsaPublicKey }

        return res.status(HttpStatus.OK).json({
            message: 'Login successful',
            success: true,
            token,
            expired_at_token: tokenExpiration,
            refreshToken,
            refresh_token_expired_at: refreshTokenExpiration,
            xsrf_token: csrfToken,
            user: userDisplay
        })
    } catch (error) {
        console.error(error);
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: 'Internal Server Error' })
    }
}

const refreshToken = (req, res) => {
    try {
        if (req.cookies?.JWT) {
            const refreshToken = req.cookies.JWT

            JWT.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET,
                (err, decoded) => {
                    if (err) {
                        return res.status(HttpStatus.UNAUTHORIZED).json({ message: 'Unauthorized', success: false })
                    } else {
                        const userId = decoded.userId
                        const token = JWT.sign({
                            userId: userId
                        }, process.env.JWT_SECRET_KEY, { expiresIn: '30m' })

                        return res.json({ token: token, success: true })
                    }
                })
        } else {
            return res.status(HttpStatus.UNAUTHORIZED).json({ message: 'Unauthorized', success: false })
        }
    } catch (error) {
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error_code: 'Internal Server Error', success: false })
    }
}




module.exports = {
    loginPage,
    loginUser,
    getPublicKey,
    getPasswordLogin,
    refreshToken
}