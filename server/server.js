const express = require('express');
const app = express();
const path = require('path');
const PORT = 3000;
const cookieParser = require('cookie-parser');

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