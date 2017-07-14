'use strict';

var User    = require(process.cwd() + '/app/components/User/UserSchema');
var bcrypt  = require('bcrypt');

module.exports = {

    /**
     * show() get details of particular resource
     * based on passed resource id
     *
     * @url {{URL}}/user/resourceId
     * @param <String> resourceId
     * @return <Element> Resource
     */

    show:function(req, res) {
        User.findById(req.params.objectId, function (err, user) {
            if (err) {
                log('Error in User Details API : ', err.message);
                helpers.createResponse(res, constants.SERVER_ERROR,
                    messages.MODULE_SHOW_ERROR(constants.USER_MODEL_NAME),
                    { 'error' : messages.SERVER_ERROR_MESSAGE}
                );
            } else if (user) {
                var sendData = {
                    name         : user.name,
                    email        : user.email,
                    mobileNumber : user.mobileNumber,
                };
                log('User Detail API Success!');
                helpers.createResponse(res, constants.SUCCESS,
                    messages.MODULE_SHOW_SUCCESS(constants.USER_MODEL_NAME),
                    { 'data' : sendData }
                );
            } else {
                log('Invalid objectId provided');
                helpers.createResponse(res, constants.UNPROCESSED,
                    messages.MODULE_NOT_FOUND(constants.USER_MODEL_NAME),
                    { 'error' : messages.MODULE_NOT_FOUND(constants.USER_MODEL_NAME)}
                );
            }
        });
    },

    /**
     * changePassword() allows user to change password
     *
     * @url {{URL}}/user/changepassword
     * @param <String> oldpassword, newpassword
     * @return <String> Change Password success message
     */

    changePassword:function(req, res) {
        var loggedInUser = helpers.parseJWTToken(req);
        if (bcrypt.compareSync(req.body.oldPassword, loggedInUser.password)) {
            User.findOneAndUpdate(
                {email : loggedInUser.email},
                {$set : {password : bcrypt.hashSync(req.body.newPassword, 10)}},
                {new: true},
                function (err, success) {
                    if (err) {
                        log('Error in change password : ', err.message);
                        helpers.createResponse(res, constants.SERVER_ERROR,
                            messages.CHANGE_PASSWORD_ERROR,
                            {'error': messages.SERVER_ERROR_MESSAGE}
                        );
                    } else {
                        log('AuthController changePassword => Password changed successfully!');
                        helpers.createResponse(res, constants.SUCCESS,
                            messages.CHANGE_PASSWORD_SUCCESS,
                            { 'data' : messages.CHANGE_PASSWORD_SUCCESS }
                        );
                    }
                }
            );
        } else {
            log('AuthController changePassword => Password mismatch : ');
            helpers.createResponse(res, constants.UNPROCESSED,
                messages.PASSWORD_MISMATCH,
                {'error': messages.PASSWORD_MISMATCH}
            );
        }

    },

    /**
     * destroy() enable/disable details of particular resource
     * based on passed resource id
     *
     * @url {{URL}}/user/resourceId/status
     * @param <String> resourceId, status
     * @return <Element> enable/disable message
     */

    destroy:function(req, res) {
        User.findById({ _id :req.params.objectId}, function (err, user) {
            if (err) {
                log('User destroy => Server Error : ', err.message);
                helpers.createResponse(res, constants.SERVER_ERROR,
                    messages.MODULE_DELETE_ERROR(constants.USER_MODEL_NAME),
                    {'error': messages.SERVER_ERROR_MESSAGE}
                );
            } else if (!user) {
                log('User destroy => No such user exists');
                helpers.createResponse(res, constants.SERVER_ERROR,
                    messages.MODULE_NOT_FOUND(constants.USER_MODEL_NAME),
                    {'error': messages.MODULE_NOT_FOUND(constants.USER_MODEL_NAME)}
                );
            } else {
                var loggedInUser = helpers.parseJWTToken(req);
                if (loggedInUser.role == 'admin') {
                    User.findOneAndUpdate(
                        {_id : req.params.objectId},
                        {$set : {isEnable : req.params.status}},
                        {new: true},
                        function (err, success) {
                            if (err) {
                                log('User destroy => Error in status update to 1', err.message);
                                helpers.createResponse(res, constants.SERVER_ERROR,
                                    messages.MODULE_DELETE_ERROR(constants.USER_MODEL_NAME),
                                    {'error': messages.SERVER_ERROR_MESSAGE}
                                );
                            } else {
                                var text = messages.TEXT_DELETED;
                                if (req.params.status == 0)
                                    text = messages.TEXT_DISABLED;
                                else
                                    text = messages.TEXT_ENABLED;

                                log('User has been '+ text + 'successfully !');
                                helpers.createResponse(res, constants.SUCCESS,
                                    messages.MODULE_STATUS_CHANGE(constants.USER_MODEL_NAME, text),
                                    {'data': messages.MODULE_STATUS_CHANGE(constants.USER_MODEL_NAME, text)}
                                );
                            }
                        }
                    );
                } else {
                    log('User destroy => User is unauthorized : ');
                    helpers.createResponse(res, constants.UNPROCESSED,
                        messages.USER_UNAUTHORIZED,
                        {'error': messages.USER_UNAUTHORIZED}
                    );
                }
            }
        });
    }
};