'use strict';

// constant messages
module.exports = {

    //All list(index) method messages
    MODULE_LIST_SUCCESS: function (module) {
        return module + ' list.';
    },
    MODULE_LIST_ERROR: function (module) {
        return 'Error while listing '+ module +'.';
    },

    //All store method messages
    MODULE_STORE_SUCCESS: function (module) {
        return module + ' has been added successfully !';
    },
    MODULE_EXISTS: function (module) {
        return 'The ' +  module + ' is already exists in the list.';
    },
    MODULE_STORE_ERROR: function (module) {
        return 'Error while storing ' +  module + '.';
    },

    //All show method messages
    MODULE_SHOW_SUCCESS: function (module) {
        return module + ' details.';
    },
    MODULE_NOT_FOUND: function (module) {
        return 'The ' + module + ' you are looking for is not found.';
    },
    MODULE_SHOW_ERROR:function (module) {
        return 'Error during ' + module + ' details.';
    },

    // All update method messages
    MODULE_UPDATE_SUCCESS: function (module) {
        return module + ' details has been updated successfully!';
    },
    MODULE_UPDATE_ERROR: function (module) {
        return 'Error while updating '+ module +'.';
    },

    //All delete(destroy/status change) method messages
    MODULE_STATUS_CHANGE:function (module, status) {
        return module + ' has been ' + status + ' successfully!';
    },
    MODULE_DELETE_ERROR: function (module) {
        return 'Error while deleting ' + module;
    },

    //file upload
    FILE_TYPE_MISMATCH: function (module) {
        return 'The ' + module + ' must be a valid image file.';
    },

    // Status Change Messages
    TEXT_DISABLED           : 'disabled',
    TEXT_ENABLED            : 'enabled',
    TEXT_DELETED            : 'deleted',

    //Authnetication messages
    CHANGE_PASSWORD_ERROR   : 'Error during change password.',
    CHANGE_PASSWORD_SUCCESS : 'Your password has been changed successfully.',
    PASSWORD_MISMATCH       : 'Incorrect old password.',
    USER_UNAUTHORIZED       : 'You are not authorized for this operation.',
    LOGIN_ERROR             : 'Error during login.',
    LOGIN_SUCCESS           : 'Login Successful !',
    LOGIN_ACCOUNT_DISABLED  : 'Your account is disabled by admin.',
    INCORRECT_PASSWORD      : 'Your Password is incorrect.',
    SIGN_UP_ERROR           : 'Error during user sign up.',
    SIGN_UP_SUCCESS         : 'Congrats! You have successfully registered.',
    VERIFY_OTP_ERROR        : 'Error during verify OTP.',
    ALREADY_VERIFIED        : 'Your account was already verified.',
    VERIFY_OTP_EXPIRED      : 'Your OTP has been expired.',
    VERIFY_OTP_SUCCESS      : 'OTP verification has been completed succesfully!',
    VERIFY_OTP_MISMATCH     : 'You have entered wrong OTP',
    FORGOT_PASSWORD_ERROR   : 'Error during forgot password.',
    FORGOT_PASSWORD_SUCCESS : 'New OTP has been sent.',
    RESET_PASSWORD_ERROR    : 'Error during reset password.',
    RESET_PASSWORD_SUCCESS  : 'Your password reset request has been processed successfully.',

    //File upload
    FILE_UPLOAD_ERROR       : 'Error during file upload.',

    //Token Errors
    INVALID_TOKEN           : 'Your access token is invalid or expired.',
    ACCESS_TOKEN_REQUIRED   : 'Please provide the access token.',

    //Invalid JSON
    INVALID_JSON            : 'Invalid JSON. Failed to parse JSON',


    LOGIN_USER_LIST         : 'Error during login user list.',
    PARAM_MISSING           : 'Request parameter missing.',
    SERVER_ERROR_MESSAGE    : 'Server Error.',
    INVALID_EMAIL           : 'The selected email is invalid.',
    EMAIL_EXISTS            : 'The email has already been taken.',
    SIGNUP_USER_LIST        : 'Error during signup user list',
    ERROR_USER_LIST         : 'Error during user list.',
    SUCCESS_USER_LIST       : 'User List.',

    URL_NOT_FOUND           : 'The URL you are looking for is not found!',
    USER_NOT_FOUND          : 'The User you are looking for is not found!',
    INVALID_MONGO_OBJECT_ID : 'The ObjectId is not a valid mongoId.',
    INVALID_STATUS          : 'The status is not valid status.',

    USER_DESTROY_ERROR      : 'Error during user destroy',
    USER_DESTROY_ENABLED    : 'User status has been enabled successfully.',
    USER_DESTROY_DISABLED   : 'User status has been disabled successfully.',


    /*//http statuses
    SUCCESS             : 200,
    ACCEPTED            : 202,
    BAD_REQUEST         : 400,
    UNAUTHORIZED        : 401,
    FORBIDDEN           : 403,
    NOT_FOUND           : 404,
    METHOD_NOT_ALLOWED  : 405,
    UNPROCESSED         : 422,
    SERVER_ERROR        : 500*/
};

