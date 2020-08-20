const express = require('express')
const router = express.Router();
const controller = require('../../../controllers/users')
const passport = require('passport')

// @route POST api/user/signup
// Create new user
// @access Public
router.post('/signup', controller.signup)

// @route POST api/user/signin
// Signin
// @access Public
router.post('/signin', controller.signin)

// @route POST api/user/signin/new_token
// Refresh user token
// @access Private
router.post('/signin/new_token', passport.authenticate('jwt', { session: false }),
    controller.refresh)


// @route GET api/user/info
// Get current user info
// @access Private
router.get('/info',
    passport.authenticate('jwt', { session: false }),
    controller.info)

// @route GET api/user/logout
// Logoutfrom system
// @access Private
router.get('/logout',
    passport.authenticate('jwt', { session: false }),
    controller.logout)




module.exports = router