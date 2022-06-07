
const express = require('express');
const router = express.Router();
const db = require('../db')

router.get('/login', (req, res, next) => {
    return next();
})

router.get('/:email', (req, res, next) => {
    return next();
})

router.use('/features', featuresRouter, (req, res, next) => {
    return next();
})


module.exports = router;