# Backend code of TODOs app

## URL -
[TODOs App](https://backend-todos1410.herokuapp.com)

## Various API call cannot be called using browser because currently there is no frontend in this APP.
## You can test various API on this URL in POSTMAN.

## some end-point which is defined in this Webapp.

### 1. GET(/) - Homepage

    Entry point of this website.

### 2. POST(/signup) - Signup page

    It will take 3 arguments (username, email, password), after successsful signup you have to login.

### 3. POST(/login) - Login page

    It will take 2 arguments (email, password)

### 4. GET(/welcome) - Welcome after login

    It will welcome you only after login.

### 5. GET(/todos) - All todos

    It will show you all task of login user.

### 6. GET(/todos/:id) - A specific todo

    It will take input as id and it will show you a task of login user, whose id you will send with request.

    NOTE - id will be the id of object, which you will get on a task creation.

### 7. POST(/todos) - Create Todo 

    It will take 2 arguments (task, discription).

    You will get here a object as well as todo id.
    This id will be use as value of id with various method.

### 8. PUT(/todos/:id) - Update a todo

    It will take 2 arguments (task, discription) and id.

    It will update a existing todo of login user.

### 9. DELETE(/todos/:id) - Delete a todo

    It will take only id.

    It will delete a existing todo of login user.

### 10. any thing other than these 9 endpoint will show Error.


## Thank you for vising this !!!
