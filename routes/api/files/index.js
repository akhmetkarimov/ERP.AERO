const express = require('express')
const router = express.Router();
const controller = require('../../../controllers/files')
const passport = require('passport')

// @route POST api/file/upload
// Upload new File
// @access Private
router.post('/upload', passport.authenticate('jwt', { session: false }),
    controller.upload)

// @route GET api/file/list
// Get list of files
// @access Private
router.get('/list', passport.authenticate('jwt', { session: false }),
    controller.list)

// @route GET api/file/:id
// Get file by id
// @access Private
router.get('/:id', passport.authenticate('jwt', { session: false }),
    controller.get)

// @route DELETE api/file/delete/:id
// Delete file by id
// @access Private
router.delete('/delete/:id', passport.authenticate('jwt', { session: false }),
    controller.delete)


// @route PUT api/file/update/:id
// Update file by id
// @access Private
router.put('/update/:id', passport.authenticate('jwt', { session: false }),
    controller.update)


// @route GET api/file/download/:id
// Download file by id
// @access Private
router.get('/download/:id', passport.authenticate('jwt', { session: false }),
    controller.download)



module.exports = router