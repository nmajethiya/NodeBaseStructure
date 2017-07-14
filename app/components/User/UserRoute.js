'use strict';

var userController = require(process.cwd() + '/app/components/User/UserController');
var router  = express.Router();

module.exports = (function() {
    router.get('/:objectId', validatorClass.userRouteValidate('show'), function (req, res, next) {
        userController.show(req, res);
    });

    router.post('/changePassword', validatorClass.userRouteValidate('changePassword'), function (req, res, next) {
        userController.changePassword(req, res);
    });

    router.delete('/:objectId/:status', validatorClass.userRouteValidate('delete'), function (req, res, next) {
        userController.destroy(req, res);
    });

    return router;
})();