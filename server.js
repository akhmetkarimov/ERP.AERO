const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const cors = require('cors');
const api = require('./routes/index')
const fileUpload = require('express-fileupload')
const passport = require('passport');

//Cors
app.use(cors());

//File Upload
app.use(fileUpload({
    limits: { fileSize: 50 * 1024 * 1024 },
    useTempFiles: true,
    tempFileDir: 'uploads/files',
}));

// Passport middlweare
app.use(passport.initialize())

// Passport Config
require('./config/passport')(passport)

//Body Parse 
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())

//Use Routes
app.use('/api', api)

const port = process.env.PORT || 5000

app.listen(port, () => console.log(`Server running on port ${port}`))