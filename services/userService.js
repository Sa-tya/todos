const userModel = require("../model/userModel")
const bcrypt = require('bcryptjs')
require('dotenv').config()
// const db = require('../database/connection')
var jwt = require('jsonwebtoken');

async function Signup(req) {
    try {
        let firstName = req.body.firstName.trim();
        let lastName = req.body.lastName.trim();
        let email = req.body.email.trim();
        let phone = req.body.phone.trim();
        let password = req.body.password.trim();
        let status = req.body.status.trim().toLowerCase();
        let role = req.body.role.trim().toLowerCase();
        if (password.match(/^(?=.*?[A-Z])(?=.*?[#?!@$%^&*-]).{8,}$/)) //match(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/)
            password = bcrypt.hashSync(password, bcrypt.genSaltSync(10))
        else return { status:201, msg: 'Write a valid Password !' }

        return userModel.create({
            // Uid: 'uid',
            FirstName: firstName,
            LastName: lastName,
            Email: email,
            Phone: phone,
            Status: status,
            Role: role,
            Password: password
        })
            .then(async (res) => {
                // console.log(await userModel.findAll({}))
                return { status:200, msg: 'Account successfully created' }
            })
            .catch((err) => {
                console.log(err)
                return { status:201, msg: 'Error in user creation' }
            })
    }
    catch (err) {
        console.log(err)
        return { status:201, msg: 'Error occured !' }
    }
}

async function Login(req) {
    try {
        let email = req.body.email.trim();
        if(!email.match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)){
            return {status: 201, msg: 'Please enter a valid email'}
        }
        let password = req.body.password.trim();
        let role = req.body.role.trim().toLowerCase();
        let userExist = await userModel.findAll({
            where: {
                Email: email
            }
        })
        if (userExist.length)
            return await userModel.findAll({
                where: {
                    Email: email,
                    Role: role
                }
            }).then(res => { //db.query(`SELECT * FROM User WHERE Email='${email}' AND Role='${role}'`, (err, result) => {
                if (bcrypt.compareSync(password, res[0]['Password'])) {
                    let token = jwt.sign({
                        data: { Uid: res[0].Uid, Email: res[0].Email }
                    }, process.env.Secret, { expiresIn: '30 days' });
                    return {
                        status: 200,
                        data: res[0],
                        msg: "Logged in successfully",
                        token: token
                    }
                }
                else {
                    return {
                        status: 201,
                        msg: 'Invalid password!'
                    }
                }
            })
        else {
            return {
                status: 201,
                msg: 'User not registered, Please Signup !'
            }
        }

    }
    catch (err) {
        console.log(err)
        return {
            status: 201,
            msg: 'Login error !'
        }
    }

}

async function TokenVerify(req) {
    try {
        let token = req.body.token;
        return jwt.verify(token, process.env.Secret, async (err, res) => {
            if (err) {
                return { status: 201, msg: 'Invalid signature !' }
            }
            else {
                let data = await userModel.findAll({
                    where: {
                        Uid: res.data.Uid,
                        Email: res.data.Email
                    }
                })
                return { status: 200, data: data[0] }
            }
        })
    }
    catch (err) {
        console.log(err)
        return { status: 201, msg: 'Error occured !' }
    }
}

async function FilterFuction(req) {
    try {
        let firstName = req.body.firstName?.trim();
        let email = req.body.email?.trim();
        if(email && !email.match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)){
            return {status: 201, msg: 'Please enter a valid email'}
        }
        let phone = req.body.phone?.trim();
        if(phone && !phone.match(/^\d{10}$/)){
            return {status: 201, msg: 'Please enter a valid PhoneNumber'}
        }
        let status = req.body.status?.trim().toLowerCase();
        let filterData={};
        if(firstName) filterData['FirstName'] = firstName
        else if(email) filterData['Email'] = email
        else if(phone) filterData['Phone'] = phone
        else if(status) filterData['Status'] = status
        console.log(filterData)
        let data = await userModel.findAll({
            where: 
                filterData
            
        })
        return { status: 200, data: data }
    }
    catch (err) {
        console.log('error ',err)
        return { status: 201, msg: 'Error occured !' }
    }
}
module.exports = { Signup, Login, TokenVerify, FilterFuction }