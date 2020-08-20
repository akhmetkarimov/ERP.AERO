const Validator = require('validator')
const isEmpty = require('./isEmpty')

module.exports = function validateRegisterInput(data) {
    let errors = {}

    data.email_phone = !isEmpty(data.email_phone) ? data.email_phone : '';
    data.password = !isEmpty(data.password) ? data.password : '';

    if (Validator.isEmpty(data.email_phone)) errors.email_phone = 'Email or Phone field is required';

    if (!Validator.isEmail(data.email_phone)) errors.email_phone = 'Email or Phone is invalid';

    if (Validator.isEmpty(data.password)) errors.password = 'Password field is required';

    if (!Validator.isLength(data.password, { min: 6, max: 30 })) errors.password = 'Password must be at least 6 characters';

    return {
        errors,
        isValid: isEmpty(errors)
    }
}