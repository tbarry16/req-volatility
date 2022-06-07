/* eslint-disable no-undef */

const express = require('express');
const dotenv = require('dotenv');
const { OAuth2Client } = require('google-auth-library');
const app = express();
const path = require('path');
const PORT = 3000;
const cookieParser = require('cookie-parser');

//value inside .env will be accessed in server.js
dotenv.config();
const client = new OAuth2Client(process.env.REACT_APP_GOOGLE_CLIENT_ID);

// ROUTES
const apiRouter = require('./routes/apiRouter')
// HANDLE PARSING REQUEST BODY
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())


// SERVE PRODUCTION FILES
if (process.env.NODE_ENV === 'production') {
    app.use('/public', express.static(path.join(__dirname, '../public')));
    app.get('/', (req, res) => {
        return res.status(200).sendFile(path.join(__dirname, '../index.html'));
    });
}

//From here to post req to api/google-login is for OAuth. Can rearrange this later
const users = [];

function upsert(array, item) {
  const i = array.findIndex((_item) => _item.email === item.email);
  if (i > -1) array[i] = item;
  else array.push(item);
}

app.post('api/google-login', async (req, res) => {
  //should include email as part of req.body if we want to store this in database
  const { token } = req.body;
  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: process.env.CLIENT_ID,
  });
  const { name, email, picture } = ticket.getPayload();
  upsert(users, { name, email, picture });
  res.status(201);
  res.json({ name, email, picture });
});

//Links for auto-sending emails: https://www.youtube.com/watch?v=CrdMFZIYoEY
//

//Will need to change/inspect the routes below this
app.use('/api', apiRouter, (req, res) => {
    return res.status(200).json(res.locals)
})

/* Invalid End Point Error Handler */
app.use((req, res) => res.status(404).send('This page does not exist!'));

// global error handler
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
    const defaultErr = {
      log: 'Express error handler caught unknown middleware error',
      status: 500,
      message: { err: 'An error occurred' },
    };
    const errorObj = Object.assign({}, defaultErr, err);
    console.log(errorObj.log);
    return res.status(errorObj.status).json(errorObj.message);
  });

  //5000 is included as backup in OAuth instructions, though probably not necessary
app.listen(PORT || 5000, () => {
    console.log(`Server listening on port: ${PORT || 5000}...`);
});

module.exports = app;