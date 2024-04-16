const crypto = require('crypto');

const generateKeyPair = () => {
    return crypto.generateKeyPairSync('rsa', {
        modulusLength: 4096,
        publicKeyEncoding: {
            type: 'spki',
            format: 'pem'
        },
        privateKeyEncoding: {
            type: 'pkcs8',
            format: 'pem'
        }
    })
}

const encryptWithRSA = (publicKey, plaintext) => {
    try {
        console.log("Public Key:", publicKey);
        const encryptedBuffer = crypto.publicEncrypt({
            key: publicKey,
            padding: crypto.constants.RSA_PKCS1_OAEP_PADDING
        }, Buffer.from(plaintext))
        
        return encryptedBuffer.toString('base64')
    } catch (error) {
        console.error('Error encrypting with RSA:', error.message)
        throw error
    }
}

const decryptWithRSA = (privateKey, encryptedPassword) => {
    try {
        const decryptedBuffer = crypto.privateDecrypt({
            key: privateKey,
            padding: crypto.constants.RSA_PKCS1_OAEP_PADDING
        }, Buffer.from(encryptedPassword, 'base64'))
        return decryptedBuffer.toString()
    } catch (error) {
        console.error('Error decrypting with RSA:', error.message)
        throw error
    }
}

module.exports = {
    generateKeyPair,
    encryptWithRSA,
    decryptWithRSA
}