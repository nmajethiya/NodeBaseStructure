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

            var errors = req.validationErrors();

            if (errors) {
                log('Error in validator : ', errors);
                helpers.createResponse(res, constants.UNPROCESSED,
                    messages.PARAM_MISSING,
                    { 'error' : errors[0].msg }
                );
            } else {
                next();
            }
        }
    },

    userRouteValidate:function (method) {
        return function (req, res, next) {
            switch(method) {
                case 'show' :
                    req.assert('objectId', helpers.checkIfRequired('objectId')).notEmpty();
                    req.assert('objectId', helpers.checkIfValidMongoId('objectId')).isMongoId();
                break;

                case 'changePassword' :
                    req.assert('oldPassword', helpers.checkIfRequired('oldPassword')).notEmpty();
                    req.assert('newPassword', helpers.checkIfRequired('newPassword')).notEmpty();
                break;

                case 'delete' :
                    req.assert('objectId', helpers.checkIfRequired('objectId')).notEmpty();
                    req.assert('objectId', helpers.checkIfValidMongoId('objectId')).isMongoId();
                    req.assert('status', helpers.checkIfRequired('status')).notEmpty();
                    req.assert('status', helpers.checkIfValidEnum('status', [1,0])).isIn([1,0]);
                    break;
            }
            var errors = req.validationErrors();

            if (errors) {
                log('Error in validator : ', errors);
                helpers.createResponse(res, constants.UNPROCESSED,
                    messages.PARAM_MISSING,
                    { 'error' : errors[0].msg }
                );
            } else {
                next();
            }
        }
    },

    faqRouteValidate:function (method) {
        return function (req, res, next) {
            switch(method) {
                case 'index' :
                    /*if (typeof req.query.search.isEnable !== 'undefined' && req.query.search.isEnable)
                        req.assert('isEnable', helpers.checkIfValidEnum('isEnable', [0,1])).isIn([0,1]);*/
                    if (typeof req.query.search !== 'undefined' && req.query.search)
                        req.assert('search', helpers.checkIfValidJSON('search')).isJSON();
                break;

                case 'store' :
                    req.assert('question', helpers.checkIfRequired('question')).notEmpty();
                    req.assert('answer', helpers.checkIfRequired('answer')).notEmpty();
                break;

                case 'show' :
                    req.assert('objectId', helpers.checkIfRequired('objectId')).notEmpty();
                    req.assert('objectId', helpers.checkIfValidMongoId('objectId')).isMongoId();
                break;

                case 'update' :
                    req.assert('objectId', helpers.checkIfRequired('objectId')).notEmpty();
                    req.assert('objectId', helpers.checkIfValidMongoId('objectId')).isMongoId();
                    req.assert('question', helpers.checkIfRequired('question')).notEmpty();
                    req.assert('answer', helpers.checkIfRequired('answer')).notEmpty();
                break;

                case 'delete' :
                    req.assert('objectId', helpers.checkIfRequired('objectId')).notEmpty();
                    req.assert('objectId', helpers.checkIfValidMongoId('objectId')).isMongoId();
                    req.assert('status', helpers.checkIfRequired('status')).notEmpty();
                    req.assert('status', helpers.checkIfValidEnum('status', [1,0])).isIn([1,0]);
                break;
            }
            var errors = req.validationErrors();

            if (errors) {
                log('Error in validator : ', errors);
                helpers.createResponse(res, constants.UNPROCESSED,
                    messages.PARAM_MISSING,
                    { 'error' : errors[0].msg }
                );
            } else {
                next();
            }
        }
    },

    genreRouteValidate:function (method) {
        return function (req, res, next) {
            //console.log(req);
            //res.send(req.files.image);
            switch(method) {
                case 'index' :
                    /*if (typeof req.query.search.isEnable !== 'undefined' && req.query.search.isEnable)
                        req.assert('isEnable', helpers.checkIfValidEnum('isEnable', [0,1])).isIn([0,1]);*/
                    if (typeof req.query.search !== 'undefined' && req.query.search)
                        req.assert('search', helpers.checkIfValidJSON('search')).isJSON();
                    break;

                case 'store' :
                    req.assert('name', helpers.checkIfRequired('name')).notEmpty();
                    //req.assert('answer', helpers.checkIfRequired('answer')).notEmpty();
                    break;

                case 'show' :
                    req.assert('objectId', helpers.checkIfRequired('objectId')).notEmpty();
                    req.assert('objectId', helpers.checkIfValidMongoId('objectId')).isMongoId();
                    break;

                case 'update' :
                    req.assert('objectId', helpers.checkIfRequired('objectId')).notEmpty();
                    req.assert('objectId', helpers.checkIfValidMongoId('objectId')).isMongoId();
                    req.assert('name', helpers.checkIfRequired('name')).notEmpty();
                    break;

                case 'delete' :
                    req.assert('objectId', helpers.checkIfRequired('objectId')).notEmpty();
                    req.assert('objectId', helpers.checkIfValidMongoId('objectId')).isMongoId();
                    req.assert('status', helpers.checkIfRequired('status')).notEmpty();
                    req.assert('status', helpers.checkIfValidEnum('status', [1,0])).isIn([1,0]);
                    break;
            }
            var errors = req.validationErrors();

            if (errors) {
                log('Error in validator : ', errors);
                helpers.createResponse(res, constants.UNPROCESSED,
                    messages.PARAM_MISSING,
                    { 'error' : errors[0].msg }
                );
            } else {
                next();
            }
        }
    },

    topicRouteValidate:function (method) {
        return function (req, res, next) {
            //console.log(req);
            //res.send(req.files.image);
            switch(method) {
                case 'index' :
                    /*if (typeof req.query.search.isEnable !== 'undefined' && req.query.search.isEnable)
                        req.assert('isEnable', helpers.checkIfValidEnum('isEnable', [0,1])).isIn([0,1]);*/
                    if (typeof req.query.search !== 'undefined' && req.query.search)
                        req.assert('search', helpers.checkIfValidJSON('search')).isJSON();
                    break;

                case 'store' :
                    req.assert('name', helpers.checkIfRequired('name')).notEmpty();
                    break;

                case 'show' :
                    req.assert('objectId', helpers.checkIfRequired('objectId')).notEmpty();
                    req.assert('objectId', helpers.checkIfValidMongoId('objectId')).isMongoId();
                    break;

                case 'update' :
                    req.assert('objectId', helpers.checkIfRequired('objectId')).notEmpty();
                    req.assert('objectId', helpers.checkIfValidMongoId('objectId')).isMongoId();
                    req.assert('name', helpers.checkIfRequired('name')).notEmpty();
                    break;

                case 'delete' :
                    req.assert('objectId', helpers.checkIfRequired('objectId')).notEmpty();
                    req.assert('objectId', helpers.checkIfValidMongoId('objectId')).isMongoId();
                    req.assert('status', helpers.checkIfRequired('status')).notEmpty();
                    req.assert('status', helpers.checkIfValidEnum('status', [1,0])).isIn([1,0]);
                    break;
            }
            var errors = req.validationErrors();

            if (errors) {
                log('Error in validator : ', errors);
                helpers.createResponse(res, constants.UNPROCESSED,
                    messages.PARAM_MISSING,
                    { 'error' : errors[0].msg }
                );
            } else {
                next();
            }
        }
    },

    professionRouteValidate:function (method) {
        return function (req, res, next) {
            //console.log(req.body);
            //res.send(req.files.image);
            switch(method) {
                case 'index' :
                    /*if (typeof req.query.search.isEnable !== 'undefined' && req.query.search.isEnable)
                     req.assert('isEnable', helpers.checkIfValidEnum('isEnable', [0,1])).isIn([0,1]);*/
                    if (typeof req.query.search !== 'undefined' && req.query.search)
                        req.assert('search', helpers.checkIfValidJSON('search')).isJSON();
                break;

                case 'store' :
                    /*req.assert('professionList', helpers.checkIfRequired('professionList')).notEmpty();
                    /*req.assert('professionList', helpers.checkIfValidJSON('professionList')).isJSON();*/
                    req.assert('name', helpers.checkIfRequired('name')).notEmpty();
                break;

                case 'show' :
                    req.assert('objectId', helpers.checkIfRequired('objectId')).notEmpty();
                    req.assert('objectId', helpers.checkIfValidMongoId('objectId')).isMongoId();
                break;

                case 'update' :
                    req.assert('objectId', helpers.checkIfRequired('objectId')).notEmpty();
                    req.assert('objectId', helpers.checkIfValidMongoId('objectId')).isMongoId();
                    req.assert('name', helpers.checkIfRequired('name')).notEmpty();
                break;

                case 'delete' :
                    req.assert('objectId', helpers.checkIfRequired('objectId')).notEmpty();
                    req.assert('objectId', helpers.checkIfValidMongoId('objectId')).isMongoId();
                    req.assert('status', helpers.checkIfRequired('status')).notEmpty();
                    req.assert('status', helpers.checkIfValidEnum('status', [1,0])).isIn([1,0]);
                break;
            }
            var errors = req.validationErrors();

            if (errors) {
                log('Error in validator : ', errors);
                helpers.createResponse(res, constants.UNPROCESSED,
                    messages.PARAM_MISSING,
                    { 'error' : errors[0].msg }
                );
            } else {
                next();
            }
        }
    },

    productVisitsRouteValidate:function (method) {
        return function (req, res, next) {
            //console.log(req.body);
            //res.send(req.files.image);
            switch(method) {
                case 'index' :
                    if (typeof req.query.search !== 'undefined' && req.query.search)
                        req.assert('search', helpers.checkIfValidJSON('search')).isJSON();
                    break;

                case 'store' :
                    /*req.assert('professionList', helpers.checkIfRequired('professionList')).notEmpty();
                     /*req.assert('professionList', helpers.checkIfValidJSON('professionList')).isJSON();*/
                    req.assert('productId', helpers.checkIfRequired('productId')).notEmpty();
                    req.assert('productId', helpers.checkIfValidMongoId('productId')).isMongoId();
                    req.assert('userId', helpers.checkIfRequired('userId')).notEmpty();
                    req.assert('userId', helpers.checkIfValidMongoId('userId')).isMongoId();
                    break;
            }
            var errors = req.validationErrors();

            if (errors) {
                log('Error in validator : ', errors);
                helpers.createResponse(res, constants.UNPROCESSED,
                    messages.PARAM_MISSING,
                    { 'error' : errors[0].msg }
                );
            } else {
                next();
            }
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
    },

    validatePaginationParams:function() {
        return function (req, res, next) {
            if (typeof req.query.records !== 'undefined' && req.query.records) {
                req.assert('records', helpers.checkIfEqualsAll('records')).equals('all');
            } else {
                if (typeof req.query.sortOrder !== 'undefined' && req.query.sortOrder)
                    req.assert('sortOrder', helpers.checkIfValidSortOrder('sortOrder', ['asc', 'desc'])).isIn(['asc', 'desc']);
                if (typeof req.query.pageNumber !== 'undefined' && req.query.pageNumber)
                    req.assert('pageNumber', helpers.checkIfValidPageNumber('pageNumber')).isInt({min:1});
                if (typeof req.query.recordsPerPage !== 'undefined' && req.query.recordsPerPage)
                    req.assert('recordsPerPage', helpers.checkIfValidPageNumber('recordsPerPage')).isInt({min:1});
            }

            var errors = req.validationErrors();

            if (errors) {
                helpers.createResponse(res, constants.UNPROCESSED,
                    messages.PARAM_MISSING,
                    { 'error' : errors[0].msg }
                );
            } else {
                next();
            }
        }
    }
};