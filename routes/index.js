'use strict';

var authController = require(process.cwd() + '/app/auth/AuthController');
var router  = express.Router();

module.exports = (function() {
    router.post('/login', validatorClass.publicRouteValidate('login'), function (req, res, next) {
        authController.login(req, res);
    });

    router.post('/signup', validatorClass.publicRouteValidate('signup'), function (req, res, next) {
        authController.signup(req, res);
    });

    router.post('/verifyOTP', validatorClass.publicRouteValidate('verifyOTP'), function (req, res, next) {
        authController.verifyOTP(req, res);
    });
    
    router.post('/forgotPassword', validatorClass.publicRouteValidate('forgotPassword'), function (req, res, next) {
        authController.forgotPassword(req, res);
    });

    router.post('/resetPassword', validatorClass.publicRouteValidate('resetPassword'), function (req, res, next) {
        authController.resetPassword(req, res);
    });
    
    return router;
})();