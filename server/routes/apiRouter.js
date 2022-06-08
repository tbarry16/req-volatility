
const express = require('express');
const router = express.Router();
const featuresRouter = require('./featuresRouter')
const db = require('../db')
const { OAuth2Client } = require('google-auth-library');

// HELPER FUNCTIONS
// function upsert(array, item) {
//     const i = array.findIndex((_item) => _item.email === item.email);
//     if (i > -1) array[i] = item;
//     else array.push(item);
//   }


router.use('/features', featuresRouter, (req, res, next) => {
    return next();
})

router.post('/google-login', async (req, res, next) => {
    //should include email as part of req.body if we want to store this in database
    const client = new OAuth2Client(process.env.REACT_APP_GOOGLE_CLIENT_ID);
    const users = [];
    const { token } = req.body;
    const ticket = await client.verifyIdToken({
        idToken: token,
        audience: process.env.VOLATRACK_GOOGLE_CLIENT_ID,
    });
    const { name, email, picture } = ticket.getPayload();
    // upsert(users, { name, email, picture });

    console.log(email)

    const findUserQuery = 'SELECT * FROM users WHERE email=($1)'
    const user = await db.query(findUserQuery, [email])

    res.locals.loginData = [name, email, picture]
    if (user.rows.length) {
        return res.status(200).json(res.locals.loginData)
    } else {
        const createUserQuery = 'INSERT INTO users (email) VALUES ($1)'
        await db.query(createUserQuery, [email])
        return res.status(200).json(res.locals)
    }
})



module.exports = router;