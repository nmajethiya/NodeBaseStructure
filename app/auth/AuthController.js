'use strict';

var bcrypt      = require('bcrypt');
var User        = require(process.cwd() + '/app/components/User/UserSchema');
var Topic       = require(process.cwd() + '/app/components/Topic/TopicModel');
var Profession  = require(process.cwd() + '/app/components/Profession/ProfessionModel');

module.exports = {

    /**
     * login() allows user to login to the
     * system if credentials are correct
     *
     * @url {{URL}}/login
     * @param <String> username, password
     * @return <Element> User element with login token
     */

    login:function(req, res) {
        User.findOne({email: req.body.email}, function (err, user) {
            if (err) {
                log('Error in Login API : ', err.message);
                helpers.createResponse(res, constants.SERVER_ERROR,
                    messages.LOGIN_ERROR,
                    {'error': messages.SERVER_ERROR_MESSAGE}
                );
            } else if (!user) {
                log('User not found');
                helpers.createResponse(res, constants.UNPROCESSED,
                    messages.MODULE_NOT_FOUND(constants.USER_MODEL_NAME),
                    {'error': messages.MODULE_NOT_FOUND(constants.USER_MODEL_NAME)}
                );
            } else {
                if (bcrypt.compareSync(req.body.password, user.password)) {
                    if (user.isEnable === 1) {
                        var sendData = {
                            name         : user.name,
                            email        : user.email,
                            mobileNumber : user.mobileNumber
                        };
                        log('Login Successful : ');
                        helpers.createResponse(res, constants.SUCCESS,
                            messages.LOGIN_SUCCESS,
                            {'token': helpers.generateToken(user), 'user': sendData}
                        );

                    } else {
                        log('User account has been disabled');
                        helpers.createResponse(res, constants.UNPROCESSED,
                            messages.LOGIN_ACCOUNT_DISABLED,
                            {'error': messages.LOGIN_ACCOUNT_DISABLED}
                        );
                    }

                } else {
                    log('Wrong Password in login');
                    helpers.createResponse(res, constants.UNAUTHORIZED,
                        messages.INCORRECT_PASSWORD,
                        {'error': messages.INCORRECT_PASSWORD}
                    );
                }
            }
        });
    },

    /**
     * signup() allows user to signup to the
     * system with input data
     *
     * @url {{URL}}/signup
     * @param <String> name, email, password, mobile number, topics[], professions[]
     * @return <Element> New Signed Up user with basic profile details and OTP
     */

    signup:function (req, res) {
        User.findOne({email: req.body.email, isAccountVerified: 1}, function (err, user) {
            if (err) {
                log('Error in Signup API : ', err.message);
                helpers.createResponse(res, constants.SERVER_ERROR,
                    messages.SIGN_UP_ERROR,
                    {'error': messages.SERVER_ERROR_MESSAGE}
                );
            } else if (user) {
                log('User already exists in Signup API');
                helpers.createResponse(res, constants.UNPROCESSED,
                    messages.MODULE_EXISTS(constants.USER_MODEL_NAME),
                    {'error': messages.MODULE_EXISTS(constants.USER_MODEL_NAME)}
                );
            } else {
                var topicsArray     = [];
                var professionArray = [];
                var topicBody       = JSON.parse(req.body.topics);
                var professionBody  = JSON.parse(req.body.professions);

                async.eachSeries(topicBody, function (topic, callback) {
                    Topic.findOne({_id : topic}, function (err, topicData) {
                        if (err) {
                            callback();
                        } else {
                            var data = {'topicId' : topic, 'name' : topicData.name};
                            topicsArray.push(data);
                            callback();
                        }
                    });
                }, function (err) {
                    if (err) {
                        log('Error in Signup API async.eachSeries : ', err.message);
                        helpers.createResponse(res, constants.SERVER_ERROR,
                            messages.SIGN_UP_ERROR,
                            {'error': messages.SERVER_ERROR_MESSAGE}
                        );
                    } else {
                        async.eachSeries(professionBody, function (profession, callback) {
                            Profession.findOne({_id : profession}, function (err, professionData) {
                                if (err) {
                                    callback();
                                } else {
                                    console.log(profession);
                                    var data = {'professionId' : profession, 'name' : professionData.name};
                                    professionArray.push(data);
                                    callback();
                                }
                            });
                        }, function (err) {
                            if (err) {
                                log('Error in Signup API async.eachSeries : ', err.message);
                                helpers.createResponse(res, constants.SERVER_ERROR,
                                    messages.SIGN_UP_ERROR,
                                    {'error': messages.SERVER_ERROR_MESSAGE}
                                );
                            } else {
                                var OTPCode = helpers.getRandom(100000,999999);
                                var newUser = new User({
                                    name         : req.body.name,
                                    email        : req.body.email,
                                    password     : bcrypt.hashSync(req.body.password, 10),
                                    mobileNumber : req.body.mobileNumber,
                                    OTP          : OTPCode,
                                    topics       : topicsArray,
                                    professions  : professionArray
                                });

                                newUser.save(function (err, user) {
                                    if (err) {
                                        console.log('Error in user signup : ',err.message);
                                        helpers.createResponse(res, constants.SERVER_ERROR,
                                            messages.SIGN_UP_ERROR,
                                            { 'error': messages.SERVER_ERROR_MESSAGE}
                                        );
                                    }
                                    var sendData = {
                                        name         : user.name,
                                        email        : user.email,
                                        mobileNumber : user.mobileNumber,
                                        OTP          : user.OTP,
                                        topics       : topicsArray,
                                        professions  : professionArray
                                    };
                                    log('Signup successful !');
                                    helpers.createResponse(res, constants.SUCCESS,
                                        messages.SIGN_UP_SUCCESS,
                                        { 'user': sendData }
                                    );
                                });
                            }
                        });
                    }
                });
                /*async.parallel([
                    function (callback) {
                        async.eachSeries(topicBody, function (topic) {
                            Topic.findOne({_id : topic}, function (err, topicData) {
                                if (err) {
                                    //res.send('Error in inner callback');
                                    callback();
                                } else {
                                    var data = {"topicId" : topic, "name" : topicData.name};
                                    topicsArray.push(data);
                                    console.log(data);
                                    callback();
                                }
                            });
                        });
                    }, function (callback) {
                        async.eachSeries(professionBody, function (profession) {
                            Profession.findOne({_id: profession}, function (err, professionData) {
                                if (err) {
                                    //res.send('Error in inner callback');
                                    callback();
                                } else {
                                    var data = {"professionId": profession, "name": professionData.name};
                                    professionArray.push(data);
                                    callback();
                                }
                            });
                        });
                    }
                ], function (err) {
                    if (err) {
                        console.log('Error in topic and profession search');
                        res.send(err);
                    }
                });*/
            }
        });
    },

    /**
     * verifyOTP() allows user to verify account
     * by entering OTP that has sent to user
     *
     * @url {{URL}}/verifyotp
     * @param <String> email, OTP
     * @return <String> Account Verification completed success message
     */

    verifyOTP:function (req, res) {
        User.findOne({email: req.body.email}, function (err, user) {
            if (err) {
                log('Error in Signup API : ', err.message);
                helpers.createResponse(res, constants.SERVER_ERROR,
                    messages.VERIFY_OTP_ERROR,
                    {'error': messages.SERVER_ERROR_MESSAGE}
                );
            } else if (!user) {
                log('User not found');
                helpers.createResponse(res, constants.UNPROCESSED,
                    messages.MODULE_NOT_FOUND(constants.USER_MODEL_NAME),
                    {'error': messages.MODULE_NOT_FOUND(constants.USER_MODEL_NAME)}
                );
            } else {
                if (user.isAccountVerified) {
                    log('Your account was already verified.');
                    helpers.createResponse(res, constants.UNPROCESSED,
                        messages.ALREADY_VERIFIED,
                        {'error': messages.ALREADY_VERIFIED}
                    );
                } else if (user.OTP == req.body.OTP) {
                    var diffMins = Math.round((((new Date() - user.OTPCreatedAt) % 86400000) % 3600000) / 60000);
                    if (diffMins > 20) {
                        log('OTP has been expired.');
                        helpers.createResponse(res, constants.UNPROCESSED,
                            messages.VERIFY_OTP_EXPIRED,
                            {'error': messages.VERIFY_OTP_EXPIRED}
                        );
                    } else {
                        User.findOneAndUpdate(
                            {email: req.body.email},
                            {$set : {isAccountVerified : 1}},
                            {new: true},
                            function (err, success) {
                                if (err) {
                                    log('Error in OTP Verify API : ', err);
                                    helpers.createResponse(res, constants.SERVER_ERROR,
                                        messages.VERIFY_OTP_ERROR,
                                        {'error': messages.SERVER_ERROR_MESSAGE}
                                    );
                                } else {
                                    log('OTP Verified Successfully !');
                                    helpers.createResponse(res, constants.SUCCESS,
                                        messages.VERIFY_OTP_SUCCESS,
                                        {'data': messages.VERIFY_OTP_SUCCESS}
                                    );
                                }
                            });
                        }
                    } else {
                    log('Invalid OTP.');
                    helpers.createResponse(res, constants.UNPROCESSED,
                        messages.VERIFY_OTP_MISMATCH,
                        {'error': messages.VERIFY_OTP_MISMATCH}
                    );
                }
            }
        });
    },

    /**
     * forgotPassword() allows user to resend otp and
     * allow later user to reset password
     *
     * @url {{URL}}/forgotpassword
     * @param <String> email
     * @return <String> OTP send message
     */

    forgotPassword:function (req, res) {
        User.findOne({email: req.body.email}, function (err, user) {
            if (err) {
                log('Error in Forgot Password API : ', err.message);
                helpers.createResponse(res, constants.SERVER_ERROR,
                    messages.FORGOT_PASSWORD_ERROR,
                    {'error': messages.SERVER_ERROR_MESSAGE}
                );
            } else if (!user) {
                log('User not found');
                helpers.createResponse(res, constants.UNPROCESSED,
                    messages.MODULE_NOT_FOUND(constants.USER_MODEL_NAME),
                    {'error': messages.MODULE_NOT_FOUND(constants.USER_MODEL_NAME)}
                );
            } else {
                if (! user.isEnable) {
                    log('Your account is disabled.');
                    helpers.createResponse(res, constants.UNPROCESSED,
                        messages.LOGIN_ACCOUNT_DISABLED,
                        {'error': messages.LOGIN_ACCOUNT_DISABLED}
                    );
                } else {
                    var OTPCode = helpers.getRandom(100000,999999);
                    User.update(
                        {email: req.body.email},
                        {$set : {OTP : OTPCode, OTPCreatedAt : new Date()}},
                        function (err, success) {
                            if (err) {
                                log('Error in updating forgot password fields to DB : ', err.message);
                                helpers.createResponse(res, constants.SERVER_ERROR,
                                    messages.FORGOT_PASSWORD_ERROR,
                                    {'error': messages.SERVER_ERROR_MESSAGE}
                                );
                            } else {
                                log('OTP has been send to provided email !');
                                helpers.createResponse(res, constants.SUCCESS,
                                    messages.FORGOT_PASSWORD_SUCCESS,
                                    {'data': messages.FORGOT_PASSWORD_SUCCESS}
                                );
                            }
                        }
                    );
                }
            }
        });
    },

    /**
     * resetPassword() allows user to reset and enter new password
     *
     * @url {{URL}}/resetpassword
     * @param <String> email, newpassword
     * @return <String> Reset Password success message
     */

    resetPassword:function (req, res) {
        User.findOne({email: req.body.email}, function (err, user) {
            if (err) {
                log('Error in Reset Password API : ', err.message);
                helpers.createResponse(res, constants.SERVER_ERROR,
                    messages.RESET_PASSWORD_ERROR,
                    {'error': messages.SERVER_ERROR_MESSAGE}
                );
            } else if (!user) {
                log('User not found');
                helpers.createResponse(res, constants.UNPROCESSED,
                    messages.MODULE_NOT_FOUND(constants.USER_MODEL_NAME),
                    {'error': messages.MODULE_NOT_FOUND(constants.USER_MODEL_NAME)}
                );
            } else {
                if (! user.isEnable) {
                    log('Your account is disabled.');
                    helpers.createResponse(res, constants.UNPROCESSED,
                        messages.LOGIN_ACCOUNT_DISABLED,
                        {'error': messages.LOGIN_ACCOUNT_DISABLED}
                    );
                } else {
                    User.findOneAndUpdate(
                        {email: req.body.email},
                        {$set : {password : bcrypt.hashSync(req.body.newPassword, 10)}},
                        {new: true},
                        function (err, success) {
                            if (err) {
                                log('Error in updating reset password fields to DB : ', err.message);
                                helpers.createResponse(res, constants.SERVER_ERROR,
                                    messages.RESET_PASSWORD_ERROR,
                                    {'error': messages.SERVER_ERROR_MESSAGE}
                                );
                            } else {
                                log('Your Password has been changed was successfully !');
                                helpers.createResponse(res, constants.SUCCESS,
                                    messages.RESET_PASSWORD_SUCCESS,
                                    {'data': messages.RESET_PASSWORD_SUCCESS}
                                );
                            }
                        }
                    );
                }
            }
        });
    }
};

//Convert UTC date to local date time by :
// var date = new Date(UTCDate);
//console.log(date.toString());