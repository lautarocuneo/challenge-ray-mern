const express = require("express");
const mongoose = require('mongoose');
const cors = require("cors");
const UserModel = require('./models/Table');
const jwt = require('jsonwebtoken');

const SECRET_KEY = 'secret_key'

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect("mongodb://127.0.0.1:27017/challengedatabase");

app.post('/login', (req, res) => {
    const {email, password} = req.body;
    UserModel.findOne({email: email})
    .then(user => {
        if(user) {
            if(user.password === password){
                res.json("Success");
            } else {
                res.json("Incorrect password");
            }
        }
        else {
            res.json("The user dont exist");
        }
    })
})

app.post('/register', (req, res) => {
    const { email, password } = req.body;

    UserModel.findOne({ email: email })
        .then(user => {
            if (user) {    
                res.json("Email already registered");
            } else {
             
                UserModel.create({ email, password })
                    .then(newUser => res.json(newUser))
                    .catch(err => res.json(err));
            }
        })
        .catch(err => res.json(err));
});



app.listen(3001, () => {
    console.log("server is running");
})
