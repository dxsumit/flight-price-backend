
const router = require("express").Router();

require("dotenv").config();
const JWT = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const {check, validationResult} = require('express-validator'); // middleware for validation of fields..
const User = require('../models/user')

const {TOKEN_salt} = process.env 


router.get('/', (req, res) => {

    res.status(200).json({status: "success", msg: "This is auth api"});
});




router.post('/login', async (req, res) => {
    
    const {email, password} = req.body;
    if( !(email && password) ) 
        return res.status(400).json({"status": "error", "msg": "All fields are required.."}); 

    const currentUser = await User.findOne(({email}));

    if(currentUser && (await bcrypt.compare(password, currentUser.password)) ){
        // login successful, create token and provide to client..
        const token = JWT.sign({
            payload: `This is user ${currentUser.email}`
        }, TOKEN_salt, {expiresIn: 60*60})

        currentUser.token = token;

        const {_id} = currentUser;
        return res.status(200).json({status: "success", id: _id, token:token});
    }

    return res.status(401).json({"status": "error", "msg": "Invalid Credentials."});

})



router.post('/signup', [

    check('email', 'Email is not valid').isEmail(),
    check('password', 'length is too small').isLength({max:50, min:5})

],  async (req, res) => {


    try{
        // throw the res, based on validation 
        validationResult(req).throw();

        const {name, age, email, password} = req.body

        if( !(name && age && email && password))
            return res.status(400).json({"status": "error", "msg": "All fields are required.."});
        
        // check user in database if it exists...
        const currentUser = await User.findOne({email});
        if(currentUser){
            return res.status(409).json({"status": "error", "msg": "User already exist"});  // 409 request conflict.
        }

        // new user create profile and add to the database..
        const hashedPassword = await bcrypt.hash(password, 8);

        // creating token for user...
        const token = JWT.sign({
            payload: `This is user ${email}`
        }, TOKEN_salt, {expiresIn: 60*60})

        const user = new User({
            name : name,
            age: age,
            email: email,
            password: hashedPassword
        })

        // save user in database..
        await user.save()
        // save user token..
        user.token = token

        const {_id} = user;
        res.status(201).json({status: "success", id: _id, token:token});
        
    }
    catch(err){
        return res.status(400).json({"msg": "error of catch", err});
    }

})


module.exports = router;


