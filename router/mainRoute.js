const express = require('express');
const { Signup, Login, TokenVerify, FilterFuction } = require('../services/userService');
const router = express.Router();

router.get('/',(req,res)=>{
    res.send({status: 200, msg: 'hello, this is homeroute !'})
})

router.post('/signup', async(req, res) => {
    let response = await Signup(req);
    console.log(response)
    if(response.status === 200) res.status(200).json(response)
    else res.status(501).send(response)
})

router.post('/login', async(req, res) => {
    let response = await Login(req);
    if(response.status === 200) res.json(response)
    else res.send(response)

})

router.post('/tokenVerify', async(req, res) => {
    let response = await TokenVerify(req);
    if(response.status === 200) res.json(response)
    else res.send(response)
})

router.post('/filter', async(req, res) => {
    let response = await FilterFuction(req);
    if(response.status === 200) res.json(response)
    else res.send(response)
})

router.use("*", (req, res) => {
    res.status(404).json({
        success: "false",
        message: "Page not found",
        error: {
            statusCode: 404,
            message: "You reached a route that is not defined on this server",
        },
    });
});

module.exports = router;