'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var helpers = require(process.cwd() + '/app/utils/common/helper');

var userSchema = new Schema({
    name : {
        required : helpers.checkIfRequired('name'),
        type     : String
    },
    email : {
        required : helpers.checkIfRequired('email'),
        type     : String,
        min      : [3, helpers.checkLength('email', 3, '')],
        max      : [100, helpers.checkLength('email', '', 100)]
    },
    password : {
        required : helpers.checkIfRequired('password'),
        type     : 'String',
        min      : [3, helpers.checkLength('password', 3, '')]
    },
    mobileNumber : {
        type     : Number
    },
    isEnable : {
        type     : Number,
        default  : 1
    },
    isAccountVerified : {
        type     : Number,
        default  : 0
    },
    OTP : {
        type     : Number
    },
    topics : [{
        name    : String,
        topicId  : {
            type : mongoose.Schema.Types.ObjectId,
            ref  : 'Topic'
        }
    }],
    professions : [{
        name    : String,
        professionId  : {
            type : mongoose.Schema.Types.ObjectId,
            ref  : 'Profession'
        }
    }],
    OTPCreatedAt : {
        type     : Date,
        default  : new Date()
    },
    role         : {
        type     : String,
        enum     : ['user', 'admin'],
        default  : 'user'
    },
    createdAt : {
        type : Date,
        default : new Date()
    },
    updatedAt : {
        type : Date,
        default : new Date()
    }
});

module.exports = mongoose.model('User', userSchema, 'users');