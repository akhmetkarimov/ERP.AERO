const db = require('../../models/')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const randtoken = require('rand-token')
const keys = require('../../config/keys')
const validateSignInput = require('../../validation/signup_signin')
const fs = require('fs')
const tokens = require('../../config/tokens.json')

exports.signup = async function(req, res) {
    try {
        const { errors, isValid } = validateSignInput(req.body)

        if (!isValid) return res.status(400).json(errors)
        await db.User.findOne({
            where: { email_phone: req.body.email_phone }
        }).then(user => {
            if (user) {
                errors.email_phone = 'User already exist'
                return res.status(404).json(errors)
            } else {
                const newUser = {
                    email_phone: req.body.email_phone,
                    password: req.body.password,
                }
                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if (err) throw err;
                        newUser.password = hash
                        db.User.create(newUser).then(user => {
                            res.status(200).json({ success: "The user was created successfully" })
                        }).catch(err => console.log(err))
                    })
                })
            }
        })

    } catch (e) {
        res.status(300).json(e.message)
    }

}



exports.signin = async function(req, res) {
    try {
        const { errors, isValid } = validateSignInput(req.body)
        if (!isValid) return res.status(400).json(errors)
        const email = req.body.email_phone
        const password = req.body.password
        db.User.findOne({ email }).then(user => {
            if (!user) {
                errors.email_phone = 'User email or number not found'
                return res.status(404).json(errors)
            }
            bcrypt.compare(password, user.password)
                .then(isMatch => {
                    if (isMatch) {
                        const payload = { id: user.id, email_phone: user.email_phone }
                        jwt.sign(
                            payload,
                            keys.secretOrKey, { expiresIn: 60 * 10 },
                            (err, token) => {
                                const refreshToken = randtoken.uid(256)
                                tokens[`${req.body.email_phone}`] = {}
                                tokens[`${req.body.email_phone}`].token = token
                                tokens[`${req.body.email_phone}`].refresh = refreshToken

                                fs.writeFile('config/tokens.json', JSON.stringify(tokens), function writeJSON(err) {
                                    if (err) return console.log(err);
                                    console.log('writing to ' + '../../config/tokens.json');
                                })
                                res.json({
                                    success: true,
                                    token: token,
                                    refresh: refreshToken
                                })
                            })
                    } else {
                        errors.password = 'Password incorrect'
                        return res.status(400).json(errors)
                    }

                })
        }).catch(err => res.json(err.message))
    } catch (e) {
        res.status(300).json(e.message)
    }

}


exports.info = async function(req, res) {
    try {
        const errors = {}
        db.User.findByPk(req.user.id)
            .then(info => {
                if (!info) {
                    errors.noprofile = "There is no profile for this user"
                    return res.status(404).json(errors)
                }
                res.json({ id: info.id, email_phone: info.email_phone })
            }).catch(err => res.status(404).json(err))
    } catch (e) {
        res.status(300).json(e.message)
    }
}

exports.refresh = async function(req, res) {
    try {
        if (req.body.refresh === tokens[`${req.user.email_phone}`].refresh) {
            const payload = { id: req.user.id, email_phone: req.user.email_phone }
            jwt.sign(
                payload,
                keys.secretOrKey, { expiresIn: 60 * 10 },
                (err, token) => {
                    const refreshToken = randtoken.uid(256)
                    tokens[`${req.body.email_phone}`] = {}
                    tokens[`${req.body.email_phone}`].token = token
                    tokens[`${req.body.email_phone}`].refresh = refreshToken

                    fs.writeFile('config/tokens.json', JSON.stringify(tokens), function writeJSON(err) {
                        if (err) return console.log(err);
                        console.log('writing to ' + '../../config/tokens.json');
                    })
                    res.json({
                        success: true,
                        token: token,
                        refresh: refreshToken
                    })
                })
        } else {
            res.send(401)
        }
    } catch (e) {
        res.status(300).json(e.message)
    }
}

exports.logout = async function(req, res) {
    try {
        const payload = { id: req.user.id, email_phone: req.user.email_phone }
        jwt.sign(
            payload,
            keys.secretOrKey, { expiresIn: 60 * 10 },
            (err, token) => {
                res.json({
                    success: true,
                    token: token,
                })
            })

    } catch (e) {
        res.status(300).json(e.message)
    }
}