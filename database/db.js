const mongoose = require('mongoose');
require('dotenv').config()

const mongooseDB = mongoose.connect(process.env.MONGODB_URI)
    .then(console.log('database connection established'))

module.exports = mongooseDB