
const express = require('express');
const { route } = require('../server');
const router = express.Router();

router.get('/login', (req, res, next) => {
    return next();
})

router.get('/:email', (req, res, next) => {
    return next()
})


module.exports = router;