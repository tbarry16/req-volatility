
const express = require('express');
const router = express.Router();
const featuresRouter = require('./featuresRouter')
const db = require('../db')



router.use('/features', featuresRouter, (req, res, next) => {
    return next();
})

router.get('/login', (req, res, next) => {
    return next();
})

module.exports = router;