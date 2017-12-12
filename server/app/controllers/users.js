'use strict'
var express = require('express'),
    router = express.Router(),
    logger = require('../../config/logger'),
    mongoose = require('mongoose'),
    User = mongoose.model('UsersModel'),
    passportService = require('../../config/passport'),
    passport = require('passport');

var requireLogin = passport.authenticate('local', { session: false });
var requireAuth = passport.authenticate('jwt', { session: false });



module.exports = function (app, config) {
    app.use('/api', router);

    //Router for get all users
    router.get('/users', function (req, res, next) {
        logger.log('Get all users');
        var query = User.find()
            .sort(req.query.order)
            .exec()
            .then(result => {
                if (result && result.length) {
                    res.status(200).json(result);
                } else {
                    res.status(404).json({ message: "No users" });
                }
            })
            .catch(err => {
                return next(err);
            })
    });

    //Router for creating a document
    router.post('/users', function (req, res, next) {
        logger.log('Create user', 'verbose');
        var user = new User(req.body);
        user.save()
            .then(result => {
                res.status(201).json(result);
            })
            .catch(err => {
                return next(err);
            });
    });

    //router for updating password
    router.put('/users/password/:userId', requireAuth, function (req, res, next) {
        logger.log('Update user ' + req.params.userId, 'verbose');

        User.findById(req.params.userId)
            .exec()
            .then(function (user) {
                if (req.body.password !== undefined) {
                    user.password = req.body.password;
                }

                user.save()
                    .then(function (user) {
                        res.status(200).json(user);
                    })
                    .catch(function (err) {
                        return next(err);
                    });
            })
            .catch(function (err) {
                return next(err);
            });
    });

    router.route('/users/login').post(requireLogin, login);

}
