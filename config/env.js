module.exports = {

    'PORT' : 3000,

    'DB_HOST':'mongodb://',
    'DB_NAME':'techne',
    'DB_PORT':27017,
    'DB_USERNAME':'smart',
    'DB_PASSWORD':'smart123',


    'BASE_URL':'http://localhost:3000/',

    'algorithm' : 'HS256',
    'expiresIn' : '2h',

    //JWT Configuration
    'JWT_SECRET'     : 'Y/pQxq7CPpvGncQiN3avD+hEzczLD6Hkk/Xae2aGRG0=',
    'JWT_ALGORITHEM' : 'HS256',
    'TOKEN_EXPIRY'   : '2h',
    
    //JWT Static token
    STATIC_TOKEN     : 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjEsImlzcyI6Imh0dHA6Ly9naWZrYXIuY2xvdWRhcHAubmV0OjgzL3YxLjAvbG9naW4iLCJpYXQiOjE0OTc5Mjc5MTUsImV4cCI6MTQ5NzkzMTUxNSwibmJmIjoxNDk3OTI3OTE1LCJqdGkiOiJVYUYxOTF5VHhpT0hlbDd5In0.JzwKPbbeWFM0kVVdKIQ0URDN9Gpd27yROpWBSHQ8c5A',

    //Pagination
    SORT_BY          : 'CreatedAt',
    SORT_ORDER       : 'desc',
    PAGE_NUMBER      : 1,
    RECORDS_PER_PAGE : 10
};