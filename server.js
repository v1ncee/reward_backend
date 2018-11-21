require('rootpath')();
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const jwt = require('_helpers/jwt');
const errorHandler = require('_helpers/error-handler');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

// jwt
app.use(jwt());

// api routes
app.use('/users', require('./controllers/user.controller'));
app.use('/exercises', require('./controllers/exercise.controller'));
app.use('/rewards', require('./controllers/reward.controller'));
app.use('/claimexercise', require('./controllers/claim_exercise.controller'));

// global error handler
app.use(errorHandler);

// start server
const port = process.env.NODE_ENV === 'production' ? 80 : 4000;
const server = app.listen(port, function () {
    console.log('Server listening on port ' + port);
});