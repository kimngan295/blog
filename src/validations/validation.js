const validator = require('validator')

const validateRegistration = async ({ firstname, lastname, password, repassword, email }) => {
    
    if (!firstname || !lastname || !password || !repassword || !email) {
        throw new Error('One or more required fields are missing');
    }
    const errors = []
    const nameRegex = /^[a-zA-Z0-9 !@#$%^&*()-_+=<>?/{}|[\]:'',.]+$/
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/

    // Trim whitespace from input fields
    firstname = firstname.trim();
    lastname = lastname.trim();
    email = email.trim();

    if (!firstname) {
        errors.push({ field: 'firstname', message: 'First name is required' })
    } else if (!nameRegex.test(firstname)) {
        errors.push({ field: 'firstname', message: 'Invalid characters in the first name field' })
    }

    if (!lastname) {
        errors.push({ field: 'lastname', message: 'Last name is required' })
    } else if (!nameRegex.test(lastname)) {
        errors.push({ field: 'lastname', message: 'Invalid characters in the last name field' })
    }

    if (!email) {
        errors.push({ field: 'email', message: 'Email is required' })
    } else if (!validator.isEmail(email)) {
        errors.push({ field: 'email', message: 'Invalid email format' })
    } else {
        // Placeholder for email existence check
    }

    if (!password) {
        errors.push({ field: 'password', message: 'Password is required' })
    } else if (!validator.isLength(password, { min: 8 })) {
        errors.push({ field: 'password', message: 'Password must be at least 8 characters long' })
    } else if (!passwordRegex.test(password)) {
        errors.push({ field: 'password', message: 'Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character' })
    }

    if (!repassword) {
        errors.push({ field: 'repassword', message: 'Please re-enter your password' })
    } else if (repassword !== password) {
        errors.push({ field: 'repassword', message: 'Passwords do not match' })
    }

    return errors;
}

module.exports = { validateRegistration };