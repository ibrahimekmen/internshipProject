const loginService = require('../services/authenticationServices.js');

function login(req,res,next){
    if(req.body.email
        && req.body.password){
        const userData = {
            email : req.body.email,
            password : req.body.password,
            secretKey: "$2a$08$3ZvBsLPjB7q1Fnw/MmMOKejgVskQuF/4wyqFcqhiZEpQ1SywIVHi2"
        };

        loginService.logIn(userData).then(data =>{
            if(data.error){
                const err = new Error(data.error);
                res.locals.error = err;
                res.status(401);
                console.error(err);
                res.render("error");
            } else {
                req.session.userId = data.user._id;
                req.session.user = data;
                res.redirect('back');
            }
        }).catch(error => {
            console.log(error);
        });

    }else {
        const err = new Error('All fields required');
        err.status = 400;
        return next(err);
    }
}

function logout(req,res,next){
    if(req.session){
        req.session.destroy((err)=>{
            if(err){
                return next(err);
            }else{
                return res.redirect('/');
            }
        });
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
            secretKey: "$2a$08$3ZvBsLPjB7q1Fnw/MmMOKejgVskQuF/4wyqFcqhiZEpQ1SywIVHi2"
        };

        loginService.createNewUser(userData).then(data =>{
            req.session.userId = data.user._id;
            req.params.userData = data.user;
            return res.redirect('/profile');
        }).catch(error => {
            console.error(error);
        });

    }else {
        const err = new Error('All fields required');
        err.status = 400;
        return next(err);
    }
}

module.exports = {
    login,
    logout,
    signUp
}