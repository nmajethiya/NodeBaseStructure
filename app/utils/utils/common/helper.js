'use strict';

var jwt     = require('jsonwebtoken');

module.exports = {
    //create function for response
    createResponse: function (res, status, message, payload, pager) {
        pager = typeof pager !== 'undefined' ? pager : '';
        return res.status(status).json({
            'status'    : status,
            'message'   : message,
            'payload'   : payload,
            'pager'     : pager
        });
    },

    generateToken: function (user) {
        return jwt.sign(user, config.JWT_SECRET, {
            expiresIn: config.TOKEN_EXPIRY,
            algorithm: config.JWT_ALGORITHEM
        });
    },

    checkIfRequired: function (fieldName) {
        return 'The ' + fieldName + ' field is required.';
    },

    checkIfEmail: function (fieldName) {
        return 'The ' + fieldName + ' must be a valid email address.';
    },

    checkInt: function (fieldName) {
        return 'The ' + fieldName + ' must be a valid integer.';
    },

    checkIfValidEnum: function (fieldName, enumArray) {
        return 'The ' + fieldName + ' must have a valid value from ' + enumArray;
    },

    checkIfValidSortOrder: function (fieldName, enumArray) {
        return 'The ' + fieldName + ' must have a valid value from ' + enumArray;
    },

    checkIfValidPageNumber: function (fieldName) {
        return 'The ' + fieldName + ' field must be integer and greater than 1.';
    },

    checkIfValidJSON: function (fieldName) {
        return 'The ' + fieldName + ' field must be a valid JSON String.';
    },

    checkIfValidMongoId: function (fieldName) {
        return 'The ' + fieldName + ' field must be a valid Mongo Id.';
    },

    checkIfEqualsAll: function (fieldName) {
        return 'The ' + fieldName + ' field must have value as all';
    },

    checkIfArray: function (fieldName) {
        return 'The ' + fieldName + ' must be a valid array.'
    },

    isArray: function (value) {
        value = value.slice(1, -1);
        return Array.isArray(value);
    },

    checkLength: function (fieldName, min, max) {
        min = typeof min !== 'undefined' ? min : '';
        max = typeof max !== 'undefined' ? max : '';

        if (min == max)
            return 'The ' + fieldName + ' must be exact ' + max + ' characters';
        else if (min == '')
            return 'The ' + fieldName + ' must be at least ' + min + '.';
        else if (max == '')
            return 'The ' + fieldName + ' may not be greater than ' + max + '.';
        else
            return 'The ' + fieldName + ' must be between ' + min + ' and ' + max + '.';
    },

    getRandom: function (min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min;
    },

    parseJWTToken: function (req) {
        var decoded = jwt.verify(req.headers['authorization'].split('Bearer ')[1], config.JWT_SECRET);

        return decoded._doc;
    },

    //get sortBy
    getSortBy: function(req) {
        return  (typeof req.query.sortBy !== 'undefined')
            ? req.query.sortBy
            : constants.SORT_BY;
    },

    //get sortOrder
    getSortOrder: function(req) {
        return  (typeof req.query.sortOrder !== 'undefined')
            ? req.query.sortOrder
            : constants.SORT_ORDER;
    },

    //get pageNumber
    getPageNumber: function(req) {
        return  (typeof req.query.pageNumber !== 'undefined')
            ? req.query.pageNumber
            : constants.PAGE_NUMBER;
    },

    //get recordsPerPage
    getRecordsPerPage: function(req) {
        return  (typeof req.query.recordsPerPage !== 'undefined')
            ? req.query.recordsPerPage
            : constants.RECORDS_PER_PAGE;
    }
};