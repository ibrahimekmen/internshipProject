const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const sentry = require('@sentry/node');
const tracing = require('@sentry/tracing');
const session = require('express-session');
const navbarUtil = require('./utils/navbarHelper.js');
const breadcrumbsUtil = require('./utils/breadCrumbs.js');
const app = express();

sentry.init({
    dsn: "https://7244564833894140add9ebf97f4dc3b8@o952236.ingest.sentry.io/5901597",
    tracesSampleRate: 1.0,
});

const transaction = sentry.startTransaction({
    op: "test",
    name: "My First Test Transaction",
});

app.use(session({
    secret: "yo albuquerque",
    resave: false,
    saveUninitialized: false
}));

app.use((req,res,next) =>{
    res.locals.currentUser = req.session.userId;
    next();
});

app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use('/static',express.static('./public'));

app.set('view engine','pug');

const mainRoutes = require('./routes');
const registerRoutes = require('./routes/register');
const loginRoutes = require('./routes/login')
const logoutRoutes = require('./routes/logout');
const profileRoutes = require('./routes/profile');
const cartRoutes = require('./routes/shoppingCart');
const menRoutes = require('./routes/men');
const womenRoutes = require('./routes/women');

app.use(function(req, res, next) {
    req.breadcrumbs = breadcrumbsUtil.get_breadcrumbs(req.originalUrl);
    next();
});

app.use( async (req,res,next) => {
    req.womenNavbar = await navbarUtil.getWomenNavbar();
    req.menNavbar = await navbarUtil.getMenNavbar();
    next();
});

app.use(mainRoutes);
app.use('/register', registerRoutes);
app.use('/login',loginRoutes);
app.use('/logout',logoutRoutes);
app.use('/profile', profileRoutes);
app.use('/cart', cartRoutes);
app.use('/men', menRoutes);
app.use('/women', womenRoutes);

app.use((req,res,next)=>{
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});

app.use((err, req, res, next) => {
    res.locals.error = err;
    const status = err.status || 500;
    res.status(status);
    res.render('error',err);
});

app.listen(process.env.PORT);