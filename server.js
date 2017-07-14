express 	= module.exports = require('express');
app         = module.exports = express();
bodyParser  = module.exports = require('body-parser');
morgan      = module.exports = require('morgan');
mongoose    = module.exports = require('mongoose');
fileUpload  = module.exports = require('express-fileupload');
validator   = module.exports = require('express-validator');
_           = module.exports = require('underscore');
fs          = module.exports = require('fs');
util        = module.exports = require('util');
async       = module.exports = require('async');

config          = module.exports = require(process.cwd() + '/config/env'); // get our config file
constants       = module.exports = require(process.cwd() + '/app/utils/constants/index'); // get our constants file
messages        = module.exports = require(process.cwd() + '/app/utils/common/message.js'); // get messages
helpers         = module.exports = require(process.cwd() + '/app/utils/common/helper.js'); // response
validatorClass  = module.exports = require(process.cwd() + '/app/utils/common/validator.js'); //validator

app.use(bodyParser.urlencoded({extended : false})); // extended false will accept only string and array
app.use(bodyParser.json());
// validator to use exact below the body and custom validator to check input as array
app.use(validator({
    customValidators: {
        isArray: function (value) {
            return Array.isArray(value);
        }
    }
}));
app.use(fileUpload());

log = module.exports = function (arr) {
    for (var i = 0; i < arguments.length; i++){
        console.log(util.inspect(arguments[i], {depth: null, colors: true}) );
    }
    console.log('\n\n ________________________________________________ ' +new Date().toTimeString().replace(/.*(\d{2}:\d{2}:\d{2}).*/, '$1') +'___________________________________________________ \n \n');
};

//app.use(fileUpload());


// Enable CORS from client-side
app.use(function (req, res, next) {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');
    // Request methods you wish to allow
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
    // Request headers you wish to allow
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Authorization, Content-Type, Accept");
    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    if ('OPTIONS' === req.method) {
        res.status(200).end();
    } else {
        next();
    }
});

mongoose.Promise = global.Promise;
//mongoose.connect('mongodb://DB_USER:DB_PASSWORD@ds131492.mlab.com:31492/DB_NAME');
mongoose.connect('mongodb://localhost/demoNodeStructure');


var publicRoutes      = require(process.cwd() + '/routes/index.js');


app.use('/api/user', validatorClass.useJWTMiddleware(), userRoutes); //user routes
app.use('/api/faq', validatorClass.useJWTMiddleware(), faqRoutes);  // faq routes
app.use('/api/genre', validatorClass.useJWTMiddleware(), genreRoutes); // genre routes
app.use('/api/topic', validatorClass.useJWTMiddleware(), topicRoutes); // topic routes
app.use('/api/profession', validatorClass.useJWTMiddleware(), professionRoutes); // profession routes
app.use('/api/productvisits', validatorClass.useJWTMiddleware(), productVisits); // product visits

//Keep this route to     last route as we need static token for this route
app.use('/api', validatorClass.secureOpenRoutes() , publicRoutes);

app.listen(config.PORT, function () {
    console.log('RESTful API server started on : ' + config.PORT);
});

app.use(function (req, res) {
    helpers.createResponse(res, constants.NOT_FOUND,
        messages.URL_NOT_FOUND,
        {error : messages.URL_NOT_FOUND}
    );
});

