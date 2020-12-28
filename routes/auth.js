const router = require('express').Router();
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const jwt = require('jsonwebtoken');

// // Validation ...
const Joi = require('@hapi/joi');

const registerSchema = Joi.object ({
    usrName: Joi.string()
        .min(4)
        .required(),
    email: Joi.string()
        .min(6)
        .required()
        .email(),
    courseCode: Joi.string()
        .required(),
    password: Joi.string()
        .min(6)
        .required()
});

const loginSchema = Joi.object ({
    email: Joi.string()
        .min(6)
        .required()
        .email(),
    password: Joi.string()
        .min(6)
        .required()
});


/**
 * Register a new user
 */
router.post('/register', async (req, res) => {
    // Validate data before pushing =>
    const {error} = registerSchema.validate(req.body);

    if (error) {
        let err = error.details[0].message;
        return res.status(400).send(err);
    }

    // Check if user already exists
    const emailRegistered = await User.findOne({email: req.body.email});
    if (emailRegistered)
        return res.status(400).send('Email is already registered');

    // PW Hashing
    const salt = await bcrypt.genSalt(10);
    const hashedPw = await bcrypt.hash(req.body.password, salt);

    const user = new User({
        usrName: req.body.usrName,
        email: req.body.email,
        password: hashedPw
    });

    try {
        const writeUsr = await user.save();
        // Generate JWT
        const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET);
        res.header('auth-token', token).send({token: token});
    } catch (err) {
        res.status(400).send();
    }
});


/**
 * Authenticate a user
 * */
router.post('/login', async (req, res) => {
    // Validate request body to save resources =>
    const {error} = loginSchema.validate(req.body);

    // Check if user already exists
    const userCredentials = await User.findOne({email: req.body.email});
    if (!userCredentials) return res.status(400).send('Failed to authenticate'); // Don't allow enumeration

    // Validate password
    const validPasswd = await bcrypt.compare(req.body.password, userCredentials.password);
    if (!validPasswd) return res.status(400).send('Failed to authenticate'); // Don't allow enumeration

    if (error) {
        let err = error.details[0].message;
        console.log("ERROR:", err);
        return res.status(400).send(err);
    }

    // Generate JWT
    const token = jwt.sign({_id: userCreds._id}, process.env.TOKEN_SECRET);
    res.header('auth-token', token).send({token: token});
});

module.exports = router;