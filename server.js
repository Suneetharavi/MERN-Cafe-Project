// --------------Requires----------
require('dotenv').config();
require('./config/database')
const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const router = express.Router();
const usersCtrl = require('./controllers/api/users');
// Configure to use port 3001 instead of 3000 during
// development to avoid collision with React's dev server
const port = process.env.PORT || 3001;
const app = express();
const ensureLoggedIn = require('./config/ensureLoggedIn');

// --------------middleware----------

app.use(logger('dev'));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'build')));
app.use(require('./config/checkToken'));

// --------------Routes----------

// Put API routes here, before the "catch all" route
app.use('/api/users', require('./routes/api/users'));

// Protect the API routes below from anonymous users

app.use('/api/items', ensureLoggedIn, require('./routes/api/items'));
app.use('/api/orders', ensureLoggedIn, require('./routes/api/orders'));

app.get('/*', function(req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
  });

// POST /api/users/login
//router.post('/login', usersCtrl.login);
// --------------Server----------


app.listen(port, function() {
  console.log(`Express app running on port ${port}`)
});