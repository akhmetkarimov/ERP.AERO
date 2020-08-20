const express = require('express')
const router = express.Router();

const users = require('./api/users')
const files = require('./api/files')

router.use('/users', users)
router.use('/file', files)

module.exports = router