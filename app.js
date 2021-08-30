const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const sentry = require('@sentry/node');
const session = require('express-session');
const navbarUtil = require('./utils/navbarHelper.js');
const breadcrumbsUtil = require('./utils/breadCrumbs.js');
const flash = require('connect-flash');

const app = express();

sentry.init({
    dsn: "https://7244564833894140add9ebf97f4dc3b8@o952236.ingest.sentry.io/5901597",
    tracesSampleRate: 1.0,
});


app.use(session({
    secret: "yo albuquerque",
    resave: false,
    saveUninitialized: false
}));
app.use(flash());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());

app.use('/static',express.static('./public'));

app.set('view engine','pug');

app.use((req,res,next) =>{
    res.locals.currentUser = req.cookies.userId;
    next();
});

app.use(function(req, res, next) {
    req.breadcrumbs = breadcrumbsUtil.get_breadcrumbs(req.originalUrl);
    next();
});

app.use( async (req,res,next) => {
    req.womenNavbar = await navbarUtil.getWomenNavbar();
    req.menNavbar = await navbarUtil.getMenNavbar();
    req.allCategories = await navbarUtil.getAllCategories();
    next();
});

const mainRoutes = require('./routes');
const registerRoutes = require('./routes/register');
const loginRoutes = require('./routes/login')
const logoutRoutes = require('./routes/logout');
const profileRoutes = require('./routes/profile');
const cartRoutes = require('./routes/shoppingCart');
const wishlistRoutes = require('./routes/wishlist');
const menRoutes = require('./routes/men');
const womenRoutes = require('./routes/women');
const searchRoutes = require('./routes/search');

app.use(mainRoutes);
app.use('/register', registerRoutes);
app.use('/login',loginRoutes);
app.use('/logout',logoutRoutes);
app.use('/profile', profileRoutes);
app.use('/cart', cartRoutes);
app.use('/wishlist', wishlistRoutes);
app.use('/men', menRoutes);
app.use('/women', womenRoutes);
app.use('/search',searchRoutes);

app.use((req,res,next)=>{
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});

app.use((err, req, res) => {
    res.locals.error = err;
    const status = err.status || 500;
    console.error(err);
    res.render('error',err);
});

module.exports = app.listen(process.env.PORT || 3000);