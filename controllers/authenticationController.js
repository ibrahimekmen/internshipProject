const loginService = require('../services/authenticationServices.js');
require('dotenv').config();

function login(req,res,next){
    if(req.body.email
        && req.body.password){
        const userData = {
            email : req.body.email,
            password : req.body.password,
            secretKey: `${process.env.SECRET_KEY}`
        };

        loginService.logIn(userData).then(data =>{
            if(data.error){
                const err = new Error(data.error);
                res.locals.error = err;
                res.status(401);
                console.error(err);
                res.render("error");
            } else {
                res.cookie('userId',data.user._id);
                res.cookie('user',data);
                req.flash('message', 'Logged In');
                res.redirect('back');
            }
        }).catch(error => {
            console.error(error);
        });

    }else {
        const err = new Error('All fields required');
        err.status = 400;
        return next(err);
    }
}

function logout(req,res,next){
    if(req.cookies.userId){
        res.clearCookie('userId');
        res.clearCookie('user');
        return res.redirect('/');
    }else{
        next();
    }
}

function signUp(req,res,next){
    if(req.body.name && req.body.email
        && req.body.password
        && req.body.confirmPassword){
        if(req.body.password !== req.body.confirmPassword){
            const err = new Error('Passwords do not match');
            err.status = 400; // bad request
            return next(err);
        }
        const userData = {
            name : req.body.name,
            email : req.body.email,
            password : req.body.password,
            secretKey: `${process.env.SECRET_KEY}`
        };

        loginService.createNewUser(userData).then(data =>{
            if(data.error){
                console.error(error);
                res.redirect('back');
            }else{
                res.cookie('userId', data.user._id);
                res.cookie('user',data);
                req.params.userData = data.user;
                res.redirect('/profile');
            }
        }).catch(error => {
            console.error(error);
        });

    }else {
        //req.flash('message', 'All fields required');
        return res.redirect('back');
    }
}

module.exports = {
    login,
    logout,
    signUp
}