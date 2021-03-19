var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const basicAuth = require('express-basic-auth');
const { Client } = require('pg');

var crypto = require('crypto');


var todoRouter = require('./routes/todo');

var app = express();

var cors = require('cors');
app.use(cors())

async function authorizer(username, password, cb) {
    var passwordHash = crypto.createHash('sha256').update(username + ":" + password).digest('hex');
    const client = new Client(process.env.DATABASE);
    await client.connect();
    const result = await client.query("SELECT count(*) FROM Users WHERE username=$1 AND password=$2", [username, passwordHash]);
    await client.end();
    return cb(null, result.rows[0].count == 1);
}

function shouldAuthenticate(req) {
    if (process.env.DATABASE.endsWith('test') && req.headers.authorization === undefined) {
        return false;
    }
    return true
}

const basicAuthMiddleware = basicAuth( { authorizer: authorizer, challenge: true, authorizeAsync: true} )


app.use((req, res, next) => shouldAuthenticate(req) ? basicAuthMiddleware(req, res, next) : next());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/todo', todoRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
