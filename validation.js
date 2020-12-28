// Validation ...
const Joi = require('@hapi/joi');

/**
 * Validate register schema
 */
const validateRegister = (data) => {
    const schema = Joi.object ({
        usrName: Joi.string()
            .min(4)
            .required(),
        email: Joi.string()
            .min(6)
            .required()
            .email(),
        password: Joi.string()
            .min(6)
            .required()
    });
    return schema.validate(data, schema);
};


/**
 * Validate login schema
 */
const validateLogin = (data) => {
    const schema = Joi.object({
        email: Joi.string()
            .min(6)
            .required()
            .email(),
        password: Joi.string()
            .min(6)
            .required()
    });
    return schema.validate(data, schema);
};


// Exports
module.exports.validateLogin = validateLogin;
module.exports.validateRegister = validateRegister;