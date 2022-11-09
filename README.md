# User login/signup application in NODEJS

## Various API call cannot be called using browser because currently there is no frontend in this APP.
## You can test various API on this URL in POSTMAN.

## some end-point which is defined in this Webapp.

### post('/signup', data)

    data = {
    "firstName":"Satya ",
    "lastName":" Prakash",
    "status": "Active",
    "role": "user",
    "email": "sp@gmai.com",
    "phone":"6748932100",
    "password":"qwertR@1"
    }

### post('/login',data)

    data = {
    "role": "user",
    "email": "sp@gmai.com",
    "password":"qwertR@1"
    }

### post('/tokenVerify',data)

    {
    "token": "jwt_token"
    }

### post('/filter',data)

    {
    "email": "sp2gmai.com"
    }

    // You can filter data on email, firstName, phone, status

