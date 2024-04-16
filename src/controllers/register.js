const { validateRegistration } = require("../validations/validation")
const HttpStatus = require('http-status-codes');
const bcrypt = require('bcrypt');
const { addUser } = require("../models/user");
const { generateKeyPair } = require('../utils/rsaCrypt')

const registerPage = (req, res) => {
    res.render('register', { data: {} })
}

const registerUser = async (req, res) => {

    try {
        const { firstname, lastname, password, repassword, email } = req.body
        console.log(firstname + ' ' + lastname + ' ' + password + ' ' + repassword + ' ' + email)

        const validationErrors = await validateRegistration({ firstname, lastname, password, repassword, email })

        if (validationErrors.length > 0) {

            return res.status(HttpStatus.BAD_REQUEST).json({
                message: 'Bad request!',
                error_code: 'INVALID_INPUT',
                success: false,
                error: validationErrors
            })
        }

        // generateKey
        const { publicKey, privateKey } = generateKeyPair()
        console.log('Generated Public Key:', publicKey)
        console.log('Generated Private Key:', privateKey)

        //Bcrypt hash password
        const hashedPassword = await bcrypt.hash(password, 10)

        const newUser = {
            first_name: firstname,
            last_name: lastname,
            email: email,
            password: hashedPassword,
            rsa_public_key: publicKey,
            rsa_private_key: privateKey
        }

        // Thêm user vào database
        const user = await addUser(newUser)

        // Kiểm tra xem user đã được thêm thành công
        if (user) {
            return res.status(HttpStatus.CREATED).json({ message: 'Success!', success: true })
        } else {
            // Nếu user không được thêm thành công, trả về lỗi
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'User creation failed!', success: false })
        }

    } catch (err) {
        console.log(err)
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: err.message, success: false })
    }

}

module.exports = {
    registerUser,
    registerPage
}