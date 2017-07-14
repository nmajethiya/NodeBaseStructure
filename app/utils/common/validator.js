'use strict';

var jwt = require('jsonwebtoken');

module.exports = {
    publicRouteValidate:function (method) {
        return function (req, res, next) {
            switch(method) {
                case 'login' :
                    req.assert('email', helpers.checkIfRequired('email')).notEmpty();
                    req.assert('email', helpers.checkIfEmail('email')).isEmail();
                    req.assert('email', helpers.checkLength('email', 3, 100)).len(3, 100);
                    req.assert('password', helpers.checkIfRequired('password')).notEmpty();
                break;

                case 'signup' :
                    req.assert('name', helpers.checkIfRequired('name')).notEmpty();
                    req.assert('email', helpers.checkIfRequired('email')).notEmpty();
                    req.assert('email', helpers.checkIfEmail('email')).isEmail();
                    req.assert('password', helpers.checkIfRequired('password')).notEmpty();
                    req.assert('mobileNumber', helpers.checkIfRequired('mobileNumber')).notEmpty();
                    req.assert('topics', helpers.checkIfRequired('topics')).notEmpty();
                    req.assert('professions', helpers.checkIfRequired('professions')).notEmpty();
                    if (helpers.isArray((req.body.topics))) {
                        helpers.checkIfArray('topics');
                    } else {

                    }
                    if (helpers.isArray((req.body.professions))) {
                        helpers.checkIfRequired('professions');
                    } else {

                    }
                break;

                case 'verifyOTP' :
                    req.assert('email', helpers.checkIfRequired('email')).notEmpty();
                    req.assert('email', helpers.checkIfEmail('email')).isEmail();
                    req.assert('OTP', helpers.checkIfRequired('OTP')).notEmpty();
                    req.assert('OTP', helpers.checkInt('OTP')).isInt();
                    req.assert('OTP', helpers.checkLength('OTP', 6, 6)).len(6, 6);
                break;

                case 'forgotPassword' :
                    req.assert('email', helpers.checkIfRequired('email')).notEmpty();
                    req.assert('email', helpers.checkIfEmail('email')).isEmail();
                break;

                case 'resetPassword' :
                    req.assert('email', helpers.checkIfRequired('email')).notEmpty();
                    req.assert('email', helpers.checkIfEmail('email')).isEmail();
                    req.assert('newPassword', helpers.checkIfRequired('newPassword')).notEmpty();
                break;

            }

            req.getValidationResult().then( result => {
                var errors = result.useFirstErrorOnly();
                if (! errors.isEmpty()) {
                    helpers.createResponse(res, constants.UNPROCESSED,
                        messages.PARAM_MISSING,
                        { 'error' : errors.array()[0].msg }
                    );
                } else {
                    next();
                }
            });
        }
    },

    useJWTMiddleware:function() {
        return function (req, res, next) {
            var token = req.headers['authorization']; // Parse token from header

            if (token) {
                token = token.split('Bearer ')[1];
                jwt.verify(token, config.JWT_SECRET, function(err, decoded) {
                    if (err) {
                        log('Error in JWT Middleware : ', err.message);
                        helpers.createResponse(res, constants.UNAUTHORIZED,
                            messages.PARAM_MISSING,
                            { 'error' : messages.INVALID_TOKEN}
                        );
                    }
                    else {
                        //req.decoded = decoded;
                        //console.log(decoded._doc);
                        next();
                    }
                });
            } else {
                log('Token not provided');
                helpers.createResponse(res, constants.UNAUTHORIZED,
                    messages.PARAM_MISSING,
                    { 'error' : messages.ACCESS_TOKEN_REQUIRED }
                );
            }
        }
    },

    secureOpenRoutes:function () {
        return function (req, res, next) {
            var token = req.headers['authorization']; // Parse token from header

            if (token) {
                token = token.split('Bearer ')[1];
                
                if (token == constants.STATIC_TOKEN)
                    next();
                else {
                    log('Validator.js => Invalid token.');
                    helpers.createResponse(res, constants.UNAUTHORIZED,
                        messages.PARAM_MISSING,
                        {'error' : messages.INVALID_TOKEN}
                    );
                }
            } else {
                log('Token not provided');
                helpers.createResponse(res, constants.UNAUTHORIZED,
                    messages.PARAM_MISSING,
                    { 'error' : messages.ACCESS_TOKEN_REQUIRED }
                );
            }
        }   
    }
};