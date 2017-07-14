'use strict';

// httpStatuses constant
module.exports = {

    SUCCESS                     : 200,
    ACCEPTED                    : 202,
    BAD_REQUEST                 : 400,
    UNAUTHORIZED                : 401,
    FORBIDDEN                   : 403,
    NOT_FOUND                   : 404,
    METHOD_NOT_ALLOWED          : 405,
    UNPROCESSED                 : 422,
    SERVER_ERROR                : 500,

    // static token
    STATIC_TOKEN                : 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjEsImlzcyI6Imh0dHA6Ly9naWZrYXIuY2xvdWRhcHAubmV0OjgzL3YxLjAvbG9naW4iLCJpYXQiOjE0OTc5Mjc5MTUsImV4cCI6MTQ5NzkzMTUxNSwibmJmIjoxNDk3OTI3OTE1LCJqdGkiOiJVYUYxOTF5VHhpT0hlbDd5In0.JzwKPbbeWFM0kVVdKIQ0URDN9Gpd27yROpWBSHQ8c5A',

    //pagination parameters
    SORT_BY                     : 'createdAt',
    SORT_ORDER                  : 'desc',
    PAGE_NUMBER                 : 1,
    RECORDS_PER_PAGE            : 10,

    //Model Constants
    USER_MODEL_NAME             : 'User',
    FAQ_MODEL_NAME              : 'FAQ',
    GENRE_MODEL_NAME            : 'Genre',
    TOPIC_MODEL_NAME            : 'Topic',
    PROFESSION_MODEL_NAME       : 'Profession',
    PRODUCTVISITS_MODEL_NAME    : 'ProductVisits',
};
